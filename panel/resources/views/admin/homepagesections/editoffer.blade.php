@extends('layouts.admin')

@section('content')
    <div class="card">
        <div class="card-header">
            <h4>Edit Homepage Section (Hero)</h4>
        </div>

        <div class="card-body">
            <form action="{{ route('admin.homepagesections.updateOffer', $homepageSection->id) }}" method="POST" enctype="multipart/form-data">
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
                    <div class="col-md-12">
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
                            <input type="file" name="image" class="form-control @error('image') is-invalid @enderror" >
                            @error('image')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                            @if ($homepageSection->image)
                                <img src="{{ asset('/storage/app/public/images/homesections/' . $homepageSection->image) }}" width="100">
                            @endif
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Update</button>
            </form>
        </div>
    </div>
@endsection
