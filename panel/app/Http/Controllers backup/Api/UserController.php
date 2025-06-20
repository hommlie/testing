<?php

namespace App\Http\Controllers\Api;

use Auth;
use Validator;
use App\Models\Help;
use App\Models\User;
use App\Models\Settings;
use App\Models\Employees;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function register(Request $request )
    {
        // $checkemail=User::where('email',$request->email)->first();
        $checkmobile=User::where('mobile',$request->mobile)->first();


        $str_result = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
        $referral_code = substr(str_shuffle($str_result), 0, 10);
        $otp = rand ( 1000 , 9999 );

        if ($request->register_type == "mobile") {

            // if($request->email == ""){
            //     return response()->json(["status"=>0,"message"=>trans('messages.email_required')],400);
            // }
            // if($request->name == ""){
            //     return response()->json(["status"=>0,"message"=>trans('messages.name_required')],400);
            // }
            if($request->mobile == ""){
                return response()->json(["status"=>0,"message"=>trans('messages.mobile_required')],400);
            }
            if($request->token == ""){
                return response()->json(["status"=>0,"message"=>trans('messages.firebace_token')],400);
            }

            // if(!empty($checkemail))
            // {
            //     return response()->json(['status'=>0,'message'=>trans('messages.email_exist')],400);
            // }

            $login=User::where('mobile',$request['mobile'])->where('type','=','2')->first();

            if(!empty($login))
            {

                $title='Email Verification Code';
                $email=$request->email;
                $data=['title'=>$title,'email'=>$email,'otp'=>$otp];

                // Mail::send('Email.emailverification',$data,function($message)use($data){
                //     $message->from(env('MAIL_USERNAME'))->subject($data['title']);
                //     $message->to($data['email']);
                // } );

                $otp_data['otp'] = $otp;
                $update=User::where('mobile',$request->mobile)->update($otp_data);

                return response()->json(['status'=>2,'message'=>trans('messages.verify_email'),'otp'=>$otp],422);
            }

            if(!empty($checkmobile))
            {
                return response()->json(['status'=>0,'message'=>trans('messages.mobile_exist')],400);
            }

            if ($request->login_type == "google" OR $request->login_type == "facebook") {
                $password = "";
            } else {
                $password = Hash::make($request->get('password'));
            }

            $getdata=User::select('referral_amount')->where('type','1')->get()->first();
            $firebase_key=Settings::select('firebase_key')->first();

            $checkreferral=User::select('id','name','referral_code','wallet','email','token')->where('referral_code',$request['referral_code'])->first();

            //if (@$checkreferral->referral_code == $request['referral_code']) {

                $title='Email Verification Code';
                $email=$request->email;
                $emaildata=['title'=>$title,'email'=>$email,'otp'=>$otp];

                // Mail::send('Email.emailverification',$emaildata,function($message)use($emaildata){
                //     $message->from(env('MAIL_USERNAME'))->subject($emaildata['title']);
                //     $message->to($emaildata['email']);
                // } );

                $request->name = "User";
                //$userdata=array('name'=>$request->name,'mobile'=>$request->mobile,'otp'=>$otp,'email'=>$request->email,'profile_pic'=>'default.png','password'=>Hash::make($request->password),'token'=>$request->token,'login_type'=>$request->login_type,'google_id'=>$request->google_id,'facebook_id'=>$request->facebook_id,'referral_code'=>$referral_code,'type'=>'2');
                $userdata=array('name'=>$request->name,'mobile'=>$request->mobile,'otp'=>$otp,'profile_pic'=>'default.png','token'=>$request->token,'login_type'=>$request->login_type,'google_id'=>$request->google_id,'facebook_id'=>$request->facebook_id,'referral_code'=>$referral_code,'type'=>'2');

                $roledata=User::create($userdata)->assignRole(\Spatie\Permission\Models\Role::where('name','user')->first());

                $wallet = @$checkreferral->wallet + @$getdata->referral_amount;

                if ($request['referral_code'] != "") {
                   $wallet = $checkreferral->wallet + $getdata->referral_amount;

                   if ($wallet) {
                       $UpdateWalletDetails = User::where('id', $checkreferral->id)
                       ->update(['wallet' => $wallet]);

                       $from_Wallet = new Transaction;
                       $from_Wallet->user_id = $checkreferral->id;
                       $from_Wallet->order_id = null;
                       $from_Wallet->order_number = null;
                       $from_Wallet->wallet = $getdata->referral_amount;
                       $from_Wallet->payment_id = null;
                       $from_Wallet->order_type = '0';
                       $from_Wallet->transaction_type = '3';
                    //    $from_Wallet->username = $user->name;
                       $from_Wallet->save();

                       //Notification
                       try{
                           $email=$checkreferral->email;
                           $toname=$checkreferral->name;
                           $name=$user->name;

                           $referralmessage='Your friend "'.$name.'" has used your referral code to register with Gravity e-Com. User. You have earned '. Helper::CurrencyFormatter($getdata->referral_amount).' referral amount in your wallet.';
                           $data=['referralmessage'=>$referralmessage,'email'=>$email,'toname'=>$toname,'name'=>$name];

                        //    Mail::send('Email.referral',$data,function($message)use($data){
                        //        $message->from(env('MAIL_USERNAME'))->subject($data['referralmessage']);
                        //        $message->to($data['email']);
                        //    } );

                           $title = "Referral Earning";
                           $body = 'Your friend "'.$name.'" has used your referral code to register with Gravity e-Com. User. You have earned '. Helper::CurrencyFormatter($getdata->referral_amount).' referral amount in your wallet.';
                           $google_api_key = $firebase_key->firebase_key;

                           $registrationIds = $checkreferral->token;
                           #prep the bundle
                           $msg = array
                               (
                               'body'  => $body,
                               'title' => $title,
                               'sound' => 1/*Default sound*/
                               );
                           $fields = array
                               (
                               'to'            => $registrationIds,
                               'notification'  => $msg
                               );
                           $headers = array
                               (
                               'Authorization: key=' . $google_api_key,
                               'Content-Type: application/json'
                               );
                           #Send Reponse To FireBase Server
                           $ch = curl_init();
                           curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
                           curl_setopt( $ch,CURLOPT_POST, true );
                           curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
                           curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
                           curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
                           curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );

                           $result = curl_exec ( $ch );
                           curl_close ( $ch );
                       }catch(\Swift_TransportException $e){
                           $response = $e->getMessage() ;
                           return response()->json(['status'=>0,'message'=>trans('messages.email_error')],200);
                       }
                   }

                   if ($getdata->referral_amount) {
                       $UpdateWallet = User::where('id', $user->id)
                       ->update(['wallet' => $getdata->referral_amount]);

                       $to_Wallet = new Transaction;
                       $to_Wallet->user_id = $user->id;
                       $to_Wallet->order_id = null;
                       $to_Wallet->order_number = null;
                       $to_Wallet->wallet = $getdata->referral_amount;
                       $to_Wallet->payment_id = null;
                       $to_Wallet->order_type = '0';
                       $to_Wallet->transaction_type = '3';
                       $to_Wallet->username = $checkreferral->name;
                       $to_Wallet->save();
                   }
                }


                if($roledata)
                {
                    $arrayName = array(
                        'id' => $roledata->id,
                        'name' => $roledata->name,
                        'mobile' => $roledata->mobile,
                        'otp' => $roledata->otp,
                        'email' => $roledata->email,
                        'referral_code' => $roledata->referral_code,
                        'profile_pic' => url('/storage/app/public/images/profile/'.$roledata->profile_pic),
                    );
                    return response()->json(['status'=>1,'message'=>'Registration Successful','data'=>$arrayName],200);
                }
                else
                {
                    return response()->json(['status'=>0,'message'=>trans('messages.fail')],400);
                }

            // } else {
            //     return response()->json(['status'=>0,'message'=>trans('messages.referral_code_invalid')],200);
            // }

        }
        if ($request->login_type == "google") {
            if($request->email == ""){
                return response()->json(["status"=>0,"message"=>trans('messages.email_required')],400);
            }
            if($request->name == ""){
                return response()->json(["status"=>0,"message"=>trans('messages.name_required')],400);
            }
            if($request->token == ""){
                return response()->json(["status"=>0,"message"=>trans('messages.firebace_token')],400);
            }
            if($request->google_id == ""){
                return response()->json(["status"=>0,"message"=>trans('messages.google_id')],400);
            }

            $usergoogle=User::where('google_id',$request->google_id)->first();
            if ($usergoogle != "" OR @$usergoogle->email == $request->email AND $request->email != "") {
                if ($usergoogle->mobile == "") {
                    $arrayName = array(
                        'id' => $usergoogle->id
                    );
                    return response()->json(['status'=>2,'message'=>trans('messages.mobile_required'),'data'=>$arrayName],200);
                } else {
                    if($usergoogle->is_verified == '1')
                    {
                        if($usergoogle->is_available == '1')
                        {
                            $arrayName = array(
                                'id' => $usergoogle->id,
                                'name' => $usergoogle->name,
                                'mobile' => $usergoogle->mobile,
                                'email' => $usergoogle->email,
                                'referral_code' => $usergoogle->referral_code,
                                'profile_pic' => url('/storage/app/public/images/profile/'.$usergoogle->profile_pic),
                            );

                            $update=User::where('email',$usergoogle['email'])->update(['token'=>$request->token]);
                            return response()->json(['status'=>1,'message'=>'Login Successful','data'=>$arrayName],200);
                        } else {
                            return response()->json(['status'=>0,'message'=>trans('messages.blocked')],200);
                        }
                    } else {

                        $title='Email Verification Code';
                        $email=$usergoogle->email;
                        $data=['title'=>$title,'email'=>$email,'otp'=>$otp];

                        Mail::send('Email.emailverification',$data,function($message)use($data){
                            $message->from(env('MAIL_USERNAME'))->subject($data['title']);
                            $message->to($data['email']);
                        } );

                        $otp_data['otp'] = $otp;
                        $update=User::where('email',$usergoogle->email)->update($otp_data);

                        return response()->json(['status'=>3,'message'=>trans('messages.verify_email'),'otp'=>$otp],422);
                    }
                }
            } else {

                if(!empty($checkemail))
                {
                    return response()->json(['status'=>0,'message'=>trans('messages.email_exist')],400);
                }

                return response()->json(['status'=>2,'message'=>'Successful'],200);

            }
        } elseif ($request->login_type == "facebook") {
            if($request->email == ""){
                return response()->json(["status"=>0,"message"=>trans('messages.email_required')],400);
            }
            if($request->name == ""){
                return response()->json(["status"=>0,"message"=>trans('messages.name_required')],400);
            }
            if($request->token == ""){
                return response()->json(["status"=>0,"message"=>trans('messages.firebace_token')],400);
            }
            if($request->facebook_id == ""){
                return response()->json(["status"=>0,"message"=>trans('messages.facebook_id')],400);
            }

            $userfacebook=User::where('users.facebook_id',$request->facebook_id)->first();

            if ($userfacebook != "" OR @$userfacebook->email == $request->email AND $request->email != "") {
                if ($userfacebook->mobile == "") {
                    $arrayName = array(
                        'id' => $userfacebook->id
                    );
                    return response()->json(['status'=>2,'message'=>trans('messages.mobile_required'),'data'=>$arrayName],200);
                } else {
                    if($userfacebook->is_verified == '1')
                    {
                        if($userfacebook->is_available == '1')
                        {
                            $arrayName = array(
                                'id' => $userfacebook->id,
                                'name' => $userfacebook->name,
                                'mobile' => $userfacebook->mobile,
                                'email' => $userfacebook->email,
                                'referral_code' => $userfacebook->referral_code,
                                'profile_pic' => url('/storage/app/public/images/profile/'.$userfacebook->profile_pic),
                            );
                            $update=User::where('email',$userfacebook['email'])->update(['token'=>$request->token]);
                            return response()->json(['status'=>1,'message'=>'Login Successful','data'=>$arrayName],200);
                        } else {
                            return response()->json(['status'=>0,'message'=>trans('messages.blocked')],200);
                        }

                    } else {
                        $title='Email Verification Code';
                        $email=$usergoogle->email;
                        $data=['title'=>$title,'email'=>$email,'otp'=>$otp];

                        Mail::send('Email.emailverification',$data,function($message)use($data){
                            $message->from(env('MAIL_USERNAME'))->subject($data['title']);
                            $message->to($data['email']);
                        } );

                        $otp_data['otp'] = $otp;
                        $update=User::where('email',$usergoogle->email)->update($otp_data);

                        return response()->json(['status'=>3,'message'=>trans('messages.verify_email'),'otp'=>$otp],422);
                    }
                }
            } else {

                if(!empty($checkemail))
                {
                    return response()->json(['status'=>0,'message'=>trans('messages.email_exist')],400);
                }

                return response()->json(['status'=>2,'message'=>'Successful'],200);

            }
        }
    }
    public function register_emp(Request $request)
    {
        $request->validate([
            'mobile' => 'required',
        ]);

        if ($request->mobile == "" ) {
            return response()->json(["status" => 0, "message" => trans('Mobile Number Required')], 400);
        }

        $user                  = Employees::where('emp_phone', $request->mobile)->first();
        $mobileNumber          = $request->mobile;
        $otp                   = rand(1000, 9999);

        $curl                  = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL            => 'https://control.msg91.com/api/v5/otp',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING       => '',
        CURLOPT_MAXREDIRS      => 10,
        CURLOPT_TIMEOUT        => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST  => 'POST',
        CURLOPT_POSTFIELDS     => json_encode(array(
            'template_id'      => '67d0065ad6fc055648017574',  // Template ID
            'authkey'          => '403754ASWGpJz366b09ec2P1',   // Your MSG91 Authkey
            'mobile'           => $mobileNumber,  // Recipient's mobile number
            'realTimeResponse' => 'true',
            'otp'              => $otp  // Include the generated OTP
        )),
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/x-www-form-urlencoded',
            'Authorization: ••••••',
            'Cookie: HELLO_APP_HASH=Tk9lSjlEYXVwK0VKa3VOT01VMngwbCtRMzJPWTdoTGdFMzBZR2dMOE8vaz0%3D; PHPSESSID=u44h0qtvf4g9v9k0hq93nj02q1'
        ),
        ));

        $response    = curl_exec($curl);
        curl_close($curl);

        if (!$user) {
            $user = new Employees;
            $user->emp_phone = $request->mobile;
            $user->token = $request->token;
            $user->emp_id = 'EMP' . random_int(1000000000, 9999999999);
            $user->otp = $otp;
            $user->save();

            return response()->json([
                'status'     => 1,
                'message'    => 'New User Registered Successfully',
                'data'       => [
                    'id'     => $user->id,
                    'emp_id' => $user->emp_id,
                    'mobile' => $user->emp_phone,
                    'otp'    => $otp
                ]
            ], 200);
        }

        $user->otp = $otp;
        $user->save();

        return response()->json([
            'status' => 1,
            'message' => 'Existing User!',
            'data' => [
                'id'     => $user->id,
                'emp_id' => $user->emp_id,
                'mobile' => $user->emp_phone,
                'otp'    => $otp
            ]
        ], 200);
    }

    public function emailverify_emp(Request $request)
    {
        $request->validate([
            'otp'    => 'required|numeric',
            'mobile' => 'required|numeric'
        ]);

        if (empty($request->mobile)) {
            return response()->json(["status" => 0, "message" => trans('messages.mobile_required')], 400);
        }
        if (empty($request->otp)) {
            return response()->json(["status" => 0, "message" => trans('messages.otp_required')], 400);
        }

        $user = Employees::where('emp_phone', $request->mobile)
                         ->where('otp', $request->otp)
                         ->first();

        if (!empty($user)) {
            // Clear otp and set is_verified to null
            $user->is_verified = 1;
            $user->otp = null;
            $user->save();

            // Prepare response data
            $arrayName = [
                'id'           => $user->id,
                'emp_id'       => $user->emp_id,
                'mobile'       => $user->emp_phone,
                'emp_name'     => $user->emp_name,
                'emp_email'    => $user->emp_email,
                'emp_address'  => $user->emp_address,
                'emp_photo'    => asset('storage/images/employee/profiles/' . $user->emp_photo),
                'pan_no'       => $user->pan_no,
                'pan_image'    => asset('storage/images/employee/pan_images/' . $user->pan_image),
                'aadhar_no'    => $user->aadhar_no,
                'aadhar_image' => asset('storage/images/employee/aadhar_images/' . $user->aadhar_image),
            ];

            return response()->json(['status' => 1, 'message' => "OTP is verified", 'data' => $arrayName], 200);
        } else {
            return response()->json(["status" => 0, "message" => trans('invalid Otp')], 200);
        }
    }



    public function profile_emp(Request $request)
    {
        $request->validate([
            'emp' => 'required|numeric'
        ]);

        if ($request->emp == "") {
            return response()->json(["status" => 0, "message" => trans('Employee ID Required')], 400);
        }



        $user = Employees::where('id', $request->emp)
                         ->first();

        if (!empty($user)) {
            $arrayName = [
                'id'           => $user->id,
                'emp_id'       => $user->emp_id,
                'mobile'       => $user->emp_phone,
                'emp_name'     => $user->emp_name,
                'emp_email'    => $user->emp_email,
                'emp_address'  => $user->emp_address,
                'pincode'      => $user->pincode,
                'emp_photo'    => asset('storage/images/employee/profiles/' . $user->emp_photo),
                'pan_no'       => $user->pan_no,
                'pan_image'    => asset('storage/images/employee/pan_images/' . $user->pan_image),
                'aadhar_no'    => $user->aadhar_no,
                'aadhar_image' => asset('storage/images/employee/aadhar_images/' . $user->aadhar_image),
            ];

            return response()->json(['status' => 1, 'message' => "Employee Profile Successfully retrieved", 'data' => $arrayName], 200);

        }else{
            return response()->json([
                'status' => 0,
                'message' => 'No records found for the given Employee ID'
            ], 404);
        }
    }


    public function update_profile_emp(Request $request)
    {
        $request->validate([
            'emp' => 'required|numeric'
        ]);

        if ($request->emp == "") {
            return response()->json(["status" => 0, "message" => trans('Employee ID Required')], 400);
        }

        $user = Employees::where('id', $request->emp)->first();

        if (!$user) {
            return response()->json([
                'status' => 0,
                'message' => 'No records found for the given Employee ID'
            ], 404);
        }

        $user->emp_name    = $request->input('emp_name', $user->emp_name);
        $user->emp_phone   = $request->input('emp_phone', $user->emp_phone);
        $user->emp_email   = $request->input('emp_email', $user->emp_email);
        $user->emp_address = $request->input('emp_address', $user->emp_address);
        $user->pan_no      = $request->input('pan_no', $user->pan_no);
        $user->aadhar_no   = $request->input('aadhar_no', $user->aadhar_no);
        $user->pincode     = $request->input('pincode', $user->pincode);

        if($request->hasFile('emp_photo')){
            // Get the uploaded file
            $emp_photo       = $request->file('emp_photo');
            $emp_photo_name  = 'emp_photo' . uniqid() . '.' . $emp_photo->getClientOriginalExtension();
            $emp_photo->move('storage/images/employee/profiles', $emp_photo_name);
            $user->emp_photo = $emp_photo_name;
        }

        if($request->hasFile('pan_image')){
            // Get the uploaded file
            $pan_image       = $request->file('pan_image');
            $pan_image_name  = 'pan' . uniqid() . '.' . $pan_image->getClientOriginalExtension();
            $pan_image->move('storage/images/employee/pan_images', $pan_image_name);
            $user->pan_image = $pan_image_name;
        }

        if($request->hasFile('aadhar_image')){
            // Get the uploaded file
            $aadhar_image       = $request->file('aadhar_image');
            $aadhar_image_name  = 'aadhar' . uniqid() . '.' . $aadhar_image->getClientOriginalExtension();
            $aadhar_image->move('storage/images/employee/aadhar_images', $aadhar_image_name);
            $user->aadhar_image = $aadhar_image_name;
        }

        $user->save();



        $user = Employees::where('id', $request->emp)->first();

        if (!empty($user)) {
        $arrayName = [
        'id'           => $user->id,
        'emp_id'       => $user->emp_id,
        'mobile'       => $user->emp_phone,
        'emp_name'     => $user->emp_name,
        'emp_email'    => $user->emp_email,
        'emp_address'  => $user->emp_address,
        'pincode'      => $user->pincode,
        'emp_photo'    => asset('storage/images/employee/profiles/' . $user->emp_photo),
        'pan_no'       => $user->pan_no,
        'pan_image'    => asset('storage/images/employee/pan_images/' . $user->pan_image),
        'aadhar_no'    => $user->aadhar_no,
        'aadhar_image' => asset('storage/images/employee/aadhar_images/' . $user->aadhar_image),
        ];

         return response()->json(['status' => 1, 'message' => "Record Successfully Updated", 'data' => $arrayName], 200);

        }else{
            return response()->json([
            'status' => 0,
            'message' => 'No records found for the given Employee ID'
            ], 404);
        }
    }

    public function getprofile(Request $request){
        $request->validate([
            'emp' => 'required|numeric'
        ]);
        $user = Employees::where('id', $request->emp)->first();

        if (!empty($user)) {
        $arrayName = [
        'id'           => $user->id,
        'emp_id'       => $user->emp_id,
        'mobile'       => $user->emp_phone,
        'emp_name'     => $user->emp_name,
        'emp_email'    => $user->emp_email,
        'emp_address'  => $user->emp_address,
        'pincode'      => $user->pincode,
        'emp_photo'    => asset('storage/images/employee/profiles/' . $user->emp_photo),
        'pan_no'       => $user->pan_no,
        'pan_image'    => asset('storage/images/employee/pan_images/' . $user->pan_image),
        'aadhar_no'    => $user->aadhar_no,
        'aadhar_image' => asset('storage/images/employee/aadhar_images/' . $user->aadhar_image),
        ];

         return response()->json(['status' => 1, 'message' => "Record Successfully Fetched", 'data' => $arrayName], 200);

        }else{
            return response()->json([
            'status' => 0,
            'message' => 'No records found for the given Employee ID'
            ], 404);
        }
    }
    public function payment_emp(Request $request)
    {
        $request->validate([
            'emp' => 'required|numeric'
        ]);

        if ($request->emp == "") {
            return response()->json(["status" => 0, "message" => trans('Employee ID Required')], 400);
        }


        $user = Employees::where('id', $request->emp)->first();

        if (!empty($user)) {
        $arrayName = [
        'id' => $user->id,
        'upi' => $user->upi ?? "",
        'bank_name' => $user->bank_name,
        'bank_branch' => $user->bank_branch,
        'bank_ifsc' => $user->bank_ifsc,
        'bank_acc_no'  => $user->bank_acc_no,
        'name_as_per_bank'  => $user->name_as_per_bank,
        'bank_book_image'  => asset('storage/images/employee/bank_images/' . $user->bank_book_image),

        ];

         return response()->json(['status' => 1, 'message' => "Record Successfully Retrieved", 'data' => $arrayName], 200);

        }else{
            return response()->json([
            'status' => 0,
            'message' => 'No records found for the given Employee ID'
            ], 404);
        }


    }


    public function update_payment_emp(Request $request)
    {
        $request->validate([
            'emp' => 'required|numeric'
        ]);

        if ($request->emp == "") {
            return response()->json(["status" => 0, "message" => trans('Employee ID Required')], 400);
        }

        $user = Employees::where('id', $request->emp)->first();

        if (!$user) {
            return response()->json([
                'status' => 0,
                'message' => 'No records found for the given Employee ID'
            ], 404);
        }

        $user->bank_name = $request->input('bank_name', $user->bank_name);
        $user->bank_branch = $request->input('bank_branch', $user->bank_branch);
        $user->bank_ifsc = $request->input('bank_ifsc', $user->bank_ifsc);
        $user->bank_acc_no = $request->input('bank_acc_no', $user->bank_acc_no);
        $user->name_as_per_bank = $request->input('name_as_per_bank', $user->name_as_per_bank);
        $user->upi = $request->input('upi', $user->upi);
        // Ensure file is uploaded correctly
        if ($request->hasFile('bank_book_image') && $request->file('bank_book_image')->isValid()) {
            $bank_book_image = $request->file('bank_book_image');
            $imageName       = 'bank_image' . uniqid() . '.' . $bank_book_image->getClientOriginalExtension();
            $bank_book_image->move('storage/images/employee/bank_images', $imageName);
            $user->bank_book_image = $imageName;
        }

        $user->save();


        $user = Employees::where('id', $request->emp)->first();

        if (!empty($user)) {
        $arrayName = [
        'id' => $user->id,
        'upi' => $user->upi,
        'bank_name' => $user->bank_name,
        'bank_branch' => $user->bank_branch,
        'bank_ifsc' => $user->bank_ifsc,
        'bank_acc_no'  => $user->bank_acc_no,
        'name_as_per_bank'  => $user->name_as_per_bank,
        'bank_book_image'  => asset('storage/images/employee/bank_images/' . $user->bank_book_image),

        ];

         return response()->json(['status' => 1, 'message' => "Record Successfully Retrieved", 'data' => $arrayName], 200);

        }else{
            return response()->json([
            'status' => 0,
            'message' => 'No records found for the given Employee ID'
            ], 404);
        }
    }

    public function resend_Otp(Request $request)
{
    try {
        $request->validate([
            'mobile' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 0, 'errors' => $validator->errors()], 400);
        }

        // Get user ID from the request
        $userId = $request->input('user_id');

        // Find the user by ID
        $user = User::select('otp')->where('mobile',$userId)->first();

        if (!$user) {
            return response()->json(['status' => 0, 'message' => 'User not found'], 404);
        }

        // Generate a new OTP
        $otp = rand(100000, 999999);

        // Save OTP and expiration to the user (or a separate OTP table)
        $user->otp = $otp;
        $user->save();


        return response()->json(['status' => 1, 'message' => 'OTP has been resent successfully.','OTP'=>$otp], 200);
    } catch (\Exception $e) {
        return response()->json(['status' => 0, 'message' => 'Failed to resend OTP', 'error' => $e->getMessage()], 500);
    }
}









    public function login(Request $request )
    {
        if($request->email == ""){
            return response()->json(["status"=>0,"message"=>trans('messages.email_required')],400);
        }
        if($request->password == ""){
            return response()->json(["status"=>0,"message"=>trans('messages.password_required')],400);
        }

        $login=User::where('mobile',$request['email'])->where('type','=','2')->first();

        if(!empty($login))
        {
            if($login->is_verified == '1')
            {
                if($login->is_available == '1')
                {
                    if(Hash::check($request->get('password'),$login->password))
                    {
                        $arrayName = array(
                            'id' => $login->id,
                            'name' => $login->name,
                            'mobile' => $login->mobile,
                            'email' => $login->email,
                            'referral_code' => $login->referral_code,
                            'profile_pic' => url('/storage/app/public/images/profile/'.$login->profile_pic),
                        );

                        $data_token['token'] = $request['token'];
                        $update=User::where('email',$request['email'])->update($data_token);

                        return response()->json(['status'=>1,'message'=>"Login Successful",'data'=>$arrayName],200);
                    }
                    else
                    {
                        return response()->json(['status'=>0,'message'=>trans('messages.invalid')],422);
                    }
                }
                else
                {
                    return response()->json(['status'=>0,'message'=>trans('messages.blocked')],422);
                }
            } else {
                $otp = rand ( 100000 , 999999 );

                $title='Email Verification Code';
                $email=$request->email;
                $data=['title'=>$title,'email'=>$email,'otp'=>$otp];

                // Mail::send('Email.emailverification',$data,function($message)use($data){
                //     $message->from(env('MAIL_USERNAME'))->subject($data['title']);
                //     $message->to($data['email']);
                // } );

                $otp_data['otp'] = $otp;
                $update=User::where('email',$request->email)->update($otp_data);

                return response()->json(['status'=>2,'message'=>trans('messages.verify_email'),'otp'=>$otp],422);
            }
        }
        else
        {
            return response()->json(['status'=>0,'message'=>trans('messages.invalid')],422);
        }
    }

    public function emailverify(Request $request )
    {
        if($request->email == ""){
            return response()->json(["status"=>0,"message"=>trans('messages.mobile_required')],400);
        }
        if($request->token == ""){
            return response()->json(["status"=>0,"message"=>trans('messages.firebace_token')],400);
        }

        $checkuser=User::where('mobile',$request->email)->first();

        if (!empty($checkuser)) {
            $update=User::where('mobile',$request['email'])->update(['otp'=>NULL,'is_verified'=>'1','token'=>$request->token]);

            $arrayName = array(
                'id' => $checkuser->id,
                'name' => $checkuser->name,
                'mobile' => $checkuser->mobile,
                'email' => $checkuser->email,
                'referral_code' => $checkuser->referral_code,
                'profile_pic' => url('/storage/app/public/images/profile/'.$checkuser->profile_pic),
            );

            return response()->json(['status'=>1,'message'=>"Email is verified",'data'=>$arrayName],200);
        } else {
            return response()->json(["status"=>0,"message"=>trans('messages.invalid')],400);
        }
    }

    public function resendemailverification(Request $request )
    {
        if($request->email == ""){
            return response()->json(["status"=>0,"message"=>"Email is required"],400);
        }

        $checkuser=User::where('email',$request->email)->first();

        if (!empty($checkuser)) {

            try{
                $otp = rand ( 100000 , 999999 );

                $update=User::where('email',$request['email'])->update(['otp'=>$otp,'is_verified'=>'2']);

                $title='Email Verification Code';
                $email=$request->email;
                $data=['title'=>$title,'email'=>$email,'otp'=>$otp];

                Mail::send('Email.emailverification',$data,function($message)use($data){
                    $message->from(env('MAIL_USERNAME'))->subject($data['title']);
                    $message->to($data['email']);
                } );
            }catch(\Swift_TransportException $e){
                $response = $e->getMessage() ;
                return response()->json(['status'=>0,'message'=>trans('messages.email_error')],200);
            }

            return response()->json(["status"=>1,"message"=>trans('messages.otp_sent'),'otp'=>$otp],200);

        } else {
            return response()->json(["status"=>0,"message"=>trans('messages.invalid')],400);
        }
    }

    public function AddMobile(Request $request)
    {
        if($request->mobile == ""){
            return response()->json(["status"=>0,"message"=>trans('messages.mobile_required')],400);
        }
        if($request->user_id == ""){
            return response()->json(["status"=>0,"message"=>trans('messages.user_required')],400);
        }

        $checkmobile=User::where('mobile',$request['mobile'])->first();

        if(!empty($checkmobile))
        {
            return response()->json(['status'=>0,'message'=>trans('messages.mobile_exist')],400);
        }

        try {
            $update=User::where('id',$request['user_id'])->update($data);
            return response()->json(["status"=>1,"message"=>trans('messages.update')],200);

        } catch (\Exception $e){
            return response()->json(['status'=>0,'message'=>trans('messages.fail')],400);
        }
    }

    // public function getprofile(Request $request )
    // {
    //     if($request->user_id == ""){
    //         return response()->json(["status"=>0,"message"=>trans('messages.user_required')],400);
    //     }

    //     $users = User::where('id',$request['user_id'])->first();

    //     if ($users->mobile == "") {
    //         $mobile = "";
    //     } else {
    //         $mobile = $users->mobile;
    //     }

    //     $arrayName = array(
    //         'id' => $users->id,
    //         'name' => $users->name,
    //         'mobile' => $mobile,
    //         'email' => $users->email,
    //         'profile_pic' => url('/storage/app/public/images/profile/'.$users->profile_pic)
    //     );

    //     if(!empty($arrayName))
    //     {
    //         $contactinfo=Settings::select('address','contact','email','facebook','twitter','instagram','linkedin')
    //         ->first();
    //         return response()->json(['status'=>1,'message'=>'Profile data','data'=>$arrayName,'contactinfo'=>$contactinfo],200);
    //     } else {
    //         return response()->json(['status'=>0,'message'=>trans('messages.no_data')],422);
    //     }

    //     return response()->json(['status'=>0,'message'=>trans('messages.fail')],400);
    // }

    public function editprofile(Request $request )
    {
        if($request->user_id == ""){
            return response()->json(["status"=>0,"message"=>trans('messages.user_required')],400);
        }
        if($request->name == ""){
            return response()->json(["status"=>0,"message"=>trans('messages.name_required')],400);
        }

        $user = new User;
        $user->exists = true;
        $user->id = $request->user_id;

        if(isset($request->image)){
            if($request->hasFile('image')){
                $image = $request->file('image');
                $image = 'profile-' . uniqid() . '.' . $request->image->getClientOriginalExtension();
                $request->image->move('storage/app/public/images/profile', $image);
                $user->profile_pic=$image;
            }
        }
        $user->name =$request->name;
        $user->save();

        $user_details=User::where('id',$request->user_id)->where('type','=','2')->first();
        $arrayName = array(
            'id' => $user_details->id,
            'name' => $user_details->name,
            'mobile' => $user_details->mobile,
            'email' => $user_details->email,
            'profile_pic' => url('/storage/app/public/images/profile/'.$user_details->profile_pic),
        );

        if($user)
        {
            return response()->json(['status'=>1,'message'=>trans('messages.update'),'data'=>$arrayName],200);
        }
        else
        {
            return response()->json(['status'=>0,'message'=>trans('messages.fail')],400);
        }
    }

    public function changepassword(Request $request)
    {
        if($request->user_id == ""){
            return response()->json(["status"=>0,"message"=>trans('messages.user')],400);
        }
        if($request->old_password == ""){
            return response()->json(["status"=>0,"message"=>trans('messages.old_password')],400);
        }
        if($request->new_password == ""){
            return response()->json(["status"=>0,"message"=>trans('messages.new_password')],400);
        }
        if($request['old_password']==$request['new_password'])
        {
            return response()->json(['status'=>0,'message'=>trans('messages.password_different')],400);
        }
        $check_user=User::where('id',$request['user_id'])->get()->first();
        if(Hash::check($request['old_password'],$check_user->password))
        {
            $data['password']=Hash::make($request['new_password']);
            $update=User::where('id',$request['user_id'])->update($data);
            return response()->json(['status'=>1,'message'=>trans('messages.update')],200);
        }
        else{
            return response()->json(['status'=>0,'message'=>trans('messages.invalid')],400);
        }
    }

    public function forgotPassword(Request $request)
    {
        if($request->email == ""){
            return response()->json(["status"=>0,"message"=>trans('messages.email_required')],400);
        }

        $checklogin=User::where('email',$request['email'])->first();

        if(empty($checklogin))
        {
            return response()->json(['status'=>0,'message'=>trans('messages.invalid')],400);
        } elseif ($checklogin->google_id != "" OR $checklogin->facebook_id != "") {
            return response()->json(['status'=>0,'message'=>trans('messages.social_login')],200);
        } else {
            try{
                $password = substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') , 0 , 8 );
                $newpassword['password'] = Hash::make($password);
                $update = User::where('email', $request['email'])->update($newpassword);

                $title='Password Reset';
                $email=$checklogin->email;
                $name=$checklogin->name;
                $data=['title'=>$title,'email'=>$email,'name'=>$name,'password'=>$password];

                Mail::send('Email.email',$data,function($message)use($data){
                    $message->from(env('MAIL_USERNAME'))->subject($data['title']);
                    $message->to($data['email']);
                } );
                return response()->json(['status'=>1,'message'=>trans('messages.password_sent')],200);
            }catch(\Swift_TransportException $e){
                $response = $e->getMessage() ;
                return response()->json(['status'=>0,'message'=>trans('messages.email_error')],200);
            }
        }

    }

    public function help(Request $request)
    {
        if($request->user_id == ""){
            return response()->json(["status"=>0,"message"=>"User ID is required"],400);
        }
        if($request->first_name == ""){
            return response()->json(["status"=>0,"message"=>"Please enter first name"],400);
        }
        if($request->last_name == ""){
            return response()->json(["status"=>0,"message"=>"Please enter last name"],400);
        }
        if($request->mobile == ""){
            return response()->json(["status"=>0,"message"=>"Please enter mobile"],400);
        }
        if($request->email == ""){
            return response()->json(["status"=>0,"message"=>"Please enter email"],400);
        }
        if($request->subject == ""){
            return response()->json(["status"=>0,"message"=>"Please enter subject"],400);
        }
        if($request->message == ""){
            return response()->json(["status"=>0,"message"=>"Please enter message"],400);
        }

        $help = new Help;
        $help->user_id = $request->user_id;
        $help->first_name = $request->first_name;
        $help->last_name = $request->last_name;
        $help->mobile = $request->mobile;
        $help->email = $request->email;
        $help->subject = $request->subject;
        $help->message = $request->message;
        $help->save();

        if ($help) {
          return response()->json(['status'=>1,'message'=>'Success'],200);
        } else {
          return response()->json(['status'=>0,'message'=>trans('messages.fail')],200);
        }
    }

    public function vendors()
    {
        $vendors=User::with('rattings')->select('id','name',\DB::raw("CONCAT('".url('/storage/app/public/images/profile/')."/', profile_pic) AS image_url"))
        ->where('type','3')
        ->where('is_available','1')
        ->orderBy('id', 'DESC')
        ->paginate(10);

        if ($vendors) {
            return response()->json(['status'=>1,'message'=>'Success','vendors'=>$vendors],200);
        } else {
            return response()->json(['status'=>0,'message'=>trans('messages.fail')],200);
        }
    }

    public function vendorsregister(Request $request)
    {
        if($request->name == ""){
            return response()->json(["status"=>0,"message"=>trans('messages.name_required')],400);
        }
        if($request->mobile == ""){
            return response()->json(["status"=>0,"message"=>trans('messages.mobile_required')],400);
        }
        if($request->email == ""){
            return response()->json(["status"=>0,"message"=>trans('messages.email_required')],400);
        }
        if($request->password == ""){
            return response()->json(["status"=>0,"message"=>trans('messages.password_required')],400);
        }
        if($request->token == ""){
            return response()->json(["status"=>0,"message"=>trans('messages.firebace_token')],400);
        }

        if(!empty($checkemail))
        {
            return response()->json(['status'=>0,'message'=>trans('messages.email_exist')],400);
        }

        if(!empty($checkmobile))
        {
            return response()->json(['status'=>0,'message'=>trans('messages.mobile_exist')],400);
        }

        $otp = rand ( 100000 , 999999 );

        $str_result = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
        $referral_code = substr(str_shuffle($str_result), 0, 10);

        $userdata=array('name'=>$request->name,'mobile'=>$request->mobile,'email'=>$request->email,'profile_pic'=>'default.png','password'=>Hash::make($request->password),'referral_code'=>$referral_code,'otp'=>$otp,'type'=>'3','is_available'=>'2');
        $roledata=User::create($userdata)->assignRole(\Spatie\Permission\Models\Role::where('name','admin')->first());

        if ($roledata) {

            $title="Email Verification";
            $email=$request->email;
            $data=['title'=>$title,'email'=>$email,'otp'=>$otp];

            Mail::send('Email.emailverification',$data,function($message)use($data){
                $message->from(env('MAIL_USERNAME'))->subject($data['title']);
                $message->to($data['email']);
            } );

            if (env('Environment') == 'sendbox') {
                session ( [
                    'email' => $request->email,
                    'otp' => $otp,
                ] );
            } else {
                session ( [
                    'email' => $request->email,
                ] );
            }
            return response()->json(['status'=>1,'message'=>'Success'],200);
        } else {
            return response()->json(['status'=>0,'message'=>trans('messages.fail')],400);
        }
    }

}
