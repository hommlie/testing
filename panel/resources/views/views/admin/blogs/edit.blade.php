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
            <h4 class="card-title">Edit Blogs</h4>
        </div>
        {{-- BLOGS FORM --}}
        <div class="card-body">
            <form action="{{ route('admin.blogs.update', $blog->id) }}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="d-flex ">
                    {{-- TITLE --}}
                    <div class="mb-3 col-md-6">
                        <label class="form-label">Title</label>
                        <input type="text" name="title" class="form-control" value="{{ old('title', $blog->title) }}"
                            required>
                    </div>
                    {{-- CATEGOTY --}}
                    <div class="mb-3 col-md-6">
                        <label class="form-label">Category</label>
                        <select name="category_id" class="form-control" required>
                            @foreach($blogCategory as $id => $title)
                                <option value="{{ $id }}" {{ $blog->category_id == $id ? 'selected' : '' }}>
                                    {{ $title }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="d-flex">
                    {{-- SLUG --}}
                    <div class="mb-3 col-md-6">
                        <label class="form-label">Slug</label>
                        <input type="text" name="slug" class="form-control" value="{{ old('slug', $blog->slug) }}" required>
                    </div>
                    {{-- FEATURED IMAGE--}}
                    <div class="mb-3 col-md-6">
                        <label class="form-label">Featured Image</label>
                        <div class="d-flex">
                            <input type="file" name="featured_image" class="form-control">
                            <div class="ml-3">
                                @if($blog->featured_image)
                                    <img src="{{ asset('/storage/app/public/images/blogs/' . $blog->featured_image) }}"
                                        width="30" height="30">
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex">
                    {{-- STATUS --}}
                    <div class="mb-3 col-md-6">
                        <label class="form-label">Status</label>
                        <select name="status" class="form-control">
                            <option value="draft" {{ $blog->status == 'draft' ? 'selected' : '' }}>Draft</option>
                            <option value="published" {{ $blog->status == 'published' ? 'selected' : '' }}>Published</option>
                        </select>
                    </div>
                    {{-- AUTHOR NAME --}}
                    <div class="mb-3 col-md-6">
                        <label class="form-label">Author Name</label>
                        <input type="text" name="author_name" class="form-control"
                            value="{{ old('author_name', $blog->author_name) }}">
                    </div>
                </div>
                {{-- META TITLE --}}
                <div class="mb-3">
                    <label class="form-label">Meta Title</label>
                    <input type="text" name="meta_title" class="form-control"
                        value="{{ old('meta_title', $blog->meta_title) }}">
                </div>
                {{-- CONTENT --}}
                <div class="mb-3">
                    <label class="form-label">Content</label>
                    <textarea name="content" id="editor" class="form-control"
                        rows="5">{{ old('content', $blog->content) }}</textarea>
                </div>
                {{-- META DESCRIPTION --}}
                <div class="mb-3">
                    <label class="form-label">Meta Description</label>
                    <textarea name="meta_description" class="form-control"
                        rows="2">{{ old('meta_description', $blog->meta_description) }}</textarea>
                </div>
                {{-- UPDATE BUTTON --}}
                <button type="submit" class="btn btn-success">Update </button>
                <a href="{{ route('admin.blogs') }}" class="btn btn-secondary">Cancel</a>
            </form>
        </div>
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