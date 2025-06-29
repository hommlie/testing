<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Slider;
use File;

class SliderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        abort_unless(\Gate::allows('slider_access'), 403);
        $data=Slider::get();
        return view('admin.slider.index',compact('data'));
    }

    public function add()
    {
        return view('admin.slider.add');
    }

    public function list()
    {
        $data = Slider::all();
        return view('admin.slider.slidertable',compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[
            'link' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg',
            'alt_tag' => 'required',
            'image_title' => 'required',
        ]);
        $image = 'slider-' . uniqid() . '.' . $request->image->getClientOriginalExtension();
        $request->image->move('storage/app/public/images/slider', $image);

        $dataval=array('link'=>$request->link,'image'=>$image,'alt_tag' => $request->alt_tag,'image_title' => $request->image_title);
        $data=Slider::create($dataval);
        if ($data) {
             return redirect('admin/slider')->with('success', trans('messages.success'));
        } else {
            return redirect()->back()->with('danger', trans('messages.fail'));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data=Slider::find($id);
        return view('admin.slider.show',compact('data'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $this->validate($request,[
            'link' => 'required',
            'image' => 'image|mimes:jpeg,png,jpg',
            'alt_tag' => 'required',
            'image_title' => 'required',
        ]);

        if(isset($request->image)){

        	File::delete('storage/app/public/images/slider/' . $request->old_img);

            if($request->hasFile('image')){
                $image = $request->file('image');
                $image = 'slider-' . uniqid() . '.' . $request->image->getClientOriginalExtension();
                $request->image->move('storage/app/public/images/slider', $image);

                $data=array('link'=>$request->link,'image'=>$image,'alt_tag' => $request->alt_tag,'image_title' => $request->image_title);
                $slider=Slider::find($request->slider_id)->update($data);
            }
        } else {
            $data=array('link'=>$request->link,'alt_tag' => $request->alt_tag,'image_title' => $request->image_title);
            $slider=Slider::find($request->slider_id)->update($data);
        }
        
        if ($slider) {
             return redirect('admin/slider')->with('success', trans('messages.success'));
        } else {
            return redirect()->back()->with('danger', trans('messages.fail'));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $this->validate($request,[
            'id' => 'required',
        ]);
        $data=Slider::where('id',$request->id)->delete();
        if($data) {
            return 1000;
        } else {
            return 2000;
        }
    }
    
    public function changeStatus(Request $request)
    {
        $this->validate($request,[
            'id' => 'required',
            'status' => 'required',
        ]);

        $data['status']=$request->status;
        Slider::where('id',$request->id)->update($data);
        if ($data) {
            return 1000;
        } else {
            return 2000;
        }      
    }
}
