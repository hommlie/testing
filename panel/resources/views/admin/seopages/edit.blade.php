@extends('layouts.admin')

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

<div class="card">
    <div class="card-header">
        <h4>Edit SEO Page</h4>
    </div>

    <div class="card-body">
        <form action="{{ route('admin.seopages.update', $seoPage->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            <input type="hidden" name="oldBanner" value="{{$seoPage->banner}}">
            <div class="col-md-12 d-flex ">
                <div class="form-group col-md-6">
                    <label>Title</label>
                    <input type="text" name="title" class="form-control" value="{{ old('title', $seoPage->title) }}"
                        required>
                </div>

                <div class="form-group col-md-6">
                    <label>Subcategory</label>
                    <select name="subcat_id" class="form-control">
                    <option value="" >Select Sub Category</option>
                        @foreach ($subCategory as $subCat)
                            <option value="{{ $subCat->id }}" {{ $seoPage->subcat_id == $subCat->id ? 'selected' : '' }}>
                                {{ $subCat->subcategory_name }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>
            <div class="col-md-12 d-flex ">
                <div class="form-group col-md-6">
                    <label>Sub Title</label>
                    <input type="text" name="sub_title" class="form-control"
                        value="{{ old('sub_title', $seoPage->sub_title) }}">
                </div>

                <div class="form-group col-md-6">
                    <label>Banner</label>
                    <input type="file" name="banner" class="form-control" value="">
                </div>
            </div>

            <div class="ool-md-12 d-flex ">
                <div class="form-group col-md-6">
                    <label>Slug</label>
                    <input type="text" name="slug" class="form-control" value="{{ old('slug', $seoPage->slug) }}">
                </div>

                <div class="form-group col-md-6">
                    <label>Alt Tag</label>
                    <input type="text" name="alt_tag" class="form-control"
                        value="{{ old('alt_tag', $seoPage->alt_tag) }}">
                </div>
            </div>

            <div class="ool-md-12 d-flex ">
                <div class="form-group col-md-6">
                    <label>Image Title</label>
                    <input type="text" name="image_title" class="form-control"
                        value="{{ old('image_title', $seoPage->image_title) }}">
                </div>

                <div class="form-group col-md-6">
                    <label>Meta Title</label>
                    <input type="text" name="meta_title" class="form-control"
                        value="{{ old('meta_title', $seoPage->meta_title) }}">
                </div>
            </div>

            <div class="form-group">
                <label>Description</label>
                <textarea name="description" id="editor" class="form-control"
                    rows="4">{{ old('description', $seoPage->description) }}</textarea>
            </div>
            <div class="form-group">
                <label>Meta Description</label>
                <textarea name="meta_description" id="editor2" class="form-control"
                    rows="3">{{ old('meta_description', $seoPage->meta_description) }}</textarea>
            </div>
            <div class="form-group"  style=" overflow-y: scroll; scrollbar-width: thin; scrollbar-color: #888 #f1f1f1;">
                <label>Banner Images</label><br>
                <div>
                <img  src="{{ asset('/storage/app/public/images/seo/' . $seoPage->banner) }}" alt="seo banner" >
                </div>
               
            </div>

            <button type="submit" class="btn btn-primary">Update</button>
            <a href="{{ route('admin.seopages') }}" class="btn btn-secondary">Back</a>
        </form>
    </div>
    <script src="https://cdn.ckeditor.com/4.20.1/standard/ckeditor.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            if (document.getElementById('editor')) {
                CKEDITOR.replace('editor', {
                    removeButtons: 'PasteFromWord'
                });
            }
            if (document.getElementById('editor2')) {
                CKEDITOR.replace('editor2', {
                    removeButtons: 'PasteFromWord'
                });
            }
        });
    </script>
    @endsection