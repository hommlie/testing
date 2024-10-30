<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ThoughtfulCuration;
use Illuminate\Support\Str; // Import for generating UUIDs
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


class ThoughtfulCurationController extends Controller
{
    public function index()
    {
        // Fetch data from the ThoughtfulCuration model
        $thoughtfulCurations = ThoughtfulCuration::all();

        // Pass the data to the view
        return view('admin.thoughtful-curations.index', compact('thoughtfulCurations'));
    }
    public function create()
    {
        return view('admin.thoughtful-curations.add'); // Display the add form
    }



    public function store(Request $request)
    {
        // Validate the incoming request data
        // $request->validate(rules: [
        //     'video_file' => 'required|file|mimes:mp4,mov,avi,wmv|max:500000', // 20 MB
        //     'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif|max:20480', // 20 MB
        // ]);

        $validator = Validator::make($request->all(), [
            'video_file' => 'required|file|mimes:mp4,mov,avi,wmv|max:10240',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        // $validator = Validator::make($request->all(), [
        //     'file' => 'max:10240',
        // ]);
       



        // Initialize variables for paths
        $videoPath = null;
        $thumbnailPath = null;

        // Handle the video file upload with a unique name and custom folder path
        if ($request->hasFile('video_file')) {
            $video = $request->file('video_file');
            $videoFileName = 'video_' . time() . '.' . $video->extension();
            $video->move(public_path('front/images/thought-videos'), $videoFileName);
            $videoPath = 'thought-videos/' . $videoFileName; // Assign to $videoPath
        }

        // Handle the thumbnail upload with a unique name and custom folder path
        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail');
            $thumbnailFileName = 'thumbnail_' . Str::uuid() . '.' . $thumbnail->getClientOriginalExtension();
            $thumbnail->move(public_path('front/images/thought-thumbnails'), $thumbnailFileName);
            $thumbnailPath = 'thought-thumbnails/' . $thumbnailFileName; // Assign to $thumbnailPath
        }

        // Verify paths are not null before saving to the database
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
        // Validate the incoming request data
        $request->validate([
            'video_file' => 'nullable|file|mimes:mp4,mov,avi,wmv',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif',
        ]);

        // Find the existing curation by ID
        $curation = ThoughtfulCuration::findOrFail($id);

        // Initialize variables for paths
        $videoPath = $curation->video; // Default to the existing video
        $thumbnailPath = $curation->thumbnail; // Default to the existing thumbnail

        // Handle the video file upload if a new file is uploaded
        if ($request->hasFile('video_file')) {
            // Delete the old video if it exists
            if ($curation->video && Storage::disk('public')->exists($curation->video)) {
                Storage::disk('public')->delete($curation->video);
            }

            // Store the new video file
            $video = $request->file('video_file');
            $videoFileName = 'video_' . time() . '.' . $video->extension();
            $video->move(public_path('front/images/thought-videos'), $videoFileName);
            $videoPath = 'thought-videos/' . $videoFileName; // Update path
        }

        // Handle the thumbnail upload if a new file is uploaded
        if ($request->hasFile('thumbnail')) {
            // Delete the old thumbnail if it exists
            if ($curation->thumbnail && Storage::disk('public')->exists($curation->thumbnail)) {
                Storage::disk('public')->delete($curation->thumbnail);
            }

            // Store the new thumbnail file
            $thumbnail = $request->file('thumbnail');
            $thumbnailFileName = 'thumbnail_' . Str::uuid() . '.' . $thumbnail->getClientOriginalExtension();
            $thumbnail->move(public_path('front/images/thought-thumbnails'), $thumbnailFileName);
            $thumbnailPath = 'thought-thumbnails/' . $thumbnailFileName; // Update path
        }

        // Update the database record
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