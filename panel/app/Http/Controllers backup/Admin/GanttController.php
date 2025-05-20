<?php
namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Hash;
use Session;
use Validator;
use App\Models\User;
use App\Models\Employees;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use App\Models\Location;
use App\Models\Order;
use App\Models\Permissions;
use App\Models\Timeslot;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Carbon\Carbon;

class GanttController extends Controller
{
    public function index()
    {
        abort_unless(\Gate::allows('gantt_access'), 403);

        $today = Carbon::today()->toDateString();

        $data = Employees::with([
            'orders' => function ($q) use ($today) {
                $q->with(['user', 'variationDetails', 'attributeDetails','serviceCenter','businessRegion'])
                    ->whereDate('desired_date', $today);
            },
            'location'
        ])
            ->where('is_active', 1)
            ->where('status', 1)
            ->orderBy('id', 'desc')
            ->get();



        $dispatchedCount = Order::where('order_status', 2)->whereDate('desired_date', $today)->count();
        $onsiteCount = Order::where('order_status', 3)->whereDate('desired_date', $today)->count();
        $completedCount = Order::where('order_status', 4)->whereDate('desired_date', $today)->count();
        $incompleteCount = Order::where('order_status', 5)->whereDate('desired_date', $today)->count();
        $scheduledCount = Order::where('order_status', 1)->whereDate('desired_date', $today)->count();

        return view('admin.gantt.index', compact('data', 'dispatchedCount', 'onsiteCount', 'completedCount', 'incompleteCount', 'scheduledCount', 'today'));
    }

    public function autoAssignOrders()
    {
        $orders = Order::where('order_status', 0)->get();

        foreach ($orders as $order) {
            $desiredTime = Carbon::parse($order->desired_time);
            $desiredDate = Carbon::parse($order->desired_date);

            $employee = Employees::join('timeslots', 'employees.timeslot_id', '=', 'timeslots.id')
                ->where('timeslots.start_time', '<=', $desiredTime->format('H:i:s'))
                ->where('timeslots.end_time', '>=', $desiredTime->format('H:i:s'))
                ->select('employees.*')
                ->first();

            if ($employee) {
                $order->assigned_to = $employee->id;
                $order->order_status = 1;
                $order->save();
            }
        }

        return response()->json(['status' => 'success', 'message' => 'Orders have been auto-assigned.']);
    }
}
