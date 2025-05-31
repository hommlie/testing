<?php
namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Hash;
use Session;
use App\Models\User;
use App\Models\Roles;
use App\Models\Category;
use App\Models\Location;
use App\Models\Timeslot;
use App\Models\Employees;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class EmployeeController extends Controller
{

    public function index()
    {
        abort_unless(\Gate::allows('employee_access'), 403);

        $data = Employees::all();

        return view('admin.employees.index', compact('data'));
    }
    public function addemployee()
    {
        abort_unless(\Gate::allows('question_access'), 403);


        return view('admin.employees.add');
    }

    public function storeemployee(Request $request)
    {
        abort_unless(\Gate::allows('question_access'), 403);

        // dd($request);
        $this->validate($request, [
            'ename' => 'required|string|max:255',
            'mobile' => 'required|digits:10',
            'email' => 'required|email|max:255',
            'address' => 'required|string|max:500',
            'profile' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'bank_name' => 'required|string|max:255',
            'branch' => 'required|string|max:255',
            'ifsc' => 'required',
            'acc_no' => 'required|numeric|digits_between:9,18',
            'name_as_per_bank' => 'required|string|max:255',
            'bank_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'pan_number' => 'required',
            'pan_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'aadhar_number' => 'required|digits:12',
            'aadhar_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        



        $profile='profile'.uniqid().'.'.$request->profile->getClientOriginalExtension();
        $request->profile->move('storage/app/public/images/employee/profiles',$profile);

        $bank_image='bank'.uniqid().'.'.$request->bank_image->getClientOriginalExtension();
        $request->bank_image->move('storage/app/public/images/employee/bank_images',$bank_image);

        $pan_image='pan'.uniqid().'.'.$request->pan_image->getClientOriginalExtension();
        $request->pan_image->move('storage/app/public/images/employee/pan_images',$pan_image);

        $aadhar_image='aadhar'.uniqid().'.'.$request->aadhar_image->getClientOriginalExtension();
        $request->aadhar_image->move('storage/app/public/images/employee/aadhar_images',$aadhar_image);

    
        $dataval = [
            'emp_id' => 'EMP'.random_int(1000, 9999),
            'emp_name' => $request->ename,
            'emp_phone' => $request->mobile,
            'emp_email' => $request->email,
            'emp_address' => $request->address,
            'emp_photo' => $profile,
            'bank_name' => $request->bank_name,
            'bank_branch' => $request->branch,
            'bank_ifsc' => $request->ifsc,
            'bank_acc_no' => $request->acc_no,
            'name_as_per_bank' => $request->name_as_per_bank,
            'pan_no' => $request->pan_number,
            'aadhar_no' => $request->aadhar_number,
            'bank_book_image' => $bank_image,
            'pan_image' => $pan_image,
            'aadhar_image' => $aadhar_image,
        ];
    
        
        $data = Employees::create($dataval);
    
        if ($data) {
            return redirect('admin/employees')->with('success', trans('Employee Added successfully'));
        } else {
            return redirect()->back()->with('danger', trans('Failed to add Employee'));
        }
    }


    public function show($id)
    {
        abort_unless(\Gate::allows('question_access'), 403);

        $data=Employees::findOrFail($id);
        return view('admin.employees.show',compact('data'));
    }
    public function view($id)
    {
        abort_unless(\Gate::allows('question_access'), 403);

        $data=Employees::findOrFail($id);
        return view('admin.employees.view',compact('data'));
    }


    public function getassignemployee($id) {
        // Uncomment if additional joins and data are needed
        $emp = Employees::where('employees.id', $id)
            ->join('timeslots', 'employees.timeslot', '=', 'timeslots.id')
            ->join('locations', 'employees.location', '=', 'locations.id')
            ->join('categories', 'employees.emp_category', '=', 'categories.id')
            ->select('employees.*',  'timeslots.endtime', 'timeslots.starttime', 'locations.name as location_name','categories.category_name as category')
            ->first();
    

        $roles = Location::orderBy('id','desc')->get();
        $location = Location::orderBy('id','desc')->get();
        $timeslot = Timeslot::orderBy('id','desc')->get();
        $categories = Category::orderBy('id','desc')->get();
    
        return response()->json([
            'status' => 200,
            'emp' => $emp,
            'roles' => $roles,
            'location' => $location,
            'timeslot' => $timeslot,
            'category' => $categories,
        ]);
    
    }
    public function getAllEmployees() {
        $employees = Employees::orderBy('id', 'desc')->get();
    
        return response()->json([
            'employees' => $employees
        ]);
    }

    public function assignUpdate(Request $request, $id)
    {
        // Validate the request inputs
        $this->validate($request, [
            'location' => 'required',
            'timeslot' => 'required',
            'emp_category' => 'required|array', // Ensure emp_category is an array
        ]);
    
        $record = Employees::find($id);
    
        if (!$record) {
            return response()->json([
                'status' => 404,
                'message' => 'Record not found',
            ], 404);
        }
    
        // Update the employee record
        $record->role = '5';
        $record->location = $request->input('location');
        $record->timeslot = $request->input('timeslot');
    
        // Convert the emp_category array to a comma-separated string
        $record->emp_category = implode(',', $request->input('emp_category'));
    
        // Save the updated record
        $record->save();
    
        return response()->json([
            'status' => 200,
            'message' => 'Record updated successfully',
            'record' => $record,
        ]);
    }
    

    public function assignemployee1($id) {
        $emp = Employees::where('employees.id', $id)
            ->join('roles', 'employees.role', '=', 'roles.id')
            ->join('timeslots', 'employees.timeslot', '=', 'timeslots.id')
            ->join('locations', 'employees.location', '=', 'locations.id')
            ->select('employees.*', 'roles.name as role_name', 'timeslots.endtime', 'timeslots.starttime', 'locations.name as location_name')
            ->first();

            $roles = Roles::orderBy('id','desc')->get();
            $location = Location::orderBy('id','desc')->get();
            $timeslot = Timeslot::orderBy('id','desc')->get();
    
        
    
        return view('admin.employees.employeestable', 
        compact('emp','roles','location','timeslot'));
    }
    

    public function update(Request $request, int $id){
        $this->validate($request, [
            'ename' => 'required|string|max:255',
            'mobile' => 'required|digits:10',
            'email' => 'required|email|max:255',
            'address' => 'required|string|max:500',
            'profile' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', 
            'bank_name' => 'required|string|max:255',
            'branch' => 'required|string|max:255',
            'ifsc' => 'required',
            'acc_no' => 'required|numeric|digits_between:9,18',
            'name_as_per_bank' => 'required|string|max:255',
            'bank_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'pan_number' => 'required',
            'pan_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', 
            'aadhar_number' => 'required|digits:12',
            'aadhar_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $data = Employees::findOrFail($id);

        if ($request->hasFile('profile')) {
            if ($data->profile) {
                Storage::delete('storage/app/public/images/employee/profiles/' . $data->profile);
            }
            $profile = 'profile' . uniqid() . '.' . $request->profile->getClientOriginalExtension();
            $request->profile->move('storage/app/public/images/employee/profiles',$profile);
            $data->emp_photo = $profile;
        }
    
        if ($request->hasFile('bank_image')) {
            if ($data->bank_image) {
                Storage::delete('storage/app/public/images/employee/bank_images/' . $data->bank_image);
            }
            $bank_image = 'bank' . uniqid() . '.' . $request->bank_image->getClientOriginalExtension();
            $request->bank_image->move('storage/app/public/images/employee/bank_images',$bank_image);
            $data->bank_book_image = $bank_image;
        }
    
        if ($request->hasFile('pan_image')) {
            if ($data->pan_image) {
                Storage::delete('storage/app/public/images/employee/pan_images/' . $data->pan_image);
            }
            $pan_image = 'pan' . uniqid() . '.' . $request->pan_image->getClientOriginalExtension();
            $request->pan_image->move('storage/app/public/images/employee/pan_images', $pan_image);
            $data->pan_image = $pan_image;
        }
    
        if ($request->hasFile('aadhar_image')) {
            if ($data->aadhar_image) {
                Storage::delete('storage/app/public/images/employee/aadhar_images/' . $data->aadhar_image);
            }
            $aadhar_image = 'aadhar' . uniqid() . '.' . $request->aadhar_image->getClientOriginalExtension();
            $request->aadhar_image->move('storage/app/public/images/employee/aadhar_images', $aadhar_image);
            $data->aadhar_image = $aadhar_image;
        }
    
        $dataval = [
            'emp_name' => $request->ename,
            'emp_phone' => $request->mobile,
            'emp_email' => $request->email,
            'emp_address' => $request->address,
            'bank_name' => $request->bank_name,
            'bank_branch' => $request->branch,
            'bank_ifsc' => $request->ifsc,
            'bank_acc_no' => $request->acc_no,
            'name_as_per_bank' => $request->name_as_per_bank,
            'pan_no' => $request->pan_number,
            'aadhar_no' => $request->aadhar_number,
        ];
    
        $data->update($dataval);
    
        if ($data) {
            return redirect()->route('admin.employees.show',$id)->with('success', 'Employee Data Successfully Updated');
        } else {
            return redirect()->route('admin.employees.show',$id)->with('danger', 'Failed to Update Employee Data');
        }
    

    }

    public function delete(Request $request)
        {
            $id = $request->id;
            $employee = Employees::findOrFail($id);
            $employee->status = 0;
            $employee->save();

            return response()->json(['success' => true]);
        }

    public function deactive(Request $request)
        {
            $id = $request->id;
            $employee = Employees::findOrFail($id);
            $employee->status = 1;
            $employee->save();

            return response()->json(['success' => true]);
        }

    

}

