@extends('layouts.admin')
@section('title')

@endsection
@section('css')

@endsection
@section('content')
<div class="">
    <section id="basic-form-layouts">
        <div class="row">
            <div class="col-sm-12">
                <div class="content-header">{{ trans('labels.add_subcategory') }}</div>
            </div>
        </div>

        <div class="row justify-content-md-center">
            <div class="col-md-6">
                @if ($errors->any())
                                <div class="alert alert-danger">
                                    <ul class="mb-0">
                                        @foreach ($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endif
                <div class="card">
                    <div class="card-header">
                    </div>
                    <div class="card-body">
                        @if(Session::has('danger'))
                                                <div class="alert alert-danger">
                                                    {{ Session::get('danger') }}
                                                    @php
                                                        Session::forget('danger');
                                                    @endphp
                                                </div>
                        @endif
                        <div class="px-3">
                            <form class="form" method="post" action="{{ route('admin.subcategory.store') }}"
                                enctype="multipart/form-data">
                                @csrf
                                <div class="form-body">
                                    <div class="form-group">
                                        <label for="cat_id">{{ trans('labels.category') }}</label>
                                        <select class="form-control" name="cat_id" id="cat_id">
                                            <option value="">{{ trans('placeholder.select_category') }}</option>
                                            @foreach ($data as $category)
                                                <option value="{{$category->id}}">{{$category->category_name}}</option>
                                            @endforeach
                                        </select>
                                        @if ($errors->has('cat_id'))
                                            <span class="text-danger">{{ $errors->first('cat_id') }}</span>
                                        @endif
                                    </div>

                                    <div class="form-group">
                                        <label for="icon">{{ trans('labels.image') }}</label>
                                        <input type="file" id="icon" class="form-control" name="icon">
                                        @if ($errors->has('icon'))
                                            <span class="text-danger">{{ $errors->first('icon') }}</span>
                                        @endif
                                    </div>
                                    <div class="gallery"></div>

                                    <div class="form-group">

                                        <label for="sub_cat_banner">Sub Category Banner</label>
                                        <input type="file" id="sub_cat_banner" class="form-control"
                                            name="sub_cat_banner">
                                        @if ($errors->has('sub_cat_banner'))
                                            <span class="text-danger">{{ $errors->first('sub_cat_banner') }}</span>
                                        @endif
                                    </div>


                                    <div class="form-group">
                                        <label for="subcategory_name">{{ trans('labels.subcategory_name') }}</label>
                                        <input type="text" id="subcategory_name" class="form-control"
                                            name="subcategory_name"
                                            placeholder="{{ trans('placeholder.subcategory') }}">
                                        @if ($errors->has('subcategory_name'))
                                            <span class="text-danger">{{ $errors->first('subcategory_name') }}</span>
                                        @endif
                                    </div>

                                    <div class="product gravity">
                                        <div class="form-group">
                                            <label for="Image title" class="col-form-label">Subcategory title:</label>
                                            <input type="text" class="form-control" name="subcategory_title"
                                                placeholder="Enter Subcategory Title" required>
                                            @if ($errors->has('subcategory_title'))
                                                <span class="text-danger">{{ $errors->first('subcategory_title') }}</span>
                                            @endif
                                        </div>
                                    </div>

                                    <div class="product gravity">
                                        <div class="form-group">
                                            <label for="subcategory sub title" class="col-form-label">Subcategory Sub
                                                title :</label>
                                            <input type="text" class="form-control" name="subcategory_sub_title"
                                                placeholder="Enter Subcategory Sub Title" required>

                                        </div>
                                    </div>
                                     <div class="product gravity">
                                        <div class="form-group">
                                            <label for="subcategory sub title" class="col-form-label">Slug</label>
                                            <input type="text" class="form-control" name="slug" id="slug"
                                                placeholder="Enter Slug"  required>
                                        </div>
                                          @if ($errors->has('slug'))
                                                <span class="text-danger">{{ $errors->first('slug') }}</span>
                                            @endif
                                    </div>


                                    <div class="product gravity">
                                        <div class="form-group">
                                            <label for="all_tag" class="col-form-label">ALT tag:</label>
                                            <input type="text" class="form-control" name="alt_tag"
                                                placeholder="Enter tag" required>
                                            @if ($errors->has('alt_tag'))
                                                <span class="text-danger">{{ $errors->first('alt_tag') }}</span>
                                            @endif
                                        </div>
                                    </div>



                                    <div class="product gravity">
                                        <div class="form-group">
                                            <label for="Image title" class="col-form-label">Image title:</label>
                                            <input type="text" class="form-control" name="image_title"
                                                placeholder="Enter Image title" required>
                                            @if ($errors->has('image_title'))
                                                <span class="text-danger">{{ $errors->first('image_title') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="product gravity">
                                        <div class="form-group">
                                            <label for="Image title" class="col-form-label">Meta title:</label>
                                            <input type="text" class="form-control" name="meta_title"
                                                placeholder="Enter Image title">

                                        </div>
                                    </div>
                                    <div class="product gravity">
                                        <div class="form-group">
                                            <label for="meta_description" class="col-form-label">Meta
                                                Description:</label>
                                            <textarea class="form-control" name="meta_description"
                                                placeholder="Enter Image title"></textarea>
                                        </div>
                                    </div>
                                    {{-- LOCATION --}}
                                    <div class="product gravity">
                                        <div class="form-group">
                                            <label for="meta_description" class="col-form-label">
                                                Location </label>
                                            <div id="locationContainer">
                                                <div class="d-flex">
                                                    <input type="text" class="form-control" id="location[]"
                                                        name="location" placeholder="Location">
                                                    <span id="addLocation" class="btn btn-success ml-3">+</span><br />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                                                        {{-- SPECIFICATIONS --}}
                                                                        <div class="form-group">
                                        <label for="Specifications">Specifications</label>
                                        <div id="input-container">
                                            <div class="d-flex mb-2">
                                                <input type="text" class="form-control" name="specifications[]"
                                                    id="specifications" placeholder="Enter Specifications" value=""
                                                    required>
                                                <span class="btn btn-outline-success ml-3" id="add-button">
                                                    <i class="fa fa-plus"></i>

                                                </span>
                                            </div>
                                        </div>
                                        <small id="error-message" class="text-danger"></small>
                                        @if ($errors->has('specifications'))
                                            <span class="text-danger">{{ $errors->first('specifications') }}</span>
                                        @endif
                                    </div>

                                    {{-- TOTAL REVIEWS --}}

                                    <div class="form-group">
                                        <label for="Total_reviews">Total reviews</label>
                                        <input type="number" class="form-control" name="total_reviews"
                                            id="total_reviews" placeholder="Enter Total reviews " value="">
                                        @if ($errors->has('total_reviews'))
                                            <span class="text-danger">{{ $errors->first('total_reviews') }}</span>
                                        @endif
                                    </div>

                                    {{-- AVG RATING --}}
                                    <div class="form-group">
                                        <label for="Avg_rating">Avg Rating</label>
                                        <input type="text" class="form-control" name="avg_rating" id="avg_rating"
                                            placeholder="Enter Avg Rating" value="">
                                        <span id="avg_rating_error" class="text-danger" style="display: none;">Please
                                            enter
                                            a valid rating.</span>
                                        @if ($errors->has('avg_rating'))
                                            <span class="text-danger">{{ $errors->first('avg_rating') }}</span>
                                        @endif
                                    </div>
                                    {{-- DESCRIPTION --}}
                                    <div class="form-group">
                                        <label for="faqs" class="col-form-label">FAQS:</label>
                                        <textarea class="form-control" id="editor" name="faqs"
                                            placeholder="Enter FAQS"></textarea>
                                        @if ($errors->has('faqs'))
                                            <span class="text-danger">{{ $errors->first('faqs') }}</span>
                                        @endif
                                    </div>

                                    {{-- ABOUT --}}
                                    <div class="form-group">
                                        <label for="about" class="col-form-label">About:</label>
                                        <textarea class="form-control" id="editor2" name="about"
                                            placeholder="Enter About"></textarea>
                                        @if ($errors->has('about'))
                                            <span class="text-danger">{{ $errors->first('about') }}</span>
                                        @endif
                                    </div>

                                    <!-- 
                                        <div class="form-group">
                                            <label for="icon">{{ trans('Video') }}</label>
                                            <input type="file" name="video" accept="video/*">
                                            @if ($errors->has('video'))
                                                <span class="text-danger">{{ $errors->first('video') }}</span>
                                            @endif
                                        </div>

                                        <div class="form-group">
                                            <label for="thumbnail">{{ trans('Video Thumbnail') }}</label>
                                            <input type="file" id="thumbnail" class="form-control" name="thumbnail" >
                                            @if ($errors->has('thumbnail'))
                                                <span class="text-danger">{{ $errors->first('thumbnail') }}</span>
                                            @endif
                                        </div> -->
                                </div>

                                <div class="form-actions center">
                                    <a href="{{ route('admin.subcategory') }}" class="btn btn-raised btn-warning mr-1">
                                        <i class="ft-x"></i> {{ trans('labels.cancel') }}
                                    </a>
                                    <button type="submit" class="btn btn-raised btn-primary">
                                        <i class="fa fa-check-square-o"></i> {{ trans('labels.save') }}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
<script src="https://cdn.ckeditor.com/4.20.1/standard/ckeditor.js"></script>
<script>
  // LOCATION
  document.getElementById('addLocation').addEventListener('click', () => {
  const container = document.getElementById('locationContainer');

  const newInputGroup = document.createElement('div');
  newInputGroup.className = 'd-flex  mt-2';
  newInputGroup.innerHTML = `
    <input type="text" class="form-control" name="location[]" placeholder="Location">
    <span class="btn btn-danger ml-3">-</span>
  `;

  newInputGroup.querySelector('span').addEventListener('click', () => 
    container.removeChild(newInputGroup)
  );

  container.appendChild(newInputGroup);
});
    //SPECIFICATIONS SECTION
    document.getElementById('add-button').addEventListener('click', function () {
        const container = document.getElementById('input-container');
        const errorMessage = document.getElementById('error-message');
        const addButton = this;
        if (container.querySelectorAll('input[name="specifications[]"]').length >= 2) {
            errorMessage.textContent = 'Maximum 2 specifications allowed.';
            addButton.disabled = true;
            return;
        }
        const newInput = document.createElement('div');
        newInput.classList.add('d-flex', 'mb-2');
        newInput.innerHTML = `
        <input type="text" class="form-control" name="specifications[]" id="specifications" placeholder="Enter Specifications" required>
        <span class="btn btn-outline-danger ml-3 remove-button"><i class="fa fa-minus"></i></span>
    `;
        container.appendChild(newInput);
        newInput.querySelector('.remove-button').addEventListener('click', function () {
            newInput.remove();
            if (container.querySelectorAll('input[name="specifications[]"]').length < 2) {
                errorMessage.textContent = '';
                addButton.disabled = false;
            }
        });
    });

    // CK EDITOR
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
@section('scripttop')
@section('scripts')