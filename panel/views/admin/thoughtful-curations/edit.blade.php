@extends('layouts.admin')

@section('css')
<link rel="stylesheet" href="{{ asset('storage/app/public/Adminassets/css/dataTables.bootstrap4.css') }}">
@endsection

@section('script')
<script src="{{ asset('storage/app/public/Adminassets/js/dataTables.js') }}"></script>
<script src="{{ asset('storage/app/public/Adminassets/js/dataTables.bootstrap4.js') }}"></script>
@endsection

@section('content')
@if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif
<div class="container card">
    <h3 class="mt-4">Edit Thoughtful Curation</h3>
    <hr>

   
    <form id="mediaForm" action="{{ route('admin.thoughtful-curations.update', $curation->id) }}" method="POST" enctype="multipart/form-data">
        @csrf

        <div class="form-group ml-5 col-md-6">
            <label for="video">Video URL</label>
            <input type="url" class="form-control"  name="video_file" value="{{$curation->video}}">
            <span id="videoFileError" class="text-danger"></span> <!-- Error message span -->
        </div>

        <div class="form-group ml-5 col-md-6">
            <label for="thumbnail">Thumbnail <span class="text-success">(Only jpeg,png,jpg formats are allowed)</span></label>
            <input type="file" class="form-control" id="thumbnail" name="thumbnail">
            <span id="thumbnailError" class="text-danger"></span> <!-- Error message span -->
        </div>

      

        <div class="form-group ml-5 mt-5">
            <label>Current Thumbnail</label><br>
            <img src="{{ asset('/storage/app/public/thoughtfull-thumbnails/' . $curation->thumbnail) }}" alt="Current Thumbnail" style="width:400px; height:250px;">
        </div>

        <button type="submit" class="btn btn-primary mt-5 ml-5">Update</button>
        <a href="{{ route('admin.thoughtful-curations') }}" class="btn btn-secondary mt-5">Cancel</a><br><br>
    </form>
</div>

<script>
    document.getElementById('mediaForm').addEventListener('submit', function(event) {
        // Clear previous error messages
        document.getElementById('videoFileError').innerText = '';
        document.getElementById('thumbnailError').innerText = '';

        const videoFileInput = document.getElementById('video');
        const imageFileInput = document.getElementById('thumbnail');
        const maxVideoFileSize = 10 * 1024 * 1024; // 10 MB in bytes
        const maxImageFileSize = 5 * 1024 * 1024; // 5 MB in bytes
        let hasError = false; // Flag for form validation errors

        // Validate video file size (if a new video is uploaded)
        if (videoFileInput.files.length > 0) {
            const videoFile = videoFileInput.files[0];
            if (videoFile.size > maxVideoFileSize) {
                document.getElementById('videoFileError').innerText = 'The video file size must not exceed 10 MB.';
                hasError = true; // Set error flag
            }
        }

        // Validate image file size (if a new thumbnail is uploaded)
        if (imageFileInput.files.length > 0) {
            const imageFile = imageFileInput.files[0];
            if (imageFile.size > maxImageFileSize) {
                document.getElementById('thumbnailError').innerText = 'The image file size must not exceed 5 MB.';
                hasError = true; // Set error flag
            }
        }

        // Prevent form submission if there are errors
        if (hasError) {
            event.preventDefault();
        }
    });
</script>
@endsection