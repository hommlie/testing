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
                <div class="content-header">{{ trans('Add Category') }}</div>
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
                            <form class="form" method="post" action="{{ route('admin.category.store') }}"
                                enctype="multipart/form-data">
                                @csrf
                                <div class="form-body">

                                    <div class="form-group">
                                        <label for="category_name">{{ trans('Category Name') }}</label>
                                        <input type="text" id="category_name" class="form-control" name="category_name"
                                            placeholder="{{ trans('Category') }}">
                                        @if ($errors->has('category_name'))
                                            <span class="text-danger">{{ $errors->first('category_name') }}</span>
                                        @endif
                                    </div>

                                    <div class="form-group">
                                        <label for="icon">{{ trans('App Icon') }}</label>
                                        <input type="file" id="icon" class="form-control" name="icon">
                                        @if ($errors->has('icon'))
                                            <span class="text-danger">{{ $errors->first('icon') }}</span>
                                        @endif
                                    </div>

                                    <div class="form-group">
                                        <label for="icon">{{ trans('Website Icon') }}</label>
                                        <input type="file" id="icon" class="form-control" name="webicon">
                                        @if ($errors->has('icon'))
                                            <span class="text-danger">{{ $errors->first('icon') }}</span>
                                        @endif
                                    </div>

                                    <div class="form-group"><br />
                                        <label for="icon">{{ trans('Motion Graphics') }}</label>
                                        <input type="file" id="motion_graphics" class="form-control"
                                            name="motion_graphics">
                                        @if ($errors->has('motion_graphics'))
                                            <span class="text-danger">{{ $errors->first('motion_graphics') }}</span>
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
                                                <input type="text" class="form-control" id="location[]" name="location"
                                                    placeholder="Location" >
                                                <span id="addLocation" class="btn btn-success ml-3">+</span><br />
                                            </div>
                                        </div>
                                        </div>
                                    </div>

                                    <div class="product gravity">
                                        <div class="form-group">
                                            <label for="Image title" class="col-form-label">Enable inspection
                                                form:</label><br>
                                            <input type="checkbox" name="is_form" value="1" @if(old('is_form')) checked
                                            @endif>

                                            @if ($errors->has('is_form'))
                                                <span class="text-danger">{{ $errors->first('is_form') }}</span>
                                            @endif
                                        </div>
                                    </div>



                                    <div class="gallery"></div>

                                    <!-- <div class="form-group">
                                            <label for="icon">{{ trans('Video') }}</label>
                                            <input type="file" name="video" accept="video/*">
                                            @if ($errors->has('video'))
                                                <span class="text-danger">{{ $errors->first('video') }}</span>
                                            @endif
                                        </div> -->

                                    <!-- <div class="form-group">
                                            <label for="thumbnail">{{ trans('Video Thumbnail') }}</label>
                                            <input type="file" id="thumbnail" class="form-control" name="thumbnail" >
                                            @if ($errors->has('thumbnail'))
                                                <span class="text-danger">{{ $errors->first('thumbnail') }}</span>
                                            @endif
                                        </div> -->


                                </div>

                                <div class="form-actions center">
                                    <a href="{{ route('admin.category') }}" class="btn btn-raised btn-warning mr-1">
                                        <i class="ft-x"></i> {{ trans('Cancel') }}
                                    </a>
                                    <button type="submit" class="btn btn-raised btn-primary">
                                        <i class="fa fa-check-square-o"></i> {{ trans('Save') }}
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
</script>
@endsection
@section('scripttop')
@section('scripts')

