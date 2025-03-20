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
                <div class="content-header">{{ trans('edit_category') }}</div>
            </div>
        </div>

        <div class="row justify-content-md-center">
            <div class="col-md-6">
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
                            <form class="form" method="post" action="{{ route('admin.category.update') }}"
                                enctype="multipart/form-data">
                                @csrf
                                <div class="form-body">
                                    <input type="hidden" name="cat_id" id="cat_id" value="{{$data->id}}"
                                        class="form-control">
                                    <input type="hidden" name="old_img" id="old_img" value="{{$data->icon}}">
                                    <input type="hidden" name="old_motion" id="old_motion"
                                        value="{{$data->motion_graphics}}" class="form-control">
                                    {{-- CATEGORY --}}
                                    <div class="form-group">
                                        <label for="category_name">{{ trans('category_name') }}</label>
                                        <input type="text" id="category_name" class="form-control" name="category_name"
                                            value="{{$data->category_name}}"
                                            placeholder="{{ trans('placeholder.category') }}">
                                        @if ($errors->has('category_name'))
                                            <span class="text-danger">{{ $errors->first('category_name') }}</span>
                                        @endif
                                    </div>
                                    {{-- CATEGORY  TITLE--}}
                                    <div class="form-group">
                                        <label for="category_name">Category Title</label>
                                        <input type="text" id="category_title" class="form-control" name="category_title"
                                            value="{{$data->category_title}}"
                                            placeholder="Category Title">
                                        @if ($errors->has('category_title'))
                                            <span class="text-danger">{{ $errors->first('category_title') }}</span>
                                        @endif
                                    </div>

                                    {{-- IMAGES --}}
                                    <div class="form-group">
                                        <label for="icon">{{ trans('image') }}</label>
                                        <input type="file" id="icon" class="form-control" name="icon">
                                        @if ($errors->has('icon'))
                                            <span class="text-danger">{{ $errors->first('icon') }}</span>
                                        @endif
                                    </div>
                                    {{-- IMG --}}
                                    <img src='{!! asset("storage/app/public/images/category/" . $data->icon) !!}'
                                        class='media-object round-media height-50' height="180px">

                                    {{-- WEB ICON --}}
                                    <div class="form-group">
                                        <label for="icon">{{ trans('Web Icon') }}</label>
                                        <input type="file" id="icon" class="form-control" name="webicon">
                                        @if ($errors->has('webicon'))
                                            <span class="text-danger">{{ $errors->first('webicon') }}</span>
                                        @endif
                                    </div>
                                    {{-- WEB ICON IMG --}}
                                    <img src='{!! asset("storage/app/public/images/category/" . $data->web_icon) !!}'
                                        class='media-object round-media height-50' height="180px">

                                    {{-- MOTION GRAPHICS --}}
                                    <div class="form-group"><br />
                                        <label for="icon">{{ trans('Motion Graphics') }}</label>
                                        <input type="file" id="motion_graphics" class="form-control"
                                            name="motion_graphics">
                                        @if ($errors->has('motion_graphics'))
                                            <span class="text-danger">{{ $errors->first('motion_graphics') }}</span>
                                        @endif
                                    </div>
                                    {{-- MOTION GRAPHICS IMAGES --}}
                                    <img src='{!! asset("storage/app/public/images/category/" . $data->motion_graphics) !!}'
                                        class='media-object round-media height-50' height="180px">
                                    <br>
                                    {{-- ATG TAG --}}
                                    <div class="product gravity">
                                        <div class="form-group">
                                            <label for="all_tag" class="col-form-label">ALT tag:</label>
                                            <input type="text" class="form-control" name="alt_tag"
                                                placeholder="Enter tag" required value="{{$data->alt_tag}}">
                                            @if ($errors->has('alt_tag'))
                                                <span class="text-danger">{{ $errors->first('alt_tag') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    {{-- IMAGES TITLE --}}
                                    <div class="product gravity">
                                        <div class="form-group">
                                            <label for="Image title" class="col-form-label">Image title:</label>
                                            <input type="text" class="form-control" name="image_title"
                                                placeholder="Enter Image title" required value="{{$data->image_title}}">
                                            @if ($errors->has('image_title'))
                                                <span class="text-danger">{{ $errors->first('image_title') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    {{-- META TITLE --}}
                                    <div class="product gravity">
                                        <div class="form-group">
                                            <label for="Image title" class="col-form-label">Meta title:</label>
                                            <input type="text" class="form-control" name="meta_title"
                                                placeholder="Enter Meta title" value="{{$data->meta_title}}">
                                        </div>
                                    </div>

                                    {{-- META DESCRIPTION --}}
                                    <div class="product gravity">
                                        <div class="form-group">
                                            <label for="meta_description" class="col-form-label">Meta
                                                Description:</label>
                                            <textarea class="form-control" name="meta_description"
                                                placeholder="Enter Meta Description">{{ $data->meta_description }}</textarea>
                                        </div>
                                    </div>

                                    {{-- ENABLE INSPECTION FORM --}}
                                    <div class="product gravity">
                                        <div class="form-group">
                                            <label for="Image title" class="col-form-label">Enable inspection
                                                form:</label><br>
                                            <input type="checkbox" name="is_form" value="1" @if($data->is_form == 1)
                                            checked @endif>

                                            @if ($errors->has('is_form'))
                                                <span class="text-danger">{{ $errors->first('is_form') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    {{-- PRODUCT LOCATION --}}
                                    <div class="product gravity">
                                        <div class="form-group">
                                            <label for="location" class="col-form-label">Location</label>
                                            <div class="form-group row" id="locationContainer">
                                                <!-- Dynamically added location fields will appear here -->
                                            </div>
                                            <span class="text-danger" id="locationError" style="font-size:14px;"></span>
                                        </div>
                                        <span id="addLocation" class="btn btn-success">+</span>
                                    </div><br>
                                    {{-- CATEGORY BANNER  --}}
                                    <div class="form-group">
                                        <label for="category_banner">Category Banner</label>    
                                        <input type="file" class="form-control" name="banner" id="banner">
                                        @if ($errors->has('banner'))
                                            <span class="text-danger">{{ $errors->first('banner') }}</span>
                                        @endif
                                    </div>
                                    {{-- CATEGORY BANNER IMG --}}
                                    <div style="overflow-y: scroll; scrollbar-width: thin; scrollbar-color: #888 #f1f1f1;">
                                    <img src='{!! asset("storage/app/public/images/category/" . $data->banner) !!}'
                                        class='media-object round-media height-50' height="180px">  
                                    <br>
                                    </div>

                                    {{-- SPECIFICATIONS --}}
                                    <div class="form-group">
                                        <label for="Specifications">Specifications</label>
                                        <div id="input-container">
                                            <div class="d-flex mb-2">
                                                <input type="text" class="form-control" name="specifications[]"
                                                    id="specifications" placeholder="Enter Specifications"
                                                    value="{{$data->specifications}}" required>
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
                                            id="total_reviews" placeholder="Enter Total reviews "
                                            value="{{$data->total_reviews}}">
                                        @if ($errors->has('total_reviews'))
                                            <span class="text-danger">{{ $errors->first('total_reviews') }}</span>
                                        @endif
                                    </div>

                                    {{-- AVG RATING --}}
                                    <div class="form-group">
                                        <label for="Avg_rating">Avg Rating</label>
                                        <input type="text" class="form-control" name="avg_rating" id="avg_rating"
                                            placeholder="Enter Avg Rating" value="{{$data->avg_rating}}">
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
                                            placeholder="Enter FAQS">{{ $data->faqs }}</textarea>
                                            @if ($errors->has('faqs'))
                                            <span class="text-danger">{{ $errors->first('faqs') }}</span>
                                        @endif
                                    </div>

                                    {{-- ABOUT --}}
                                    <div class="form-group">
                                        <label for="about" class="col-form-label">About:</label>
                                        <textarea class="form-control"  id="editor2" name="about"
                                            placeholder="Enter About">{{ $data->about }}</textarea>
                                            @if ($errors->has('about'))
                                            <span class="text-danger">{{ $errors->first('about') }}</span>
                                        @endif
                                    </div>

                                    {{-- UPDATED BUTTON --}}
                                    <div class="form-actions center mt-5">
                                        <a href="{{ route('admin.category') }}" class="btn btn-raised btn-warning mr-1">
                                            <i class="ft-x"></i> {{ trans('cancel') }}
                                        </a>
                                        <button type="submit" class="btn btn-raised btn-primary">
                                            <i class="fa fa-check-square-o"></i> {{ trans('update') }}
                                        </button>
                                    </div>
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
    //LOCATION SECTION 
    const locations = `{{ $data->location }}`;
    const locationArray = locations ? locations.split('|').map(item => item.trim()) : [];

    const container = document.getElementById('locationContainer');
    function addLocationField(value = '', isRequired = false) {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'col-sm-12 d-flex mb-2';

        inputGroup.innerHTML = `
      <input type="text" class="form-control" name="location[]" value="${value}" placeholder="Location" }>
      <span class="btn btn-danger ml-3">-</span>
    `;
        inputGroup.querySelector('.btn-danger').addEventListener('click', function () {
            if (container.childElementCount > 1) {
                container.removeChild(inputGroup);
                document.getElementById('locationError').textContent = '';
            } else {
                document.getElementById('locationError').textContent = 'At least one location is required!';
            }
        });

        container.appendChild(inputGroup);
    }
    if (locationArray.length > 0) {
        locationArray.forEach((location, index) => addLocationField(location, index === 0));
    } else {
        addLocationField('', true);
    }
    document.getElementById('addLocation').addEventListener('click', function () {
        addLocationField('', false);
    });
    document.querySelector('form').addEventListener('submit', function (e) {
        const locationInputs = container.querySelectorAll('input[name="location[]"]');
        const hasValue = Array.from(locationInputs).some(input => input.value.trim() !== '');
        if (!hasValue) {
            e.preventDefault();
            document.getElementById('locationError').textContent = 'At least one location is required!';
        }
    });

    //SPECIFICATIONS SECTION

    function specificationsData() {
        let spec = document.getElementById('specifications').value;
        if (spec.includes("|")) {
            let specArray = spec.split("|");
            document.getElementById('input-container').innerHTML = '';
            specArray.forEach(function (specValue) {
                duplicateSpecField(specValue.trim());
            });
        }
    }
    specificationsData();

    document.getElementById('add-button').addEventListener('click', function () {
        const container = document.getElementById('input-container');
        const errorMessage = document.getElementById('error-message');
        const addButton = this;
        if (container.querySelectorAll('input[name="specifications[]"]').length >= 2) {
            errorMessage.textContent = 'Maximum 2 specifications allowed.';
            addButton.disabled = true;
            return;
        }
        duplicateSpecField();
    });

    function duplicateSpecField(specValue = '') {
        const container = document.getElementById('input-container');
        const errorMessage = document.getElementById('error-message');
        const addButton = document.getElementById('add-button');

        const newInput = document.createElement('div');
        newInput.classList.add('d-flex', 'mb-2');
        newInput.innerHTML = `
    <input type="text" class="form-control" name="specifications[]" value="${specValue}" placeholder="Enter Specifications">
    <span class="btn btn-outline-danger ml-3 remove-button" id="removeBtn"><i class="fa fa-minus"></i></span>
    <span class="btn btn-outline-success ml-3 "  id="add-button" style="display:none;" ><i class="fa fa-plus"></i></span>
`;

        container.appendChild(newInput);
        newInput.querySelector('.remove-button').addEventListener('click', function () {
            newInput.remove();
            if (container.querySelectorAll('input[name="specifications[]"]').length < 2) {
                errorMessage.textContent = '';
                document.getElementById("removeBtn").style.visibility = "hidden";
                document.getElementById("add-button").style.display = "block";
            }
        });
    }

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