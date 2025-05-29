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
                dom: 'lfrtip',
                language: { search: "Search Complaints:" }
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
        <div class="card-header d-flex justify-content-between align-items-center">
            <h4 class="mb-0">Add Blog</h4>
            <div class="input-group" style="margin-left: auto; width: 400px;">
                <input type="text" id="search" class="form-control rounded-0" placeholder="Enter Blog ID">
                <button type="button" id="searchBtn" class="btn btn-primary rounded-0">Search</button>
                <button type="button" id="resetBtn" class="btn btn-secondary rounded-0 ml-2">Reset</button>
            </div>
        </div>
        <span id="searchError" class="text-danger" style="display:block; margin:5px 0;"></span>

        {{-- BLOGS FORM --}}
        <div class="card-body">
            <form id="seoForm" action="{{ route('admin.blogs.store') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="d-flex">
                    <div class="mb-3 col-md-6">
                        <label for="title" class="form-label">Title</label>
                        <input type="text" id="title" name="title" class="form-control" value="{{ old('title') }}" placeholder="Enter Title" required>
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="category_id" class="form-label">Category</label>
                        <select id="category_id" name="category_id" class="form-control" required>
                            <option value="">Select Category</option>
                            @foreach($blogCategory as $category)
                                <option value="{{ $category->id }}">{{ $category->title }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="d-flex">
                    <div class="mb-3 col-md-6">
                        <label for="slug" class="form-label">Slug</label>
                        <input type="text" id="slug" name="slug" class="form-control" value="{{ old('slug') }}" placeholder="Enter Slug" required>
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="featured_image" class="form-label">Featured Image</label>
                        <input type="file" id="featured_image" name="featured_image" class="form-control">
                    </div>
                </div>

                <div class="d-flex">
                    <div class="mb-3 col-md-6">
                        <label for="status" class="form-label">Status</label>
                        <select id="status" name="status" class="form-control" required>
                            <option value="">Select Status</option>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="author_name" class="form-label">Author Name</label>
                        <input type="text" id="author_name" name="author_name" class="form-control" value="{{ old('author_name') }}" placeholder="Enter Author Name" required>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="meta_title" class="form-label">Meta Title</label>
                    <input type="text" id="meta_title" name="meta_title" class="form-control" value="{{ old('meta_title') }}" placeholder="Enter Meta Title" required>
                </div>

                <div class="mb-3">
                    <label for="editor" class="form-label">Content</label>
                    <textarea id="editor" name="content" class="form-control bootstrap-editor" rows="5" placeholder="Enter Content" required>{{ old('content') }}</textarea>
                </div>

                <div class="mb-3">
                    <label for="meta_description" class="form-label">Meta Description</label>
                    <textarea id="meta_description" name="meta_description" class="form-control" rows="2" placeholder="Enter Meta Description" required>{{ old('meta_description') }}</textarea>
                </div>

                <button type="submit" class="btn btn-success">Add Blog</button>
                <a href="{{ route('admin.blogs') }}" class="btn btn-secondary">Cancel</a>
            </form>
        </div>
    </div>

    <script src="https://cdn.ckeditor.com/4.20.1/standard/ckeditor.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            // Initialize CKEditor
            if (CKEDITOR.instances.editor) CKEDITOR.instances.editor.destroy();
            CKEDITOR.replace('editor', { removeButtons: 'PasteFromWord' });

            const searchInput = document.getElementById('search');
            const searchBtn   = document.getElementById('searchBtn');
            const resetBtn    = document.getElementById('resetBtn');
            const errorSpan   = document.getElementById('searchError');
            const form        = document.getElementById('seoForm');

            searchInput.addEventListener('input', () => {
                searchInput.value = searchInput.value.replace(/\D+/g, '');
                errorSpan.textContent = '';
            });

            searchBtn.addEventListener('click', () => {
                const id = searchInput.value.trim();
                if (!id) {
                    errorSpan.textContent = 'Please enter a numeric ID.';
                    return;
                }
                const url = "{{ route('admin.blogs.getblogsData', ['id' => ':id']) }}".replace(':id', id);

                fetch(url)
                    .then(res => {
                        if (!res.ok) throw new Error(res.status);
                        return res.json();
                    })
                    .then(blog => {
                        const data = Array.isArray(blog) ? blog[0] : blog;

                        document.getElementById('title').value             = data.title || '';
                        document.getElementById('slug').value              = data.slug || '';
                        document.getElementById('author_name').value       = data.author_name || '';
                        document.getElementById('meta_title').value        = data.meta_title || '';
                        document.getElementById('meta_description').value  = data.meta_description || '';
                        document.getElementById('category_id').value       = data.category_id || '';
                        document.getElementById('status').value            = data.status || '';
                        CKEDITOR.instances.editor.setData(data.content || '');

                        errorSpan.textContent = '';
                    })
                    .catch(err => {
                        console.error(err);
                        errorSpan.textContent = 'Failed to load data.';
                    });
            });

            resetBtn.addEventListener('click', () => {
                form.reset();
                CKEDITOR.instances.editor.setData('');
                searchInput.value = '';
                errorSpan.textContent = '';
            });
        });
    </script>
@endsection