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
            \DB::raw('MAX(is_booked_by) as is_booked_by'),
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

        $data1 = Order::all();
        // return response()->json($data1);
        return view('admin.orders.index', compact('data', 'data1'));

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
            'order_status' => 2,

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
        $userdata = User::where('id', Auth::user()->id)->get();
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
        return view('admin.orders.edit', compact('data', 'userdata', 'category', 'subcategory', 'product', 'order_info', 'order_data', 'getCategoryId', 'businessregion', 'employees'));
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




    // ADD ORDER 
    public function storeorder(Request $request)
    {
        // VALIDATION 
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

        // ADD ATTRIBUTE
        if ($request->has('attribute')) {
            $attributes = $request->input('attribute');
            list($serviceId, $productId) = explode('|', $attributes);
        }
        // ADD LOCATION
        if ($request->has('clatlon')) {
            $clatlon = $request->input('clatlon');
            list($latitude, $longitude) = explode(',', $clatlon);
        }

        // TECHNICIAN ASSIGN 
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
                    'is_booked_by' => 1,
                    'created_at' => date('Y-m-d'),

                ];
                DB::table('orders')->insert($dataval);
            }
        } else {
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
                'is_booked_by' => 1,
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
        // TECHNICIAN ASSIGN 
        if (!$request->technicianAssign == '') {
            $ORST = '2'; // ORDER STATUS STORE 2 IN DATABASE 
        } else {
            $ORST = '1';
        }

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
            'order_status' => $ORST,
            'desired_date' => $request->desired_date,
            'desired_time' => $request->desired_time,
            'house_number' => $request->houseNo,
            'assigned_to' => $request->technicianAssign,
        ];
        $order->update($dataval);
        return redirect('admin/orders')->with('success', 'Order updated successfully.');
    }


    // IMPORT ORDER DATA 
    public function importOrderData()
    {
        return view('admin.orders.import-order-data');
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

    // UPDATE ORDER STATUS
    public function updateStatus(Request $request)
    {
        $order = Order::find($request->order_id);
        if ($order) {
            $order->order_status = $request->order_status;
            $order->save();
            return response()->json(['success' => true]);
        }
        return response()->json(['success' => false]);
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
        $coupons = Coupons::whereIn('cat_id', [$categoryId, 0, ""])
            ->orWhereNull('cat_id')
            ->where('status', 1)
            ->get();
        return response()->json($coupons);
    }



    // IMPORT ORDER DATA USING EXCEL FILE 
    public function storeOrderDataExcel(Request $request)
    {
       
        $request->validate([
            'orderData' => 'required|mimes:csv,txt|max:2048',
        ]);
        $file = $request->file('orderData');
        $filePath = $file->storeAs('uploads', $file->getClientOriginalName(), 'public');
        $absoluteFilePath = storage_path('app/public/uploads/' . $file->getClientOriginalName());
        $data = array_map('str_getcsv', file($absoluteFilePath));
        if (empty($data)) {
            return redirect()->back()->withErrors(['error' => 'The file is empty or invalid.']);
        }
        $header = array_map('trim', array_shift($data));
        $requiredColumns = [
            'product_name',
            'service_center_type',
            'billing',
            'account_type',
            'account_sub_type',
            'business_region',
            'business_sub_region',
            'customer_type',
            'business_lead',
            'bill_to_Name',
            'product_name',
            'variation',
            'select_area',
            'no_of_services',
            'scheduled_every',
            'qty',
            'price',
            'tax',
            'order_total',
            'payment_type',
            'desired_date',
            'desired_time',
            'full_name',
            'email',
            'mobile',
            'landmark',
            'street_address',
            'house_number',
            'pincode',
            'remark',
        ];

        $missingColumns = array_diff($requiredColumns, $header);
        if (!empty($missingColumns)) {
            return redirect()->back()->withErrors(['error' => 'Missing required columns: ' . implode(', ', $missingColumns)]);
        }
        $extraColumns = array_diff($header, $requiredColumns);
        if (!empty($extraColumns)) {
            return redirect()->back()->withErrors(['error' => 'The CSV file contains extra columns: ' . implode(', ', $extraColumns)]);
        }
        $file = $request->file('orderData');
        $filePath = $file->storeAs('uploads', $file->getClientOriginalName(), 'public');
        $absoluteFilePath = storage_path('app/public/uploads/' . $file->getClientOriginalName());
        if (!file_exists($absoluteFilePath) || filesize($absoluteFilePath) === 0) {
            return redirect()->back()->withErrors(['error' => 'The file is empty or invalid.']);
        }
        $fileContent = file($absoluteFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if (!$fileContent || count($fileContent) < 2) {
            return redirect()->back()->withErrors(['error' => 'CSV file has no data.']);
        }

        $data = array_map('str_getcsv', $fileContent);
      
        $headers = array_map('trim', $data[0]);
        unset($data[0]);
         
        $errorMessages = [];
        foreach ($data as $row) {
    
            if (count(array_filter($row, fn($v) => trim($v) !== '')) === 0) {
                continue;
            }


            $headerCount = count($headers);
            $rowCount = count($row);

            if ($rowCount < $headerCount) {

                $row = array_pad($row, $headerCount, null);
            } elseif ($rowCount > $headerCount) {
                $errorMessages[] = "Row has {$rowCount} columns but you expected {$headerCount}: " . implode(', ', $row);
                continue;
            }
            $rowData = array_combine($headers, $row);
            $product_name = $rowData['product_name'] ?? null;
            
            $variation_name = strtolower($rowData['variation'] ?? '');
            $select_area = strtolower($rowData['select_area'] ?? '');
            $business_region = strtolower($rowData['business_region'] ?? '');
            $business_sub_region = strtolower($rowData['business_sub_region'] ?? '');
            $serviceCenterType = strtolower(str_replace(' ', '', $rowData['service_center_type'] ?? ''));
            $billing = strtolower(str_replace(' ', '', $rowData['billing'] ?? ''));
            $accountType = strtolower(str_replace(' ', '', $rowData['account_type'] ?? ''));
            $accountSubType = strtolower(str_replace(' ', '', $rowData['account_sub_type'] ?? ''));
            $srTime = (int) ($rowData['no_of_services'] ?? 1);
            
            $srInterval = $rowData['scheduled_every'] ?? null;

             $product_id = Products::where('product_name', 'LIKE', "%{$product_name}%")
                      ->value('id');
          
        

            if (!$product_id) {
                $errorMessages[] = "Product {$product_name} not found in row: " . implode(", ", $row);
                continue;
            }
            if ($product_id) {
                
                $attributeIDs = Variation::where('product_id', $product_id)->pluck('attribute_id')->toArray();
                if (empty($attributeIDs)) {
                    $errorMessages[] = "No attributes found for product ID $product_id in row: " . implode(", ", $row);
                    continue;
                }
                if (!empty($attributeIDs)) {
                        
                    $attributes = Attribute::whereIn('id', $attributeIDs)->pluck('attribute', 'id')->toArray();
                    $lowercasedAttributes = array_change_key_case(array_flip(array_map('strtolower', $attributes)), CASE_LOWER);
                    
                    if (array_key_exists($variation_name, $lowercasedAttributes)) {
                        $matchedAttributeID = $lowercasedAttributes[$variation_name];
                        $varName = Variation::where('attribute_id', $matchedAttributeID)
                            ->where('product_id', $product_id)
                            ->pluck('variation', 'id')->toArray();
                        $lowercaseVarName = array_change_key_case(array_flip(array_map('strtolower', $varName)), CASE_LOWER);
                        if (array_key_exists($select_area, $lowercaseVarName)) {
                            $matchedVariationID = $lowercaseVarName[$select_area];

                            $businessRegionID = Business_region::where('state', 'LIKE', "%$business_region%")->value('id');
                            if (!$businessRegionID) {
                                $errorMessages[] = "Business region not found in row: " . implode(", ", $row);
                                continue;
                            }
                            if (!$businessRegionID) {
                                $errorMessages[] = "Business region not found in row: " . implode(", ", $row);
                                continue;
                            }
                            if (!$businessRegionID) {
                                $errorMessages[] = "Business region not found in row: " . implode(", ", $row);
                                continue;
                            }
                            if (!$businessRegionID) {
                                $errorMessages[] = "Business region not found in row: " . implode(", ", $row);
                                continue;
                            }

                            if ($businessRegionID) {
                                $branches = ServicesCenter::where('region_id', $businessRegionID)->get(['id', 'branch_name', 'branch_code']);

                                if ($branches->isEmpty()) {
                                    $errorMessages[] = "No service centers found for the specified region in row: " . implode(", ", $row);
                                    continue; // Skip this row
                                }
                                $lowerCasebranchName = [];
                                foreach ($branches as $branch) {
                                    $lowerCasebranchName[strtolower($branch->branch_name)] = [
                                        'id' => $branch->id,
                                        'branch_code' => $branch->branch_code
                                    ];
                                }

                                // Check if sub-region matches any branch
                                if (array_key_exists(strtolower($business_sub_region), $lowerCasebranchName)) {
                                    $serviceCenter = $lowerCasebranchName[strtolower($business_sub_region)];
                                    $serviceCenterID = $serviceCenter['id'];
                                    $branchCode = $serviceCenter['branch_code'];

                                    // Validate service center type, billing type, and account type
                                    $validServiceCenterTypes = ["hommlie", "vendor", "franchisee"];
                                    $validBillingTypes = ["headoffice", "regionaloffice", "branchoffice"];
                                    $validAccountTypes = ["individual", "bulkbooking"];
                                    $validAccountSubTypeIndividual = ["residentialorder"];
                                    $validAccountSubTypeBulk = ["education&institute", "flat/housingsociety", "government", "housingsociety", "builder", "vip"];

                                    if (!in_array($serviceCenterType, $validServiceCenterTypes)) {
                                        $errorMessages[] = "Service center type is invalid in row: " . implode(", ", $row);
                                        continue; // Skip this row
                                    }
                                    if (!in_array($billing, $validBillingTypes)) {
                                        $errorMessages[] = "Billing type is invalid in row: " . implode(", ", $row);
                                        continue; // Skip this row
                                    }
                                    if (!in_array($accountType, $validAccountTypes)) {
                                        $errorMessages[] = "Account type is invalid in row: " . implode(", ", $row);
                                        continue; // Skip this row
                                    }
                                    if ($accountType === "individual" && !in_array($accountSubType, $validAccountSubTypeIndividual)) {
                                        $errorMessages[] = "Account sub-type is invalid for individual account type in row: " . implode(", ", $row);
                                        continue; // Skip this row
                                    }
                                    if ($accountType === "bulkbooking" && !in_array($accountSubType, $validAccountSubTypeBulk)) {
                                        $errorMessages[] = "Account sub-type is invalid for bulk booking account type in row: " . implode(", ", $row);
                                        continue; // Skip this row
                                    }
                                } else {
                                    $errorMessages[] = "Business sub-region not found in row: " . implode(", ", $row);
                                    continue;
                                }
                                $lastOrder = Order::orderBy('id', 'desc')->first();
                                $newOrderNumber = $lastOrder ? intval($lastOrder->order_number) + 1 : 10001;
                              
                                if ($srTime > 1) {
                                   
                                    $splitPrice = $rowData['price'] / $srTime;
                                    $splitTax = $rowData['tax'] ?? null / $srTime;
                                    // $splitcouponsprice = $request->couponsprice / $srTime;
                                    $initialDate = Carbon::parse($rowData['desired_date'] ?? null);

                                    for ($i = 0; $i < $srTime; $i++) {
                                        $orderDate = $initialDate->copy()->addDays($i * $srInterval)->toDateString();
                                        $dataval = [
                                            'vendor_id' => "6",
                                            'product_id' => $product_id,
                                            'order_number' => $newOrderNumber,
                                            'product_name' => $product_name,
                                            'service_center_type' => $serviceCenterType,
                                            'billing' => $billing,
                                            'account_type' => $accountType,
                                            'account_sub_type' => $accountSubType,
                                            'business_region' => $businessRegionID,
                                            'business_sub_region' => $serviceCenterID,
                                            'branch_code' => $branchCode,
                                            'customer_type' => $rowData['customer_type'] ?? null,
                                            'business_lead' => $rowData['business_lead'] ?? null,
                                            'bill_to_Name' => $rowData['bill_to_Name'] ?? null,
                                            'image' => $rowData['full_name'] ?? null,
                                            'qty' => $rowData['qty'] ?? null,
                                            'price' => $splitPrice * (int) $rowData['qty'] ?? 0,
                                            'tax' => $splitTax * (int) $rowData['qty'] ?? 0,
                                            'order_total' => $rowData['order_total'] ?? 00,
                                            'attribute' => $matchedAttributeID,
                                            'variation' => $matchedVariationID,
                                            'payment_type' => "1",
                                            'full_name' => $rowData['full_name'] ?? null,
                                            'email' => $rowData['email'] ?? null,
                                            'mobile' => $rowData['mobile'] ?? null,
                                            'landmark' => mb_convert_encoding($rowData['landmark'] ?? '', 'UTF-8', 'ISO-8859-1'),
                                           'street_address' => mb_convert_encoding($rowData['street_address'] ?? '', 'UTF-8', 'ISO-8859-1'),
                                            'house_number' => mb_convert_encoding($rowData['house_number'] ?? '', 'UTF-8', 'ISO-8859-1'),
                                            'pincode' => $rowData['pincode'] ?? null,
                                            'status' => "1",
                                            'desired_date' => $orderDate,
                                            'desired_time' => '00:00',
                                            'is_booked_by' => 1,
                                            'remark' => 1,
                                            'created_at' => date('Y-m-d'),
                                        ];
                                        DB::table('orders')->insert($dataval);
                                     
                                    }
                                } else {
                                   
                                    $dataval = [
                                        'vendor_id' => "6",
                                        'product_id' => $product_id,
                                        'order_number' => $newOrderNumber,
                                        'product_name' => $product_name,
                                        'service_center_type' => $serviceCenterType,
                                        'billing' => $billing,
                                        'account_type' => $accountType,
                                        'account_sub_type' => $accountSubType,
                                        'business_region' => $businessRegionID,
                                        'business_sub_region' => $serviceCenterID,
                                        'branch_code' => $branchCode,
                                        'customer_type' => $rowData['customer_type'] ?? null,
                                        'business_lead' => $rowData['business_lead'] ?? null,
                                        'bill_to_Name' => $rowData['bill_to_Name'] ?? null,
                                        'image' => $rowData['full_name'] ?? null,
                                        'qty' => $rowData['qty'] ?? null,
                                        'price' => ($rowData['price'] ?? 0) * ($rowData['qty'] ?? 0),
                                        // 'coupon_name' => $request->coupons,
                                        // 'discount_amount' => $request->couponsprice,
                                        'attribute' => $matchedAttributeID,
                                        'variation' => $matchedVariationID,
                                        'tax' => ($rowData['tax'] ?? 0) * ($rowData['qty'] ?? 0),
                                        'order_total' => $rowData['order_total'] ?? 000,
                                        'payment_type' => "1",
                                        'full_name' => $rowData['full_name'] ?? null,
                                        'email' => $rowData['email'] ?? null,
                                        'mobile' => $rowData['mobile'] ?? null,
                                        'landmark' => mb_convert_encoding($rowData['landmark'] ?? '', 'UTF-8', 'ISO-8859-1'),
                                        'street_address' => mb_convert_encoding($rowData['street_address'] ?? '', 'UTF-8', 'ISO-8859-1'),
                                        'house_number' =>  mb_convert_encoding($rowData['house_number'] ?? '', 'UTF-8', 'ISO-8859-1'),
                                        'pincode' => $rowData['pincode'] ?? null,
                                        'status' => "1",
                                        'desired_date' => $rowData['desired_date'] ?? null,
                                        'desired_time' => '00:00',
                                        'is_booked_by' => 1,
                                        'remark' => 1,
                                        'created_at' => date('Y-m-d'),
                                        
                                    ];
                                    Order::create($dataval);
                                }
                            }
                        }
                    }else{
                        $errorMessages[] = "Attribute “suraj gupta ” not found in row: " . implode(', ', $row);
                        break;
                    }
                }
            }

        }
        if (!empty($errorMessages)) {
            return redirect()->back()->withErrors($errorMessages);
        }
        return redirect()->back()->with('success', 'Orders have been successfully imported.');
    }
}


