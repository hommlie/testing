<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\AddPincode;
use Illuminate\Support\Str;
use App\Models\SeoPages;
use App\Models\Subcategory;

class SeoPagesController extends Controller
{
    public function index()
    {
        $subCategory = Subcategory::all();
        $seoPages = SeoPages::all();
        return view('admin.seopages.index', compact('subCategory', 'seoPages')); //
    }

    public function edit($id)
    {

        $seoPage = SeoPages::findOrFail($id);
        $subCategory = SubCategory::all();

        return view('admin.seopages.edit', compact('seoPage', 'subCategory'));
    }

    public function create()
    {
        $subCategory = SubCategory::all();
        return view('admin.seopages.add', compact('subCategory'));
    }


    public function update(Request $request, $id)
    {
        // Validate the incoming request data
        $request->validate([
            'title' => 'required|string|max:255',
            'subcat_id' => 'required|integer',
            'sub_title' => 'required|string|max:255',
            'banner' => 'nullable|mimes:png,jpg,jpeg,gif',
            'description' => 'required|string',
            'slug' => 'required|string|max:255',
            'alt_tag' => 'required|string|max:255',
            'image_title' => 'required|string|max:255',
            'meta_title' => 'required|string|max:255',
            'meta_description' => 'required|string',
        ]);
    
        // Get the SEO page record
       
        $imagepath = $request->oldBanner;
    
        if ($request->hasFile('banner')) {
            $bannerImage = $request->file('banner');
            $bannerImageFileName = 'banner_' . Str::uuid() . '.' . $bannerImage->getClientOriginalExtension();
            $bannerImage->move(public_path('/storage/app/public/images/seo/'), $bannerImageFileName);
            $imagepath = $bannerImageFileName;
            
        }
    
        // Update only the modified attributes
        $SeoPages = SeoPages::find($id);
        $SeoPages->title = $request->title;
        $SeoPages->subcat_id = $request->subcat_id;
        $SeoPages->sub_title = $request->sub_title;
        $SeoPages->description = $request->description;
        $SeoPages->banner = $imagepath;
        $SeoPages->slug = $request->slug;
        $SeoPages->alt_tag = $request->alt_tag;
        $SeoPages->image_title = $request->image_title;
        $SeoPages->meta_title = $request->meta_title;
        $SeoPages->meta_description = $request->meta_description;
    
        // Save the record
        $SeoPages->save();
    
        return redirect()->route('admin.seopages')->with('success', 'SEO Page updated successfully!');
    }
    

    public function store(Request $request)
    {

        $request->validate([
            'title' => 'required|string|max:255',
            'subcat_id' => 'required|exists:subcategories,id', 
            'sub_title' => 'required|string|max:255',
            'banner' =>  'required|mimes:png,jpg,jpeg,gif', 
            'slug' => 'required|string|max:255',
            'alt_tag' => 'required|string|max:255',
            'image_title' => 'required|string|max:255',
            'meta_title' => 'required|string|max:255',
            'description' => 'required|string',
            'meta_description' => 'required|string',
        ]);

        if ($request->hasFile('banner')) {
            $bannerImage = $request->file('banner');
            $bannerImageFileName = 'banner' . Str::uuid() . '.' . $bannerImage->getClientOriginalExtension();
            $bannerImage->move(public_path('/storage/app/public/images/seo/'), $bannerImageFileName);
            $bannerImagePath = $bannerImageFileName;
        }

        SeoPages::create([
            'title' => $request->input('title'),
            'subcat_id' => $request->input('subcat_id'),
            'sub_title' => $request->input('sub_title'),
            'banner' => $bannerImagePath, 
            'slug' => $request->input('slug'),
            'alt_tag' => $request->input('alt_tag'),
            'image_title' => $request->input('image_title'),
            'meta_title' => $request->input('meta_title'),
            'description' => $request->input('description'),
            'meta_description' => $request->input('meta_description'),
        ]);

        return redirect()->route('admin.seopages')->with('success', 'SEO Page added successfully!');
    }
    
 
    public function destroy(Request $request)
    {
        $this->validate($request,[
            'id' => 'required',
        ]);
        $data=SeoPages::where('id',$request->id)->delete();
        if($data) {
            return 1000;
        } else {
            return 2000;
        }
    }

    public function changeStatus(Request $request)

    {

        $this->validate($request, [
            'id' => 'required',
        ]);

        $currentStatus = SeoPages::where('id', $request->id)->value('status');
        $newStatus = ($currentStatus == 1) ? 0 : 1;
    
        $data['status'] = $newStatus;
        $updateStatus = SeoPages::where('id', $request->id)->update($data);
        if ($updateStatus) {
            return 1000; 
        } else {
            return 2000;
        }
    }





}