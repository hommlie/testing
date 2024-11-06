<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ThoughtfulCuration;
use Illuminate\Support\Str; 
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


class ThoughtfulCurationController extends Controller
{
    public function index()
    {
       
        $thoughtfulCurations = ThoughtfulCuration::all();

      //  dd($thoughtfulCurations);

        return view('admin.thoughtful-curations.index', compact('thoughtfulCurations'));
    }
    public function create()
    {
        return view('admin.thoughtful-curations.add'); 
    }



    public function store(Request $request)
    {
       

        $validator = Validator::make($request->all(), [
            'video_file' => 'required|file|mimes:mp4|max:10240',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg|max:10240',
        ]);

        $videoPath = null;
        $thumbnailPath = null;

       
        if ($request->hasFile('video_file')) {
            $video = $request->file('video_file');
            $videoFileName = 'video_' . time() . '.' . $video->extension();
            $video->move(public_path('/storage/app/public/thoughtfull-videos/'), $videoFileName);
            $videoPath =$videoFileName; 
        }

     
        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail');
            $thumbnailFileName = 'thumbnail_' . Str::uuid() . '.' . $thumbnail->getClientOriginalExtension();
            $thumbnail->move(public_path('/storage/app/public/thoughtfull-thumbnails/'), $thumbnailFileName);
            $thumbnailPath =$thumbnailFileName; 
        }

        
        if ($videoPath && $thumbnailPath) {
            ThoughtfulCuration::create([
                'video' => $videoPath,
                'thumbnail' => $thumbnailPath,
            ]);

            return redirect()->route('admin.thoughtful-curations')->with('success', 'Curation added successfully!');
        } else {
            return back()->withErrors(['File upload failed. Please try again.']);
        }
    }
    public function edit($id)
    {
        $curation = ThoughtfulCuration::findOrFail($id);
        return view('admin.thoughtful-curations.edit', compact('curation'));
    }
    public function update(Request $request, $id)
    {
       
        $request->validate([
            'video_file' => 'nullable|file|mimes:mp4',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg',
        ]);

      
        $curation = ThoughtfulCuration::findOrFail($id);

       
        $videoPath = $curation->video; 
        $thumbnailPath = $curation->thumbnail; 

       
        if ($request->hasFile('video_file')) {
         
            if ($curation->video && Storage::disk('public')->exists($curation->video)) {
                Storage::disk('public')->delete($curation->video);
            }

     
            $video = $request->file('video_file');
            $videoFileName = 'video_' . time() . '.' . $video->extension();
            $video->move(public_path('/storage/app/public/thoughtfull-videos/'), $videoFileName);
            $videoPath =  $videoFileName;
        }

      
        if ($request->hasFile('thumbnail')) {
           
            if ($curation->thumbnail && Storage::disk('public')->exists($curation->thumbnail)) {
                Storage::disk('public')->delete($curation->thumbnail);
            }

           
            $thumbnail = $request->file('thumbnail');
            $thumbnailFileName = 'thumbnail_' . Str::uuid() . '.' . $thumbnail->getClientOriginalExtension();
            $thumbnail->move(public_path('/storage/app/public/thoughtfull-thumbnails/'), $thumbnailFileName);
            $thumbnailPath = $thumbnailFileName; 
        }

      
        $curation->update([
            'video' => $videoPath,
            'thumbnail' => $thumbnailPath,
        ]);

        return redirect()->route('admin.thoughtful-curations')->with('success', 'Curation updated successfully!');
    }


    public function destroy($id)
    {
        $curation = ThoughtfulCuration::find($id);
        if ($curation) {
            $curation->delete();
            return redirect()->back()->with('success', 'Video deleted successfully.');
        } else {
            return redirect()->back()->with('error', 'Video not found.');
        }
    }




}

?>