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
        $thoughtfulCurations = ThoughtfulCuration::orderBy('created_at', 'desc')->get();
        return view('admin.thoughtful-curations.index', compact('thoughtfulCurations'));
    }
    
    public function create()
    {
        return view('admin.thoughtful-curations.add');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'media_type' => 'required|in:url,video,image',
            'video_url' => 'nullable|required_if:media_type,url|url',
            'video_file' => [
                'nullable',
                'required_if:media_type,video,image',
                function ($attribute, $value, $fail) use ($request) {
                    if (in_array($request->media_type, ['video', 'image']) && !$request->hasFile('video_file')) {
                        $fail('A valid file is required for the selected media type.');
                    }
                },
                'file',
                'mimes:mp4,mov,avi,jpeg,png,jpg',
                'max:102400', // 100MB
            ],
            'thumbnail' => 'nullable|required_if:media_type,url,video|image|mimes:jpeg,png,jpg|max:10240',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $videoPath = null;
        $thumbnailPath = null;

        if ($request->media_type === 'url' && $request->filled('video_url')) {
            $videoPath = $request->input('video_url');
        } elseif ($request->media_type === 'video' && $request->hasFile('video_file')) {
            $video = $request->file('video_file');
            $videoFileName = 'video_' . Str::uuid() . '.' . $video->getClientOriginalExtension();
            $video->move(public_path('/storage/app/public/thoughtfull-videos/'), $videoFileName);
            $videoPath = $videoFileName;
        } elseif ($request->media_type === 'image' && $request->hasFile('video_file')) {
            $image = $request->file('video_file');
            $imageFileName = 'image_' . Str::uuid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('/storage/app/public/thoughtfull-thumbnails/'), $imageFileName);
            $videoPath = $imageFileName;
        }

        if (in_array($request->media_type, ['url', 'video']) && $request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail');
            $thumbnailFileName = 'thumbnail_' . Str::uuid() . '.' . $thumbnail->getClientOriginalExtension();
            $thumbnail->move(public_path('/storage/app/public/thoughtfull-thumbnails/'), $thumbnailFileName);
            $thumbnailPath = $thumbnailFileName;
        }

        if ($videoPath || ($request->media_type === 'url' && $thumbnailPath)) {
            ThoughtfulCuration::create([
                'video' => $videoPath,
                'thumbnail' => $thumbnailPath,
                'media_type' => $request->media_type,
            ]);

            return redirect()->route('admin.thoughtful-curations')->with('success', 'Curation added successfully!');
        } else {
            return back()->withErrors(['error' => 'File upload or URL is missing. Please try again.']);
        }
    }

    public function edit($id)
    {
        $curation = ThoughtfulCuration::findOrFail($id);
        return view('admin.thoughtful-curations.edit', compact('curation'));
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'media_type' => 'required|in:url,video,image',
            'video_url' => 'nullable|required_if:media_type,url|url',
            'video_file' => [
                'nullable',
                'file',
                'mimes:mp4,mov,avi,jpeg,png,jpg',
                'max:102400',
            ],
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg|max:10240',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $curation = ThoughtfulCuration::findOrFail($id);
        $videoPath = $curation->video;
        $thumbnailPath = $curation->thumbnail;

        if ($request->media_type === 'url' && $request->filled('video_url')) {
            $videoPath = $request->input('video_url');
        } elseif ($request->media_type === 'video' && $request->hasFile('video_file')) {
            if ($curation->video && Storage::disk('public')->exists('thoughtfull-videos/' . $curation->video)) {
                Storage::disk('public')->delete('thoughtfull-videos/' . $curation->video);
            }
            $video = $request->file('video_file');
            $videoFileName = 'video_' . Str::uuid() . '.' . $video->getClientOriginalExtension();
            $video->move(public_path('/storage/app/public/thoughtfull-videos/'), $videoFileName);
            $videoPath = $videoFileName;
        } elseif ($request->media_type === 'image' && $request->hasFile('video_file')) {
            if ($curation->video && Storage::disk('public')->exists('thoughtfull-thumbnails/' . $curation->video)) {
                Storage::disk('public')->delete('thoughtfull-thumbnails/' . $curation->video);
            }
            $image = $request->file('video_file');
            $imageFileName = 'image_' . Str::uuid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('/storage/app/public/thoughtfull-thumbnails/'), $imageFileName);
            $videoPath = $imageFileName;
            $thumbnailPath = null;
        }

        if (in_array($request->media_type, ['url', 'video']) && $request->hasFile('thumbnail')) {
            if ($curation->thumbnail && Storage::disk('public')->exists('thoughtfull-thumbnails/' . $curation->thumbnail)) {
                Storage::disk('public')->delete('thoughtfull-thumbnails/' . $curation->thumbnail);
            }
            $thumbnail = $request->file('thumbnail');
            $thumbnailFileName = 'thumbnail_' . Str::uuid() . '.' . $thumbnail->getClientOriginalExtension();
            $thumbnail->move(public_path('/storage/app/public/thoughtfull-thumbnails/'), $thumbnailFileName);
            $thumbnailPath = $thumbnailFileName;
        }

        $curation->update([
            'video' => $videoPath,
            'thumbnail' => $thumbnailPath,
            'media_type' => $request->media_type,
        ]);

        return redirect()->route('admin.thoughtful-curations')->with('success', 'Curation updated successfully!');
    }

    public function destroy($id)
    {
        $curation = ThoughtfulCuration::find($id);
        if ($curation) {
            if ($curation->video && Storage::disk('public')->exists('thoughtfull-videos/' . $curation->video)) {
                Storage::disk('public')->delete('thoughtfull-videos/' . $curation->video);
            }
            if ($curation->video && Storage::disk('public')->exists('thoughtfull-thumbnails/' . $curation->video)) {
                Storage::disk('public')->delete('thoughtfull-thumbnails/' . $curation->video);
            }
            if ($curation->thumbnail && Storage::disk('public')->exists('thoughtfull-thumbnails/' . $curation->thumbnail)) {
                Storage::disk('public')->delete('thoughtfull-thumbnails/' . $curation->thumbnail);
            }
            $curation->delete();
            return redirect()->back()->with('success', 'Curation deleted successfully.');
        } else {
            return redirect()->back()->with('error', 'Curation not found.');
        }
    }
}