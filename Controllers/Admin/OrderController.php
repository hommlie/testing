<?php

namespace App\Http\Controllers\Admin;

use Auth;
use Helper;
use App\Models\User;
use App\Models\Order;
use App\Models\Category;
use App\Models\Products;
use App\Models\Employees;
use App\Models\Variation;
use App\Models\Subcategory;
use App\Models\Transaction;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        abort_unless(\Gate::allows('order_access'), 403);
        
        $data = Order::select(
            \DB::raw('MAX(id) as id'),
            'order_number',
            \DB::raw('MAX(vendor_id) as vendor_id'),
            \DB::raw('MAX(order_notes) as order_notes'),
            \DB::raw('MAX(full_name) as full_name'),
            \DB::raw('MAX(email) as email'),
            \DB::raw('MAX(mobile) as mobile'),
            \DB::raw('MAX(landmark) as landmark'),
            \DB::raw('MAX(created_at) as created_at'),
            \DB::raw('MAX(street_address) as street_address'),
            \DB::raw('MAX(pincode) as pincode'),
            \DB::raw('MAX(status) as status'),
            \DB::raw('MAX(order_status) as order_status'),
            \DB::raw('MAX(desired_time) as desired_time'),
            \DB::raw('MAX(desired_date) as desired_date'),
            \DB::raw('SUM(order_total) AS grand_total'),
            \DB::raw('DATE_FORMAT(MAX(created_at), "%d %M %Y") as date'),
            \DB::raw('COUNT(order_number) AS no_products'),
            \DB::raw('GROUP_CONCAT(id) as order_ids')
        )
        ->groupBy('order_number')
        ->orderBy('id', 'DESC')
        ->paginate(10000000000000);
        
        
        

            return view('admin.orders.index',compact('data'));
        
    }

    public function manualorderassign()
    {
        
            $data=Order::orderBy('id','DESC')->get();
            $employees = Employees::orderBy('id','DESC')->get();

            return view('admin.manualorderassign.index',compact('data','employees'));


    }

    public function addmanualorderassignUpdate(Request $request)
    {
        // dd($request);
        
            $order = Order::find($request->order_id);
    
            if (!$order) {
                return redirect()->back()->with('danger', 'Order not found.');
            }

            $dataval = [
                'assigned_to' => $request->employee,
            ];

            $order->update($dataval);

        

            if ($order) {
                return redirect('admin/manualorderassign')->with('success', 'Employee Successfully Assigned successfully.');
            } else {
                return redirect()->back()->with('danger', 'Failed to Assign');
            }
        
        
        
    }

    public function addorder()
    {
        
            $category = Category::orderBy('id', 'asc')->get();
            $subcategory = Subcategory::orderBy('id', 'asc')->get();
            $product = Products::orderBy('id', 'asc')->get();
            return view('admin.orders.add',compact('category','subcategory','product'));
        
    }
    public function editorder($id)
    {
        // Fetch non-aggregated order info
        $order_info = Order::select(
            'vendor_id',
            'order_number',
            'order_notes',
            'payment_type',
            'payment_id',
            'full_name',
            'email',
            'mobile',
            'landmark',
            'street_address',
            'pincode',
            'status',
            \DB::raw('DATE_FORMAT(created_at, "%d-%m-%Y") as date')
        )
        ->where('id', $id)
        ->first();
    
        // Fetch aggregated order info separately
        $aggregated_order_info = Order::select(
            \DB::raw('SUM(price * qty) AS subtotal'),
            \DB::raw('SUM(tax) AS tax'),
            \DB::raw('SUM(shipping_cost) AS shipping_cost'),
            \DB::raw('SUM(order_total) AS grand_total')
        )
        ->where('id', $id)
        ->first();
    
        // Merge aggregated info into $order_info
        if ($order_info && $aggregated_order_info) {
            $order_info->subtotal = $aggregated_order_info->subtotal;
            $order_info->tax = $aggregated_order_info->tax;
            $order_info->shipping_cost = $aggregated_order_info->shipping_cost;
            $order_info->grand_total = $aggregated_order_info->grand_total;
        }
    
        // Fetch detailed order items
        $order_data = Order::select(
            'id',
            'product_id',
            'product_name',
            'price',
            'qty',
            'tax',
            'status',
            'discount_amount',
            'order_total',
            \DB::raw('(CASE WHEN variation IS NULL THEN "" ELSE variation END) AS variation'),
            \DB::raw("CONCAT('".url('/storage/app/public/images/products/')."/', image) AS image_url"),
            'shipping_cost'
        )
        ->where('id', $id)
        ->orderBy('id', 'DESC')
        ->get();
    
        // Fetch category and product information
        $getCategoryId = Order::select(
            'orders.product_id',
            'products.cat_id',
            'products.subcat_id',
            'products.product_name'
        )
        ->join('products', 'orders.product_id', '=', 'products.id')
        ->where('orders.id', $id)
        ->orderBy('orders.id', 'DESC')
        ->first();
    
        $variations = Order::select(
            'orders.product_id',
            'variations.discounted_variation_price',
            'variations.variation',
            'variations.attribute_id'
        )
        ->join('variations', 'orders.product_id', '=', 'variations.product_id')
        ->where('orders.id', $id)
        ->orderBy('orders.id', 'DESC')
        ->get();
    
        // Additional data
        $data = Order::findOrFail($id);
        $category = Category::orderBy('id', 'asc')->get();
        $subcategory = Subcategory::orderBy('id', 'asc')->get();
        $product = Products::orderBy('id', 'asc')->get();
    
        $ExplodedVariations = explode(',', $data->variation);
    
        return view('admin.orders.edit', compact('data', 'category', 'subcategory', 'product', 'order_info', 'order_data', 'getCategoryId', 'variations', 'ExplodedVariations'));
    }
    
    public function getSubcategories($categoryId)
    {
        $subcategories = SubCategory::where('cat_id', $categoryId)->get();
        return response()->json($subcategories);
    }

    public function getServices($subcategoryId)
    {
        $services = Products::where('subcat_id', $subcategoryId)->get();
        return response()->json($services);
    }

    public function getServiceVariationType($serviceId)
    {
        $services = Variation::where('product_id', $serviceId)
                                //->where('attribute_id', 2)
                                ->get();
        return response()->json($services);
    }
    public function getServiceVariationArea($serviceId)
    {
        $services = Variation::where('product_id', $serviceId)
                               // ->where('attribute_id', 5)
                                ->get();
        return response()->json($services);
    }

    public function getServiceDetails($id)
    {
        $service = DB::table('products')
                     ->leftJoin('product_images', 'products.id', '=', 'product_images.product_id')
                     ->where('products.id', $id)
                     ->select(
                         'products.discounted_price',
                         'products.tax',
                         'products.tax_type',
                         'products.product_name',
                         'product_images.image'
                     )
                     ->first();
    
        $variations = DB::table('variations')
                        ->where('variations.product_id', $id)
                        ->select(
                            'variations.attribute_id',
                            'variations.discounted_variation_price',
                            'variations.variation',
                            'variations.qty'
                        )
                        ->get();
    
        return response()->json([
            'discounted_price' => optional($service)->discounted_price,
            'tax' => optional($service)->tax,
            'tax_type' => optional($service)->tax_type,
            'product_name' => optional($service)->product_name,
            'image' => optional($service)->image,
            'variations' => $variations
        ]);
    }
    
    
    


    public function storeorder(Request $request)
    {
        // Validate the request data
        $this->validate($request, [
            'hidden_quantity' => 'required|integer',
            'hidden_total_price' => 'required|numeric',
            'hidden_tax' => 'required|numeric',
            'hidden_image' => 'required',
            'hidden_product_name' => 'required',
            'category' => 'required|integer',
            'subcategory' => 'required|integer',
            'service' => 'required|integer',
            'order_service_type' => 'required|string|max:255',
            'order_service_area' => 'required|string|max:255',
            'price' => 'required|numeric',
            'desired_date' => 'required|date',
            'desired_time' => 'required|date_format:H:i',
            'fullname' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'mobile' => 'required|digits:10',
            'landmark' => 'nullable|string|max:255',
            'address' => 'required|string|max:500',
            'pincode' => 'required|digits:6',
            'serviceTypePriceValue' => 'required',
            'serviceAreaPriceValue' => 'required',
        ]);
    
        // Get the last order number and calculate the new one
        $lastOrder = Order::orderBy('id', 'desc')->first();
        $newOrderNumber = $lastOrder ? intval($lastOrder->order_number) + 1 : 10001;
    
        // Check if the service type is "AMC"
        if ($request->serviceTypePriceValue === 'AMC') {
            // Calculate the split values
            $splitPrice = $request->hidden_total_price / 3;
            $initialDate = Carbon::parse($request->desired_date);
            
            // Loop to create 3 orders
            for ($i = 0; $i < 3; $i++) {
                $orderDate = $initialDate->copy()->addDays($i * 30); // Adding 30 days for each subsequent order
                
                $dataval = [
                    'vendor_id' => "6",
                    'product_id' => $request->service,
                    'order_number' => $newOrderNumber, // Same order number for each
                    'product_name' => $request->hidden_product_name,
                    'image' => $request->hidden_image,
                    'qty' => $request->hidden_quantity,
                    'price' => $splitPrice,
                    'variation' => "$request->serviceTypePriceValue,$request->serviceAreaPriceValue",
                    'tax' => $request->hidden_tax / 3, // Split the tax equally
                    'order_total' => $splitPrice,
                    'payment_type' => "1",
                    'full_name' => $request->fullname,
                    'email' => $request->email,
                    'mobile' => $request->mobile,
                    'landmark' => $request->landmark,
                    'street_address' => $request->address,
                    'pincode' => $request->pincode,
                    'status' => "1",
                    'desired_date' => $orderDate->format('Y-m-d'),
                    'desired_time' => $request->desired_time,
                    'order_status' => "1",
                ];
                
                // Create the order
                Order::create($dataval);
            }
        } else {
            // Create a single order if service type is not "AMC"
            $dataval = [
                'vendor_id' => "6",
                'product_id' => $request->service,
                'order_number' => $newOrderNumber,
                'product_name' => $request->hidden_product_name,
                'image' => $request->hidden_image,
                'qty' => $request->hidden_quantity,
                'price' => $request->price,
                'variation' => "$request->serviceTypePriceValue,$request->serviceAreaPriceValue",
                'tax' => $request->hidden_tax,
                'order_total' => $request->hidden_total_price,
                'payment_type' => "1",
                'full_name' => $request->fullname,
                'email' => $request->email,
                'mobile' => $request->mobile,
                'landmark' => $request->landmark,
                'street_address' => $request->address,
                'pincode' => $request->pincode,
                'status' => "1",
                'desired_date' => $request->desired_date,
                'desired_time' => $request->desired_time,
                'order_status' => "1",
            ];
        
            // Create the single order
            Order::create($dataval);
        }
        
        return redirect('admin/orders')->with('success', 'Order placed successfully.');
    }
    


    public function updateorder(Request $request, $id)
    {
        // Validate the request data
        $this->validate($request, [
            'hidden_quantity' => 'nullable',
            'order_total' => 'required',
            'hidden_tax' => 'nullable',
            'hidden_image' => 'nullable',
            'hidden_total_price' => 'nullable',
            'hidden_product_name' => 'nullable',
            'category' => 'required',
            'subcategory' => 'required',
            'service' => 'required',
            'order_service_type' => 'nullable',
            'order_service_area' => 'nullable',
            'price' => 'required',
            'desired_date' => 'required|date',
            'desired_time' => 'required|date_format:H:i',
            'fullname' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'mobile' => 'required|digits:10',
            'landmark' => 'nullable|string|max:255',
            'address' => 'required|string|max:500',
            'pincode' => 'required|digits:6',
            'serviceTypePriceValue' => 'nullable',
            'serviceAreaPriceValue' => 'nullable',
        ]);
    
        // Find the order by ID
        $order = Order::find($id);
    
        if (!$order) {
            return redirect()->back()->with('danger', 'Order not found.');
        }
    
        // Determine the values for the variation
        $variationServiceType = $request->serviceTypePriceValue ?: $request->order_service_type;
        $variationServiceArea = $request->serviceAreaPriceValue ?: $request->order_service_area;
    
        // Prepare data for update
        $dataval = [
            'vendor_id' => "6", // Adjust as needed
            'product_id' => $request->service,
            'product_name' => $request->hidden_product_name,
            'image' => $request->hidden_image,
            'qty' => $request->hidden_quantity,
            'price' => $request->price,
            'variation' => "$variationServiceType,$variationServiceArea",
            'tax' => $request->hidden_tax,
            'order_total' => $request->order_total,
            'payment_type' => "1", // Adjust as needed
            'full_name' => $request->fullname,
            'email' => $request->email,
            'mobile' => $request->mobile,
            'landmark' => $request->landmark,
            'street_address' => $request->address,
            'pincode' => $request->pincode,
            'status' => "1", // Adjust as needed
            'desired_date' => $request->desired_date,
            'desired_time' => $request->desired_time,
            'order_status' => "1", // Adjust as needed
        ];
    
        // Update the order with new data
        $order->update($dataval);
    
        // Redirect with success message
        return redirect('admin/orders')->with('success', 'Order updated successfully.');
    }
    

    public function search(Request $request)
    {
        
            $data=Order::with(['vendors'])->select('order_number','vendor_id','order_notes','full_name','email','mobile','landmark','street_address','pincode','status',\DB::raw('SUM(order_total) AS grand_total'),\DB::raw('DATE_FORMAT(created_at, "%d %M %Y") as date'),\DB::raw('count(order_number) AS no_products'))
            ->groupBy('order_number')
            ->where('order_number', 'LIKE', '%' . $request->search . '%')
            ->orWhere('full_name', 'LIKE', '%' . $request->search . '%')
            ->orderBy('id', 'DESC')
            ->paginate(10);
        
        
            // $data=Order::with(['vendors'])->select('order_number','vendor_id','order_notes','full_name','email','mobile','landmark','street_address','pincode','status',\DB::raw('SUM(order_total) AS grand_total'),\DB::raw('DATE_FORMAT(created_at, "%d %M %Y") as date'),\DB::raw('count(order_number) AS no_products'))
            // ->where('vendor_id',Auth::user()->id)
            // ->where('order_number', 'LIKE', '%' . $request->search . '%')
            // ->orWhere('full_name', 'LIKE', '%' . $request->search . '%')
            // ->groupBy('order_number')
            // ->orderBy('id', 'DESC')
            // ->paginate(10);
        
        return view('admin.orders.index',compact('data'));

    }

    public function orderdetails($id)
{
    // Fetch non-aggregated order info
    $order_info = Order::select(
        'vendor_id',
        'order_number',
        'order_notes',
        'payment_type',
        'payment_id',
        'full_name',
        'email',
        'mobile',
        'landmark',
        'street_address',
        'pincode',
        'status',
        'order_status',
        'desired_time',
        'desired_date',
        'is_otp_verified',
        'order_total',
        \DB::raw('DATE_FORMAT(created_at, "%d-%m-%Y") as date')
    )
    ->where('order_number', $id)
    ->first();

    // Fetch aggregated order data separately
    $aggregated_order_info = Order::select(
        \DB::raw('SUM(price * qty) AS subtotal'),
        \DB::raw('SUM(tax) AS tax'),
        \DB::raw('SUM(shipping_cost) AS shipping_cost'),
        \DB::raw('SUM(order_total) AS grand_total')
    )
    ->where('order_number', $id)
    ->first();

    // Merge aggregated info into $order_info
    if ($order_info && $aggregated_order_info) {
        $order_info->subtotal = $aggregated_order_info->subtotal;
        $order_info->tax = $aggregated_order_info->tax;
        $order_info->shipping_cost = $aggregated_order_info->shipping_cost;
        $order_info->grand_total = $aggregated_order_info->grand_total;
    }

    // Fetch detailed order items
    $order_data = Order::select(
        'id',
        'product_id',
        'product_name',
        'price',
        'qty',
        'tax',
        'status',
        'discount_amount',
        'order_status',
        'desired_time',
        'desired_date',
        'is_otp_verified',
        'order_total',
        \DB::raw('(CASE WHEN variation IS NULL THEN "" ELSE variation END) AS variation'),
        \DB::raw("CONCAT('".url('/storage/app/public/images/products/')."/', image) AS image_url"),
        'shipping_cost'
    )
    ->where('order_number', $id)
    ->orderBy('id', 'DESC')
    ->get();

    return view('admin.orders.order-details', compact('order_info', 'order_data'));
}

    // public function delete()
    // {
    //     $data=Order::where('vendor_id',Auth::user()->id)->get();
    //     return view('admin.orders.index',compact('data'));
    // }

    public function changeStatus(Request $request)
    {
        $this->validate($request,[
            'id' => 'required',
            'status' => 'required',
        ]);

        //$checkmobile=User::where('id',$request->id)->first();

        $status=Order::select('order_total','product_name','payment_id','user_id','vendor_id','payment_type','order_number')
        ->where('id',$request->id)
        ->first();

        $userData=User::where('id',$status->user_id)->first();
        $email = $userData->email;
        $name = $userData->name;

        if ($request->status == 1) {
            $data=array('status'=>$request->status,'cancelled_at'=>date('Y-m-d h:i:s'));
            Order::where('id',$request->id)->update($data);

            $message = "Order ".$order_number." has been placed";
            
            $title = "Order Placed Successfully";
            $ordermessage = $message;
            $emaildata=['title'=>$title,'email'=>$email];

            Mail::send('Email.orderemail',$data,function($message)use($emaildata){
                $message->from(env('MAIL_USERNAME'))->subject($emaildata['title']);
                $message->to($emaildata['email']);
            });


        }

        if ($request->status == 2) {
            $data=array('status'=>$request->status,'confirmed_at'=>date('Y-m-d h:i:s'));
            Order::where('id',$request->id)->update($data);

            $message = "".$status->product_name." has been confirmed";
        }

        if ($request->status == 3) {
            $data=array('status'=>$request->status,'shipped_at'=>date('Y-m-d h:i:s'));
            Order::where('id',$request->id)->update($data);

            $message = "".$status->product_name." has been shipped";
        }

        if ($request->status == 4) {
            $data=array('status'=>$request->status,'delivered_at'=>date('Y-m-d h:i:s'));
            Order::where('id',$request->id)->update($data);

            $message = "".$status->product_name." has been delivered";

            if ($status->payment_type == 1) {
                $getvendordata=User::select('wallet')
                ->where('id',$status->vendor_id)
                ->first();
                if ($getvendordata->wallet > 0) {
                    $vendorwallet = $getvendordata->wallet + $status->order_total;
                } elseif ($getvendordata->wallet < 0) {
                    $vendorwallet = $getvendordata->wallet + $status->order_total;
                } else {
                    $vendorwallet = 0;
                }
                $UpdateWalletDetails = User::where('id', $status->vendor_id)
                ->update(['wallet' => $vendorwallet]);
            }
        }


        if ($request->status == 5) {

            if ($status->payment_type != "1") {
                $walletdata=User::select('wallet')->where('id',$status->user_id)->first();

                if ($walletdata->wallet >= 0) {
                    $walletamount = $walletdata->wallet + $status->order_total;
                } elseif ($walletdata->wallet <= 0) {
                    $walletamount = $walletdata->wallet + $status->order_total;
                } else {
                    $walletamount = 0;
                }

                $UpdateWalletDetails = User::where('id', $status->user_id)
                ->update(['wallet' => $walletamount]);

                $Wallet = new Transaction;
                $Wallet->user_id = $status->user_id;
                $Wallet->order_id = $request->id;
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

            $data=array('status'=>$request->status,'cancelled_at'=>date('Y-m-d h:i:s'));
            Order::where('id',$request->id)->update($data);
            $message = "".$status->product_name." has been cancelled by vendor";
        }

        if ($data) {

            $notification=array('user_id'=>$status->user_id,'order_id'=>$request->id,'order_number'=>$status->order_number,'order_status'=>$request->status,'message'=>$message,'is_read'=>"1",'type'=>"order");
            $store=Notification::create($notification);

            return 1000;
        } else {
            return 2000;
        }
    }

    
}
