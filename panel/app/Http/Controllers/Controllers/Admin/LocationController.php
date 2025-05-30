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
use App\Models\Permissions;
use App\Models\Timeslot;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class LocationController extends Controller
{
    public function index()
    {
        abort_unless(\Gate::allows('location_access'), 403);
        
            $data = Location::orderBy('id', 'desc')->get();
            return view('admin.location.index',compact('data'));
        
    }

    public function addlocation()
    {
        
            return view('admin.location.add');
        
    }

    public function add(Request $request)
    {
    	if(!$_POST) {
            return view('admin.location.add');
        }
        else if($request->submit) {
            $rules = array(
                    'name'              => 'required|unique:locations',
                    'coordinates'       => 'required',
                    'status'            => 'required'
                    );

            $niceNames = array(
                        'name'          => 'Name',
                        'coordinates'   => 'Coordinates',
                        'status'        => 'Status'
                        );
            $message = array(
                        'coordinates.required'   => 'Please mark any location.',
                        );

            $validator = Validator::make($request->all(), $rules,$message);
            $validator->setAttributeNames($niceNames); 

            if ($validator->fails()) {
                $formatted_cords = $this->helper->getFormattedCoordinates($request->coordinates);
                // Form calling with Errors and Input values
                return back()->withErrors($validator)->withInput()->withInput(['formatted_coords' => $formatted_cords]);
            }
            else {
                $formatted_cords = $this->helper->getFormattedCoordinates($request->coordinates);
                // $is_already = $this->validate_cords($formatted_cords);
                // if($is_already) {
                //     return back()->withInput()->withInput(['formatted_coords' => $formatted_cords,'location_set' => 'Location already selected']);
                // }
                $location = new Location;
                $location->name         = $request->name;
                $coordinates            = rtrim($request->coordinates,')');
                $location->coordinates  = 'POLYGON('.$coordinates.' ))';
                $location->status       = $request->status;

                $location->save();

                $this->helper->flash_message('success', 'Location Added Successfully'); // Call flash message function

                return redirect('admin/location')->with('success', trans('messages.success'));
            }
        }
        else{
            return redirect('admin/location');
        }
    }

    public function storelocation(Request $request)
    {
        // Validate request data
        $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|string|in:Active,Inactive',
            'coordinates' => 'required'
        ]);

        // Create new location
        $location = new Location();
        $location->name = $request->name;
        $location->status = $request->status;
        $coordinates            = rtrim($request->coordinates,')');
        $location->coordinates  = 'POLYGON(('.$coordinates.' ))';
        // $location->coordinates = $request->coordinates; // assuming you have a coordinates field in your locations table
        $location->save();

        return redirect()->route('admin.location')->with('success', 'Location added successfully!');
    }


    public function show($id)
    {
        $data=Permissions::findOrFail($id);
        return view('admin.permission.show',compact('data'));
    }
    public function view($id)
    {
        $data=Permissions::findOrFail($id);
        return view('admin.permission.view',compact('data'));
    }

    public function update(Request $request, int $id){
        $this->validate($request, [
            'permission' => 'required',
            'permission_label' => 'required',
        ]);

        $data = Permissions::findOrFail($id);
    
        $dataval = [
            'name' => $request->permission,
            'label' => $request->permission_label,
        ];
    
        $data->update($dataval);
    
        if ($data) {
            return redirect()->route('admin.permission.show',$id)->with('success', 'Permission Successfully Updated');
        } else {
            return redirect()->route('admin.permission.show',$id)->with('danger', 'Failed to Update Permission');
        }
    

    }

    public function delete(Request $request)
        {
            dd($request);
            $id = $request->id;
            $timeslot = Location::findOrFail($id);
            $timeslot->status = 0;
            $timeslot->save();

            return response()->json(['success' => true]);
        }


    public function changeStatus(Request $request)
    {
            $id = $request->id;
            $status = $request->status;

            $locationStmt = Location::find($id); 

            if ($locationStmt !== null) {
                $locationStmt->status = $status; 
                $locationStmt->save();
                return response()->json(['success' => true]);
            } else {
                return response()->json(['success' => false, 'message' => 'Purchase order not found']);
            }

    }

    // public function deactive(Request $request)
    //     {
    //         $id = $request->id;
    //         $timeslot = Location::findOrFail($id);
    //         $timeslot->status = 1;
    //         $timeslot->save();

    //         return response()->json(['success' => true]);
    //     }
    

}

