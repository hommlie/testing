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
                    <div class="content-header">{{ trans('labels.edit_slider') }}</div>
                </div>
            </div>

            <div class="row justify-content-md-center">
                <div class="col-md-12">
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
                                <form class="form" method="post" action="{{ route('admin.slider.update') }}" enctype="multipart/form-data">
                                @csrf
                                    <div class="form-body">
                                      <input type="hidden" name="slider_id" id="slider_id" value="{{$data->id}}" class="form-control">
                                      <input type="hidden" name="old_img" id="old_img" value="{{$data->image}}" class="form-control">
                                      <div class="row">
                                        <div class="col-xl-6 col-lg-6 col-md-12 mb-1">
                                            <fieldset class="form-group">
                                                <label for="image">{{ trans('labels.image') }} (1920X820)</label>
                                                <input type="file" id="image" class="form-control" name="image" >
                                                @if ($errors->has('image'))
                                                    <span class="text-danger">{{ $errors->first('image') }}</span>
                                                @endif
                                            </fieldset>
                                            <img src='{!! asset("storage/app/public/images/slider/".$data->image) !!}' class='media-object round-media height-150'>
                                        </div> 

                                        <div class="col-xl-6 col-lg-6 col-md-12 mb-1">
                                            <fieldset class="form-group">
                                                <label for="link">{{ trans('labels.link') }}</label>
                                                <input type="text" class="form-control" id="link" name="link" placeholder="Link" value="{{$data->link}}">
                                                @if ($errors->has('link'))
                                                    <span class="text-danger">{{ $errors->first('link') }}</span>
                                                @endif
                                            </fieldset>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-12 mb-1">
                                        <div class="form-group">
                                            <label for="all_tag" class="col-form-label">ALT tag:</label>
                                            <input type="text" class="form-control" name="alt_tag"
                                                placeholder="Enter tag" required value="{{$data->alt_tag}}">
                                            @if ($errors->has('alt_tag'))
                                                <span class="text-danger">{{ $errors->first('alt_tag') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-12 mb-1">
                                        <div class="form-group">
                                            <label for="Image title" class="col-form-label">Image title:</label>
                                            <input type="text" class="form-control" name="image_title"
                                                placeholder="Enter Image title" required value="{{$data->image_title}}">
                                            @if ($errors->has('image_title'))
                                                <span class="text-danger">{{ $errors->first('image_title') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                      </div>
                                    </div>

                                    <div class="form-actions center">
                                        <a href="{{ route('admin.slider') }}" class="btn btn-raised btn-warning mr-1">
                                            <i class="ft-x"></i> {{ trans('labels.cancel') }}
                                        </a>
                                        <button type="submit" class="btn btn-raised btn-primary">
                                            <i class="fa fa-check-square-o"></i> {{ trans('labels.update') }}
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