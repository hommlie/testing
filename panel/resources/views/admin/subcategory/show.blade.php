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
                    <div class="content-header">{{ trans('labels.edit_subcategory') }}</div>
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
                                <form class="form" method="post" action="{{ route('admin.subcategory.update') }}"enctype="multipart/form-data">
                                @csrf
                                    <div class="form-body">
                                        <input type="hidden" name="subcat_id" id="subcat_id" value="{{$data->id}}" class="form-control">
                                         <input type="hidden" name="old_img" id="old_img" value="{{$data->icon}}">
                                         <input type="hidden" name="old_banner" id="old_banner" value="{{$data->sub_cat_banner}}">

                                        <div class="form-group">
                                            <label for="cat_id">{{ trans('labels.category') }}</label>
                                            <select class="form-control" name="cat_id" id="cat_id">
                                                <option value="">{{ trans('placeholder.select_category') }}</option>
                                                @foreach ($category as $category)
                                                <option value='{{$category->id}}' 
                                                  {{($data->cat_id == $category->id) ? 'selected' : '' }}>
                                                  {{$category->category_name}}</option>
                                                @endforeach
                                            </select>
                                            @if ($errors->has('cat_id'))
                                                <span class="text-danger">{{ $errors->first('cat_id') }}</span>
                                            @endif
                                        </div>
                                           <div class="form-group">
                                            <label for="icon">{{ trans('labels.image') }}</label>
                                            <input type="file" id="icon" class="form-control" name="icon" value="{{$data->icon}}">
                                            @if ($errors->has('icon'))
                                                <span class="text-danger">{{ $errors->first('icon') }}</span>
                                            @endif
                                        </div>
                                        
                                        <img src='{!! asset("storage/app/public/images/subcategory/".$data->icon) !!}' class='media-object round-media height-50'>
                                        <br/>
                                        <div class="form-group">
                                            <br/>
                                            <label for="sub_cat_banner">Sub Category Banner</label>
                                            <input type="file" id="sub_cat_banner" class="form-control" name="sub_cat_banner">
                                            @if ($errors->has('sub_cat_banner'))
                                                <span class="text-danger">{{ $errors->first('sub_cat_banner') }}</span>
                                            @endif
                                        </div>
                                       
                                        <img src='{!! asset("storage/app/public/images/subcategory/".$data->sub_cat_banner) !!}' class='media-object round-media height-50'>
                                    
                                        <div class="form-group">
                                            <label for="subcategory_name">{{ trans('labels.subcategory_name') }}</label>
                                            <input type="text" id="subcategory_name" class="form-control" name="subcategory_name" value="{{$data->subcategory_name}}" placeholder="{{ trans('placeholder.subcategory') }}">
                                            @if ($errors->has('subcategory_name'))
                                                <span class="text-danger">{{ $errors->first('subcategory_name') }}</span>
                                            @endif
                                        </div>

                                        <div class="product gravity">
                                        <div class="form-group">
                                            <label for="Image title" class="col-form-label">Subcategory title:</label>
                                            <input type="text" class="form-control" name="subcategory_title"
                                                placeholder="Enter Subcategory Title" required value="{{$data->subcategory_title}}" >
                                            @if ($errors->has('subcategory_title'))
                                                <span class="text-danger">{{ $errors->first('subcategory_title') }}</span>
                                            @endif
                                        </div>
                                    </div>

                                    <div class="product gravity">
                                        <div class="form-group">
                                            <label for="subcategory sub title" class="col-form-label">Subcategory Sub title :</label>
                                            <input type="text" class="form-control" name="subcategory_sub_title"
                                                placeholder="Enter Subcategory Sub Title" value="{{$data->subcategory_sub_title}}" required>

                                        </div>
                                    </div>





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

                                    <div class="product gravity">
                                        <div class="form-group">
                                            <label for="Image title" class="col-form-label">Meta title:</label>
                                            <input type="text" class="form-control" name="meta_title"
                                                placeholder="Enter Meta title" value="{{$data->meta_title}}">

                                        </div>
                                    </div>
                                    <div class="product gravity">
                                        <div class="form-group">
                                            <label for="meta_description" class="col-form-label">Meta
                                                Description:</label>
                                            <textarea class="form-control" name="meta_description"
                                                placeholder="Enter Meta Description">{{ $data->meta_description }}</textarea>
                                        </div>
                                    </div>
                                   
                                    </div>

                                    <div class="form-actions center">
                                        <a href="{{ route('admin.subcategory') }}" class="btn btn-raised btn-warning mr-1">
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