<?php

namespace App\Http\Controllers\Api;

use App\Models\Products;
use Auth;
use Helper;
use Carbon\Carbon;
use Stripe\Charge;
use Stripe\Stripe;
use App\Models\Cart;
use App\Models\User;
use Stripe\Customer;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Ratting;
use App\Models\Location;
use App\Models\Settings;
use App\Models\Timeslot;
use App\Models\Employees;
use App\Models\Transaction;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;

class OrderController extends Controller
{
    public function paymentSuccess(Request $request)
    {
        // $userId = $request->category;
        // $slug = $request->slug;
        Redirect::to('https://techmonkshub.com/e-commerce/success');

        //return view("Front.success",compact('userId'));
    }

    public function initiatePayment(Request $request)
    {
      $user_id = "jjdjdd";

      if($user_id == ""){
          return response()->json(["status"=>0,"message"=>"Please login to save address"],400);
      }

       //$url =  "https://techmonkshub.com/e-commerce/paymentSuccess/".$user_id."/"."tranRef=TST2015600000752&cartId=Sample+Payment&respStatus=A&respCode=831000&respMessage=Authorised&acquirerRRN=015607167400&aquirerMessage=ACCEPT&token=2C4650BF67A3EA30C6B791FE628278B8&customerEmail=jsmith%40gmail.com";
       $url =  "https://techmonkshub.com/e-commerce/paymentSuccess/";
       $responseArr = array();
       $responseArr['redirect_url'] = $url;
       echo json_encode($responseArr);

       // $discount_amount =  (float) $request->grand_total;
       // $cartid = substr(str_shuffle(str_repeat("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10)), 0, 10);
       // $paymentData = [
       //     "tran_type" => "sale",
       //     "tran_class" => "ecom",
       //     "cart_id" => $cartid,
       //     "cart_currency" => "SAR",
       //     "cart_amount" => 1,
       //     "cart_description" => "Description of the items/services",
       //     "callback" => "https://techmonkshub.com/e-commerce/checkout",
       //     "return" => "https://techmonkshub.com/ecomm/e/app_dashboard/JSON/paymentResponse/".$user_id,
       //     //"return" => "https://techmonkshub.com/ecomm/e/app_dashboard/JSON/paymentFailed.php",
       //     //"callback" => "https://techmonkshub.com/ecomm/e/app_dashboard/JSON/paymentResponse/".$user_id,
       //     //"https://techmonkshub.com/ecomm/e/app_dashboard/JSON/paymentResponse/".$user_id."tranRef=TST2015600000752&cartId=Sample+Payment&respStatus=A&respCode=831000&respMessage=Authorised&acquirerRRN=015607167400&aquirerMessage=ACCEPT&token=2C4650BF67A3EA30C6B791FE628278B8&customerEmail=jsmith%40gmail.com",
       //    // "customer_details" => $customerPayload,
       // ];
       // //$paymentData["profile_id"]=86038;
       // $paymentData["profile_id"]=87366;
       //
       // $curl = curl_init();
       // curl_setopt_array($curl, [
       //     CURLOPT_URL => "https://secure.paytabs.sa/payment/request",
       //     CURLOPT_RETURNTRANSFER => true,
       //     CURLOPT_ENCODING => "",
       //     CURLOPT_MAXREDIRS => 10,
       //     CURLOPT_TIMEOUT => 0,
       //     CURLOPT_CUSTOMREQUEST => "POST",
       //     CURLOPT_POSTFIELDS => json_encode($paymentData),
       //     CURLOPT_HTTPHEADER => [
       //        //  "authorization:SJJNBLM26M-J2W6LLWRZT-MRTZKL9TGG",
       //         "authorization:S9JNBLM2W2-JD2ZM2HZGN-KBMZ9BT6WM",
       //         "Content-Type:application/json",
       //     ],
       // ]);
       //
       // $response = json_decode(curl_exec($curl), true);
       // curl_close($curl);
       // echo json_encode($response);
       // $redirectUrl = $response['redirect_url'];
       //
       // if(!$redirectUrl){
       //   print_r($response);
       // }else{
       //   echo $redirectUrl;
       // }

    }


