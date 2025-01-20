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
    public function store1(Request $request)
    {
        // dd($request);
        $this->validate($request, [
            'category_name' => 'required',
            'icon' => 'required|mimes:png,jpg,jpeg',
            'webicon' => 'required|mimes:png,jpg,jpeg',
            'alt_tag' => 'required',
            'image_title' => 'required',
            'video' => 'required|mimes:mp4,avi,mov|max:102400'
        ]);

        try {
            // Handle icon upload
            $icon = 'category-' . uniqid() . '.' . $request->icon->getClientOriginalExtension();
            $request->icon->move(public_path('storage/app/public/images/category'), $icon);

            // Handle webicon upload
            $webicon = 'webcategory-' . uniqid() . '.' . $request->webicon->getClientOriginalExtension();
            $request->webicon->move(public_path('storage/app/public/images/category'), $webicon);

            // Handle video upload
            if ($request->hasFile('video')) {
                $video = $request->file('video');
                $videoName = 'video-' . uniqid() . '.' . $video->getClientOriginalExtension();
                $video->move(public_path('storage/app/public/images/category'), $videoName);
            } else {
                return redirect()->back()->with('danger', 'No video file was uploaded.');
            }
            $isFormChecked = $request->has('is_form') ? 1 : 0;
            $loca = $request->location ? implode(" | ", $request->location) : null;
            // Save category data
            $dataval = [
                'category_name' => $request->category_name,
                'icon' => $icon,
                'web_icon' => $webicon,
                'alt_tag' => $request->alt_tag,
                'image_title' => $request->image_title,
                'meta_title' => $request->meta_title,
                'meta_description' => $request->meta_description,
                'video' => $videoName,
                'is_form' => $isFormChecked,
                'location' => $loca,
                'slug' => Str::slug($request->category_name)
            ];

            $data = Category::create($dataval);

            if ($data) {
                return redirect('admin/category')->with('success', trans('messages.success'));
            } else {
                return redirect()->back()->with('danger', trans('messages.fail'));
            }

        } catch (\Exception $e) {
            \Log::error('Video upload failed', ['error' => $e->getMessage()]);
            return redirect()->back()->with('danger', 'Video upload failed.');
        }
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'category_name' => 'required',
            'icon' => 'required|mimes:png,jpg,jpeg',
            'webicon' => 'required|mimes:png,jpg,jpeg',
            'motion_graphics' => 'required|mimes:png,jpg,jpeg,gif',
            'alt_tag' => 'required',
            'image_title' => 'required',
            'video' => 'nullable',
            'thumbnail' => 'nullable'
        ]);

        // Generate unique file name and move the file
        if ($request->hasFile('icon')) {
            $icon = 'icon-' . uniqid() . '.' . $request->icon->getClientOriginalExtension();
            $request->icon->move('storage/app/public/images/category', $icon);
        } else {
            $icon = "NA";
        }

        // Generate unique file name and move the file
        if ($request->hasFile('webicon')) {
            $webicon = 'webicon-' . uniqid() . '.' . $request->webicon->getClientOriginalExtension();
            $request->webicon->move('storage/app/public/images/category', $webicon);
        } else {
            $webicon = "NA";
        }



        // Generate unique file name and move the file
        if ($request->hasFile('thumbnail')) {
            $thumbnail = 'thumbnail-' . uniqid() . '.' . $request->thumbnail->getClientOriginalExtension();
            $request->thumbnail->move('storage/app/public/images/category', $thumbnail);
        } else {
            $thumbnail = "NA";
        }

        // Generate unique file name and move the file
        if ($request->hasFile('video')) {
            $video = 'video-' . uniqid() . '.' . $request->video->getClientOriginalExtension();
            $request->video->move('storage/app/public/images/category', $video);
        } else {
            $video = "NA";
        }

        if ($request->hasFile('motion_graphics')) {
            $motion_graphics = 'motion_graphics-' . uniqid() . '.' . $request->icon->getClientOriginalExtension();
            $request->motion_graphics->move('storage/app/public/images/category', $motion_graphics);
        } else {
            $motion_graphics = "NA";
        }

        // Check if a subcategory with the same slug already exists
        $checkslug = Category::where('slug', \Str::slug($request->category_name))->first();
        $isFormChecked = $request->has('is_form') ? 1 : 0;
        $loca = $request->location ? implode(" | ", $request->location) : null;
        if (@$checkslug->slug) {

            // If slug exists, create a new slug combining category slug and subcategory name
            $dataval = [
                'icon' => $icon, // Ensure icon is included here
                'web_icon' => $webicon, // Ensure icon is included here
                'thumbnail' => $thumbnail, // Ensure icon is included here
                'video' => $video, // Ensure icon is included here
                'motion_graphics' => $motion_graphics, 
                'category_name' => $request->category_name,
                'alt_tag' => $request->alt_tag,
                'image_title' => $request->image_title,
                'meta_title' => $request->meta_title,
                'meta_description' => $request->meta_description,
                'is_form' => $isFormChecked,
                'location' => $loca,
                'slug' => \Str::slug(uniqid() . '-' . $request->category_name),
            ];
        } else {
            // Default case where the slug does not exist
            $dataval = [
                'category_name' => $request->category_name,
                'web_icon' => $webicon, // Ensure icon is included here
                'motion_graphics' => $motion_graphics, 
                'alt_tag' => $request->alt_tag,
                'image_title' => $request->image_title,
                'meta_title' => $request->meta_title,
                'meta_description' => $request->meta_description,
                'video' => $video, // Ensure icon is included here
                'thumbnail' => $thumbnail, // Ensure icon is included here
                'slug' => \Str::slug($request->category_name),
                'is_form' => $isFormChecked,
                'icon' => $icon, // Ensure icon is included here as well
            ];
        }

        // Create the new subcategory record
        $data = Category::create($dataval);
        if ($data) {
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
            'icon' => 'mimes:jpeg,png,jpg',
            'webicon' => 'mimes:jpeg,png,jpg',
            'motion_graphics' => 'mimes:png,jpg,jpeg,gif',
            'alt_tag' => 'required',
            'image_title' => 'required',
        ]);
         
        $loca = $request->location ? implode(" | ", $request->location) : null;
        if (isset($request->icon)) {

            File::delete('storage/app/public/images/category/' . $request->old_img);

            if ($request->hasFile('icon')) {
                $icon = $request->file('icon');
                $icon = 'category-' . uniqid() . '.' . $request->icon->getClientOriginalExtension();
                $request->icon->move('storage/app/public/images/category', $icon);

                $data = array('category_name' => $request->category_name, 'alt_tag' => $request->alt_tag,  'location' => $loca, 'image_title' => $request->image_title, 'meta_title' => $request->meta_title, 'meta_description' => $request->meta_description, 'is_form' => $request->has('is_form') ? 1 : 0, 'icon' => $icon, 'slug' => \Str::slug($request->category_name));
                $category = Category::find($request->cat_id)->update($data);
            }
        } else {
            $data = array('category_name' => $request->category_name, 'alt_tag' => $request->alt_tag,  'location' => $loca, 'image_title' => $request->image_title, 'meta_title' => $request->meta_title, 'meta_description' => $request->meta_description, 'is_form' => $request->has('is_form') ? 1 : 0, 'slug' => \Str::slug($request->category_name));
            $category = Category::find($request->cat_id)->update($data);
        }

        if (isset($request->webicon)) {

            File::delete('storage/app/public/images/category/' . $request->webicon);

            if ($request->hasFile('webicon')) {
                $webicon = $request->file('webicon');
                $webicon = 'webcategory-' . uniqid() . '.' . $request->webicon->getClientOriginalExtension();
                $request->webicon->move('storage/app/public/images/category', $webicon);

                $data = array('category_name' => $request->category_name, 'alt_tag' => $request->alt_tag,  'image_title' => $request->image_title,  'location' => $loca, 'meta_title' => $request->meta_title, 'meta_description' => $request->meta_description, 'web_icon' => $webicon,  'slug' => \Str::slug($request->category_name));
                $category = Category::find($request->cat_id)->update($data);
            }
        } else {
            $data = array('category_name' => $request->category_name, 'alt_tag' => $request->alt_tag, 'image_title' => $request->image_title,  'location' => $loca, 'meta_title' => $request->meta_title, 'meta_description' => $request->meta_description, 'slug' => \Str::slug($request->category_name));
            $category = Category::find($request->cat_id)->update($data);
        }       
        if (isset($request->motion_graphics)) {
            File::delete('storage/app/public/images/category/' . $request->motion_graphics);
            if ($request->hasFile('motion_graphics')) {
                $motion_graphics = $request->file('motion_graphics');
                $motion_graphics = 'motion_graphics-' . uniqid() . '.' . $request->motion_graphics->getClientOriginalExtension();
                $request->motion_graphics->move('storage/app/public/images/category', $motion_graphics);

                $data = array('category_name' => $request->category_name, 'alt_tag' => $request->alt_tag, 'image_title' => $request->image_title,  'location' => $loca, 'meta_title' => $request->meta_title, 'meta_description' => $request->meta_description,'motion_graphics' => $motion_graphics,  'slug' => \Str::slug($request->category_name));
                $category = Category::find($request->cat_id)->update($data);
            }
        } else {
            $data = array('category_name' => $request->category_name, 'alt_tag' => $request->alt_tag, 'image_title' => $request->image_title,  'location' => $loca, 'meta_title' => $request->meta_title, 'meta_description' => $request->meta_description, 'slug' => \Str::slug($request->category_name));
            $category = Category::find($request->cat_id)->update($data);
        }


        if ($category) {
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
