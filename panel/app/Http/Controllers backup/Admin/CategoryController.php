<?php

namespace App\Http\Controllers\Admin;

use Str;
use App\Models\Category;
use App\Models\Products;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use App\Models\Innersubcategory;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        abort_unless(\Gate::allows('category_access'), 403);

        $data = Category::orderBy('id', 'DESC')->paginate(10);
        return view('admin.category.index', compact('data'));
    }

    public function add()
    {
        return view('admin.category.add');
    }

    public function list()
    {
        $data = Category::all();
        return view('admin.category.categorytable', compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $data = Category::where('category_name', 'LIKE', '%' . $request->search . '%')->orderBy('id', 'DESC')->paginate(10);
        return view('admin.category.index', compact('data'));

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    public function store(Request $request)
    {
        $this->validate($request, [
            'category_name' => 'required',
            'category_title' => 'required',
            'icon' => 'required|mimes:png,jpg,jpeg,gif',
            'webicon' => 'required|mimes:png,jpg,jpeg,gif',
            'motion_graphics' => 'required|mimes:png,jpg,jpeg,gif',
            'alt_tag' => 'required',
            'image_title' => 'required',
            'video' => 'nullable|mimes:mp4,avi,mov',
            'thumbnail' => 'nullable|mimes:png,jpg,jpeg,gif',
            'faqs' => 'required',
            'about' => 'required',
            'specifications' => 'required|array',
            'total_reviews' => 'required|integer',
            'avg_rating' => 'required|numeric',
            'banner' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'slug' => 'required|string|max:255|unique:categories,slug',
        ]);

        $icon = $request->file('icon') ? 'icon-' . uniqid() . '.' . $request->icon->getClientOriginalExtension() : "NA";
        if ($request->hasFile('icon')) {
            $request->icon->move('storage/app/public/images/category', $icon);
        }

        $webicon = $request->file('webicon') ? 'webicon-' . uniqid() . '.' . $request->webicon->getClientOriginalExtension() : "NA";
        if ($request->hasFile('webicon')) {
            $request->webicon->move('storage/app/public/images/category', $webicon);
        }

        $motion_graphics = $request->file('motion_graphics') ? 'motion_graphics-' . uniqid() . '.' . $request->motion_graphics->getClientOriginalExtension() : "NA";
        if ($request->hasFile('motion_graphics')) {
            $request->motion_graphics->move('storage/app/public/images/category', $motion_graphics);
        }

        $thumbnail = $request->file('thumbnail') ? 'thumbnail-' . uniqid() . '.' . $request->thumbnail->getClientOriginalExtension() : "NA";
        if ($request->hasFile('thumbnail')) {
            $request->thumbnail->move('storage/app/public/images/category', $thumbnail);
        }

        $video = $request->file('video') ? 'video-' . uniqid() . '.' . $request->video->getClientOriginalExtension() : "NA";
        if ($request->hasFile('video')) {
            $request->video->move('storage/app/public/images/category', $video);
        }

        $banner = $request->file('banner') ? 'banner-' . uniqid() . '.' . $request->banner->getClientOriginalExtension() : "NA";
        if ($request->hasFile('banner')) {
            $request->banner->move('storage/app/public/images/category', $banner);
        }

        $loca = isset($request->location) ? (is_array($request->location) ? implode(" | ", $request->location) : $request->location) : null;
        $isFormChecked = $request->has('is_form') ? 1 : 0;

        $data = [
            'category_name' => $request->category_name,
            'category_title' => $request->category_title,
            'icon' => $icon,
            'web_icon' => $webicon,
            'motion_graphics' => $motion_graphics,
            'thumbnail' => $thumbnail,
            'video' => $video,
            'banner' => $banner,
            'alt_tag' => $request->alt_tag,
            'image_title' => $request->image_title,
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
            'slug' => \Str::slug($request->slug),
            'is_form' => $isFormChecked,
            'location' => $loca,
            'specifications' => implode(" | ", $request->specifications),
            'faqs' => $request->faqs,
            'about' => $request->about,
            'total_reviews' => $request->total_reviews,
            'avg_rating' => $request->avg_rating,
        ];

        $category = Category::create($data);

        if ($category) {
            return redirect('admin/category')->with('success', trans('messages.success'));
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
        $data = Category::find($id);
        if ($data->icon) {
            $data->img = url('storage/app/public/images/category/' . $data->icon);
        }
        return view('admin.category.show', compact('data'));
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
            'category_name' => 'required',
            'category_title' => 'required',
            'icon' => 'mimes:jpeg,png,jpg,gif',
            'webicon' => 'mimes:jpeg,png,jpg,gif',
            'motion_graphics' => 'mimes:png,jpg,jpeg,gif',
            'alt_tag' => 'required',
            'image_title' => 'required',
            'faqs' => 'required',
            'about' => 'required',
            'specifications' => 'required|array',
            'total_reviews' => 'required|integer',
            'avg_rating' => 'required|numeric',
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $category = Category::findOrFail($request->cat_id);

        $loca = isset($request->location)
            ? (is_array($request->location) ? implode(" | ", $request->location) : $request->location)
            : null;

        $isFormChecked = $request->has('is_form') ? 1 : 0;

        $icon = $category->icon;
        if ($request->hasFile('icon')) {
            File::delete('storage/app/public/images/category/' . $icon);
            $icon = 'category-' . uniqid() . '.' . $request->icon->getClientOriginalExtension();
            $request->icon->move('storage/app/public/images/category', $icon);
        }

        $webicon = $category->web_icon;
        if ($request->hasFile('webicon')) {
            File::delete('storage/app/public/images/category/' . $webicon);
            $webicon = 'webcategory-' . uniqid() . '.' . $request->webicon->getClientOriginalExtension();
            $request->webicon->move('storage/app/public/images/category', $webicon);
        }

        $motion_graphics = $category->motion_graphics;
        if ($request->hasFile('motion_graphics')) {
            File::delete('storage/app/public/images/category/' . $motion_graphics);
            $motion_graphics = 'motion_graphics-' . uniqid() . '.' . $request->motion_graphics->getClientOriginalExtension();
            $request->motion_graphics->move('storage/app/public/images/category', $motion_graphics);
        }

        $banner = $category->banner;
        if ($request->hasFile('banner')) {
            File::delete('storage/app/public/images/category/' . $banner);
            $banner = 'banner-' . uniqid() . '.' . $request->banner->getClientOriginalExtension();
            $request->banner->move('storage/app/public/images/category', $banner);
        }

        // Generate new slug and check if it’s different
        $newSlug = \Str::slug($request->slug);
        if ($newSlug !== $category->slug) {
            $request->validate([
                'slug' => 'required|string|max:255|unique:categories,slug',
            ]);
            $slug = $newSlug;
        } else {
            $slug = $category->slug;
        }

        $data = [
            'category_name' => $request->category_name,
            'category_title' => $request->category_title,
            'icon' => $icon,
            'web_icon' => $webicon,
            'motion_graphics' => $motion_graphics,
            'banner' => $banner,
            'alt_tag' => $request->alt_tag,
            'image_title' => $request->image_title,
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
            'is_form' => $isFormChecked,
            'location' => $loca,
            'specifications' => implode(" | ", $request->specifications),
            'faqs' => $request->faqs,
            'about' => $request->about,
            'total_reviews' => $request->total_reviews,
            'avg_rating' => $request->avg_rating,
            'slug' => $slug,
        ];

        $updated = $category->update($data);

        if ($updated) {
            return redirect('admin/category')->with('success', trans('messages.update'));
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
            'id' => 'required',
        ]);
        $data = Category::where('id', $request->id)->delete();
        Products::where('cat_id', $request->id)->delete();
        Subcategory::where('cat_id', $request->id)->delete();
        Innersubcategory::where('cat_id', $request->id)->delete();
        if ($data) {
            return 1000;
        } else {
            return 2000;
        }
    }

    public function changeStatus(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'status' => 'required',
        ]);

        $data['status'] = $request->status;
        Category::where('id', $request->id)->update($data);
        if ($data) {
            return 1000;
        } else {
            return 2000;
        }
    }
}