    public function initiatePaymentApp(Request $request)
    {

       $user_id = $request->user_id;
       if($user_id == ""){
            return response()->json(["status"=>0,"message"=>"Please login to save address"],400);
       }

       $discount_amount =  (float) $request->grand_total;
       $cartid = substr(str_shuffle(str_repeat("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10)), 0, 10);
       $paymentData = [
           "tran_type" => "sale",
           "tran_class" => "ecom",
           "cart_id" => $cartid,
           "cart_currency" => "SAR",
           "cart_amount" => 1,
           "cart_description" => "Description of the items/services",
           "callback" => "https://techmonkshub.com/e-commerce/checkout",
           "return" => "https://techmonkshub.com/e-commerce/paymentSuccess/".$user_id,
           //"return" => "https://techmonkshub.com/ecomm/e/app_dashboard/JSON/paymentFailed.php",
           //"callback" => "https://techmonkshub.com/ecomm/e/app_dashboard/JSON/paymentResponse/".$user_id,
           //"https://techmonkshub.com/ecomm/e/app_dashboard/JSON/paymentResponse/".$user_id."tranRef=TST2015600000752&cartId=Sample+Payment&respStatus=A&respCode=831000&respMessage=Authorised&acquirerRRN=015607167400&aquirerMessage=ACCEPT&token=2C4650BF67A3EA30C6B791FE628278B8&customerEmail=jsmith%40gmail.com",
          // "customer_details" => $customerPayload,
       ];
       //$paymentData["profile_id"]=86038;
       $paymentData["profile_id"]=87366;

       $curl = curl_init();
       curl_setopt_array($curl, [
           CURLOPT_URL => "https://secure.paytabs.sa/payment/request",
           CURLOPT_RETURNTRANSFER => true,
           CURLOPT_ENCODING => "",
           CURLOPT_MAXREDIRS => 10,
           CURLOPT_TIMEOUT => 0,
           CURLOPT_CUSTOMREQUEST => "POST",
           CURLOPT_POSTFIELDS => json_encode($paymentData),
           CURLOPT_HTTPHEADER => [
              //  "authorization:SJJNBLM26M-J2W6LLWRZT-MRTZKL9TGG",
               "authorization:S9JNBLM2W2-JD2ZM2HZGN-KBMZ9BT6WM",
               "Content-Type:application/json",
           ],
       ]);

       $response = json_decode(curl_exec($curl), true);
       curl_close($curl);
       echo json_encode($response);

    }


public function order(Request $request)
{
    if ($request->user_id == "") {
        return response()->json(["status" => 0, "message" => "Please login to save address"], 400);
    }

    $order_number = substr(str_shuffle(str_repeat("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10)), 0, 10);

    $data = Cart::where('user_id', $request->user_id)->orderBy('id', 'DESC')->get();

    if (count($data) == 0) {
        return response()->json(['status' => 0, 'message' => 'Your cart is empty'], 200);
    }

    $getuserdata = User::select('token', 'email', 'name', 'wallet')
        ->where('id', $request->user_id)
        ->first();

    $gettimezone = Settings::select('timezone')->first();

    date_default_timezone_set($gettimezone->timezone);

    try {
        if ($request->payment_type == 3 || $request->payment_type == 4 || $request->payment_type == 5) {
            $payment_id = $request->payment_id;
        }

        if ($request->payment_type == 4) {
            $getstripe = Payment::select('environment', 'test_secret_key', 'live_secret_key')->where('payment_name', 'Stripe')->first();

            $skey = $getstripe->environment == "1" ? $getstripe->test_secret_key : $getstripe->live_secret_key;

            Stripe::setApiKey($skey);

            $customer = Customer::create(array(
                'email' => $getuserdata->email,
                'source' => $request->stripeToken,
                'name' => $getuserdata->name,
            ));

            $charge = Charge::create(array(
                'customer' => $customer->id,
                'amount' => $request->grand_total * 100,
                'currency' => 'usd',
                'description' => 'eCommerce',
            ));

            $payment_id = $charge['id'];
        }

        $discount_amount = explode(',', $request->discount_amount);

        foreach ($data as $key => $value) {
            $OrderPro = new Order;
            $OrderPro->user_id = $request->user_id;
            $OrderPro->vendor_id = $value['vendor_id'];
            $OrderPro->product_id = $value['product_id'];
            $OrderPro->order_number = $order_number;
            $OrderPro->payment_id = @$payment_id;
            $OrderPro->product_name = $value['product_name'];
            $OrderPro->image = $value['image'];
            $OrderPro->qty = $value['qty'];
            $OrderPro->price = $value['price'];
            $OrderPro->attribute = $value['attribute'];
            $OrderPro->variation = $value['variation'];
            $OrderPro->tax = $value['tax'] * $value['qty'];
            $OrderPro->coupon_name = $request->coupon_name;
            $OrderPro->shipping_cost = $value['shipping_cost'];
            $OrderPro->order_total = $request->grand_total;
            $OrderPro->order_notes = $request->order_notes;
            $OrderPro->payment_type = $request->payment_type;
            $OrderPro->full_name = $request->full_name;
            $OrderPro->email = $request->email;
            $OrderPro->mobile = $request->mobile;
            $OrderPro->landmark = $request->landmark;
            $OrderPro->street_address = $request->street_address;
            $OrderPro->pincode = $request->pincode;
            $OrderPro->desired_date = $request->desired_date;
            $OrderPro->desired_time = $request->desired_time;
            $OrderPro->discount_amount = @$discount_amount[$key];
            $OrderPro->save();

        }

        $order_id = \DB::getPdo()->lastInsertId();

        if ($request->payment_type == 2) {
        
            $order_info = Order::select(\DB::raw('(case when discount_amount is null then SUM(order_total) else SUM(order_total)-discount_amount end) as grand_total'))
                ->where('order_number', $order_number)
                ->groupBy('order_number')
                ->first();

            $wallet = $getuserdata->wallet - $order_info->grand_total;

            User::where('id', $request->user_id)->update(['wallet' => $wallet]);

            $Wallet = new Transaction;
            $Wallet->user_id = $request->user_id;
            $Wallet->order_id = $order_id;
            $Wallet->order_number = $order_number;
            $Wallet->wallet = $order_info->grand_total;
            $Wallet->payment_id = NULL;
            $Wallet->transaction_type = '2';
            $Wallet->save();
        }

        Cart::where('user_id', $request->user_id)->delete();
        

        $notification = array('user_id' => $request->user_id, 'order_id' => $order_id, 'order_number' => $order_number, 'order_status' => "1", 'message' => "Order " . $order_number . " has been placed", 'is_read' => "0", 'type' => "order");

        Notification::create($notification);
        

        return response()->json(['status' => 1, 'message' => 'Order has been placed','order_number'=>$order_number], 200);
    } catch (\Exception $e) {
        return response()->json(['status' => 0, 'message' => 'Something went wrong while placing order', 'error' => $e->getMessage()], 400);
    }
}

private function parsePolygon($polygon)
{
    $polygon = str_replace(['POLYGON((', '))'], '', $polygon);
    $coordinatePairs = explode(', ', $polygon);
    $coordinates = [];

    foreach ($coordinatePairs as $pair) {
        list($lng, $lat) = explode(' ', $pair);
        $coordinates[] = ['lat' => (float) $lat, 'lng' => (float) $lng];
    }

    return $coordinates;
}

private function calculateCentroid(array $coordinates)
{
    $lat = 0;
    $lng = 0;
    $totalPoints = count($coordinates);

    foreach ($coordinates as $coordinate) {
        $lat += $coordinate['lat'];
        $lng += $coordinate['lng'];
    }

    return ['lat' => $lat / $totalPoints, 'lng' => $lng / $totalPoints];
}

private function calculateDistance($lat1, $lon1, $lat2, $lon2)
{
    $earthRadius = 6371;
    $dLat = deg2rad($lat2 - $lat1);
    $dLon = deg2rad($lon2 - $lon1);
    $a = sin($dLat / 2) * sin($dLat / 2) +
        cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
        sin($dLon / 2) * sin($dLon / 2);
    $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
    $distance = $earthRadius * $c;

    return $distance;
}





    public function orderhistory(Request $request)
    {
        if($request->user_id == ""){
            return response()->json(["status"=>0,"message"=>"Please login to save address"],400);
        }

        try {
            $orderdata=Order::select('id','order_number','desired_time','desired_date','payment_type','order_total','status',\DB::raw('DATE_FORMAT(created_at, "%d-%m-%Y") as date'),\DB::raw('(case when discount_amount is null then SUM(price*qty)+SUM(tax)+SUM(shipping_cost) else SUM(price*qty)+SUM(tax)+SUM(shipping_cost)-SUM(discount_amount) end) as grand_total'))
            ->where('user_id',$request->user_id)
            ->groupBy('order_number')
            ->orderBy('id', 'DESC')
            ->paginate(10);

            if(!empty($orderdata))
            {
                return response()->json(['status'=>1,'message'=>'Order history list Successful','data'=>$orderdata],200);
            }
            else
            {
                return response()->json(['status'=>0,'message'=>trans('messages.no_data')],200);
            }
        } catch (Exception $e) {
            return response()->json(['status'=>0,'message'=>'Error'.$e],200);
        }
    }

    public function orderdetails(Request $request)
    {
        if($request->order_number == ""){
            return response()->json(["status"=>0,"message"=>"Order number is required"],400);
        }

        try {

            $orderdata=Order::select('orders.id','orders.product_id','orders.product_name','orders.qty','orders.discount_amount','orders.price','products.return_days','orders.status','orders.attribute','orders.variation','orders.tax','orders.shipping_cost',\DB::raw("CONCAT('".url('/storage/app/public/images/products/')."/', orders.image) AS image_url"))
            ->join('products','orders.product_id','=','products.id')
            ->where('orders.order_number',$request->order_number)
            ->orderBy('orders.id', 'DESC')
            ->get();

            foreach ($orderdata as $value) {
                $order_data[] = array(
                    'id' => $value['id'],
                    'product_id' => $value['product_id'],
                    'product_name' => $value['product_name'],
                    'qty' => $value['qty'],
                    'price' => $value['price'],
                    'status' => $value['status'],
                    'attribute' => $value['attribute'],
                    'variation' => $value['variation'],
                    'tax' => $value['tax'],
                    'shipping_cost' => number_format($value['shipping_cost'],2),
                    'image_url' => $value['image_url'],
                    'discount_amount' => $value['discount_amount'],
                    'return_days' => $value['return_days'],
                );
            }
            $order_info=Order::select('order_number','order_notes','payment_type','full_name','email','mobile','landmark','street_address','pincode','coupon_name','order_total',\DB::raw('SUM(discount_amount) AS discount_amount'),'status',\DB::raw('DATE_FORMAT(created_at, "%d-%m-%Y") as date'),\DB::raw('SUM(price*qty) AS subtotal'),\DB::raw('SUM(tax) AS tax'),\DB::raw('SUM(shipping_cost) AS shipping_cost'))
            ->where('order_number',$request->order_number)
            ->groupBy('order_number')
            ->first();

            if ($order_info->discount_amount == "") {
                $grand_total = $order_info->subtotal+$order_info->tax+$order_info->shipping_cost;
            } else {
                $grand_total = $order_info->subtotal+$order_info->tax+$order_info->shipping_cost-$order_info->discount_amount;
            }

            $order_infos = array(
                'order_number' => $order_info->order_number,
                'order_notes' => $order_info->order_notes,
                'payment_type' => $order_info->payment_type,
                'full_name' => $order_info->full_name,
                'email' => $order_info->email,
                'mobile' => $order_info->mobile,
                'landmark' => $order_info->landmark,
                'street_address' => $order_info->street_address,
                'pincode' => $order_info->pincode,
                'coupon_name' => $order_info->coupon_name,
                'discount_amount' => $order_info->discount_amount,
                'status' => $order_info->status,
                'date' => $order_info->date,
                'subtotal' => $order_info->subtotal,
                'tax' => $order_info->tax,
                'shipping_cost' => number_format($order_info->shipping_cost,2),
                'grand_total' => $grand_total
            );

            if(!empty($order_info))
            {
                return response()->json(['status'=>1,'message'=>'Order history list Successful','order_info'=>$order_infos,'order_data'=>$order_data],200);
            }
            else
            {
                return response()->json(['status'=>0,'message'=>trans('messages.no_data')],200);
            }
        } catch (Exception $e) {
            return response()->json(['status'=>0,'message'=>'Error'.$e],200);
        }
    }

    public function cancelorder(Request $request)
    {
        if($request->user_id == ""){
            return response()->json(["status"=>0,"message"=>"User id is required"],400);
        }

        if($request->order_id == ""){
            return response()->json(["status"=>0,"message"=>"Order id is required"],400);
        }

        if($request->status == ""){
            return response()->json(["status"=>0,"message"=>"Order status is required"],400);
        }

        $status=Order::select('orders.id','orders.vendor_id','orders.order_total','orders.product_name','orders.payment_id','orders.user_id','orders.payment_type','orders.user_id','orders.order_number')
        ->join('users','orders.user_id','=','users.id')
        ->where('orders.id',$request->order_id)
        ->first();

        if ($status->payment_type != "1") {
            $walletdata=User::select('wallet')->where('id',$status->user_id)->first();

            if ($walletdata->wallet > 0) {
                $walletamount = $walletdata->wallet;
            } else {
                $walletamount = 0;
            }
            $wallet = $walletamount + $status->order_total;

            $UpdateWalletDetails = User::where('id', $status->user_id)
            ->update(['wallet' => $wallet]);

            $Wallet = new Transaction;
            $Wallet->user_id = $status->user_id;
            $Wallet->order_id = $request->order_id;
            $Wallet->order_number = $status->order_number;
            $Wallet->wallet = $status->order_total;
            $Wallet->payment_id = $status->payment_id;
            $Wallet->transaction_type = '1';
            $Wallet->save();


            $getvendordata=User::select('wallet')
            ->where('id',$status->vendor_id)
            ->first();

            if ($getvendordata->wallet >= 0) {
                $vendorwallet = $getvendordata->wallet - $status->order_total;
            } elseif ($getvendordata->wallet <= 0) {
                $vendorwallet = $getvendordata->wallet - $status->order_total;
            } else {
                $vendorwallet = 0;
            }

            $vendorwallet = User::where('id', $status->vendor_id)
            ->update(['wallet' => $vendorwallet]);
        }

        $gettimezone=Settings::select('timezone')->first();

        date_default_timezone_set($gettimezone->timezone);

        $data=array('status'=>$request->status,'cancelled_at'=>date('Y-m-d h:i:s'));
        $order=Order::where('user_id',$request->user_id)->where('id',$request->order_id)->update($data);

        if(!empty($order))
        {
            $notification=array('user_id'=>$request->user_id,'order_id'=>$request->order_id,'order_number'=>$status->order_number,'order_status'=>"6",'message'=>"".$status->product_name." has been cancelled by you",'is_read'=>"1",'type'=>"order");
            $store=Notification::create($notification);

            return response()->json(['status'=>1,'message'=>'Success'],200);
        }
        else
        {
            return response()->json(['status'=>0,'message'=>trans('messages.fail')],200);
        }
    }

    public function trackorder(Request $request)
    {
        if($request->order_id == ""){
            return response()->json(["status"=>0,"message"=>"Order number is required"],400);
        }

        if($request->user_id == ""){
            return response()->json(["status"=>0,"message"=>"Please login"],400);
        }

        try {
            $order_info=Order::select('id','product_id','order_number','return_number','vendor_comment','vendor_id','product_name','price','qty','status','order_status','created_at','confirmed_at','shipped_at','delivered_at',\DB::raw('(case when variation is null then "" else variation end) as variation'),\DB::raw("CONCAT('".url('/storage/app/public/images/products/')."/', image) AS image_url"))
            ->where('id',$request->order_id)
            ->where('user_id',$request->user_id)
            ->first();

            $checkratting = Ratting::select('ratting')
            ->where('product_id',$order_info->product_id)
            ->where('vendor_id',$order_info->vendor_id)
            ->where('user_id',$request->user_id)
            ->count();

            if ($checkratting > 0) {
                $ratting = 1;
            } else {
                $ratting = 0;
            }

            if(!empty($order_info))
            {

                $order_info->status = $order_info->order_status;
                return response()->json(['status'=>1,'message'=>'Success','order_info'=>$order_info,'ratting'=>$ratting],200);
            }
            else
            {
                return response()->json(['status'=>0,'message'=>trans('messages.no_data')],200);
            }
        } catch (Exception $e) {
            return response()->json(['status'=>0,'message'=>'Error'.$e],200);
        }
    }

    public function wallet(Request $request)
    {
        if($request->user_id == ""){
            return response()->json(["status"=>0,"message"=>"Please login to save address"],400);
        }

        $walletamount=User::select('wallet')->where('id',$request->user_id)->first();

        $transaction_data=Transaction::select('order_number','transaction_type','wallet',\DB::raw('DATE_FORMAT(created_at, "%d-%m-%Y") as date'),'username','type')->where('user_id',$request->user_id)->orderBy('id', 'DESC')->paginate(10);

        if(!empty($transaction_data))
        {
            return response()->json(['status'=>1,'message'=>'Transaction list Successful','walletamount'=>$walletamount->wallet,'data'=>$transaction_data],200);
        }
        else
        {
            return response()->json(['status'=>0,'message'=>trans('messages.no_data')],200);
        }
    }

    public function recharge(Request $request)
    {

        $getuserdata=User::select('token','email','name','wallet')
        ->where('id',$request->user_id)
        ->first();

        $gettimezone=Settings::select('timezone')->first();

        date_default_timezone_set($gettimezone->timezone);

        try {
            //RazorPay : 3, Stripe : 4, Flutterwave : 5 , Paystack : 6

            if ($request->payment_type == 3 OR $request->payment_type == 5 OR $request->payment_type == 6) {
                $payment_id = $request->payment_id;
            }

            if ($request->payment_type == 4) {
                $getstripe=Payment::select('environment','test_secret_key','live_secret_key')->where('payment_name','Stripe')->first();

                if ($getstripe->environment == "1") {
                    $skey = $getstripe->test_secret_key;
                } else {
                    $skey = $getstripe->live_secret_key;
                }

                Stripe::setApiKey($skey);

                $customer = Customer::create(array(
                    'email' => $getuserdata->email,
                    'source' => $request->stripeToken,
                    'name' => $getuserdata->name,
                ));

                $charge = Charge::create(array(
                    'customer' => $customer->id,
                    'amount' => $request->recharge_amount*100,
                    'currency' => 'usd',
                    'description' => 'eCommerce',
                ));

                $payment_id = $charge['id'];
            }

            $wallet = new Transaction;
            $wallet->user_id = $request->user_id;
            $wallet->order_id = null;
            $wallet->order_number = null;
            $wallet->wallet = $request->recharge_amount;
            $wallet->payment_id = $payment_id;
            $wallet->transaction_type = '4';
            $wallet->username = $getuserdata->name;
            $wallet->type = $request->payment_type;
            $wallet->save();

            $updatewallet = $getuserdata->wallet + $request->recharge_amount;

            $UpdateWalletDetails = User::where('id', $request->user_id)
            ->update(['wallet' => $updatewallet]);

            return response()->json(['status'=>1,'message'=>'Recharge success'],200);

        } catch (Exception $e) {
            return response()->json(['status'=>0,'message'=>'Error'.$e],200);
        }
    }
    public function AutoAssign() {
        // Get the current date and time
        $currentDateTime = Carbon::now();
        $twoHoursLater = $currentDateTime->copy()->addHours(2);
        
        $currentDate = $currentDateTime->toDateString();
        $currentTime = $currentDateTime->toTimeString();
        $twoHoursLaterTime = $twoHoursLater->toTimeString();
        
        // Fetch unassigned orders based on the desired criteria
        $UnassignedOrders = Order::where('order_status', 1)
            ->whereDate('desired_date', $currentDate)
            ->whereTime('desired_time', '>=', $currentTime)
            ->whereTime('desired_time', '<=', $twoHoursLaterTime)
            ->get();

            echo $UnassignedOrders;
    
        if ($UnassignedOrders->isEmpty()) {
            return response()->json(['status' => 0, 'message' => 'No Orders Found'], 200);
        }
    
        // Retrieve all active locations (status = 1) and sort by distance
        $locations = Location::where('status', 1)->get();
    
        foreach ($UnassignedOrders as $OrderPro) {
            $latitude = $OrderPro->latitude;
            $longitude = $OrderPro->longitude;
    
            // Sort locations by distance from the order's location
            $sortedLocations = $locations->map(function($location) use ($latitude, $longitude) {
                $raw_coordinates = $this->parsePolygon($location->coordinates);
                $centroid = $this->calculateCentroid($raw_coordinates);
                $location->distance = $this->calculateDistance($latitude, $longitude, $centroid['lat'], $centroid['lng']);
                return $location;
            })->sortBy('distance');

            echo $sortedLocations;
    
            $assigned = false; // Flag to track if the order is assigned
            
            // Iterate over sorted locations
            foreach ($sortedLocations as $location) {
                $nearestEmployees = Employees::where('location', $location->id)->get();
    
                foreach ($nearestEmployees as $employee) {
                    $timeslot = Timeslot::find($employee->timeslot);
                    $start_time = Carbon::parse($timeslot->starttime);
                    $end_time = Carbon::parse($timeslot->endtime);
                    $desired_time = Carbon::parse($OrderPro->desired_time);
    
                    // Check if the desired time falls within the employee's timeslot
                    if ($desired_time->between($start_time, $end_time)) {
                        echo "Inside time checking";
                        // Check if the employee is already assigned to another job within 1 hour of the new job
                        $oneHourBefore = $desired_time->copy()->subHour();
                        $oneHourAfter = $desired_time->copy()->addHour();
    
                        $conflictingOrders = Order::where('assigned_to', $employee->id)
                            ->where('desired_date', $OrderPro->desired_date)
                            ->whereTime('desired_time', '>=', $oneHourBefore)
                            ->whereTime('desired_time', '<=', $oneHourAfter)
                            ->exists();

                            echo $conflictingOrders;
    
                        if ($conflictingOrders) {
                            continue; // Skip this employee as they have a conflicting order
                        }
    
                        // Check if the employee's categories match the order's product category
                        $employeeCategories = explode(',', $employee->emp_category); // Assuming employee categories are comma-separated

                        echo $employee->emp_category."..cat..";

                        $productCategory = Products::find($OrderPro->product_id)->cat_id;

                        echo $productCategory;
    
                        if (!in_array($productCategory, $employeeCategories)) {
                            continue; // Skip this employee if the categories do not match
                        }
    
                        // Assign the order to the employee
                        $OrderPro->order_status = 2;
                        $OrderPro->assigned_to = $employee->id;
                        $OrderPro->save();
                        $assigned = true;
                        break 2; // Break out of both loops
                    }
                }
            }
    
            if (!$assigned) {
                continue;
            }
        }
    
        if ($UnassignedOrders->where('order_status', 2)->isEmpty()) {
            return response()->json(['status' => 0, 'message' => 'No Orders Assigned to any Employee'], 400);
        }
    
        return response()->json(['status' => 1, 'message' => 'Orders Fetched and Assigned', 'orders' => $UnassignedOrders], 200);
    }
    
    
    
    
    
}
