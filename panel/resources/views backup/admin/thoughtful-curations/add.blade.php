@extends('layouts.admin')

@section('css')
<link rel="stylesheet" href="{{ asset('storage/app/public/Adminassets/css/dataTables.bootstrap4.css') }}">
@endsection

@section('script')
<script src="{{ asset('storage/app/public/Adminassets/js/dataTables.js') }}"></script>
<script src="{{ asset('storage/app/public/Adminassets/js/dataTables.bootstrap4.js') }}"></script>
@endsection

@section('content')
<div class="container card mt-5">
    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <!-- Validation Errors -->
    @if($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <h4 class="mt-4">Thoughtful Curation</h4>
    <div class="">
        <hr>
        <form id="mediaForm" action="{{ route('admin.thoughtful-curations.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            
            <div class="form-group">
            <label for="video_file" style="font-size: 0.9em;">Video URL</span></label>
                <input type="url" class="form-control"  name="video_file" placeholder="Enter Video youtube URL" required>
                <span id="videoFileError" class="text-danger"></span> <!-- Error message span -->
            </div>

            <div class="form-group">
                <label for="thumbnail">Thumbnail <span class="text-success">(Only jpeg,png,jpg formats are allowed)</span></label>
                <input type="file" class="form-control" id="thumbnail" name="thumbnail" accept="image/*" required>
                <span id="thumbnailError" class="text-danger"></span> <!-- Error message span -->
            </div>

            <button type="submit" class="btn btn-primary">Add Curation</button>
            <a href="{{ route('admin.thoughtful-curations') }}" class="btn btn-secondary">Cancel</a><br><br>
        </form>
    </div>
</div>

<script>
    document.getElementById('mediaForm').addEventListener('submit', function(event) {
        // Clear previous error messages
        document.getElementById('videoFileError').innerText = '';
        document.getElementById('thumbnailError').innerText = '';

        const videoFileInput = document.getElementById('video_file');
        const imageFileInput = document.getElementById('thumbnail');
        const maxVideoFileSize = 10 * 1024 * 1024; // 10 MB in bytes
        const maxImageFileSize = 5 * 1024 * 1024; // 5 MB in bytes
        let hasError = false; // Flag for form validation errors

        // Validate video file size
        if (videoFileInput.files.length > 0) {
            const videoFile = videoFileInput.files[0];
            if (videoFile.size > maxVideoFileSize) {
                document.getElementById('videoFileError').innerText = 'The video file size must not exceed 10 MB.';
                hasError = true; // Set error flag
            }
        }

        // Validate image file size
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