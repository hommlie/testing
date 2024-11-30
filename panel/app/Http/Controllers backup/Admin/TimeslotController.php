<?php
namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Hash;
use Session;
use App\Models\User;
use App\Models\Employees;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use App\Models\Timeslot;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class TimeslotController extends Controller
{
    public function index()
    {
        abort_unless(\Gate::allows('timeslot_access'), 403);
            $data = Timeslot::orderBy('id', 'desc')->get();
            return view('admin.timeslot.index',compact('data'));
        
        
    }

    public function addtimeslot()
    {
        
            return view('admin.timeslot.add');
        
        
    }

    public function storetimeslot(Request $request)
    {
        // dd($request);
        $this->validate($request, [
            'name' => 'required',
            'starttime' => 'required',
            'endtime' => 'required',
        ]);
        
    
        $dataval = [
            'name' =>  $request->name,
            'starttime' => $request->starttime,
            'endtime' => $request->endtime,
        ];
    
        
        $data = Timeslot::create($dataval);
    
        if ($data) {
            return redirect('admin/timeslot')->with('success', trans('messages.success'));
        } else {
            return redirect()->back()->with('danger', trans('messages.fail'));
        }
    }


    public function show($id)
    {
        $data=Timeslot::findOrFail($id);
        return view('admin.timeslot.show',compact('data'));
    }
    public function view($id)
    {
        $data=Timeslot::findOrFail($id);
        return view('admin.timeslot.view',compact('data'));
    }

    public function update(Request $request, int $id){
        $this->validate($request, [
            'name' => 'required',
            'starttime' => 'required',
            'endtime' => 'required',
        ]);

        $data = Timeslot::findOrFail($id);
    
        $dataval = [
            'name' =>  $request->name,
            'starttime' => $request->starttime,
            'endtime' => $request->endtime,
        ];
    
        $data->update($dataval);
    
        if ($data) {
            return redirect()->route('admin.timeslot.show',$id)->with('success', 'Time Slot Successfully Updated');
        } else {
            return redirect()->route('admin.timeslot.show',$id)->with('danger', 'Failed to Update Time Slot');
        }
    

    }

    public function delete(Request $request)
        {
            $id = $request->id;
            $timeslot = Timeslot::findOrFail($id);
            $timeslot->status = 0;
            $timeslot->save();

            return response()->json(['success' => true]);
        }

    public function deactive(Request $request)
        {
            $id = $request->id;
            $timeslot = Timeslot::findOrFail($id);
            $timeslot->status = 1;
            $timeslot->save();

            return response()->json(['success' => true]);
        }
    

}

