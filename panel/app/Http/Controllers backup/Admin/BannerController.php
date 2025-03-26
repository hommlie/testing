<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Banner;
use App\Models\Category;
use App\Models\Products;
use File;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Banner::with('product')->with('category')->whereIn('positions', ['banner','bannerPest', 'bannerBird','bannerMosqito','bannerQuickService','bannerReferEarn','bannerCategory'])->get();
        return view('admin.banner.index', compact('data'));
    }

    public function add()
    {
        $data = Category::select('id', 'category_name')->get();
        $products = Products::select('id', 'product_name')->get();
        $banner = Banner::select('id', 'positions')->get();
        return view('admin.banner.add', compact('data', 'products', 'banner'));
    }

    public function list()
    {
        $data = Banner::with('product')->with('category')->where('positions', 'top')->get();
        return view('admin.banner.bannertable', compact('data'));
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
        // dd($request->all());

        $this->validate($request, [
            'image' => 'required|mimes:jpeg,png,jpg,gif',
        ]);

        $image = 'topbanner-' . uniqid() . '.' . $request->image->getClientOriginalExtension();
        $request->image->move('storage/app/public/images/banner', $image);

        $dataval = array('image' => $image, 'link' => $request->link, 'alt_tag' => $request->alt_tag, 'image_title' => $request->image_title, 'product_id' => $request->product_id, 'cat_id' => $request->cat_id, 'type' => $request->type, 'positions' => $request->positions);
        $data = Banner::create($dataval);
        if ($data) {
            return redirect('admin/banner')->with('success', trans('messages.success'));
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
        $data = Banner::find($id);
        $category = Category::select('id', 'category_name')->get();
        $products = Products::select('id', 'product_name')->get();
        if ($data->image) {
            $data->img = url('storage/app/public/images/banner/' . $data->image);
        }
        return view('admin.banner.show', compact('data', 'category', 'products'));
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
        $this->validate($request, [
            'image' => 'mimes:jpeg,png,jpg,gif',
        ]);
        // dd($request->alt_tag);


        if (isset($request->image)) {

            File::delete('storage/app/public/images/banner/' . $request->old_img);

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $image = 'topbanner-' . uniqid() . '.' . $request->image->getClientOriginalExtension();
                $request->image->move('storage/app/public/images/banner', $image);

                $data = array('image' => $image, 'link' => $request->link, 'alt_tag' => $request->alt_tag, 'image_title' => $request->image_title, 'product_id' => $request->product_id, 'cat_id' => $request->cat_id, 'type' => $request->type);
                $brand = Banner::find($request->brand_id)->update($data);
            }
        } else {
            $data = array('link' => $request->link, 'alt_tag' => $request->alt_tag, 'image_title' => $request->image_title, 'product_id' => $request->product_id, 'cat_id' => $request->cat_id, 'type' => $request->type);
            $brand = Banner::find($request->brand_id)->update($data);
        }

        if ($brand) {
            return redirect('admin/banner')->with('success', trans('messages.update'));
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
        $this->validate($request, [
            'id' => 'required|integer',
        ]);
        $banner = Banner::with('product', 'category')->find($request->id);
    
        if (!$banner) {
            return 2000;
        }
        $restrictedPositions = [
            'bannerPest',
            'bannerBird',
            'bannerMosqito',
            'bannerQuickService',
            'bannerReferEarn',
            'bannerCategory',
        ];
    
        if (in_array($banner->positions, $restrictedPositions)) {
            $banner->status = $banner->status == 1 ? 0 : 1;
            
            $banner->save();
            return 1000;
        } else {
            $banner->delete();
            return 1000;
        }
    }
    
}
