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
                                    {{-- WEB ICON  IMG --}}
                                    <img src='{!! asset("storage/app/public/images/category/" . $data->web_icon) !!}'
                                        class='media-object round-media height-50' height="180px">

                                    {{-- MOTION GRAPHICS  --}}
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

                                    {{--  META DESCRIPTION --}}
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
                                            <div class="form-group row" id="locationContainer">
                                                <!-- Dynamically added location fields will appear here -->
                                            </div>
                                            <span class="text-danger" id="locationError" style="font-size:14px;"></span>
                                        </div>
                                        <span id="addLocation" class="btn btn-success">+</span>
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
</script>


@endsection
@section('scripttop')

@section('scripts')