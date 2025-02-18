@extends('layouts.admin')

@section('script')
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap4.min.js"></script>

<script>
    $(document).ready(function () {
        console.log("Initializing surau DataTable...");
        $('#data_table_bootstrap').DataTable({
            responsive: true,
            autoWidth: false,
            dom: 'lfrtip', \
            language: {
                search: "Search Complaints:"
            },
        });
    });
</script>
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
<div class="card">
    <div class="card-header">
        <h4 class="card-title">Add Blog</h4>
    </div>
    {{-- BLOGS FORM --}}
    <div class="card-body">
        <form action="{{ route('admin.blogs.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="d-flex">
                {{-- TITLE --}}
                <div class="mb-3 col-md-6">
                    <label class="form-label">Title</label>
                    <input type="text" name="title" class="form-control" value="{{ old('title') }}"
                        placeholder="Enter Title" required>
                </div>
                {{-- CATEGORY --}}
                <div class="mb-3 col-md-6">
                    <label class="form-label">Category</label>
                    <select name="category_id" class="form-control" required>
                        <option value="">Select Category</option>
                        @foreach($blogCategory as $category)
                            <option value="{{ $category->id }}">{{ $category->title }}</option>
                        @endforeach
                    </select>
                </div>

            </div>
            <div class="d-flex">
                {{-- SLUG --}}
                <div class="mb-3 col-md-6">
                    <label class="form-label">Slug</label>
                    <input type="text" name="slug" class="form-control" value="{{ old('slug') }}"
                        placeholder="Enter Slug" required>
                </div>
                {{-- FEATURED IMAGE --}}
                <div class="mb-3 col-md-6">
                    <label class="form-label">Featured Image</label>
                    <input type="file" name="featured_image" class="form-control" placeholder="">
                </div>
            </div>
            <div class="d-flex">
                {{-- STATUS --}}
                <div class="mb-3 col-md-6">
                    <label class="form-label">Status</label>
                    <select name="status" class="form-control" required>
                        <option value="">Select Status</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>
                {{-- AUTHOR NAME --}}
                <div class="mb-3 col-md-6">
                    <label class="form-label">Author Name</label>
                    <input type="text" name="author_name" class="form-control" value="{{ old('author_name') }}"
                        placeholder="Enter Author Name" required>
                </div>
            </div>
            {{-- META TITLE --}}
            <div class="mb-3">
                <label class="form-label">Meta Title</label>
                <input type="text" name="meta_title" class="form-control" value="{{ old('meta_title') }}"
                    placeholder="Enter Meta Title" required>
            </div>
            {{-- CONTENT --}}
            <div class="mb-3">
                <label class="form-label">Content</label>
                <textarea name="content" id="editor" class="form-control bootstrap-editor" rows="5"
                    placeholder="Enter Content" required>{{ old('content') }}</textarea>
            </div>
            {{-- META DESCRIPTION --}}
            <div class="mb-3">
                <label class="form-label">Meta Description</label>
                <textarea name="meta_description" class="form-control" rows="2"
                    placeholder="Enter Meta Description" required>{{ old('meta_description') }}</textarea>
            </div>
            {{-- SUBMIT BUTTON --}}
            <button type="submit" class="btn btn-success">Add Blog</button>
            <a href="{{ route('admin.blogs') }}" class="btn btn-secondary" required>Cancel</a>
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