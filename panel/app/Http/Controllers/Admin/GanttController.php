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
    /**
     * Display the Gantt chart, filtered by date range and optional status.
     */
    public function index(Request $request)
    {
        abort_unless(\Gate::allows('gantt_access'), 403);

        // 1) Read filter inputs, defaulting both to today
        $fromDate  = $request->input('from_date', Carbon::today()->toDateString());
        $toDate    = $request->input('to_date',   $fromDate);
        $jobFilter = $request->input('job'); // status code 1–5, or null

        // Pre-calc month/year bounds based on fromDate
        $startOfMonth = Carbon::parse($fromDate)->startOfMonth()->toDateString();
        $startOfYear  = Carbon::parse($fromDate)->startOfYear()->toDateString();

        // 2) Load employees + their orders in that date range (and optional status)
        $data = Employees::with([
                'orders' => function ($q) use ($fromDate, $toDate, $jobFilter) {
                    $q->with([
                        'user',
                        'variationDetails',
                        'attributeDetails',
                        'serviceCenter',
                        'businessRegion',
                    ])
                    ->whereBetween('desired_date', [$fromDate, $toDate]);

                    if ($jobFilter) {
                        $q->where('order_status', $jobFilter);
                    }
                },
                'location'
            ])
            ->where('status', 1)
            ->orderBy('id', 'desc')

            // meters travelled today
            ->select('employees.*')
            ->selectSub(function ($q) use ($fromDate) {
                $q->from('emp_verified_attendence')
                  ->selectRaw('COALESCE(SUM(totaldistance),0)')
                  ->whereColumn('emp_verified_attendence.emp_id', 'employees.id')
                  ->whereDate('date', $fromDate);
            }, 'meters_today')

            // meters travelled this month up to fromDate
            ->selectSub(function ($q) use ($startOfMonth, $fromDate) {
                $q->from('emp_verified_attendence')
                  ->selectRaw('COALESCE(SUM(totaldistance),0)')
                  ->whereColumn('emp_verified_attendence.emp_id', 'employees.id')
                  ->whereBetween('date', [$startOfMonth, $fromDate]);
            }, 'meters_month')

            // meters travelled this year up to fromDate
            ->selectSub(function ($q) use ($startOfYear, $fromDate) {
                $q->from('emp_verified_attendence')
                  ->selectRaw('COALESCE(SUM(totaldistance),0)')
                  ->whereColumn('emp_verified_attendence.emp_id', 'employees.id')
                  ->whereBetween('date', [$startOfYear, $fromDate]);
            }, 'meters_year')

            ->get()
            ->map(function ($emp) {
                $emp->km_today  = round($emp->meters_today  / 1000, 2);
                $emp->km_month  = round($emp->meters_month  / 1000, 2);
                $emp->km_year   = round($emp->meters_year   / 1000, 2);
                return $emp;
            });
         

        // 3) Recalculate each status count over the same range
        $scheduledCount  = Order::where('order_status', 1)
            ->whereBetween('desired_date', [$fromDate, $toDate])
            ->count();
        $dispatchedCount = Order::where('order_status', 2)
                                ->whereBetween('desired_date', [$fromDate, $toDate])
                                ->count();
        $onsiteCount     = Order::where('order_status', 3)
                                ->whereBetween('desired_date', [$fromDate, $toDate])
                                ->count();
        $completedCount  = Order::where('order_status', 4)
                                ->whereBetween('desired_date', [$fromDate, $toDate])
                                ->count();
        $incompleteCount = Order::where('order_status', 5)
                                ->whereBetween('desired_date', [$fromDate, $toDate])
                                ->count();

        // 4) Render the view (your Blade uses request('from_date'), request('job'), etc.)
        return view('admin.gantt.index', compact(
            'data',
            'scheduledCount',
            'dispatchedCount',
            'onsiteCount',
            'completedCount',
            'incompleteCount',
            'fromDate',
            'toDate',
            'jobFilter'
        ));
    }

    /**
     * Auto-assign unassigned orders to employees based on their timeslot.
     */
    public function autoAssignOrders()
    {
        $orders = Order::where('order_status', 0)->get();

        foreach ($orders as $order) {
            $desiredTime = Carbon::parse($order->desired_time);

            $employee = Employees::join('timeslots', 'employees.timeslot_id', '=', 'timeslots.id')
                ->where('timeslots.start_time', '<=', $desiredTime->format('H:i:s'))
                ->where('timeslots.end_time',   '>=', $desiredTime->format('H:i:s'))
                ->select('employees.*')
                ->first();

            if ($employee) {
                $order->assigned_to  = $employee->id;
                $order->order_status = 1;
                $order->save();
            }
        }

        return response()->json([
            'status'  => 'success',
            'message' => 'Orders have been auto-assigned.'
        ]);
    }
}
