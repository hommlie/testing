<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\homepageSections;
use Illuminate\Support\Str;
class HomePageSectionsController extends Controller
{
    public function index()
    {
        $homepageSections = homepageSections::where('type', 'hero')->get();
        return view('admin.homepagesections.index', compact('homepageSections'));
    }

    public function createHero()
    {
        return view('admin.homepagesections.addhero');
    }

    public function storeHero(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'sub_title' => 'required',
            'btn_text' => 'required|string',
            'btn_link' => 'required|url',
            'alt_tag' => 'required',
            'image_title' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        $homepageSection = new HomepageSections();
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageFileName = 'image_' . Str::uuid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('/storage/app/public/images/homesections/'), $imageFileName);
            $homepageSection->image = $imageFileName;
        }
        $homepageSection->title = $request->title;
        $homepageSection->sub_title = $request->sub_title;
        $homepageSection->btn_text = $request->btn_text;
        $homepageSection->btn_link = $request->btn_link;
        $homepageSection->alt_tag = $request->alt_tag;
        $homepageSection->image_title = $request->image_title;
        $homepageSection->type ='hero';
        $homepageSection->save();
        return redirect()->route('admin.homepagesections')->with('success', 'New section added successfully!');
    }

    public function editHero($id)
    {
        $homepageSection = homepageSections::find($id);
        return view('admin.homepagesections.edithero', compact('homepageSection'));
    }

    public function updateHero(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'sub_title' => 'required',
            'btn_text' => 'required|string',
            'btn_link' => 'required|url',
            'alt_tag' => 'required',
            'image_title' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        $homepageSection = homepageSections::findOrFail($id);
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageFileName = 'image_' . Str::uuid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('/storage/app/public/images/homesections/'), $imageFileName);

            // Delete old image if exists
            if ($homepageSection->image && file_exists(public_path('/storage/app/public/images/homesections/' . $homepageSection->image))) {
                unlink(public_path('/storage/app/public/images/homesections/' . $homepageSection->image));
            }
            $homepageSection->image = $imageFileName;
        }
        $homepageSection->title = $request->title;
        $homepageSection->sub_title = $request->sub_title;
        $homepageSection->btn_text = $request->btn_text;
        $homepageSection->btn_link = $request->btn_link;
        $homepageSection->alt_tag = $request->alt_tag;
        $homepageSection->image_title = $request->image_title;
        $homepageSection->save();
        return redirect()->route('admin.homepagesections')->with('success', 'Section updated successfully!');
    }
    

    // HOME PAGE OFFER SECTION
    public function viewOffer(){
        $homepageSections = homepageSections::where('type', 'offer')->get();
        return view('admin.homepagesections.indexoffer', compact('homepageSections'));
    }


    public function addOffer(){
        return view('admin.homepagesections.addoffer');
    }

    // STORE OFFER SECTION
    public function storeOffer(Request $request){
        $request->validate([
            'title' => 'required',
            'alt_tag' => 'required',
            'image_title' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        $homepageSection = new HomepageSections();
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageFileName = 'image_offer_' . Str::uuid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('/storage/app/public/images/homesections/'), $imageFileName);
            $homepageSection->image = $imageFileName;
        }
        $homepageSection->title = $request->title;
        $homepageSection->alt_tag = $request->alt_tag;
        $homepageSection->image_title = $request->image_title;
        $homepageSection->type ='offer';
        $homepageSection->save();
        return redirect()->route('admin.homepagesections.viewOffer')->with('success', 'New section added successfully!');
    }
    // EDIT OFFER SECTION
    public function editOffer($id)
    {
        $homepageSection = homepageSections::where('id', $id)
            ->where('type', 'offer')
            ->first();
        if (!$homepageSection) {
            return redirect()->back()->with('error', 'Offer not found.');
        }
        return view('admin.homepagesections.editoffer', compact('homepageSection'));
    }
    // UPDATED OFFER SECTION
    public function updateOffer(Request $request, $id){
        $request->validate([
            'title' => 'required',
            'alt_tag' => 'required',
            'image_title' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        $homepageSection = homepageSections::findOrFail($id);
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageFileName = 'image_offer_' . Str::uuid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('/storage/app/public/images/homesections/'), $imageFileName);

            // Delete old image if exists
            if ($homepageSection->image && file_exists(public_path('/storage/app/public/images/homesections/' . $homepageSection->image))) {
                unlink(public_path('/storage/app/public/images/homesections/' . $homepageSection->image));
            }
            $homepageSection->image = $imageFileName;
        }
        $homepageSection->title = $request->title;
        $homepageSection->alt_tag = $request->alt_tag;
        $homepageSection->image_title = $request->image_title;
        $homepageSection->save();
        return redirect()->route('admin.homepagesections.viewOffer')->with('success', 'Section updated successfully!');
    }

    // CHNAGE STATUS HERO AND OFFER SECTION 
    public function changeStatusHero(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);
        $currentStatus = homepageSections::where('id', $request->id)->value('status');
        $newStatus = ($currentStatus == 1) ? 0 : 1;
        $data['status'] = $newStatus;
        $updateStatus = homepageSections::where('id', $request->id)->update($data);
        if ($updateStatus) {
            return 1000; 
        } else {
            return 2000;
        }
    }

    // DELETE HERO AND OFFER SECTION
    public function destroyHero(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);
        $delete = homepageSections::where('id', $request->id)->delete();
        if ($delete) {
            return 1000;
        } else {
            return 2000;
        }
    }


}

?>