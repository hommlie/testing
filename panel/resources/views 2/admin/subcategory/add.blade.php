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
                                <form class="form" method="post" action="{{ route('admin.subcategory.store') }}" enctype="multipart/form-data">
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
                                            <input type="file" id="icon" class="form-control" name="icon" >
                                            @if ($errors->has('icon'))
                                                <span class="text-danger">{{ $errors->first('icon') }}</span>
                                            @endif
                                        </div>
                                        <div class="gallery"></div>
                                    

                                        <div class="form-group">
                                            <label for="subcategory_name">{{ trans('labels.subcategory_name') }}</label>
                                            <input type="text" id="subcategory_name" class="form-control" name="subcategory_name" placeholder="{{ trans('placeholder.subcategory') }}">
                                            @if ($errors->has('subcategory_name'))
                                                <span class="text-danger">{{ $errors->first('subcategory_name') }}</span>
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


@endsection
@section('scripttop')
@section('scripts')