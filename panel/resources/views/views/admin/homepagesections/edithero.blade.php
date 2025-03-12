@extends('layouts.admin')

@section('content')
    <div class="card">
        <div class="card-header">
            <h4>Edit Homepage Section (Hero)</h4>
        </div>

        <div class="card-body">
            <form action="{{ route('admin.homepagesections.updatehero', $homepageSection->id) }}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="row">
                    {{-- TITLE --}}
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" name="title" class="form-control @error('title') is-invalid @enderror"
                                value="{{ old('title', $homepageSection->title) }}" required>
                            @error('title')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                    {{-- SUB TITLE --}}
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Sub Title</label>
                            <input type="text" name="sub_title" class="form-control @error('sub_title') is-invalid @enderror"
                                value="{{ old('sub_title', $homepageSection->sub_title) }}" required>
                            @error('sub_title')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                    {{-- BUTTON TEXT --}}
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Button Text</label>
                            <input type="text" name="btn_text" class="form-control @error('btn_text') is-invalid @enderror"
                                value="{{ old('btn_text', $homepageSection->btn_text) }}" required>
                            @error('btn_text')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                    {{-- BUTTON LINK --}}
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Button Link</label>
                            <input type="text" name="btn_link" class="form-control @error('btn_link') is-invalid @enderror"
                                value="{{ old('btn_link', $homepageSection->btn_link) }}" required>
                            @error('btn_link')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                    {{-- ALT TAG --}}
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Alt Tag</label>
                            <input type="text" name="alt_tag" class="form-control @error('alt_tag') is-invalid @enderror"
                                value="{{ old('alt_tag', $homepageSection->alt_tag) }}" required>
                            @error('alt_tag')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                    {{-- IMAGE TITLE --}}
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Image Title</label>
                            <input type="text" name="image_title" class="form-control @error('image_title') is-invalid @enderror"
                                value="{{ old('image_title', $homepageSection->image_title) }}" required>
                            @error('image_title')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                    {{-- IMAGE --}}
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Image</label>
                            <input type="file" name="image" class="form-control @error('image') is-invalid @enderror" required>
                            @error('image')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                            @if ($homepageSection->image)
                                <img src="{{ asset('storage/images/homesections/' . $homepageSection->image) }}" width="100">
                            @endif
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Update</button>
            </form>
        </div>
    </div>
@endsection
