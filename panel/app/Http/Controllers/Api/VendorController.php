<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\Order;
use App\Models\Location;
use App\Models\Question;
use App\Models\Employees;
use Illuminate\Http\Request;
use App\Models\EmpAttendance;
use App\Models\Question_answer;
use App\Models\AssignedInventory;
use App\Models\ServiceCompletion;
use App\Http\Controllers\Controller;
use App\Models\EmpVerifiedAttendance;

class VendorController extends Controller
{
    public function vendorStatus(Request $request)
    {
        // Validation for required fields
        if (empty($request->user_id)) {
            return response()->json(["status" => 0, "message" => trans('User Id is Required')], 400);
        }
        if (empty($request->latitude)) {
            return response()->json(["status" => 0, "message" => trans('Latitude is Required')], 400);
        }
        if (empty($request->longitude)) {
            return response()->json(["status" => 0, "message" => trans('Longitude is Required')], 400);
        }
    
        // Fetch user details
        $user = Employees::where('id', $request->user_id)->first();
    
        if ($user) {
            // Retrieve location data
            $location = Location::where('id', $user->location)->first();
            if ($location) {
                $polygon = $this->parseWKT($location->coordinates);
    
                if ($polygon) {
                    if ($this->isPointInPolygon($request->latitude, $request->longitude, $polygon)) {
                        // Update user's location and device details
                        $user->longitude = $request->longitude;
                        $user->latitude = $request->latitude;
                        $user->battery = $request->battery;
                        $user->device = $request->device;
                        $user->is_active = $request->is_active_status;
                        $user->is_active_at = Carbon::now();
    
                        if ($request->is_active_status == 1) {
                            // If the user is active, record login time in emp_attendance
                            $user->save();
    
                            $empAttendance = EmpAttendance::create([
                                'emp_id' => $request->user_id,
                                'login_at' => Carbon::now(),
                            ]);
    
                            // Retrieve the ID of the inserted row
                            $attendanceId = $empAttendance->id;
    
                            $arrayName = [
                                'location' => $location->name,
                                'status_message' => 'Location is within the area',
                                'statusCode' => 1,
                                'attendance_id' => $attendanceId,  
                            ];
    
                            return response()->json(['status' => 1, 'message' => "Employee Found in Location", 'data' => $arrayName], 200);
                        } else {
                            $user->logout_at = Carbon::now();
                            $user->save();
    
                            $empAttendance = EmpAttendance::where('id', $request->attendance_id)->first();
    
                            if ($empAttendance) {
                                $empAttendance->logout_at = Carbon::now();
                                $empAttendance->distance_travelled = $request->distance_travelled;
                                $empAttendance->save();
                            }
    
                            $arrayName = [
                                'location' => $location->name,
                                'status_message' => 'Employee went Offline',
                                'statusCode' => 0,
                            ];
    
                            return response()->json(['status' => 1, 'message' => "Employee went Offline", 'data' => $arrayName], 200);
                        }
                    } else {
                        return response()->json(['status' => 0, 'message' => "Employee out of Location"], 200);
                    }
                } else {
                    return response()->json(["status" => 0, "message" => trans('Invalid Location Coordinates')], 400);
                }
            } else {
                return response()->json(["status" => 0, "message" => trans('Your location not updated by Admin yet!')], 200);
            }
        } else {
            return response()->json(["status" => 0, "message" => trans('Employee Not Found')], 400);
        }
    }
    

    private function isPointInPolygon($lat, $lng, $polygon)
    {
        $numPoints = count($polygon);
        $inPolygon = false;

        for ($i = 0, $j = $numPoints - 1; $i < $numPoints; $j = $i++) {
            if ((($polygon[$i][1] > $lng) != ($polygon[$j][1] > $lng)) &&
                ($lat < ($polygon[$j][0] - $polygon[$i][0]) * ($lng - $polygon[$i][1]) / ($polygon[$j][1] - $polygon[$i][1]) + $polygon[$i][0])) {
                $inPolygon = !$inPolygon;
            }
        }

        return $inPolygon;
    }

