@extends('layouts.admin')

@section('content')
    <div class="card">
        <div class="card-header">
            <h4>Add Homepage Section (Hero)</h4>
        </div>

        <div class="card-body">
            <form action="{{ route('admin.homepagesections.storeOffer') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="row">
                    {{-- TITLE --}}
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" name="title" class="form-control @error('title') is-invalid @enderror"
                                value="{{ old('title') }}" placeholder="Enter section title" required>
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
                                value="{{ old('alt_tag') }}" placeholder="Enter alt text for image" required>
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
                                value="{{ old('image_title') }}" placeholder="Enter image title" required>
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
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Add Section</button>
            </form>
        </div>
    </div>
@endsection
