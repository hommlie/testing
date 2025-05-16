@extends('layouts.admin')

@section('content')
    @if ($errors->any())
        <div class="alert alert-danger">…</div>
    @endif

    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h4 class="mb-0">Add SEO Page</h4>
            <div class="input-group"  style="margin-left: auto; width: 400px;">
                <input type="text" id="search" class="form-control rounded-0" placeholder="Enter SEO Page ID">
                <button type="button" id="searchBtn" class="btn btn-primary rounded-0">
                    Search
                </button>
                <button type="button" id="resetBtn" class="btn btn-secondary rounded-0 ml-2">Reset</button>
            </div>
        </div>
        <span id="searchError" class="text-danger" style="display:block; margin:5px 0;"></span>

        <div class="card-body">
            <form id="seoForm" action="{{ route('admin.seopages.store') }}" method="POST" enctype="multipart/form-data">
                @csrf

                <div class="row">
                    <div class="form-group col-md-6">
                        <label>Title</label>
                        <input type="text" name="title" id="title" class="form-control" value="{{ old('title') }}"
                            placeholder="Title" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Subcategory</label>
                        <select name="subcat_id" id="subcat_id" class="form-control">
                            <option value="">Select Sub Category</option>
                            @foreach ($subCategory as $subCat)
                                <option value="{{ $subCat->id }}" {{ old('subcat_id') == $subCat->id ? 'selected' : '' }}>
                                    {{ $subCat->subcategory_name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-md-6">
                        <label>Sub Title</label>
                        <input type="text" name="sub_title" id="sub_title" class="form-control"
                            value="{{ old('sub_title') }}" placeholder="Sub Title" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Banner</label>
                        <input type="file" name="banner" id="banner" class="form-control" required>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-md-6">
                        <label>Slug</label>
                        <input type="text" name="slug" id="slug" class="form-control" value="{{ old('slug') }}"
                            placeholder="Slug" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Alt Tag</label>
                        <input type="text" name="alt_tag" id="alt_tag" class="form-control"
                            placeholder="Alt Tag" value="{{ old('alt_tag') }}" required>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-md-6">
                        <label>Image Title</label>
                        <input type="text" name="image_title" id="image_title" class="form-control"
                             placeholder="Image Title"  value="{{ old('image_title') }}" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Meta Title</label>
                        <input type="text" name="meta_title" id="meta_title" class="form-control"
                            value="{{ old('meta_title') }}" placeholder="Meta Title" required>
                    </div>
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <textarea name="description" id="editor" class="form-control" rows="4" placeholder="Description"
                        required>{{ old('description') }}</textarea>
                </div>
                <div class="form-group">
                    <label>Meta Description</label>
                    <textarea name="meta_description" id="editor2" class="form-control" rows="3"
                        placeholder="Meta Description" required>{{ old('meta_description') }}</textarea>
                </div>

                <button type="submit" class="btn btn-primary">Add SEO</button>
                <a href="{{ route('admin.seopages') }}" class="btn btn-light">Back</a>
            </form>
        </div>
    </div>

    <script src="https://cdn.ckeditor.com/4.20.1/standard/ckeditor.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            // Initialize CKEditors
            if (CKEDITOR.instances.editor) CKEDITOR.instances.editor.destroy();
            if (CKEDITOR.instances.editor2) CKEDITOR.instances.editor2.destroy();
            CKEDITOR.replace('editor', { removeButtons: 'PasteFromWord' });
            CKEDITOR.replace('editor2', { removeButtons: 'PasteFromWord' });

            const searchInput = document.getElementById('search');
            const searchBtn = document.getElementById('searchBtn');
            const errorSpan = document.getElementById('searchError');
            const resetBtn = document.getElementById('resetBtn');
            const form = document.getElementById('seoForm');

            // Only digits in search
            searchInput.addEventListener('input', () => {
                searchInput.value = searchInput.value.replace(/\D+/g, '');
                errorSpan.textContent = '';
            });

            // Fetch and populate
            searchBtn.addEventListener('click', () => {
                const id = searchInput.value.trim();
                if (!id) {
                    errorSpan.textContent = 'Please enter a numeric ID.';
                    return;
                }
                const url = "{{ route('admin.seopages.getSeoData', ['id' => ':id']) }}".replace(':id', id);

                fetch(url)
                    .then(res => {
                        if (!res.ok) throw new Error(res.status);
                        return res.json();
                    })
                    .then(data => {
                        if (!data.length) {
                            errorSpan.textContent = 'No record found for ID ' + id;
                            return;
                        }
                        const seo = data[0];
                        console.log(seo);
                        // Populate inputs
                        document.getElementById('title').value = seo.title;
                        document.getElementById('subcat_id').value = seo.subcat_id;
                        document.getElementById('sub_title').value = seo.sub_title;
                        document.getElementById('slug').value = seo.slug;
                        document.getElementById('alt_tag').value = seo.alt_tag;
                        document.getElementById('image_title').value = seo.image_title;
                        document.getElementById('meta_title').value = seo.meta_title;
                        CKEDITOR.instances['editor'].setData(seo.description);
                        CKEDITOR.instances['editor2'].setData(seo.meta_description);
                        errorSpan.textContent = '';
                    })
                    .catch(err => {
                        console.error(err);
                        errorSpan.textContent = 'Failed to load data. See console.';
                    });
            });

            resetBtn.addEventListener('click', () => {
                form.reset();
                CKEDITOR.instances['editor'].setData('');
                CKEDITOR.instances['editor2'].setData('');
                searchInput.value = '';
                errorSpan.textContent = '';
            });
        });
    </script>
@endsection