    private function parseWKT($wkt)
    {
        $pattern = '/POLYGON\(\((.*)\)\)/';
        preg_match($pattern, $wkt, $matches);
        if (!isset($matches[1])) {
            return null;
        }

        $coordinates = explode(',', $matches[1]);
        $polygon = [];
        foreach ($coordinates as $coordinate) {
            list($lat, $lng) = explode(' ', trim($coordinate));
            $polygon[] = [(float) $lat, (float) $lng];
        }

        return $polygon;
    }

  public function orders(Request $request)
{
    // Validate request input
    $validator = \Validator::make($request->all(), [
        'user_id' => 'required|integer',
        'order_status' => 'required|string',
    ]);

    if ($validator->fails()) {
        return response()->json(["status" => 0, "message" => $validator->errors()->first()], 400);
    }

    // Fetch orders with necessary joins
    $orders = Order::where('assigned_to', $request->user_id)
        ->where('order_status', $request->order_status)
        ->join('products', 'orders.product_id', '=', 'products.id') // Join with products table
        ->join('subcategories', 'products.subcat_id', '=', 'subcategories.id')  // Join with subcategories using subcat_id
        ->select(
            'orders.id', 
            'orders.order_number', 
            'orders.product_name', 
            'orders.full_name', 
            'orders.mobile', 
            'orders.variation', 
            'orders.payment_type', 
            'orders.desired_date', 
            'orders.desired_time', 
            'orders.order_total',
            'orders.landmark',
            'orders.street_address',
            'orders.emp_onsite_image',
            'orders.pincode',
            'orders.order_status',
            'subcategories.question as questions' // Retrieve questions from subcategories
        )
        ->get();

    // Check if no orders are found
    if ($orders->isEmpty()) {
        return response()->json(["status" => 0, "message" => trans('No Orders Found')], 400);
    }

    // Process each order
    $orderData = $orders->map(function($order) use ($request) {
        // Decode the question JSON from the subcategories table
        $questions = json_decode($order->questions, true);

        // Initialize flags for OnSite and OnCompleted questions
        $onSiteExists = 0;
        $onCompletedExists = 0;

        // Check if OnSite or OnCompleted questions exist in the JSON data
        foreach ($questions as $questionSet) {
            if ($questionSet['title'] == 'Onsite') {
                $onSiteExists = 1;
            }
            if ($questionSet['title'] == 'OnCompleted') {
                $onCompletedExists = 1;
            }
        }

        // Check if the combination of order status and order id exists in the QuestionAnswers table
        $isQuestionsSubmitted = \DB::table('question_answers')
            ->where('order_id', $order->id)
            ->where('stage', $request->order_status)
            ->exists();

        // Map order data along with question existence flags and IsQuestionsSubmitted flag
        return [
            'id' => $order->id,
            'order_number' => $order->order_number,
            'product_name' => $order->product_name,
            'full_name' => $order->full_name,
            'mobile' => $order->mobile,
            'variation' => $order->variation,
            'payment_type' => $order->payment_type,
            'desired_date' => $order->desired_date,
            'desired_time' => $order->desired_time,
            'price' => $order->order_total,
            'OnSiteQuestions' => $onSiteExists, // 1 if Onsite questions exist, 0 otherwise
            'OnCompletedQuestions' => $onCompletedExists, // 1 if OnCompleted questions exist, 0 otherwise
            'address' => $order->landmark . ' , ' . $order->street_address . ' , ' . $order->pincode,
            'order_status' => $order->order_status,
            'emp_onsite_image' => $order->emp_onsite_image,
            'IsQuestionsSubmitted' => $isQuestionsSubmitted ? 1 : 0 // Add this flag in response
        ];
    });

    // Return the order data in the response
    return response()->json([
        'status' => 1, 
        'message' => "Orders Fetched Successfully", 
        'data' => $orderData
    ], 200);
}

    

