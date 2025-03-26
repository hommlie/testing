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
use App\Models\Testimonials;
use App\Models\Timeslot;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class TestimonialsController extends Controller
{
    public function index()
    {
        abort_unless(\Gate::allows('testimonial_access'), 403);
        
            $data = Testimonials::orderBy('id', 'desc')->get();
            return view('admin.testimonials.index',compact('data'));
        
    }

    public function addtestimonials()
    {
        
            return view('admin.testimonials.add');
        
    }

    public function storetestimonials(Request $request)
    {
        // dd($request);
        $this->validate($request, [
            'name' => 'required',
            'location' => 'required',
            'feedback' => 'required',
        ]);

        
        if ($request->hasFile('image')) {
            $image = 'image' . uniqid() . '.' . $request->image->getClientOriginalExtension();
            $request->image->move('storage/app/public/images/testimonials',$image);
        }else{
            $image = 'profile.png';
        }
        
    
        $dataval = [
            'image' =>  $image,
            'name' =>  $request->name,
            'location' => $request->location,
            'feedback' => $request->feedback,
        ];
    
        
        $data = Testimonials::create($dataval);
    
        if ($data) {
            return redirect('admin/testimonials')->with('success', trans('messages.success'));
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
            return redirect()->route('admin.admin.testimonials.show',$id)->with('success', 'Time Slot Successfully Updated');
        } else {
            return redirect()->route('admin.admin.testimonials.show',$id)->with('danger', 'Failed to Update Time Slot');
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

