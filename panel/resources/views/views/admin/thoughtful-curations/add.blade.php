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
    <div>
        <hr>
        <form id="mediaForm" action="{{ route('admin.thoughtful-curations.store') }}" method="POST" enctype="multipart/form-data">
            @csrf

            <div class="form-group">
                <label for="media_type">Media Type</label>
                <select class="form-control" id="media_type" name="media_type" required>
                    <option value="url">URL</option>
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                </select>
            </div>

            <div class="form-group" id="video_url_group" style="display: none;">
                <label for="video_url">Video/Image URL</label>
                <input type="url" class="form-control" id="video_url" name="video_url" placeholder="Enter Video/Image URL">
                <span id="videoUrlError" class="text-danger"></span>
            </div>

            <div class="form-group" id="video_file_group">
                <label for="video_file">Media Content</label>
                <input type="file" class="form-control" id="video_file" name="video_file" accept="image/*,video/mp4,video/mov,video/avi">
                <span id="videoFileError" class="text-danger"></span>
            </div>

            <div class="form-group" id="video_preview_group" style="display: none;">
                <label>Video Preview</label><br>
                <video id="video_preview" controls style="width:400px; height:250px; display: none;"></video>
            </div>

            <div class="form-group" id="image_preview_group" style="display: none;">
                <label>Image Preview</label><br>
                <img id="image_preview" src="" alt="Image Preview" style="width:400px; height:250px; display: none;">
            </div>

            <div class="form-group" id="thumbnail_group">
                <label for="thumbnail">Thumbnail <span class="text-success">(Only jpeg, png, jpg formats are allowed)</span></label>
                <input type="file" class="form-control" id="thumbnail" name="thumbnail" accept="image/*">
                <span id="thumbnailError" class="text-danger"></span>
            </div>

            <div class="form-group" id="thumbnail_preview_group" style="display: none;">
                <label>Thumbnail Preview</label><br>
                <img id="thumbnail_preview" src="" alt="Thumbnail Preview" style="width:400px; height:250px; display: none;">
            </div>

            <button type="submit" class="btn btn-primary">Add Curation</button>
            <a href="{{ route('admin.thoughtful-curations') }}" class="btn btn-secondary">Cancel</a><br><br>
        </form>
    </div>
</div>

<script>
    document.getElementById('mediaForm').addEventListener('submit', function(event) {
        const videoUrlError = document.getElementById('videoUrlError');
        const videoFileError = document.getElementById('videoFileError');
        const thumbnailError = document.getElementById('thumbnailError');
        videoUrlError.innerText = '';
        videoFileError.innerText = '';
        thumbnailError.innerText = '';

        const mediaType = document.getElementById('media_type').value;
        const videoUrlInput = document.getElementById('video_url');
        const videoFileInput = document.getElementById('video_file');
        const thumbnailInput = document.getElementById('thumbnail');
        const maxVideoFileSize = 100 * 1024 * 1024; // 100 MB
        const maxImageFileSize = 10 * 1024 * 1024; // 10 MB
        let hasError = false;

        if (mediaType === 'url' && !videoUrlInput.value) {
            videoUrlError.innerText = 'Video/Image URL is required for URL media type.';
            hasError = true;
        }

        if (mediaType === 'video' && videoFileInput.files.length > 0) {
            const videoFile = videoFileInput.files[0];
            if (videoFile.size > maxVideoFileSize) {
                videoFileError.innerText = 'The video file size must not exceed 100 MB.';
                hasError = true;
            }
        } else if (mediaType === 'image' && videoFileInput.files.length > 0) {
            const imageFile = videoFileInput.files[0];
            if (imageFile.size > maxImageFileSize) {
                videoFileError.innerText = 'The image file size must not exceed 10 MB.';
                hasError = true;
            }
        }

        if ((mediaType === 'url' || mediaType === 'video') && thumbnailInput.files.length > 0) {
            const thumbnailFile = thumbnailInput.files[0];
            if (thumbnailFile.size > maxImageFileSize) {
                thumbnailError.innerText = 'The thumbnail file size must not exceed 10 MB.';
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

        // Reset inputs and previews
        videoUrlInput.value = '';
        videoFileInput.value = '';
        thumbnailInput.value = '';
        imagePreview.style.display = 'none';
        videoPreview.style.display = 'none';
        thumbnailPreview.style.display = 'none';
        videoPreviewGroup.style.display = 'none';
        imagePreviewGroup.style.display = 'none';
        thumbnailPreviewGroup.style.display = 'none';

        // Dynamically toggle required attributes
        videoUrlInput.removeAttribute('required');
        videoFileInput.removeAttribute('required');
        thumbnailInput.removeAttribute('required');

        if (mediaType === 'image') {
            videoUrlGroup.style.display = 'none';
            thumbnailGroup.style.display = 'none';
            videoFileGroup.style.display = 'block';
            videoFileInput.accept = 'image/*';
            videoFileInput.required = true;
        } else if (mediaType === 'video') {
            videoUrlGroup.style.display = 'none';
            thumbnailGroup.style.display = 'block';
            videoFileGroup.style.display = 'block';
            videoFileInput.accept = 'video/mp4,video/mov,video/avi';
            videoFileInput.required = true;
            thumbnailInput.required = true;
        } else {
            videoUrlGroup.style.display = 'block';
            thumbnailGroup.style.display = 'block';
            videoFileGroup.style.display = 'none';
            videoUrlInput.required = true;
            thumbnailInput.required = true;
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
            thumbnailPreview.style.display = 'none';
            thumbnailPreviewGroup.style.display = 'none';
        }
    });

    // Trigger media_type change on page load to set initial state
    document.getElementById('media_type').dispatchEvent(new Event('change'));
</script>
@endsection