    public function getOrderDetails(Request $request){

        $orders =  \DB::table('orders')
                ->join('products', 'products.id', '=', 'orders.product_id')
                ->join('subcategories', 'subcategories.id', '=', 'products.subcat_id')
                ->select('orders.*','products.id','products.subcat_id','subcategories.question')
                ->where('orders.id', $request->order_id)
                ->where('orders.assigned_to', $request->user_id)
                ->where('orders.order_status', $request->order_status)
                ->first();  
                
         if($orders!=null){

            $question =  $orders->question;
            

            if($question=="" || $question==null){
                $object =  [
                    'id' => $orders->id,
                    'order_number' => $orders->order_number,
                    'product_name' => $orders->product_name,
                    'mobile' => $orders->mobile,
                    'desired_date' => $orders->desired_date,
                    'desired_time' => $orders->desired_time,
                    'price' => $orders->order_total,
                    'address' => $orders->landmark.' , '.$orders->street_address.' , '.$orders->pincode,
                    'order_status' => $orders->order_status,
                    'order_ques_count' =>  0,
                    'order_question' =>  null
                ];
    
             
                return response()->json(['status' => 1, 'message' => "Orders Fetched Successfully", 'data' => $object], 200);
            }else{
                

            $questionJsonArr = json_decode($question,true);


            $mainQuestionArr = array();

            foreach ($questionJsonArr as $obj){
                    
                    $title = $obj['title'];
                    $questionStr = $obj['question'];
    
                    $questionArr = explode(',', $questionStr);


                    $responseQueArr = array();
                    foreach($questionArr as $key => $value) {
                        $question = Question::where('id', $value)->first();
                        array_push($responseQueArr,$question);
                    }

                    $newQuestionObj = array();
                    if(sizeof($responseQueArr) > 0){

                        $newQuestionObj['state'] = $title;
                        $newQuestionObj['question'] = $responseQueArr;

                        array_push($mainQuestionArr,$newQuestionObj);

                    }else{
                         $orders->question = null;
                    }
            }

            if(sizeof($mainQuestionArr) > 0){
                $orders->question = $mainQuestionArr;
            }else{
                 $orders->question = null;
            }
           
      


            $object =  [
                'id' => $orders->id,
                'order_number' => $orders->order_number,
                'product_name' => $orders->product_name,
                'mobile' => $orders->mobile,
                'desired_date' => $orders->desired_date,
                'desired_time' => $orders->desired_time,
                'price' => $orders->order_total,
                'address' => $orders->landmark.' , '.$orders->street_address.' , '.$orders->pincode,
                'order_status' => $orders->order_status,
                'order_ques_count' =>  sizeof($responseQueArr),
                'order_question' =>  $orders->question
            ];

         
            return response()->json(['status' => 1, 'message' => "Orders Fetched Successfully", 'data' => $object], 200);
        }


        } else{
            return response()->json(['status' => 0, 'message' => "Not Found"], 200);

        }      
    }






