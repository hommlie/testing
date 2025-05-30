@extends('layouts.admin')

@section('css')
<link rel="stylesheet" href="{{ asset('storage/app/public/Adminassets/css/dataTables.bootstrap4.css') }}">
@endsection

@section('script')
<script src="{{ asset('storage/app/public/Adminassets/js/dataTables.js') }}"></script>
<script src="{{ asset('storage/app/public/Adminassets/js/dataTables.bootstrap4.js') }}"></script>
@endsection

@section('content')
<div class="container card">
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

    <h3 class="mt-4">Edit Thoughtful Curation</h3>
    <hr>
    <form id="mediaForm" action="{{ route('admin.thoughtful-curations.update', $curation->id) }}" method="POST" enctype="multipart/form-data">
        @csrf

        <div class="form-group ml-5 col-md-6">
            <label for="media_type">Media Type</label>
            <select class="form-control" id="media_type" name="media_type" required>
                <option value="url" {{ $curation->media_type == 'url' ? 'selected' : '' }}>URL</option>
                <option value="video" {{ $curation->media_type == 'video' ? 'selected' : '' }}>Video</option>
                <option value="image" {{ $curation->media_type == 'image' ? 'selected' : '' }}>Image</option>
            </select>
        </div>

        <div class="form-group ml-5 col-md-6" id="video_url_group" style="{{ $curation->media_type == 'url' ? '' : 'display: none;' }}">
            <label for="video_url">Video/Image URL</label>
            <input type="url" class="form-control" id="video_url" name="video_url" value="{{ $curation->media_type == 'url' ? $curation->video : '' }}" placeholder="Enter Video/Image URL">
            <span id="videoUrlError" class="text-danger"></span>
        </div>

        <div class="form-group ml-5 col-md-6" id="video_file_group" style="{{ $curation->media_type == 'url' ? 'display: none;' : '' }}">
            <label for="video_file">Media Content</label>
            <input type="file" 
                   class="form-control" 
                   id="video_file" 
                   name="video_file" 
                   accept="{{ $curation->media_type == 'image' ? 'image/*' : 'video/mp4,video/mov,video/avi' }}"
                   placeholder="{{ $curation->media_type == 'image' ? 'Select Image File' : 'Select Video File' }}">
            <span id="videoFileError" class="text-danger"></span>
        </div>

        <div class="form-group ml-5 col-md-6" id="video_preview_group" style="{{ $curation->media_type == 'video' && $curation->video ? '' : 'display: none;' }}">
            <label>Video Preview</label><br>
            <video id="video_preview" 
                   controls 
                   src="{{ $curation->media_type == 'video' && $curation->video ? asset('storage/app/public/thoughtfull-videos/' . $curation->video) : '' }}" 
                   style="width:400px; height:250px; {{ $curation->media_type == 'video' && $curation->video ? '' : 'display: none;' }}"></video>
        </div>

        <div class="form-group ml-5 col-md-6" id="image_preview_group" style="{{ $curation->media_type == 'image' && $curation->video ? '' : 'display: none;' }}">
            <label>Image Preview</label><br>
            <img id="image_preview" 
                 src="{{ $curation->media_type == 'image' && $curation->video ? asset('storage/app/public/thoughtfull-thumbnails/' . $curation->video) : '' }}" 
                 alt="Image Preview" 
                 style="width:400px; height:250px; {{ $curation->media_type == 'image' && $curation->video ? '' : 'display: none;' }}">
        </div>

        <div class="form-group ml-5 col-md-6" id="thumbnail_group" style="{{ $curation->media_type == 'image' ? 'display: none;' : '' }}">
            <label for="thumbnail">Thumbnail <span class="text-success">(Only jpeg, png, jpg formats are allowed)</span></label>
            <input type="file" class="form-control" id="thumbnail" name="thumbnail" accept="image/*">
            <span id="thumbnailError" class="text-danger"></span>
        </div>

        <div class="form-group ml-5 col-md-6" id="thumbnail_preview_group" style="{{ $curation->media_type != 'image' && $curation->thumbnail ? '' : 'display: none;' }}">
            <label>Current Thumbnail</label><br>
            <img id="thumbnail_preview" 
                 src="{{ $curation->media_type != 'image' && $curation->thumbnail ? asset('storage/app/public/thoughtfull-thumbnails/' . $curation->thumbnail) : '' }}" 
                 alt="Current Thumbnail" 
                 style="width:400px; height:250px; {{ $curation->media_type != 'image' && $curation->thumbnail ? '' : 'display: none;' }}">
        </div>

        <button type="submit" class="btn btn-primary mt-5 ml-5">Update</button>
        <a href="{{ route('admin.thoughtful-curations') }}" class="btn btn-secondary mt-5">Cancel</a><br><br>
    </form>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        const mediaType = document.getElementById("media_type");
        if (mediaType) {
            const event = new Event("change", { bubbles: true });
            mediaType.dispatchEvent(event);
        }
    });

    document.getElementById('mediaForm').addEventListener('submit', function(event) {
        document.getElementById('videoUrlError').innerText = '';
        document.getElementById('videoFileError').innerText = '';
        document.getElementById('thumbnailError').innerText = '';

        const mediaType = document.getElementById('media_type').value;
        const videoUrlInput = document.getElementById('video_url');
        const videoFileInput = document.getElementById('video_file');
        const thumbnailInput = document.getElementById('thumbnail');
        const maxVideoFileSize = 100 * 1024 * 1024; // 100 MB
        const maxImageFileSize = 10 * 1024 * 1024; // 10 MB
        let hasError = false;

        if (mediaType === 'url' && !videoUrlInput.value) {
            document.getElementById('videoUrlError').innerText = 'Video/Image URL is required for URL media type.';
            hasError = true;
        }

        if (mediaType === 'video' && videoFileInput.files.length > 0) {
            const videoFile = videoFileInput.files[0];
            if (videoFile.size > maxVideoFileSize) {
                document.getElementById('videoFileError').innerText = 'The video file size must not exceed 100 MB.';
                hasError = true;
            }
        } else if (mediaType === 'image' && videoFileInput.files.length > 0) {
            const imageFile = videoFileInput.files[0];
            if (imageFile.size > maxImageFileSize) {
                document.getElementById('videoFileError').innerText = 'The image file size must not exceed 10 MB.';
                hasError = true;
            }
        }

        if ((mediaType === 'url' || mediaType === 'video') && thumbnailInput.files.length > 0) {
            const thumbnailFile = thumbnailInput.files[0];
            if (thumbnailFile.size > maxImageFileSize) {
                document.getElementById('thumbnailError').innerText = 'The thumbnail file size must not exceed 10 MB.';
                hasError = true;
            }
        }

        if (hasError) {
            event.preventDefault();
        }
    });

    document.getElementById('media_type').addEventListener('change', function() {
        const mediaType = this.value;
        const videoUrlGroup = document.getElementById('video_url_group');
        const videoFileGroup = document.getElementById('video_file_group');
        const thumbnailGroup = document.getElementById('thumbnail_group');
        const videoFileInput = document.getElementById('video_file');
        const videoUrlInput = document.getElementById('video_url');
        const thumbnailInput = document.getElementById('thumbnail');
        const videoPreviewGroup = document.getElementById('video_preview_group');
        const imagePreviewGroup = document.getElementById('image_preview_group');
        const thumbnailPreviewGroup = document.getElementById('thumbnail_preview_group');
        const imagePreview = document.getElementById('image_preview');
        const videoPreview = document.getElementById('video_preview');
        const thumbnailPreview = document.getElementById('thumbnail_preview');

        videoFileInput.value = '';
        thumbnailInput.value = '';
        imagePreview.src = '';
        videoPreview.src = '';
        thumbnailPreview.src = '';
        imagePreview.style.display = 'none';
        videoPreview.style.display = 'none';
        thumbnailPreview.style.display = 'none';
        videoPreviewGroup.style.display = 'none';
        imagePreviewGroup.style.display = 'none';
        thumbnailPreviewGroup.style.display = 'none';

        videoUrlInput.removeAttribute('required');
        videoFileInput.removeAttribute('required');
        thumbnailInput.removeAttribute('required');

        if (mediaType === 'image') {
            videoUrlGroup.style.display = 'none';
            thumbnailGroup.style.display = 'none';
            videoFileGroup.style.display = 'block';
            videoFileInput.type = 'file';
            videoFileInput.accept = 'image/*';
            videoFileInput.placeholder = 'Select Image File';
            @if ($curation->media_type == 'image' && $curation->video)
                imagePreview.src = "{{ asset('storage/app/public/thoughtfull-thumbnails/' . $curation->video) }}";
                imagePreview.style.display = 'block';
                imagePreviewGroup.style.display = 'block';
            @endif
        } else if (mediaType === 'video') {
            videoUrlGroup.style.display = 'none';
            thumbnailGroup.style.display = 'block';
            videoFileGroup.style.display = 'block';
            videoFileInput.type = 'file';
            videoFileInput.accept = 'video/mp4,video/mov,video/avi';
            videoFileInput.placeholder = 'Select Video File';
            @if ($curation->media_type == 'video' && $curation->video)
                videoPreview.src = "{{ asset('storage/app/public/thoughtfull-videos/' . $curation->video) }}";
                videoPreview.style.display = 'block';
                videoPreviewGroup.style.display = 'block';
            @endif
            @if ($curation->media_type != 'image' && $curation->thumbnail)
                thumbnailPreview.src = "{{ asset('storage/app/public/thoughtfull-thumbnails/' . $curation->thumbnail) }}";
                thumbnailPreview.style.display = 'block';
                thumbnailPreviewGroup.style.display = 'block';
            @endif
        } else {
            videoUrlGroup.style.display = 'block';
            thumbnailGroup.style.display = 'block';
            videoFileGroup.style.display = 'none';
            videoUrlInput.required = true;
            @if ($curation->media_type != 'image' && $curation->thumbnail)
                thumbnailPreview.src = "{{ asset('storage/app/public/thoughtfull-thumbnails/' . $curation->thumbnail) }}";
                thumbnailPreview.style.display = 'block';
                thumbnailPreviewGroup.style.display = 'block';
            @endif
        }
    });

    document.getElementById('video_file').addEventListener('change', function(event) {
        const mediaType = document.getElementById('media_type').value;
        const videoPreviewGroup = document.getElementById('video_preview_group');
        const imagePreviewGroup = document.getElementById('image_preview_group');
        const imagePreview = document.getElementById('image_preview');
        const videoPreview = document.getElementById('video_preview');
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (mediaType === 'image') {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                    imagePreviewGroup.style.display = 'block';
                    videoPreview.style.display = 'none';
                    videoPreviewGroup.style.display = 'none';
                } else if (mediaType === 'video') {
                    videoPreview.src = e.target.result;
                    videoPreview.style.display = 'block';
                    videoPreviewGroup.style.display = 'block';
                    imagePreview.style.display = 'none';
                    imagePreviewGroup.style.display = 'none';
                }
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.src = '';
            videoPreview.src = '';
            imagePreview.style.display = 'none';
            videoPreview.style.display = 'none';
            videoPreviewGroup.style.display = 'none';
            imagePreviewGroup.style.display = 'none';
        }
    });

    document.getElementById('thumbnail').addEventListener('change', function(event) {
        const thumbnailPreviewGroup = document.getElementById('thumbnail_preview_group');
        const thumbnailPreview = document.getElementById('thumbnail_preview');
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                thumbnailPreview.src = e.target.result;
                thumbnailPreview.style.display = 'block';
                thumbnailPreviewGroup.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            thumbnailPreview.src = '';
            thumbnailPreview.style.display = 'none';
            thumbnailPreviewGroup.style.display = 'none';
        }
    });
</script>
@endsection