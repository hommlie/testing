<?php

namespace App\Http\Controllers\Admin;
use Carbon\Carbon;
use App\Models\Order;
use App\Models\Products;
use App\Models\Customers;
use App\Models\Employees;

class HomeController
{

    public function index()
    {
        abort_unless(\Gate::allows('home_access'), 403);
        
        // Get the count of customers, orders, employees, and products
        $customerCount = Customers::count();
        $orderCount = Order::count();
        $employeeCount = Employees::count();
        $productCount = Products::count();
    
        // Get the count of today's orders
        $todayOrderCount = Order::whereDate('created_at', Carbon::today())->count();
    
        // Get the count of tomorrow's orders
        $tomorrowOrderCount = Order::whereDate('created_at', Carbon::tomorrow())->count();
    
        $data = Order::select(
            \DB::raw('MAX(id) as id'),
            'order_number',
            \DB::raw('MAX(vendor_id) as vendor_id'),
            \DB::raw('MAX(order_notes) as order_notes'),
            \DB::raw('MAX(full_name) as full_name'),
            \DB::raw('MAX(email) as email'),
            \DB::raw('MAX(mobile) as mobile'),
            \DB::raw('MAX(landmark) as landmark'),
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
        ->take(10)
        ->get();
    
        // Pass the data to the view
        return view('home', compact('customerCount', 'orderCount', 'employeeCount', 'productCount', 'todayOrderCount', 'tomorrowOrderCount', 'data'));
    }
    
    
}