    public function changeStatus(Request $request)
    {
        // Validate the request data
        $validator = \Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'order_id' => 'required',
            'order_status' => 'required',
            'otp' => 'required|integer',
            'emp_onsite_image' => 'nullable', // Ensuring the image is valid
            'chemical' => 'required', // Ensuring the image is valid
            'signature' => 'nullable', // Ensuring the image is valid
        ]);
    
        if ($validator->fails()) {
            return response()->json(["status" => 0, "message" => $validator->errors()->first()], 400);
        }
    
        // Check if the provided OTP is valid
        $serviceCompletion = \DB::table('orders')
            ->where('assigned_to', $request->user_id)
            ->where('id', $request->order_id)
            ->where('otp', $request->otp)
            ->first();
    
        if (!$serviceCompletion) {
            return response()->json(["status" => 0, "message" => "Invalid OTP"], 400);
        }
    
        // Fetch the order
        $order = Order::where('assigned_to', $request->user_id)
            ->where('id', $request->order_id)
            ->first();
    
        if (!$order) {
            return response()->json(["status" => 0, "message" => "No Orders Found"], 400);
        }
    
        // Check if the order status is already the same as the requested status
        if ($order->order_status == $request->order_status) {
            return response()->json(["status" => 1, "message" => "Order status is already updated to the requested status"], 200);
        }
    
        // Handle the image upload and convert it to binary// Handle the image upload
        if ($request->hasFile('emp_onsite_image')) {
            // Get the image from the request
            $image = $request->file('emp_onsite_image');
            
            // Generate a unique name for the image based on timestamp
            $imageName = "EmpOnsiteImage".'_'.time() .".". $image->getClientOriginalExtension();
            
            // Define the path where the image should be stored
            $destinationPath = 'storage/app/public/images/employee/profiles';
            
            // Move the image to the destination path
            $image->move($destinationPath, $imageName);
            
        }else{
            $imageName = "NA";
        }

        if ($request->hasFile('signature')) {
            // Get the image from the request
            $signature = $request->file('signature');
            
            // Generate a unique name for the image based on timestamp
            $signatureName = "signature".'_'.time() .".". $image->getClientOriginalExtension();
            
            // Define the path where the image should be stored
            $destinationPath = 'storage/app/public/images/employee/profiles';
            
            // Move the image to the destination path
            $signature->move($destinationPath, $signatureName);
            
        }else{
            $signatureName = "NA";
        }
    
        // Update the order status and save the image in blob format
        $order->order_status = $request->order_status;
        $order->emp_onsite_image = $imageName;
        if($request->order_status == 3){
            $order->started_at = now();
        }elseif($request->order_status == 4){
            $order->completed_at = now();
            $order->signature = $signatureName;
            $order->chemicalsUsed = $request->chemical;
        }
        $order->is_otp_verified = 1; 
        $order->save();
    
        return response()->json([
            'status' => 1,
            'message' => "Order Status Changed Successfully"
        ], 200);
    }
    

    public function question_answer(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'order_id' => 'required',
            'order_status' => 'required',
            'user_id' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json(["status" => 0, "message" => $validator->errors()->first()], 400);
        }
    
        $order = Order::find($request->order_id);
        if ($order) {
            $order->order_status = $request->order_status;
            $order->save();
        } else {
            return response()->json(["status" => 0, "message" => "Order not found."], 404);
        }
    
        
        $questionAnswer = Question_answer::create([
            'order_id' => $request->order_id,
            'stage' => $request->order_status,
            'answers' => $request->answers,
            'emp_id' => $request->user_id,
        ]);
    
        if ($questionAnswer) {
            return response()->json(["status" => 1, "message" => "Question answer saved successfully!"], 200);
        } else {
            return response()->json(["status" => 0, "message" => "Failed to save question answer."], 500);
        }
    }

    
    public function GetAllChemicals(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'user_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(["status" => 0, "message" => $validator->errors()->first()], 400);
        }

        $chemicals = AssignedInventory::where('empId', $request->user_id)
                    ->where('is_verified', 1)
                    ->get(); 

        if ($chemicals->isEmpty()) {
            return response()->json(["status" => 0, "message" => trans('No Chemicals Found')], 200);
        }

        $chemicalsData = $chemicals->map(function($chemical) {
            return [
                'id' => $chemical->id,
                'category' => $chemical->category,
                'subCategory' => $chemical->subCategory,
                'quantity' => $chemical->quantity,
                'type' => $chemical->type,
                'price' => $chemical->price,
                'updated_at' => $chemical->updated_at,
                'created_at' => $chemical->created_at,
            ];
        });

        return response()->json(['status' => 1, 'message' => "Chemicals Fetched Successfully", 'data' => $chemicalsData], 200);
    }

    public function GetUnverifiedChemicals(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'user_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(["status" => 0, "message" => $validator->errors()->first()], 400);
        }

        $chemicals = AssignedInventory::where('empId', $request->user_id)
                    ->where('is_verified', 2)
                    ->get(); 

        if ($chemicals->isEmpty()) {
            return response()->json(["status" => 0, "message" => trans('No Chemicals Found')], 200);
        }

        $chemicalsData = $chemicals->map(function($chemical) {
            return [
                'id' => $chemical->id,
                'category' => $chemical->category,
                'subCategory' => $chemical->subCategory,
                'quantity' => $chemical->quantity,
                'type' => $chemical->type,
                'price' => $chemical->price,
                'updated_at' => $chemical->updated_at,
                'created_at' => $chemical->created_at,
            ];
        });

        return response()->json(['status' => 1, 'message' => "Chemicals Fetched Successfully", 'data' => $chemicalsData], 200);
    }

    public function ApproveChemicals(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'user_id' => 'required',
            'chemical_id' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json(["status" => 0, "message" => $validator->errors()->first()], 400);
        }
    
        $chemicalIds = explode(',', $request->chemical_id);
    
        $chemicals = AssignedInventory::where('empId', $request->user_id)
                        ->whereIn('id', $chemicalIds)
                        ->where('is_verified', 2)
                        ->get();
    
        if ($chemicals->isEmpty()) {
            return response()->json(["status" => 0, "message" => trans('No Chemicals Found or Already Verified')], 200);
        }
    
        AssignedInventory::whereIn('id', $chemicalIds)
            ->where('empId', $request->user_id)
            ->where('is_verified', 2)
            ->update(['is_verified' => 1]);

    
        return response()->json(['status' => 1, 'message' => "Chemicals Approved Successfully"], 200);
    }

    public function SendOtpAtStart(Request $request)
    {
        // Validate the request data
        $validator = \Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'order_id' => 'required|integer',
        ]);
    
        if ($validator->fails()) {
            return response()->json(["status" => 0, "message" => $validator->errors()->first()], 400);
        }
    
        $order = \DB::table('orders')
            ->where('assigned_to', $request->user_id)
            ->where('id', $request->order_id)
            ->first();
    
        if (!$order) {
            return response()->json(['status' => 0, 'message' => "The combination of Employee ID and Order ID does not exist"], 400);
        }
    
        // Generate OTP
        $otp = mt_rand(100000, 999999);
    
        // Send OTP via API
        $mobileNumber = '91' . $order->mobile;
        $curl = curl_init();
    
        curl_setopt_array($curl, [
            CURLOPT_URL => "https://control.msg91.com/api/v5/otp?template_id=66b09df3d6fc0561e241f922&mobile={$mobileNumber}&authkey=403754ASWGpJz366b09ec2P1&realTimeResponse=",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => json_encode(['name' => $order->full_name, 'otp' => $otp]),
            CURLOPT_HTTPHEADER => [
                "Content-Type: application/JSON"
            ],
        ]);
    
        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);
    
        if ($err) {
            return response()->json(['status' => 0, 'message' => "Failed to send OTP: $err"], 400);
        } else {
            // Check if a record with the same empId and orderId already exists in orders table
            $existingRecord = \DB::table('orders')
                ->where('assigned_to', $request->user_id)
                ->where('id', $request->order_id)
                ->first();
    
            if ($existingRecord) {
                // Update the OTP in the service_completion table
                $updated = \DB::table('orders')
                    ->where('id', $existingRecord->id)
                    ->update([
                        'otp' => $otp,
                        'is_otp_verified' => 2
                    ]);
    
                if ($updated) {
                    return response()->json(['status' => 1, 'message' => "OTP Updated and Sent!"], 200);
                } else {
                    return response()->json(['status' => 0, 'message' => "Failed to update OTP"], 400);
                }
            } else {
                return response()->json(['status' => 0, 'message' => "No matching record found in service_completion to update OTP"], 400);
            }
        }
    }



    public function getEmployeeAttendance(Request $request)
    {
        $request->validate([
            'emp_id' => 'required|integer|exists:employees,id',
        ]);
    
        $attendanceRecords = EmpVerifiedAttendance::where('emp_id', $request->emp_id)
            ->select('date')
            ->get();
    
        if ($attendanceRecords->isEmpty()) {
            return response()->json(['status' => 0, 'message' => 'No attendance records found for this employee'], 200);
        }
    
        $today = Carbon::today();
        $startOfMonth = Carbon::now()->startOfMonth();
        $startOfYear = Carbon::now()->startOfYear();
    
        $totalDistanceToday = EmpVerifiedAttendance::where('emp_id', $request->emp_id)
            ->whereDate('date', $today)
            ->sum('totaldistance');
    
        $totalDistanceThisMonth = EmpVerifiedAttendance::where('emp_id', $request->emp_id)
            ->whereBetween('date', [$startOfMonth, $today])
            ->sum('totaldistance');
    
        $totalDistanceThisYear = EmpVerifiedAttendance::where('emp_id', $request->emp_id)
            ->whereBetween('date', [$startOfYear, $today])
            ->sum('totaldistance');
    
        return response()->json([
            'status' => 1,
            'message' => 'Attendance records retrieved successfully',
            'data' => $attendanceRecords,
            'total_distance_today' => $totalDistanceToday,
            'total_distance_this_month' => $totalDistanceThisMonth,
            'total_distance_this_year' => $totalDistanceThisYear,
        ], 200);
    }
    


    
    
    
    
    




}
