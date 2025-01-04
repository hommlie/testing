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
use App\Models\Attribute;
use App\Models\PrivacyPolicy;
use App\Models\TermsConditions;
use App\Models\Subcategory;
use App\Models\Coupons;
use App\Models\Transaction;
use App\Models\ServicesCenter;
use App\Models\Business_region;
use App\Models\About;
use App\Models\Address;
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
            \DB::raw('MAX(order_total) AS grand_total'),
            \DB::raw('DATE_FORMAT(MAX(created_at), "%d %M %Y") as date'),
            \DB::raw('COUNT(order_number) AS no_products'),
            \DB::raw('GROUP_CONCAT(id) as order_ids')
        )
            ->groupBy('order_number')
            ->orderBy('id', 'DESC')
            ->paginate(10000000000000);

        return view('admin.orders.index', compact('data'));

    }

    public function manualorderassign()
    {

        $data = Order::orderBy('id', 'DESC')->get();
        $employees = Employees::orderBy('id', 'DESC')->get();

        return view('admin.manualorderassign.index', compact('data', 'employees'));


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

        $userdata = User::where('id', Auth::user()->id)->get();
        $category = Category::orderBy('id', 'asc')->get();
        $employees = Employees::orderBy('id', 'DESC')->get();
        $subcategory = Subcategory::orderBy('id', 'asc')->get();
        $businessregion = Business_region::where('status', 1)->orderBy('id', 'asc')->get();
        $serviceCenter = ServicesCenter::orderBy('id', 'asc')->get();
        $product = Products::orderBy('id', 'asc')->get();
        return view('admin.orders.add', compact('category', 'subcategory', 'product', 'employees', 'serviceCenter', 'businessregion', 'userdata'));

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
            'attribute',
            'variation',
            'coupon_id',
            'tax',
            'discount_amount',
            'street_address',
            'pincode',
            'status',
            'service_center_type',
            'employee_name',
            'billing',
            'account_type',
            'account_sub_type',
            'business_region',
            'business_sub_region',
            'branch_code',
            'bill_to_Name',
            'customer_type',
            'business_lead',
            'house_number',
            'assigned_to',
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
            \DB::raw("CONCAT('" . url('/storage/app/public/images/products/') . "/', image) AS image_url"),
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

        // $variations = Order::select(
        //     'orders.product_id',
        //     'variations.discounted_variation_price',
        //     'variations.variation',
        //     'variations.attribute_id'
        // )
        //     ->join('variations', 'orders.product_id', '=', 'variations.product_id')
        //     ->where('orders.id', $id)
        //     ->orderBy('orders.id', 'DESC')
        //     ->get();

        // Additional data

        $data = Order::findOrFail($id);
        $category = Category::orderBy('id', 'asc')->get();
        $variations = Variation::orderBy('id', 'asc')->get();
        $subcategory = Subcategory::orderBy('id', 'asc')->get();
        $product = Products::orderBy('id', 'asc')->get();
        $businessregion = Business_region::where('status', 1)->orderBy('id', 'asc')->get();
        $employees = Employees::orderBy('id', 'DESC')->get();
        // dd($category,$subcategory);

        // $ExplodedVariations = explode(',', $data->variation);

        // return view('admin.orders.edit', compact('data', 'category', 'subcategory', 'product', 'order_info', 'order_data', 'getCategoryId','variations', 'ExplodedVariations','businessregion','employees'));
        return view('admin.orders.edit', compact('data', 'category', 'subcategory', 'product', 'order_info', 'order_data', 'getCategoryId', 'businessregion', 'employees'));
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
        $attid = Variation::where('product_id', $serviceId)
            ->pluck('attribute_id');
        $services = Attribute::whereIn('id', $attid)->get();
        return response()->json([
            'product_id' => $serviceId,
            'services' => $services
        ]);
    }

    // public function getServiceVariationArea($serviceId,$productId)
    // {
    //     $services = Variation::where('product_id', $serviceId)
    //         // ->where('attribute_id', 5)
    //         ->get();
    //     return response()->json($services);
    // }
    public function getServiceVariationArea($serviceId, $productId)
    {
        $services = Variation::where('product_id', $productId)
            ->where('attribute_id', $serviceId)
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


        $this->validate($request, [
            'hidden_quantity' => 'required|integer',
            'hidden_total_price' => 'required|numeric',
            'hidden_tax' => 'required|numeric',
            'hidden_image' => 'required',
            'hidden_product_name' => 'required',
            'serviceCenterType' => 'required',
            'employeeName' => 'required',
            'billing' => 'required',
            'accountType' => 'required',
            'accountSubType' => 'required',
            'businessRegion' => 'required',
            'businessSubRegion' => 'required',
            'branchcode' => 'required',
            'customerType' => 'required',
            'businessLead' => 'required',
            'category' => 'required|integer',
            'subcategory' => 'required|integer',
            'service' => 'required|integer',
            'price' => 'required|numeric',
            'desired_date' => 'required|date',
            'desired_time' => 'required|date_format:H:i',
            'fullname' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'mobile' => 'required|digits:10',
            'landmark' => 'nullable|string|max:255',
            'address' => 'required|string|max:500',
            'bill_to_Name',
            'houseNo' => 'required|string|max:255',
            'pincode' => 'required|digits:6',
            'srTime' => 'required',
            'srInterval' => 'required',
            'clatlon' => 'required',
            'attribute' => 'required',
            'variationsID' => 'required',
            // 'serviceAreaPriceValue' => 'required',
        ]);


        if ($request->has('attribute')) {
            $attributes = $request->input('attribute');
            list($serviceId, $productId) = explode('|', $attributes);
        }

        if ($request->has('clatlon')) {
            $clatlon = $request->input('clatlon');
            list($latitude, $longitude) = explode(',', $clatlon);
        }
        if (!$request->technicianAssign == '') {
            $ORST = '2'; // ORDER STATUS STORE 2 IN DATABASE 
        } else {
            $ORST = '1';
        }

        $attribute = $serviceId;
        $srTime = $request->srTime;
        $srInterval = $request->srInterval;

        $lastOrder = Order::orderBy('id', 'desc')->first();
        $newOrderNumber = $lastOrder ? intval($lastOrder->order_number) + 1 : 10001;

        if ($request->srTime > 1) {
            $splitPrice = $request->price / $request->srTime;
            $splitTax = $request->hidden_tax / $request->srTime;
            $splitcouponsprice = $request->couponsprice / $request->srTime;
            $initialDate = Carbon::parse($request->desired_date);

            for ($i = 0; $i < $request->srTime; $i++) {
                $orderDate = $initialDate->copy()->addDays($i * $request->srInterval)->toDateString();

                $dataval = [
                    'vendor_id' => "6",
                    'product_id' => $request->service,
                    'order_number' => $newOrderNumber,
                    'product_name' => $request->hidden_product_name,
                    'service_center_type' => $request->serviceCenterType,
                    'employee_name' => $request->employeeName,
                    'billing' => $request->billing,
                    'account_type' => $request->accountType,
                    'account_sub_type' => $request->accountSubType,
                    'business_region' => $request->businessRegion,
                    'business_sub_region' => $request->businessSubRegion,
                    'branch_code' => $request->branchcode,
                    'customer_type' => $request->customerType,
                    'business_lead' => $request->businessLead,
                    'bill_to_Name' => $request->billToAccountName,
                    'image' => $request->hidden_image,
                    'qty' => $request->hidden_quantity,
                    'price' => $splitPrice,
                    'coupon_id' => $request->coupons,
                    'discount_amount' => $splitcouponsprice,
                    'attribute' => $attribute,
                    'variation' => $request->variationsID,
                    'tax' => $splitTax,
                    'order_total' => $request->hidden_total_price,
                    'payment_type' => "1",
                    'full_name' => $request->fullname,
                    'email' => $request->email,
                    'mobile' => $request->mobile,
                    'landmark' => $request->landmark,
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'street_address' => $request->address,
                    'house_number' => $request->houseNo,
                    'pincode' => $request->pincode,
                    'status' => "1",
                    'desired_date' => $orderDate,
                    'desired_time' => $request->desired_time,
                    'order_status' => $ORST,
                    'assigned_to' => $request->technicianAssign,
                    'created_at' => date('Y-m-d'),

                ];

                // Insert the record into the database
                DB::table('orders')->insert($dataval); // Replace 'orders' with your table name
            }
        } else {
            // Create a single order if service type is not "AMC"
            $dataval = [
                'vendor_id' => "6",
                'product_id' => $request->service,
                'order_number' => $newOrderNumber,
                'product_name' => $request->hidden_product_name,
                'service_center_type' => $request->serviceCenterType,
                'employee_name' => $request->employeeName,
                'billing' => $request->billing,
                'account_type' => $request->accountType,
                'account_sub_type' => $request->accountSubType,
                'business_region' => $request->businessRegion,
                'business_sub_region' => $request->businessSubRegion,
                'branch_code' => $request->branchcode,
                'customer_type' => $request->customerType,
                'business_lead' => $request->businessLead,
                'image' => $request->hidden_image,
                'qty' => $request->hidden_quantity,
                'price' => $request->price,
                'coupon_name' => $request->coupons,
                'discount_amount' => $request->couponsprice,
                'attribute' => $attribute,
                'variation' => $request->variationsID,
                'tax' => $request->hidden_tax,
                'order_total' => $request->hidden_total_price,
                'payment_type' => "1",
                'full_name' => $request->fullname,
                'email' => $request->email,
                'mobile' => $request->mobile,
                'landmark' => $request->landmark,
                'latitude' => $latitude,
                'longitude' => $longitude,
                'street_address' => $request->address,
                'house_number' => $request->houseNo,
                'pincode' => $request->pincode,
                'status' => "1",
                'desired_date' => $request->desired_date,
                'desired_time' => $request->desired_time,
                'order_status' => $ORST,
                'assigned_to' => $request->technicianAssign,

            ];

            Order::create($dataval);
        }

        return redirect('admin/orders')->with('success', 'Order placed successfully.');
    }




    public function updateorder(Request $request, $id)
    {
        // dd($request->all());
        // Validate the request data
        // try {
        $this->validate($request, [
            'hidden_quantity' => 'required|integer',
            'hidden_tax' => 'required|numeric',
            'hidden_image' => 'required',
            'hidden_product_name' => 'required',
            'serviceCenterType' => 'required',
            'employeeName' => 'required',
            'billing' => 'required',
            'accountType' => 'required',
            'accountSubType' => 'required',
            'businessRegion' => 'required',
            'businessSubRegion' => 'required',
            'branchcode' => 'required',
            'customerType' => 'required',
            'category' => 'required|integer',
            'subcategory' => 'required|integer',
            'service' => 'required|integer',
            'price' => 'required',
            'desired_date' => 'required|date',
            'desired_time' => 'required|date_format:H:i',
            'fullname' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'mobile' => 'required|digits:10',
            'landmark' => 'nullable|string|max:255',
            'address' => 'required|string|max:500',
            'houseNo' => 'required|string|max:255',
            'pincode' => 'required|digits:6',
            'srTime' => 'required',
            'srInterval' => 'required',
            'clatlon' => 'required',
            'attribute' => 'required',
            'variationsID' => 'required',
        ]);

        // } catch (\Illuminate\Validation\ValidationException $e) {
        //     return response()->json([
        //         'error' => 'Validation failed',
        //         'messages' => $e->validator->errors()
        //     ], 422);
        // }

        if ($request->has('clatlon')) {
            $clatlon = $request->input('clatlon');
            list($latitude, $longitude) = explode(',', $clatlon);
        }


        $order = Order::find($id);

        if (!$order) {
            return redirect()->back()->with('danger', 'Order not found.');
        }
        $dataval = [
            'service_center_type' => $request->serviceCenterType,
            'employee_name' => $request->employeeName,
            'billing' => $request->billing,
            'account_type' => $request->accountType,
            'account_sub_type' => $request->accountSubType,
            'business_region' => $request->businessRegion,
            'business_sub_region' => $request->businessSubRegion,
            'branch_code' => $request->branchcode,
            'customer_type' => $request->customerType,
            'full_name' => $request->fullname,
            'bill_to_Name' => $request->billToAccountName,
            'email' => $request->email,
            'mobile' => $request->mobile,
            'landmark' => $request->landmark,
            'latitude' => $latitude,
            'longitude' => $longitude,
            'street_address' => $request->address,
            'pincode' => $request->pincode,
            'desired_date' => $request->desired_date,
            'desired_time' => $request->desired_time,
            'house_number' => $request->houseNo,
        ];
        $order->update($dataval);
        return redirect('admin/orders')->with('success', 'Order updated successfully.');
    }


    public function search(Request $request)
    {

        $data = Order::with(['vendors'])->select('order_number', 'vendor_id', 'order_notes', 'full_name', 'email', 'mobile', 'landmark', 'street_address', 'pincode', 'status', \DB::raw('SUM(order_total) AS grand_total'), \DB::raw('DATE_FORMAT(created_at, "%d %M %Y") as date'), \DB::raw('count(order_number) AS no_products'))
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

        return view('admin.orders.index', compact('data'));

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
            'bill_to_Name',
            'email',
            'mobile',
            'landmark',
            'attribute',
            'street_address',
            'pincode',
            'status',
            'order_status',
            'desired_time',
            'desired_date',
            'is_otp_verified',
            'order_total',
            'discount_amount',
            'house_number',
            \DB::raw('DATE_FORMAT(created_at, "%d-%m-%Y") as date')
        )
            ->where('order_number', $id)
            ->first();

        // Fetch aggregated order data separately
        $aggregated_order_info = Order::select(
            \DB::raw('SUM(price) AS subtotal'),
            \DB::raw('SUM(tax) AS tax'),
            \DB::raw('SUM(shipping_cost) AS shipping_cost'),
            \DB::raw('SUM(order_total) AS grand_total'),
            \DB::raw('SUM(discount_amount) AS grand_discount_amount')
        )
            ->where('order_number', $id)
            ->first();

        // Merge aggregated info into $order_info
        if ($order_info && $aggregated_order_info) {
            $order_info->subtotal = $aggregated_order_info->subtotal;
            $order_info->tax = $aggregated_order_info->tax;
            $order_info->shipping_cost = $aggregated_order_info->shipping_cost;
            $order_info->grand_total = $aggregated_order_info->grand_total;
            $order_info->grand_discount_amount = $aggregated_order_info->grand_discount_amount;
        }

        $aboutData = About::first();
        $policyData = PrivacyPolicy::first();
        $conditionsData = TermsConditions::first();
        $variData = Variation::orderBy('id', 'asc')->get();
        $attrData = Attribute::orderBy('id', 'asc')->get();



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
            'attribute',
            'desired_time',
            'desired_date',
            'is_otp_verified',
            'order_total',
            \DB::raw('(CASE WHEN variation IS NULL THEN "" ELSE variation END) AS variation'),
            \DB::raw("CONCAT('" . url('/storage/app/public/images/products/') . "/', image) AS image_url"),
            'shipping_cost'
        )
            ->where('order_number', $id)
            ->orderBy('id', 'DESC')
            ->get();

        return view('admin.orders.order-details', compact('order_info', 'order_data', 'aboutData', 'policyData', 'conditionsData', 'variData', 'attrData'));
    }

    // public function delete()
    // {
    //     $data=Order::where('vendor_id',Auth::user()->id)->get();
    //     return view('admin.orders.index',compact('data'));
    // }

    public function changeStatus(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'status' => 'required',
        ]);

        //$checkmobile=User::where('id',$request->id)->first();

        $status = Order::select('order_total', 'product_name', 'payment_id', 'user_id', 'vendor_id', 'payment_type', 'order_number')
            ->where('id', $request->id)
            ->first();

        $userData = User::where('id', $status->user_id)->first();
        $email = $userData->email;
        $name = $userData->name;

        if ($request->status == 1) {
            $data = array('status' => $request->status, 'cancelled_at' => date('Y-m-d h:i:s'));
            Order::where('id', $request->id)->update($data);

            $message = "Order " . $order_number . " has been placed";

            $title = "Order Placed Successfully";
            $ordermessage = $message;
            $emaildata = ['title' => $title, 'email' => $email];

            Mail::send('Email.orderemail', $data, function ($message) use ($emaildata) {
                $message->from(env('MAIL_USERNAME'))->subject($emaildata['title']);
                $message->to($emaildata['email']);
            });


        }

        if ($request->status == 2) {
            $data = array('status' => $request->status, 'confirmed_at' => date('Y-m-d h:i:s'));
            Order::where('id', $request->id)->update($data);

            $message = "" . $status->product_name . " has been confirmed";
        }

        if ($request->status == 3) {
            $data = array('status' => $request->status, 'shipped_at' => date('Y-m-d h:i:s'));
            Order::where('id', $request->id)->update($data);

            $message = "" . $status->product_name . " has been shipped";
        }

        if ($request->status == 4) {
            $data = array('status' => $request->status, 'delivered_at' => date('Y-m-d h:i:s'));
            Order::where('id', $request->id)->update($data);

            $message = "" . $status->product_name . " has been delivered";

            if ($status->payment_type == 1) {
                $getvendordata = User::select('wallet')
                    ->where('id', $status->vendor_id)
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
                $walletdata = User::select('wallet')->where('id', $status->user_id)->first();

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


                $getvendordata = User::select('wallet')
                    ->where('id', $status->vendor_id)
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

            $data = array('status' => $request->status, 'cancelled_at' => date('Y-m-d h:i:s'));
            Order::where('id', $request->id)->update($data);
            $message = "" . $status->product_name . " has been cancelled by vendor";
        }

        if ($data) {

            $notification = array('user_id' => $status->user_id, 'order_id' => $request->id, 'order_number' => $status->order_number, 'order_status' => $request->status, 'message' => $message, 'is_read' => "1", 'type' => "order");
            $store = Notification::create($notification);

            return 1000;
        } else {
            return 2000;
        }
    }


    //============================================================================================

    // SERACH ORDER DATA USING ORDER-ID 
    public function getOrderData($orderID)
    {
      
        $orderData = Order::where('order_number', 'LIKE', "%$orderID%")
                          ->orWhere('id', 'LIKE', "%$orderID%")
                          ->get();
        return response()->json($orderData);
    }
    



    // ADD BUSINESS REGION
    public function businessStore(Request $request)
    {
        $validated = $request->validate([
            'regionName' => 'required|string|max:255',
            'stateName' => 'required|string|max:255',
        ]);

        $regionName = strtolower($validated['regionName']);
        $stateName = strtolower($validated['stateName']);

        $existingRegion = Business_region::whereRaw('LOWER(zone) = ?', [$regionName])
            ->whereRaw('LOWER(state) = ?', [$stateName])
            ->exists();

        if ($existingRegion) {
            return redirect()->back()->with('danger', 'This region and state combination already exists.');
        }

        $existingRegionName = Business_region::whereRaw('LOWER(zone) = ?', [$regionName])->exists();
        $existingStateName = Business_region::whereRaw('LOWER(state) = ?', [$stateName])->exists();

        if ($existingRegionName) {
            return redirect()->back()->with('danger', 'This region already exists.');
        }

        if ($existingStateName) {
            return redirect()->back()->with('danger', 'This state already exists.');
        }

        $businessRegion = new Business_region();
        $businessRegion->zone = $validated['regionName'];
        $businessRegion->state = $validated['stateName'];
        $businessRegion->status = 1;
        $businessRegion->save();

        return redirect()->back()->with('success', 'Region saved successfully!');
    }

    public function viewBusinessRegion()
    {
        $businessregion = Business_region::orderBy('id', 'asc')->get();
        return view('admin.orders.region', compact('businessregion'));


    }

    public function UpdateBusinessRegion(Request $request, $id)
    {
        $validated = $request->validate([
            'regionName' => 'required|string|max:255',
            'stateName' => 'required|string|max:255',
        ]);

        $regionName = strtolower($validated['regionName']);
        $stateName = strtolower($validated['stateName']);

        $existingRegion = Business_region::whereRaw('LOWER(zone) = ?', [$regionName])
            ->whereRaw('LOWER(state) = ?', [$stateName])
            ->where('id', '!=', $id)
            ->exists();

        if ($existingRegion) {
            return redirect()->back()->with('danger', 'This region and state combination already exists.');
        }

        $existingRegionName = Business_region::whereRaw('LOWER(zone) = ?', [$regionName])
            ->where('id', '!=', $id)
            ->exists();

        $existingStateName = Business_region::whereRaw('LOWER(state) = ?', [$stateName])
            ->where('id', '!=', $id)
            ->exists();

        if ($existingRegionName) {
            return redirect()->back()->with('danger', 'This region already exists.');
        }

        if ($existingStateName) {
            return redirect()->back()->with('danger', 'This state already exists.');
        }

        Business_region::where('id', $id)->update([
            'zone' => $validated['regionName'],
            'state' => $validated['stateName'],
            'status' => 1, // Status remains active
        ]);

        return redirect()->back()->with('success', 'Region updated successfully!');
    }




    // GENTARE BRANCH CODE AUTOMATIC 
    public function getbranchcode()
    {

        $lastBranch = ServicesCenter::latest('id')->first();
        $lastBranchCode = $lastBranch ? $lastBranch->branch_code : 'HM-000';
        $branchCodeNumber = (int) substr($lastBranchCode, 3) + 1;
        $branchCode = 'HM-' . str_pad($branchCodeNumber, 3, '0', STR_PAD_LEFT);
        return response()->json(['branch_code' => $branchCode]);
    }

    // FETCH SERVICE CENTER DATA BASED ON REGION ID
    public function getServiceCenter($regionId)
    {
        $services = ServicesCenter::where('region_id', $regionId)->get();
        return response()->json($services);
    }


    // ADD SERVICES CENTER 
    public function serviceStore(Request $request)
    {
        $validated = $request->validate([
            'region_name' => 'required|integer',
            'branch_name' => 'required|string',
            'branch_code' => 'required|string|unique:services_center',
            'office_address' => 'required|string',
            'gstn' => 'nullable|string',
            'agri_licence' => 'nullable|string',
            'shop_establishment' => 'nullable|string',
            'contact_person_name' => 'required|string',
            'contact_number' => 'required|string',
            'email_id' => 'nullable|email',
        ]);

        $serviceCenter = new ServicesCenter();
        $serviceCenter->region_id = $validated['region_name'];
        $serviceCenter->branch_name = $validated['branch_name'];
        $serviceCenter->branch_code = $validated['branch_code'];
        $serviceCenter->office_address = $validated['office_address'];
        $serviceCenter->gstn = $validated['gstn'];
        $serviceCenter->agri_licence = $validated['agri_licence'];
        $serviceCenter->shop_establishment = $validated['shop_establishment'];
        $serviceCenter->contact_person_name = $validated['contact_person_name'];
        $serviceCenter->contact_number = $validated['contact_number'];
        $serviceCenter->email_id = $validated['email_id'];

        $serviceCenter->save();

        return redirect()->back()->with('success', 'Service center added successfully!');
    }

    public function viewServicesCenter()
    {
        $serviceCenter = ServicesCenter::orderBy('id', 'asc')->get();
        return view('admin.orders.services-center', compact('serviceCenter'));
    }

    // GET EXISTING CUSTOMER DETAILS (Name, Pincode, Mobile number, Pincode)
    public function getCustomerData($cusID)
    {

        $address = Address::where('mobile', 'LIKE', "%$cusID%")->get();
        return response()->json($address);

    }

    // GET COPUNS DETAILS
    public function getCoupons($categoryId)
    {
        $coupons = Coupons::whereIn('cat_id', [$categoryId, 0])
            ->where('status', 1)
            ->get();
        return response()->json($coupons);
    }

}
