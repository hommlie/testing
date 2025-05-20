<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\LandingPage;
use App\Models\Category;
use Illuminate\Support\Str;
class LandingPageController extends Controller
{
    // INDEX  FUNCTION 
    public function index()
    {
        $datas = LandingPage::all();
        $categories = Category::all();
        return view('admin.landingpage.index', compact('datas', 'categories'));

    }

    // ADD 
    public function create()
    {
        $categories = Category::all();
        return view('admin.landingpage.add', compact('categories'));
    }

    // STORE 
    public function store(Request $request)
    {

        $request->validate([
            'title' => 'required|string|max:255',
            'sub_title' => 'required|string|max:500',
            'hero_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'banner' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'why_choose_title' => 'required|string|max:255',
            'why_choose_subtitle' => 'required|string|max:500',
            'why_choose_banner' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'why_choose_content' => 'required|array',
            'cat_id' => 'required|integer',
            'slug' => 'required|string|max:255',
            'alt_tag' => 'required|string|max:255',
            'image_title' => 'required|string|max:255',
            'meta_title' => 'required|string|max:255',
            'meta_description' => 'required|string|max:500',
        ]);
        
        // Handle Image Uploads
        $heroImageName = null;
        $bannerImageName = null;
        $whyChooseBannerName = null;

        if ($request->hasFile('hero_image')) {
            $heroImageName = time() . '_hero.' . $request->hero_image->extension();
            $request->hero_image->move(public_path('/storage/app/public/images/landing/'), $heroImageName);
           
        }

        if ($request->hasFile('banner')) {
            $bannerImageName = time() . '_banner.' . $request->banner->extension();
            $request->banner->move(public_path('/storage/app/public/images/landing/'), $bannerImageName);
        }

        if ($request->hasFile('why_choose_banner')) {
            $whyChooseBannerName = time() . '_why_choose.' . $request->why_choose_banner->extension();
            $request->why_choose_banner->move(public_path('/storage/app/public/images/landing/'), $whyChooseBannerName);
        }
        $whyChooseContent = array_values($request->why_choose_content ?? []);
        $formattedWhyChooseContent = json_encode($whyChooseContent, JSON_UNESCAPED_UNICODE);
        // Create new landing page entry
        LandingPage::create([
            'title' => $request->title,
            'sub_title' => $request->sub_title,
            'hero_image' => $heroImageName,
            'banner' => $bannerImageName,
            'why_choose_title' => $request->why_choose_title,
            'why_choose_subtitle' => $request->why_choose_subtitle,
            'why_choose_banner' => $whyChooseBannerName,
            'why_choose_content' => $formattedWhyChooseContent,
            'cat_id' => $request->cat_id,
            'slug' => $request->slug,
            'alt_tag' => $request->alt_tag,
            'image_title' => $request->image_title,
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
        ]);

        return redirect()->route('admin.landingpage')->with('success', 'Landing Page added successfully!');
    }
   
    // UPDATE 
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'sub_title' => 'required|string|max:255',
            'hero_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'why_choose_title' => 'nullable|string|max:255',
            'why_choose_subtitle' => 'nullable|string|max:255',
            'why_choose_banner' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'cat_id' => 'required|integer',
            'slug' => 'nullable|string|max:255',
            'alt_tag' => 'nullable|string|max:255',
            'image_title' => 'required|string|max:255',
            'meta_title' => 'required|string|max:255',
            'meta_description' => 'required|string',
            'why_choose_content' => 'required|array',
            'why_choose_content.*.title' => 'required|string|max:255',
            'why_choose_content.*.description' => 'required|string',
        ]);

        $landingpage = LandingPage::findOrFail($id);

        // Handle Image Uploads
        if ($request->hasFile('hero_image')) {
            $heroImageName = time() . '_hero.' . $request->hero_image->extension();
            $request->hero_image->move(public_path('/storage/app/public/images/landing'), $heroImageName);
            $landingpage->hero_image = $heroImageName;
        }

        if ($request->hasFile('banner')) {
            $bannerImageName = time() . '_banner.' . $request->banner->extension();
            $request->banner->move(public_path('/storage/app/public/images/landing'), $bannerImageName);
            $landingpage->banner = $bannerImageName;
        }

        if ($request->hasFile('why_choose_banner')) {
            $whyChooseBannerName = time() . '_why_choose.' . $request->why_choose_banner->extension();
            $request->why_choose_banner->move(public_path('/storage/app/public/images/landing'), $whyChooseBannerName);
            $landingpage->why_choose_banner = $whyChooseBannerName;
        }

        $whyChooseContent = array_values($request->why_choose_content ?? []);
        $formattedWhyChooseContent = json_encode($whyChooseContent, JSON_UNESCAPED_UNICODE);


        // Update Landing Page Data
        $landingpage->update([
            'title' => $request->title,
            'sub_title' => $request->sub_title,
            'why_choose_title' => $request->why_choose_title,
            'why_choose_subtitle' => $request->why_choose_subtitle,
            'cat_id' => $request->cat_id,
            'slug' => $request->slug,
            'alt_tag' => $request->alt_tag,
            'image_title' => $request->image_title,
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
            'why_choose_content' => $formattedWhyChooseContent,
        ]);

        return redirect()->route('admin.landingpage')->with('success', 'Landing Page updated successfully!');
    }


     // EDIT 
     public function edit($id)
     {
         $landingpage = LandingPage::findOrFail($id);
         $categories = Category::all();
         return view('admin.landingpage.edit', compact('landingpage', 'categories'));
     }




    // CHNAGE STATUS 
    public function changeStatus(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);
        $currentStatus = LandingPage::where('id', $request->id)->value('status');
        $newStatus = ($currentStatus == 1) ? 0 : 1;
        $data['status'] = $newStatus;
        $updateStatus = LandingPage::where('id', $request->id)->update($data);
        if ($updateStatus) {
            return 1000;
        } else {
            return 2000;
        }
    }

    // DELETE HERO AND OFFER SECTION
    public function destroy(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);
        $delete = LandingPage::where('id', $request->id)->delete();
        if ($delete) {
            return 1000;
        } else {
            return 2000;
        }
    }

}
?>