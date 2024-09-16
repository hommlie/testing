<?php
namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Hash;
use Session;
use App\Models\User;
use App\Models\Timeslot;
use App\Models\Employees;
use Illuminate\Support\Str;
use App\Models\Testimonials;
use Illuminate\Http\Request;
use App\Models\EmpAttendance;
use Illuminate\Support\Carbon;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use App\Models\EmpVerifiedAttendance;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class AttendenceController extends Controller
{
    public function index()
    {
        abort_unless(\Gate::allows('attendance_access'), 403);
        
            $data = EmpAttendance::join('employees', 'emp_attendence.emp_id', '=', 'employees.id')
            ->select('emp_attendence.*', 'employees.emp_name')
            ->orderBy('emp_attendence.id', 'desc')
            ->get();
            $employees = Employees::orderBy('id', 'desc')->get();
            return view('admin.empattendance.index',compact('data','employees'));
        
    }
    public function verifiedAttendence()
    {
        
            $data = EmpVerifiedAttendance::join('employees', 'emp_verified_attendence.emp_id', '=', 'employees.id')
            ->select('emp_verified_attendence.*', 'employees.emp_name')
            ->orderBy('emp_verified_attendence.id', 'desc')
            ->get();
            $employees = Employees::orderBy('id', 'desc')->get();
            return view('admin.empattendance.verifiedAttendence',compact('data','employees'));
        
    }
    public function getLoginData(Request $request)
    {
        $this->validate($request, [
            'employee' => 'required',
            'date' => 'required|date_format:Y-m-d',
        ]);
    
        $date = Carbon::parse($request->date)->format('Y-m-d');
    
        // Check if there is a record in the emp_verified_attendence table
        $isVerified = DB::table('emp_verified_attendence')
            ->where('emp_id', $request->employee)
            ->whereDate('date', $date) // Assuming the date column is named 'date'
            ->exists();
    
        // Set the verification status flag
        $verificationStatus = $isVerified ? 2 : 1; // 2 for already verified, 1 for not verified
    
        // Join with employees table to get employee details
        $empAttendance = EmpAttendance::join('employees', 'emp_attendence.emp_id', '=', 'employees.id')
            ->where('emp_attendence.emp_id', $request->employee)
            ->whereDate('emp_attendence.login_at', $date)
            ->select('emp_attendence.*', 'employees.emp_name', 'employees.id as emp_id')
            ->get();
    
        $totalTimeSpent = 0;
        $totalDistanceTraveled = 0;
    
        foreach ($empAttendance as $attendance) {
            if ($attendance->login_at && $attendance->logout_at) {
                $loginTime = Carbon::parse($attendance->login_at);
                $logoutTime = Carbon::parse($attendance->logout_at);
                $totalTimeSpent += $logoutTime->diffInSeconds($loginTime);
            }
            if ($attendance->distance_travelled) {
                $totalDistanceTraveled += $attendance->distance_travelled;
            }
        }
    
        $totalTimeSpentFormatted = gmdate('H:i:s', $totalTimeSpent);
    
        // Get employee details for the selected employee
        $employee = Employees::find($request->employee);
    
        $employees = Employees::orderBy('id', 'desc')->get();
    
        return view('admin.empattendance.getLoginData', [
            'employees' => $employees,
            'empAttendance' => $empAttendance,
            'totalTimeSpentFormatted' => $totalTimeSpentFormatted,
            'totalDistanceTraveled' => $totalDistanceTraveled,
            'selectedEmployeeName' => $employee ? $employee->emp_name : null,
            'selectedEmployeeId' => $employee ? $employee->id : null,
            'requestedDate' => $request->date,
            'verificationStatus' => $verificationStatus, // Send the verification status
        ]);
    }
    
    
    

    public function VerifyAttendance(Request $request)
    {
        // dd($request);
        $this->validate($request, [
            'totaltime' => 'required',
            'totaldistance' => 'required',
            'employee' => 'required',
            'employeeId' => 'required',
            'date' => 'required',
        ]);

        $dataval = [
            'totaltime' =>  $request->totaltime,
            'totaldistance' => $request->totaldistance,
            'emp_id' => $request->employeeId,
            'is_verified' =>1,
            'date' =>$request->date
        ];
    
        
        $data = EmpVerifiedAttendance::create($dataval);
    
        if ($data) {
            return redirect('admin/empattendance')->with('success', trans('Attendence Verified Successfully'));
        } else {
            return redirect()->back()->with('danger', trans('messages.fail'));
        }
    }


    public function show($id)
    {
        $data=Testimonials::findOrFail($id);
        return view('admin.testimonials.show',compact('data'));
    }
    public function view($id)
    {
        $data=Testimonials::findOrFail($id);
        return view('admin.testimonials.view',compact('data'));
    }

    public function update(Request $request, int $id){
        $this->validate($request, [
            'name' => 'required',
            'location' => 'required',
            'feedback' => 'required',
        ]);

        if ($request->hasFile('image')) {
            $image = 'image' . uniqid() . '.' . $request->image->getClientOriginalExtension();
            $request->image->move('storage/app/public/images/testimonials',$image);
        }

        $data = Testimonials::findOrFail($id);
    
        $dataval = [
            'image' =>  $image,
            'name' =>  $request->name,
            'location' => $request->location,
            'feedback' => $request->feedback,
        ];
    
        $data->update($dataval);
    
        if ($data) {
            return redirect()->route('admin.testimonials.show',$id)->with('success', 'Time Slot Successfully Updated');
        } else {
            return redirect()->route('admin.testimonials.show',$id)->with('danger', 'Failed to Update Time Slot');
        }
    

    }

    public function delete(Request $request)
        {
            $id = $request->id;
            $testimonials = Testimonials::findOrFail($id);
            $testimonials->status = 0;
            $testimonials->save();

            return response()->json(['success' => true]);
        }

    public function deactive(Request $request)
        {
            $id = $request->id;
            $testimonials = Testimonials::findOrFail($id);
            $testimonials->status = 1;
            $testimonials->save();

            return response()->json(['success' => true]);
        }
    

}

