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
    public function index(Request $request)
    {
        abort_unless(\Gate::allows('gantt_access'), 403);

        $today = Carbon::today()->toDateString();
        $startOfMonth = Carbon::today()->startOfMonth()->toDateString();
        $startOfYear = Carbon::today()->startOfYear()->toDateString();

        $data = Employees::with([
            'orders' => function ($q) use ($today) {
                $q->with([
                    'user',
                    'variationDetails',
                    'attributeDetails',
                    'serviceCenter',
                    'businessRegion',
                ])
                    ->whereDate('desired_date', $today);
            },
            'location'
        ])
            ->where('status', 1)
            ->orderBy('id', 'desc')
            ->select('employees.*')
            ->selectSub(function ($q) use ($today) {
                $q->from('emp_verified_attendence')
                    ->selectRaw('COALESCE(SUM(totaldistance),0)')
                    ->whereColumn('emp_verified_attendence.emp_id', 'employees.id')
                    ->whereDate('date', $today);
            }, 'meters_today')
            ->selectSub(function ($q) use ($startOfMonth, $today) {
                $q->from('emp_verified_attendence')
                    ->selectRaw('COALESCE(SUM(totaldistance),0)')
                    ->whereColumn('emp_verified_attendence.emp_id', 'employees.id')
                    ->whereBetween('date', [$startOfMonth, $today]);
            }, 'meters_month')
            ->selectSub(function ($q) use ($startOfYear, $today) {
                $q->from('emp_verified_attendence')
                    ->selectRaw('COALESCE(SUM(totaldistance),0)')
                    ->whereColumn('emp_verified_attendence.emp_id', 'employees.id')
                    ->whereBetween('date', [$startOfYear, $today]);
            }, 'meters_year')

            ->get()
            ->map(function ($emp) {
                $emp->km_today = round($emp->meters_today / 1000, 2);
                $emp->km_month = round($emp->meters_month / 1000, 2);
                $emp->km_year = round($emp->meters_year / 1000, 2);
                return $emp;
            });

        $dispatchedCount = Order::where('order_status', 2)->whereDate('desired_date', $today)->count();
        $onsiteCount = Order::where('order_status', 3)->whereDate('desired_date', $today)->count();
        $completedCount = Order::where('order_status', 4)->whereDate('desired_date', $today)->count();
        $incompleteCount = Order::where('order_status', 5)->whereDate('desired_date', $today)->count();
        $scheduledCount = Order::where('order_status', 1)->whereDate('desired_date', $today)->count();

        return view('admin.gantt.index', compact(
            'data',
            'dispatchedCount',
            'onsiteCount',
            'completedCount',
            'incompleteCount',
            'scheduledCount',
            'today'
        ));
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
