@extends('layouts.admin')
<style>
  .tags-input-container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    border: 1px solid #ced4da;
    padding: 5px;
    border-radius: 4px;
    background-color: #fff;
  }

  .tags-input-container input {
    border: none;
    outline: none;
    flex: 1;
    min-width: 150px;
  }

  .tag-item {
    display: inline-block;
    background-color: #007bff;
    color: white;
    padding: 5px 10px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
  }

  .tag-item:hover {
    background-color: #0056b3;
  }
</style>

@section('title')
@endsection
@section('content')
<div class="">
  <section class="basic-elements">
    <div class="row">
      <div class="col-sm-12">
        <div class="content-header">{{ trans('labels.edit_product') }}</div>
      </div>
    </div>
    @if(Session::has('danger'))
      <div class="alert alert-danger">
        {{ Session::get('danger') }}
        @php
        Session::forget('danger');
      @endphp
      </div>
  @endif
    <form class="form" method="post" action="{{ route('admin.products.update') }}" enctype="multipart/form-data">
      @csrf
      <input type="hidden" name="product_id" id="product_id" value="{{$data->id}}" class="form-control">
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h6 class="card-title mb-0">Product Information</h6>
            </div>
            <div class="card-body">
              <div class="px-3">
                <div class="form-group row">
                  <label for="cat_id" class="col-sm-2 col-form-label">{{ trans('labels.category') }}</label>
                  <div class="col-sm-10">
                    <select class="form-control" name="cat_id" id="cat_id">
                      <option value="">{{ trans('placeholder.select_category') }}</option>
                      @foreach ($category as $category)
                        <option value="{{$category->id}}" {{ $data->cat_id == $category->id ? 'selected' : ''}}>
                    {{$category->category_name}}
                    </option>
                     @endforeach
                    </select>
                    @if ($errors->has('cat_id'))
                   <span class="text-danger">{{ $errors->first('cat_id') }}</span>
                    @endif
                  </div>
                </div>
                <div class="form-group row">
                  <label for="subcat_id" class="col-sm-2 col-form-label">{{ trans('labels.subcategory') }}</label>
                  <div class="col-sm-10">
                    <select class="form-control" name="subcat_id" id="subcat_id">
                      <option value="">{{ trans('placeholder.select_subcategory') }}</option>
                      @foreach ($subcategory as $subcategory)
                      <option value="{{$subcategory->id}}" {{ $data->subcat_id == $subcategory->id ? 'selected' : ''}}>
                      {{$subcategory->subcategory_name}}
                      </option>
                       @endforeach
                    </select>
                    @if ($errors->has('subcat_id'))
                    <span class="text-danger">{{ $errors->first('subcat_id') }}</span>
                  @endif
                  </div>
                </div>
                <div class="form-group row">
                  <label for="product_name" class="col-sm-2 col-form-label">{{ trans('labels.product_name') }}</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="product_name" name="product_name"
                      placeholder="{{ trans('placeholder.product') }}" value="{{$data->product_name}}">
                    @if ($errors->has('product_name'))
                        <span class="text-danger">{{ $errors->first('product_name') }}</span>
                  @endif
                  </div>
                </div>
                {{-- PRODUCT META TITLE --}}
                <div class="form-group row">
                  <label for="Image title" class="col-sm-2 col-form-label">Meta title:</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" name="meta_title" placeholder="Enter Meta title"
                      value="{{$data->meta_title}}">
                  </div>
                </div>
                {{-- PRODUCT META DESCRIPTION --}}
                <div class="form-group row">
                  <label for="meta_description" class="col-sm-2 col-form-label">Meta
                    Description:</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" name="meta_description"
                      placeholder="Enter Meta Description">{{ $data->meta_description }}</textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-8">
              <div class="card">
                <div class="card-header">
                  <h6 class="card-title mb-0">Product's Video YouTube URL</h6>
                </div>
                <div class="card-body">
                  <div class="px-3">
                    <div class="row">
                      <div class="col-lg-12">
                        <label for="video">YouTube Video URL (With https://)</label>
                        <input type="hidden" name="video_id" value="{{ $video ? $video->id : '' }}" id="">
                        <input type="url" name="video" class="form-control" id="video"
                          value="{{ $video ? $video->image : '' }}" placeholder="https://youtube.com" />
                        <iframe width="100%" height="300px" class="p-3"
                          src="https://www.youtube.com/embed/9oKSSjZMUTU?si=rbP4Z8nDKPyLszUO"
                          title="YouTube video player" frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        <!-- <input type="file" name="video" class="form-control" id="video"> -->
                      </div>
                      <div class="col-lg-6 d-none">
                        <label for="video_thumbnail">VideoThumbnail</label>
                        <input type="file" name="video_thumbnail" class="form-control" id="video_thumbnail">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="card">
                <div class="card-header">
                  <h6 class="card-title mb-0">Service Duration</h6>
                </div>
                <div class="card-body">
                  <div class="px-3">
                    <label for="est_shipping_days">In mins</label>
                    <input type="text" class="form-control" id="est_shipping_days" name="est_shipping_days"
                      placeholder="{{ trans('placeholder.est_shipping_days') }}" value="{{ $data->est_shipping_days }}">
                    @if ($errors->has('est_shipping_days'))
                  <span class="text-danger">{{ $errors->first('est_shipping_days') }}</span>
                  @endif
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h6 class="card-title mb-0">Tags</h6>
            </div>
            <div class="card-body">
              <div class="px-3">
                <div class="form-group row">
                  <label for="tags" class="col-sm-2 col-form-label">Tags</label>
                  <div class="col-sm-10">
                    <div class="tags-input-container" id="tags-container">
                      <input type="text" id="tag-input" placeholder="Add a tag..." class="form-control">
                    </div>
                    <input type="hidden" name="tags" id="tags-hidden" value="{{$data->tags}}">
                    <p class="text-muted">Type a word and press enter to add a tag. Click a tag to remove it.</p>
                    @if ($errors->has('tags'))
                    <span class="text-danger">{{ $errors->first('tags') }}</span>
                    @endif
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">
              <h6 class="card-title mb-0">Featured</h6>
            </div>
            <div class="card-body">
              <div class="px-3">
                <div class="form-group pb-1">
                  <label for="is_featured" class="col-sm-4 col-form-label">Status</label>
                  <div class="float-right">
                    <label class="switch checkbox-wrapper-25">
                      <input type="checkbox" name="is_featured" id="is_featured" @if ($data->is_featured == '1')
                      checked="" @endif>
                      <span class="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card d-none">
            <div class="card-header">
              <h6 class="card-title mb-0">Hot Deals</h6>
            </div>
            <div class="card-body">
              <div class="px-3">
                <div class="form-group pb-1">
                  <label for="is_hot" class="col-sm-4 col-form-label">Status</label>
                  <div class="float-right">
                    <label class="switch checkbox-wrapper-25">
                      <input type="checkbox" name="is_hot" id="is_hot" @if ($data->is_hot == '1') checked="" @endif>
                      <span class="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h6 class="card-title mb-0">Vat & TAX</h6>
            </div>
            <div class="card-body">
              <div class="px-3">
                <div class="form-group row">
                  <div class="col-sm-6">
                    <input type="text" class="form-control" id="tax" name="tax"
                      placeholder="{{ trans('placeholder.tax') }}" value="{{$data->tax}}">
                    @if ($errors->has('tax'))
                  <span class="text-danger">{{ $errors->first('tax') }}</span>
                  @endif
                  </div>
                  <div class="col-lg-6">

                    <select class="form-control" name="tax_type" id="tax_type">
                      <option value="amount" {{ $data->tax_type == 'amount' ? 'selected' : ''}}>Flat</option>
                      <option value="percent" {{ $data->tax_type == 'percent' ? 'selected' : ''}}>Percent</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
            {{-- PRODUCT RATING --}}
          <div class="card">
            <div class="card-header">
              <h6 class="card-title mb-0">Product Rating and Reviews</h6>
            </div>
            <div class="card-body">
              <div class="px-3">
                <div class="form-group row">
                  <div class="col-sm-6">
                    <label for="" class="">Rating</label>
                    <input type="number" class="form-control" id="" name="productRating"
                      placeholder="Product Rating"  value="{{$data->rating}}" step="0.1">
                    <span id="ratingError" class="text-danger d-none">Rating must be between 1 and 5.</span>
                    @if ($errors->has('productRating'))
                   <span class="text-danger">{{ $errors->first('productRating') }}</span>
                    @endif
                  </div>
                  <div class="col-sm-6">
                  <label for="" class="">Total Reviews</label>
                    <input type="number" class="form-control" id="" name="pro_total_reviews"
                      placeholder="Product Reviews"  value="{{$data->total_reviews}}"  step="0.1">
                   
                    @if ($errors->has('pro_total_reviews'))
                   <span class="text-danger">{{ $errors->first('pro_total_reviews') }}</span>
                    @endif
                  </div>
                </div>
              </div>
            </div>
          </div>
          {{-- PRODUCT LOCATION  --}}
          <div class="card">
            <div class="card-header">
              <h6 class="card-title mb-0">Location</h6>
            </div>
            <div class="card-body">
              <div class="px-3">
                <div class="form-group row" id="locationContainer">
                  
                </div>
                <span class="text-danger" id="locationError" style="font-size:14px;"></span>
                <div>
                </div>
                <span id="addLocation" class="btn btn-success mt-2">+</span>
              </div>
              
            </div>
          </div>
        </div>

        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <h6 class="card-title mb-0">Product price + Variation</h6>
            </div>
            <div class="card-body">
              <div class="px-3">
                <div class="form-group row">
                  <label for="is_variation"
                    class="col-sm-2 col-form-label">{{ trans('labels.is_variation_available') }}</label>
                  <div class="col-sm-10">
                    <input class="is_variation" type="checkbox" {{ $data->is_variation == '1' ? 'checked' : ''}}
                      name="is_variation" />
                  </div>
                </div>
                <div class="form-group row default_price" @if ($data->is_variation == '1') style="display: none;" @endif>
                  <label for="product_price" class="col-sm-2 col-form-label">Service price</label>
                  <div class="col-sm-4">
                    <input type="text" class="form-control" id="product_price" name="product_price"
                      placeholder="{{ trans('Enter Actual Price') }}" value="{{$data->product_price}}">
                    @if ($errors->has('product_price'))
                     <span class="text-danger">{{ $errors->first('product_price') }}</span>
                      @endif
                  </div>

                  <label for="discounted_percentage" class="col-sm-2 col-form-label">Discount (%)</label>
                  <div class="col-sm-4">
                    <?php if ($data->product_price > 0) { ?>
                    <input type="text" class="form-control" id="discounted_percentage" name="discounted_percentage"
                      placeholder="{{ trans('Enter Discount %') }}"
                      value="{{ (($data->product_price - $data->discounted_price) * 100) / $data->product_price }}">
                    <?php } else { ?>
                    <input type="text" class="form-control" id="discounted_percentage" name="discounted_percentage"
                      placeholder="{{ trans('Enter Discount %') }}" value="0">
                    <?php } ?>
                    @if ($errors->has('discounted_percentage'))
                  <span class="text-danger">{{ $errors->first('discounted_percentage') }}</span>
                  @endif
                  </div>
                </div>
                <div class="form-group row default_price" @if ($data->is_variation == '1') style="display: none;" @endif>
                  <label for="discounted_price"
                    class="col-sm-2 col-form-label">{{ trans('labels.discounted_price') }}</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="discounted_price" name="discounted_price"
                      placeholder="{{ trans('placeholder.discounted_price') }}" value="{{$data->discounted_price}}"
                      readonly>
                    @if ($errors->has('discounted_price'))
                    <span span class="text-danger">{{ $errors->first('discounted_price') }}</span>
                  @endif
                  </div>
                </div>

                <div class="form-group row default_price" @if ($data->is_variation == '1') style="display: none;" @endif>
                  <label for="product_qty" class="col-sm-2 col-form-label">{{ trans('labels.qty') }}</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="product_qty" name="product_qty"
                      placeholder="{{ trans('placeholder.product_qty') }}" value="{{$data->product_qty}}">
                    @if ($errors->has('product_qty'))
                    <span class="text-danger">{{ $errors->first('product_qty') }}</span>
                  @endif
                  </div>
                </div>

                <div class="panel-body variation" @if ($data->is_variation != '1') style="display: none;" @endif>
                <!-- FETCH ALL VARIATIONS DATA -->
                  @foreach ($variations as $ky => $variation)
                    <div class="row pl-5 pt-3 mt-3" id="del-{{$variation->id}}"
                    style="border: solid 1px white; box-shadow: 0 4px 8px rgba(178, 236, 178, 0.5); border-radius: 5px;">
                    <input type="hidden" name="variation_id[]" value="{{$variation->id}}">

                    <!-- VARIATION ATTRIBUTED  -->
                    <div class="col-sm-2 nopadding">
                      <div class="form-group">
                      <label for="attribute" class="col-sm-12 col-form-label">{{ trans('labels.attribute') }}</label>
                      <div class="col-sm-112">
                        <select class="form-control" name="attribute[{{$ky}}]" id="attribute">
                        <option value="">{{ trans('placeholder.select_attribute') }}</option>
                        @foreach ($attribute as $attributes)
                      <option value="{{$attributes->id}}" {{ $variation->attribute_id == $attributes->id ? 'selected' : '' }}>{{$attributes->attribute}}</option>
                      @endforeach
                        </select>
                      </div>
                      </div>
                    </div>

                    <!-- VARIATION Variation -->
                    <div class="col-sm-1 nopadding">
                      <div class="form-group">
                      <label for="variation" class="col-form-label">Variation</label>
                      <input type="text" class="form-control" name="variation[{{$ky}}]" id="variation"
                        value="{{$variation->variation}}" placeholder="Variation">
                      </div>
                    </div>

                    <!-- VARIATION Interval (AMC)  -->
                    <div class="col-sm-2 nopadding">
                      <div class="form-group">
                      <label for="variation_interval" class="col-form-label">Interval(AMC)</label>
                      <input type="number" class="form-control discount-percentage" id="variation_interval"
                        name="variation_interval[{{$ky}}]" value="{{$variation->variation_interval}}"
                        placeholder="In days">
                      </div>
                    </div>

                    <!-- VARIATION TIMES (AMC)  -->
                    <div class="col-sm-1 nopadding">
                      <div class="form-group">
                      <label for="variation_times" class="col-form-label">Times(AMC)</label>
                      <input type="text" class="form-control discount-percentage" id="variation_times"
                        name="variation_times[{{$ky}}]" pattern="[0-9]+" value="{{$variation->variation_times}}"
                        placeholder="e.g., 5">
                      </div>
                    </div>

                    <!-- VARIATION price  -->
                    <div class="col-sm-1 nopadding">
                      <div class="form-group">
                      <label for="price" class="col-form-label">Price</label>
                      <input type="text" class="form-control" id="var_price" name="price[{{$ky}}]" pattern="[0-9]+"
                        value="{{$variation->price}}" placeholder="Price">
                      </div>
                    </div>

                    <!-- VARIATION Discounted price  -->
                    <div class="col-sm-2 nopadding">
                      <div class="form-group">
                      <label for="discounted_variation_price" class="col-form-label">Discounted Price</label>
                      <input type="text" class="form-control discounted-pric" id="discounted_variation_price"
                        name="discounted_variation_price[{{$ky}}]"
                        value="{{ $variation->discounted_variation_price }}" pattern="[0-9]+"
                        placeholder="{{ trans('placeholder.discounted_price') }}">
                      </div>
                    </div>

                    <!-- VARIATION QTY  -->
                    <div class="col-sm-1 nopadding">
                      <div class="form-group">
                      <label for="qty" class="col-form-label">{{ trans('Qty') }}</label>
                      <input type="text" class="form-control" name="qty[{{$ky}}]" pattern="[0-9]+"
                        value="{{ $variation->qty }}" id="qty" placeholder="QTY">
                      </div>
                    </div>

                    <!-- VARIATION SPECIFICATION -->
                    <div class="form-group col-md-3">
                      <label for="Specifications">Specifications</label>
                      <div id="input-container-{{$ky}}">
                        @php
                          $specs = explode('|', $variation->description ?? '');
                        @endphp

                        @foreach ($specs as $key => $spec)
                          <div class="d-flex mb-2" data-key="{{$key}}">
                            <input type="text" class="form-control" name="specifications[{{$ky}}][{{$key}}]" 
                              value="{{ trim($spec) }}" placeholder="Enter Specifications">
                            @if ($key === 0)
                              <span class="btn btn-success ml-3" id="add-button-{{$ky}}">+</span>
                            @else
                              <span class="btn btn-danger ml-3 remove-specification">-</span>
                            @endif
                          </div>
                        @endforeach
                      </div>
                      <small id="error-message-{{$ky}}" class="text-danger"></small>
                      @if ($errors->has('specifications'))
                        <span class="text-danger">{{ $errors->first('specifications') }}</span>
                      @endif
                    </div>

                    <!-- VARIATION IMAGES -->
                      <div class="form-group col-md-3">
                      <label for="Image">Image</label>
                      <input type="file" class="form-control" name="product_image[]" id="product_image">
                      @if ($errors->has('product_image'))
                      <span class="text-danger">{{ $errors->first('product_image') }}</span>
                      @endif
                    </div>
                    <img class="mt-4" src="{{ asset('/storage/app/public/images/variation/' . $variation->image) }}" alt="" height="50px" width="'50px">
                    <!-- VARIATION TOTAL REVIEWS -->
                    <div class="form-group col-md-2">
                      <label for="Total_reviews">Total reviews</label>
                      <input type="number" class="form-control" name="total_reviews[]" id="total_reviews"
                      placeholder="Enter Total reviews " value="{{$variation->total_reviews}}">
                      @if ($errors->has('total_reviews'))
                    <span class="text-danger">{{ $errors->first('total_reviews') }}</span>
                    @endif
                    </div>
                    <!-- VARIATION AVG RATING -->
                    <div class="form-group col-md-2">
                      <label for="Avg_rating">Avg Rating</label>
                      <input type="number" class="form-control" name="avg_rating[]" id="avg_rating"
                      placeholder="Enter Avg Rating" value="{{$variation->avg_rating}}" step="0.1">
                      <span id="avg_rating_error" class="text-danger" style="display: none;">Please enter a valid
                      rating.</span>
                      @if ($errors->has('avg_rating'))
                    <span class="text-danger">{{ $errors->first('avg_rating') }}</span>
                   @endif
                    </div>
                    <div class="col-sm-1 nopadding">
                      <div class="form-group">
                      <div class="input-group">
                        <div class="input-group-btn">
                        <a href="javascript:void(0);" class="danger p-0"
                          data-original-title="{{ trans('labels.delete') }}" title="{{ trans('labels.delete') }}"
                          onclick="do_delete('{{$variation->id}}','{{route('admin.variation.delete')}}','You want to Delete variation','{{ trans('labels.delete') }}')">
                          <i class="ft-trash font-medium-3"></i>
                        </a>
                        </div>
                      </div>
                      </div>
                    </div>
                    </div>
                  @endforeach
                  <!-- -------------------------------------- -->
                  <div class="col-sm-1 nopadding">
                    <div class="form-group">
                      <div class="input-group">
                        <div class="input-group-btn">
                          <button class="btn btn-success" type="button" onclick="variation_fields();"> + </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="clear"></div>
                </div>
                <div id="variation_fields"></div>
                @if (old('update'))
                  <?php
                  $i = count($variations);
                      ?>
                  @foreach(old('update') as $quty)
            <input type="hidden" class="form-control" name="update[]" id="update">
            <div class="row removeclass{{$i}}">
            <div class="col-sm-3 nopadding">
            <div class="form-group">
              <label for="variation" class="col-form-label">Variation1</label>
              <input type="text" class="form-control" name="variation[{{$i}}]" id="variation"
              placeholder="Variation">
              @if ($errors->has('variation.' . $i))
              <span class="text-danger">Required *</span>
             @endif
            </div>
            </div>

            <div class="col-sm-3 nopadding">
            <div class="form-group">
              <label for="price" class="col-form-label">Price</label>
              <input type="text" class="form-control" id="price" name="price[{{$i}}]" pattern="[0-9]+"
              placeholder="Price">
              @if ($errors->has('price.' . $i))
          <span class="text-danger">Required *</span>
              @endif
            </div>
            </div>

            <div class="col-sm-3 nopadding">
            <div class="form-group">
              <label for="discounted_variation_price" class="col-form-label">Discounted Price</label>
              <input type="text" class="form-control" id="discounted_variation_pric"
              name="discounted_variation_price[{{$i}}]" pattern="[0-9]+"
              placeholder="{{ trans('placeholder.discounted_variation_price') }}">
              @if ($errors->has('discounted_variation_price.' . $i))
          <span class="text-danger">Required *</span>
            @endif
            </div>
            </div>

            <div class="col-sm-2 nopadding">
            <div class="form-group">
              <label for="qty" class="col-form-label">{{ trans('labels.qty') }}</label>
              <input type="text" class="form-control" name="qty[{{$i}}]" pattern="[0-9]+" id="qty"
              value="{{old('qty')[$i]}}">
              @if ($errors->has('qty.' . $i))
          <span class="text-danger">Required *</span>
            @endif
            </div>
            </div>

            <div class="col-sm-1 nopadding">
            <div class="form-group">
              <div class="input-group">
              <div class="input-group-btn">
              <button class="btn btn-danger" type="button" onclick="remove_variation_fields('{{$i}}');"> -
              </button>
              </div>
              </div>
            </div>
            </div>
            </div>
            <?php    $i++; ?>
          @endforeach
        @endif
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h6 class="card-title mb-0">Product Description</h6>
            </div>
            <div class="card-body">
              <div class="px-3">
                <div class="form-group row">
                  <label for="description" class="col-sm-2 col-form-label">{{ trans('labels.description') }}</label>
                  <div class="col-sm-10">
                    <textarea class="form-control d-none" id="description" name="description" rows="8"
                      placeholder="{{ trans('placeholder.description') }}">{!! $data->description !!}</textarea>
                    <div id="editor">{!! $data->description !!}</div>
                    @if ($errors->has('description'))
                    <span class="text-danger">{{ $errors->first('description') }}</span>
                   @endif
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- PRODUCT FAQs  -->
          <div class="card">
            <div class="card-header">
              <h6 class="card-title mb-0">Product FAQS</h6>
            </div>
            <div class="card-body">
              <div class="px-3">
                <div class="form-group row">
                  <label for="description" class="col-sm-2 col-form-label">FAQs</label>
                  <div class="col-sm-10">
                    <textarea class="form-control d-none" required id="faqs" name="faqs" rows="8" placeholder=""
                      required>{!! $data->faqs !!}</textarea>
                    <div id="faqeditor"></div>
                    @if ($errors->has('faqs'))
                  <span class="text-danger">{{ $errors->first('faqs') }}</span>
                  @endif
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-left">
        <a href="{{ route('admin.product') }}" class="btn btn-raised btn-warning mr-1">
          <i class="ft-x"></i> {{ trans('labels.cancel') }}
        </a>
        <button type="submit" class="btn btn-raised btn-primary">
          <i class="fa fa-check-square-o"></i> {{ trans('labels.update') }}
        </button>
      </div>
    </form>
  </section>

  <section id="header-footer">
    <div class="row">
      <div class="col-12 mt-3 mb-1">
        <button class="btn btn-raised btn-success" data-toggle="modal" data-target="#AddProduct">Add new Images</button>
      </div>
    </div>
    <div class="row match-height">
      @foreach($images as $img)
      <div class="col-lg-3 col-md-6">
      <div class="card">
        <div class="card-body">
        <div class="card-img mt-3">
          <img class="card-img img-fluid mb-3 w-50" src="{{$img->image_url}}" alt="Product Images"><br>
          <span class="text-dark"><b>Alt Tag:</b> {{ $img->alt_tag }}</span>
          <br>
          <span class="text-dark"><b>Image Title:</b> {{ $img->image_title }}</span>
        </div>
        </div>
        <div class="card-footer border-top-blue-grey border-top-lighten-5 text-muted">
        <span class="tags float-right">
          <span class="badge bg-success white" onClick="EditDocument('{{$img->id}}')">Edit</span>
          <span class="badge bg-danger white"
          onclick="DeleteImage('{{$img->id}}','{{$img->product_id}}')">Delete</span>
        </span>
        </div>
      </div>
      </div>
      @endforeach
    </div>
  </section>
</div>

@endsection

<!-- Add Item Image -->
<div class="modal fade" id="AddProduct" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <form method="post" action="{{ route('admin.products.storeimages') }}" class="addproduct"
      enctype="multipart/form-data">
      @csrf
      <span id="msg"></span>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ trans('labels.images') }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="{{ trans('labels.close') }}"><span
              aria-hidden="true">&times;</span>
          </button>
        </div>
        <span id="iiemsg"></span>
        <div class="modal-body">
          <input type="hidden" name="pro_id" id="pro_id" value="{{$data->id}}">
          <div class="form-group">
            <label for="colour" class="col-form-label">{{ trans('labels.images') }}:</label>
            <input type="file" multiple="true" class="form-control" id="prod_image" name="file[]" id="file"
              accept="image/*" required>
          </div>
          <div class="gallery row d-flex">


          </div>

          <input type="hidden" name="itemid" id="itemid" value="{{request()->route('id')}}">

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ trans('labels.close') }}</button>
          @if (env('Environment') == 'sendbox')
        <button type="button" class="btn btn-primary" onclick="myFunction()">{{ trans('labels.save') }}</button>
        @else
        <button type="submit" name="submit" id="submit" class="btn btn-primary">{{ trans('labels.save') }}</button>
        @endif
        </div>
      </div>
    </form>
  </div>
</div>
@section('scripttop')
@endsection
@section('scripts')

<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', function () {
    const tagInput = document.getElementById('tag-input');
    const tagsContainer = document.getElementById('tags-container');
    const hiddenInput = document.getElementById('tags-hidden');
    let tags = [];

    // Split the existing tags from the database into an array (if available)
    const initialTags = hiddenInput.value ? hiddenInput.value.split(',') : [];

    // Pre-populate the tags from the initialTags array
    initialTags.forEach(tag => addTag(tag.trim()));

    // Listen for Enter key to add new tags
    tagInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && tagInput.value.trim() !== '') {
        e.preventDefault();
        addTag(tagInput.value.trim());
        tagInput.value = ''; // Clear the input field after adding tag
      }
    });

    // Add a tag
    function addTag(tagText) {
      if (tags.includes(tagText)) return; // Avoid duplicate tags
      tags.push(tagText);

      // Create the tag element (button-like)
      const tagElement = document.createElement('span');
      tagElement.classList.add('tag-item');
      tagElement.textContent = tagText;

      // Add a remove option when clicking on the tag
      tagElement.addEventListener('click', function () {
        removeTag(tagText);
      });

      // Append the new tag to the container
      tagsContainer.insertBefore(tagElement, tagInput);

      updateHiddenInput();
    }

    // Remove a tag
    function removeTag(tagText) {
      tags = tags.filter(tag => tag !== tagText);

      // Remove the tag element from the DOM
      const tagElements = document.querySelectorAll('.tag-item');
      tagElements.forEach(tagElement => {
        if (tagElement.textContent === tagText) {
          tagsContainer.removeChild(tagElement);
        }
      });

      updateHiddenInput();
    }
    function updateHiddenInput() {
      hiddenInput.value = tags.join(',');
    }
  });

  // Product Reting 
  const productRatingInput = document.getElementById('productRating');
  const ratingError = document.getElementById('ratingError');

  productRatingInput.addEventListener('input', function () {
    if (this.value > 5) {
      ratingError.classList.remove('d-none');
      ratingError.textContent = 'Rating cannot exceed 5.';
    } else if (this.value < 0) {
      this.value = 0;
      ratingError.classList.remove('d-none');
      ratingError.textContent = 'Rating cannot be less than 0.';
    } else {
      ratingError.classList.add('d-none');
    }
  });

  // ADD PRODUCT ALT TAG NAME AND IMAGES Title
  $(document).ready(function () {

    var imagesPreview = function (input, placeToInsertImagePreview) {
      if (input.files) {
        var filesAmount = input.files.length;
        $('div.gallery').html('');
        var n = 0;

        for (var i = 0; i < filesAmount; i++) {
          var reader = new FileReader();
          reader.onload = function (event) {
            var imagePreviewDiv = $($.parseHTML('<div>'))
              .attr('class', 'imgdiv col-4 col-md-4 position-relative')
              .attr('id', 'img_' + n)
              .html(`
                    <img src="${event.target.result}" class="img-fluid rounded-0" alt="Image ${n + 1}" title="Image ${n + 1}">
                    <!-- Image preview container -->
                    <div class="image-info ">
                        <!-- ALT Tag input field -->
                        <label for="alt_tag_${n}" class="form-label">ALT Tag</label>
                        <div class="mb-3">
                            <input type="text" id="alt_tag_${n}" name="alt_tag[]" class="form-control" placeholder="ALT tag" required>
                        </div>
                        
                        <!-- Image Title input field -->
                        <label for="image_title_${n}" class="form-label">Image Title</label>
                        <div class="mb-3">
                            <input type="text" id="image_title_${n}" name="image_title[]" class="form-control" placeholder="Image title" required>
                        </div>
                    </div
                    <!-- Remove button -->
                   <!-- <button type="button" class="btn rounded-0 btn-danger remove-image" data-id="img_${n}" style="position: absolute; top: 0px; font-size: 10px; right: 5px;">
                        Remove
                    </button> -->
                `);


            $(placeToInsertImagePreview).append(imagePreviewDiv);
            imagePreviewDiv.find('.remove-image').on('click', function () {
              var imageId = $(this).data('id');
              $('#' + imageId).remove();
            });
            n++;
          };
          reader.readAsDataURL(input.files[i]);
        }
      }
    };
    $('#prod_image').on('change', function () {
      imagesPreview(this, 'div.gallery');
    });
  });





  var variationdata = 0;

  $(document).ready(function () {
    var counter = document.getElementById('counter');
    variationdata = "{{old('update') ? count(old('update')) + count($variations) : count($variations)}}";

    console.log(variationdata);
});


  function variation_fields() {

    var objTo = document.getElementById('variation_fields')
    var divtest = document.createElement("div");
    divtest.setAttribute("class", "form-group removeclass" + variationdata);
    var rdiv = 'removeclass' + variationdata;
    divtest.innerHTML = `
    <div  class="pl-5 pt-3" style="solid 1px white; box-shadow: 0 4px 8px rgba(178, 236, 178, 0.5); border-radius: 5px;">
        <input type="hidden" class="form-control" name="update[]" id="update">
        <div class="row panel-body variation">
        <div class="col-sm-2 nopadding">
            <div class="form-group">
                <label for="attribute" class="col-sm-12 col-form-label">{{ trans('labels.attribute') }}</label>
                <div class="col-sm-112">
                    <select class="form-control" name="attribute[]">
                        <option value="">{{ trans('placeholder.select_attribute') }}</option>
                        @foreach ($attribute as $attributes)
                <option value="{{$attributes->id}}">{{$attributes->attribute}}</option>
            @endforeach
                    </select>
                </div>
            </div>
        </div>

        <div class="col-sm-1 nopadding">
            <div class="form-group">
                <label for="variation" class="col-form-label">Variation</label>
                <input type="text" class="form-control variation-input" name="variation[`+ variationdata + `]" placeholder="Variation">
            </div>
        </div>
     
        

        <div class="col-sm-2 nopadding">
          <div class="form-group">
            <label for="variation_interval" class="col-form-label">Interval(AMC)</label>
              <input type="number" class="form-control discount-percentage" id="variation_interval" name="variation_interval[`+ variationdata + `]"  value="" placeholder="e.g., 5">
          </div>
        </div>

        <div class="col-sm-1 nopadding">
          <div class="form-group">
            <label for="variation_times" class="col-form-label">Times(AMC)</label>
              <input type="text" class="form-control discount-percentage" id="variation_times" name="variation_times[`+ variationdata + `]" pattern="[0-9]+" value="" placeholder="e.g., 5">
          </div>
        </div>

       <div class="col-sm-1 nopadding">
            <div class="form-group">
                <label for="price" class="col-form-label">Price</label>
                <input type="text" class="form-control var-price" name="price[`+ variationdata + `]" pattern="[0-9]+" placeholder="Price">
            </div>
        </div>

        <div class="col-sm-2 nopadding">
            <div class="form-group">
                <label for="discounted_variation_price" class="col-form-label">Discounted Price</label>
                <input type="text" class="form-control discounted-price" name="discounted_variation_price[`+ variationdata + `]" pattern="[0-9]+" placeholder="{{ trans('placeholder.discounted_price') }}">
            </div>
        </div>
        <div class="col-sm-1 nopadding">
            <div class="form-group">
                <label for="qty" class="col-form-label">{{trans('QTY')}}</label>
                <input type="text" class="form-control qty-input" name="qty[`+ variationdata + `]" pattern="[0-9]+" placeholder="Qty">
            </div>
        </div>
        <!-- VARIATION SPECIFICATIONS -->
        <div class="form-group col-md-3">
          <label for="Specifications">Specifications</label>
          <div id="input-container-${variationdata}">
            <div class="d-flex mb-2">
              <input type="text" class="form-control" name="specifications[${variationdata}][0]" placeholder="Enter Specification">
              <span class="btn btn-success ml-3" id="add-button-${variationdata}">+</span>
            </div>
          </div>
          <div id="error-message-${variationdata}" class="text-danger"></div>
        </div>
        <!-- VARIATION IMAGES -->
        <div class="form-group col-md-3">
          <label for="Image">Image</label>
          <input type="file" class="form-control" name="product_image[]" id="product_image">
        </div>
        <!-- VARIATION TOTAL REVIEWS -->
        <div class="form-group col-md-2">
          <label for="Total_reviews">Total reviews</label>
          <input type="number" class="form-control" name="total_reviews[]" id="total_reviews"
          placeholder="Enter Total reviews " >
        </div>
        <!-- VARIATION AVG RATING -->
        <div class="form-group col-md-2">
          <label for="Avg_rating">Avg Rating</label>
          <input type="number" class="form-control" name="avg_rating[]" id="avg_rating"
          placeholder="Enter Avg Rating" step="0.1" >
          <span id="avg_rating_error" class="text-danger" style="display: none;">Please enter a valid
          rating.</span>
        </div>
        <div class="col-sm-1 nopadding">
            <div class="form-group">
                <div class="input-group">
                    <div class="input-group-btn">
                        <button class="btn btn-danger" type="button" onclick="remove_variation_fields(${variationdata});"> - </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="clear">
        
        </div></div></div>`;

    // divtest.innerHTML = '<input type="hidden" class="form-control" name="update[]" id="update"><div class="row panel-body variation"><div class="col-sm-3 nopadding"> <div class="form-group"> <label for="variation" class="col-form-label">Variation</label> <input type="text" class="form-control" name="variation['+ variationdata +']" id="variation" placeholder="Variation" > </div></div><div class="col-sm-3 nopadding"> <div class="form-group"> <label for="price" class="col-form-label">Price</label> <input type="text" class="form-control" id="price" name="price['+ variationdata +']" pattern="[0-9]+" placeholder="Price" > </div></div><div class="col-sm-3 nopadding"> <div class="form-group"> <label for="discounted_variation_price" class="col-form-label">Discounted Price</label> <input type="text" class="form-control" id="discounted_variation_price" name="discounted_variation_price['+ variationdata +']" pattern="[0-9]+" placeholder="{{ trans('placeholder.discounted_price') }}"> </div></div><div class="col-sm-2 nopadding"> <div class="form-group"> <label for="qty" class="col-form-label">{{trans('labels.qty')}}</label> <input type="text" class="form-control" name="qty['+ variationdata +']" pattern="[0-9]+" id="qty"> </div></div><div class="col-sm-1 nopadding"> <div class="form-group"> <div class="input-group"> <div class="input-group-btn"> <button class="btn btn-danger" type="button" onclick="remove_variation_fields('+ variationdata +');"> - </button> </div></div></div></div><div class="clear"></div></div>';
    // counter.innerHTML = variationdata;




    variationdata++;
    objTo.appendChild(divtest)
    const addButton = divtest.querySelector(`#add-button-${variationdata - 1}`);
    const specificationContainer = divtest.querySelector(`#input-container-${variationdata - 1}`);
    const errorMessage = divtest.querySelector(`#error-message-${variationdata - 1}`);
    let currentIndex = 1;

    addButton.addEventListener('click', function () {
      const currentInputs = specificationContainer.querySelectorAll(`input[name^="specifications[${variationdata - 1}]"]`);
      if (currentInputs.length >= 2) {
        errorMessage.textContent = 'Maximum 2 specifications allowed.';
        addButton.disabled = true;
        return;
      }
      const newSpecification = document.createElement('div');
      newSpecification.classList.add('d-flex', 'mb-2');
      newSpecification.innerHTML = `
      <input type="text" class="form-control" name="specifications[${variationdata - 1}][${currentIndex}]" placeholder="Enter Specification">
      <span class="btn btn-danger ml-3 remove-specification">-</span>
    `;
      specificationContainer.appendChild(newSpecification);

      // Remove specification functionality
      newSpecification.querySelector('.remove-specification').addEventListener('click', function () {
        newSpecification.remove();
        errorMessage.textContent = '';
        addButton.disabled = false;
      });

      currentIndex++;
    });

  }
  function remove_variation_fields(rid) {
    $('.removeclass' + rid).remove();
  }

  jQuery(document).ready(function ($) {
    $("#cat_id").change(function () {
      var cat_id = $("#cat_id").val();
      jQuery.ajax({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type: 'POST',
        url: "{{ route('admin.products.subcat') }}",
        data: {
          'cat_id': cat_id
        },
        dataType: "json",
        success: function (response) {
          let html = '';
          html = '<option value="">{{ trans('placeholder.select_subcategory') }}</option>';
          for (i in response) {
            html += '<option value="' + response[i].id + '">' + response[i].subcategory_name + '</option>'
          }
          $('#subcat_id').html(html);
        },
      });
    });

    $("#subcat_id").change(function () {
      var subcat_id = $("#subcat_id").val();
      jQuery.ajax({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type: 'POST',
        url: "{{ route('admin.products.innersubcat') }}",
        data: {
          'subcat_id': subcat_id
        },
        dataType: "json",
        success: function (response) {
          let html = '';
          html = '<option value="">{{ trans('placeholder.select_innersubcategory') }}</option>';
          for (i in response) {
            html += '<option value="' + response[i].id + '">' + response[i].innersubcategory_name + '</option>'
          }
          $('#innersubcat_id').html(html);
        },
      });
    });
  });

  $(document).ready(function () {
    $('.is_variation').change(function () {
      if (this.checked) {
        $('.variation').fadeIn('slow');
        $('.default_price').fadeOut('slow');
      } else {
        $('.variation').fadeOut('slow');
        $('.default_price').fadeIn('slow');
      }
    });
  });

  $(document).ready(function () {

    $("#free_shipping").on("change", function () {
      $('#flat_rate').prop('checked', false); // Unchecks it
      $(".flat_rate_shipping_div").hide();
    });

    $("#flat_rate").on('change', function () {
      if ($(this).is(':checked')) {
        $(".flat_rate_shipping_div").show();
        $('#free_shipping').prop('checked', false); // Unchecks it
      }
      else {
        $('#free_shipping').prop('checked', false); // Unchecks it
        $(".flat_rate_shipping_div").hide();
      }
    });

    $("#is_return").on('change', function () {
      if ($(this).is(':checked')) {
        $(".is_return_div").show();
        $('#free_shipping').prop('checked', false); // Unchecks it
      }
      else {
        $(".is_return_div").hide();
      }
    });

    $('#editimg').on('submit', function (event) {
      event.preventDefault();
      var form_data = new FormData(this);
      $('#preloader').show();
      $.ajax({
        url: "{{ route('admin.products.updateimage') }}",
        method: 'POST',
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (result) {
          $('#preloader').hide();
          var msg = '';
          if (result.ResponseCode == 1) {
            location.reload();
          }
          else {
            for (var count = 0; count < result.error.length; count++) {
              msg += '<div class="alert alert-danger">' + result.error[count] + '</div>';
            }
            $('#emsg').html(msg);
            setTimeout(function () {
              $('#emsg').html('');
            }, 5000);
          }
        },
      });
    });
  });

  function do_delete(id, page_name, name, titles) {
    Swal.fire({
      title: '{{ trans('labels.are_you_sure') }}',
      text: "{{ trans('labels.delete_text') }} " + name + "!",
      type: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '{{ trans('labels.yes') }}',
      cancelButtonText: '{{ trans('labels.no') }}'
    }).then((t) => {
      if (t.value == true) {
        $('#preloader').show();
        $.ajax({
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          url: page_name,
          type: "POST",
          data: { 'id': id },

          success: function (data) {
            $('#preloader').hide();
            if (data == 1000) {
              console.log('#del-' + id);
              $('#del-' + id).remove();
              Swal.fire({ type: 'success', title: '{{ trans('labels.success') }}', showConfirmButton: false, timer: 1500 });
            }
            else {
              Swal.fire({ type: 'error', title: '{{ trans('labels.cancelled') }}', showConfirmButton: false, timer: 1500 });
            }
          }, error: function (data) {
            $('#preloader').hide();
            console.log("AJAX error in request: " + JSON.stringify(data, null, 2));
          }
        });
      }
      else {
        Swal.fire({ type: 'error', title: '{{ trans('labels.cancelled') }}', showConfirmButton: false, timer: 1500 });

      }
    });

  }

  function EditDocument(id) {
    $('#preloader').show();
    $.ajax({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      url: "{{ route('admin.products.showimage') }}",
      data: {
        id: id
      },
      method: 'POST', //Post method,
      dataType: 'json',
      success: function (response) {
        $('#preloader').hide();
        jQuery("#EditImages").modal('show');
        $('#idd').val(response.ResponseData.id);
        $('.galleryim').html("<img src=" + response.ResponseData.img + " class='img-fluid' style='max-height: 200px;'>");
        $('#old_img').val(response.ResponseData.image);
        $('#alt_tag').val(response.ResponseData.alt_tag);
        $('#image_title').val(response.ResponseData.image_title);
      },
      error: function (error) {
        $('#preloader').hide();
      }
    })
  }

  function DeleteImage(id, product_id) {
    Swal.fire({
      title: '{{ trans('labels.are_you_sure') }}',
      text: "{{ trans('labels.change_status') }}",
      type: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '{{ trans('labels.yes') }}',
      cancelButtonText: '{{ trans('labels.no') }}'
    }).then((t) => {
      if (t.value == true) {
        $('#preloader').show();
        $.ajax({
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          url: '{{route("admin.products.destroyimage")}}',
          type: "POST",
          data: { 'id': id, 'product_id': product_id },
          success: function (data) {
            $('#preloader').hide();
            if (data == 1) {
              location.reload();
            }
            if (data == 2) {
              Swal.fire({ type: 'error', title: '{{ trans('labels.cancelled') }}', text: "You can't delete this image", showConfirmButton: false, timer: 1500 });
            }
          }, error: function (data) {
            $('#preloader').hide();
            console.log("AJAX error in request: " + JSON.stringify(data, null, 2));
          }
        });
      }
      else {
        Swal.fire({ type: 'error', title: '{{ trans('labels.cancelled') }}', showConfirmButton: false, timer: 1500 });

      }
    });
  }
</script>

<script src="https://cdn.ckeditor.com/ckeditor5/41.3.1/classic/ckeditor.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    ClassicEditor
      .create(document.querySelector('#editor'))
      .then(editor => {
        editor.model.document.on('change:data', () => {
          document.querySelector('#description').value = editor.getData();
        });
      })
      .catch(error => {
        console.error(error);
      });
  });
  document.addEventListener("DOMContentLoaded", function () {
    console.log('Document is ready.');
    const editorElement = document.querySelector('#faqeditor');
    const textareaElement = document.querySelector('#faqs');

    if (!editorElement || !textareaElement) {
      console.error('Editor or textarea element is missing!');
    } else {
      console.log('Elements found.');
    }

    ClassicEditor
      .create(editorElement)
      .then(editor => {
        console.log('Editor initialized successfully.');

        // Load initial data into the editor
        editor.setData(textareaElement.value);

        // Sync editor content to the textarea
        editor.model.document.on('change:data', () => {
          textareaElement.value = editor.getData();
        });
      })
      .catch(error => {
        console.error('Error initializing editor:', error);
      });
  });

</script>

<script>
  document.getElementById('discounted_percentage').addEventListener('input', function () {
    const actualPrice = parseFloat(document.getElementById('product_price').value);
    const discountPercentage = parseFloat(this.value);

    if (!isNaN(actualPrice) && !isNaN(discountPercentage)) {
      const discountedPrice = actualPrice - (actualPrice * discountPercentage / 100);
      document.getElementById('discounted_price').value = discountedPrice.toFixed(2);
    } else {
      document.getElementById('discounted_price').value = '';
    }
  });
  // Function to handle discount calculation
  function calculateDiscount(inputElement) {
    const row = inputElement.closest('.row'); // Find the closest row
    const actualPriceElement = row.querySelector('.form-control[id="var_price"]');
    const discountPercentageElement = row.querySelector('.form-control.discount-percentage');
    const discountedPriceElement = row.querySelector('.form-control.discounted-price');
    const actualPrice = parseFloat(actualPriceElement.value);
    const discountPercentage = parseFloat(discountPercentageElement.value);
    if (!isNaN(actualPrice) && !isNaN(discountPercentage)) {
      const discountedPrice = actualPrice - (actualPrice * discountPercentage / 100);
      discountedPriceElement.value = discountedPrice.toFixed(2);
    } else {
      discountedPriceElement.value = '';
    }
  }

  // Event delegation for dynamically added rows
  document.addEventListener('input', function (event) {
    if (event.target && event.target.classList.contains('discount-percentage')) {
      calculateDiscount(event.target);
    }
  });


  //SPECIFICATION 
  document.addEventListener('DOMContentLoaded', function () {
  const variationDataElements = document.querySelectorAll('[id^="input-container-"]');

  variationDataElements.forEach((divtest) => {
    const ky = divtest.id.split('-')[2]; // Extract the ky value from the id
    const addButton = document.querySelector(`#add-button-${ky}`);
    const specificationContainer = divtest;
    const errorMessage = document.querySelector(`#error-message-${ky}`);
    let currentIndex = specificationContainer.querySelectorAll(`input[name^="specifications[${ky}]"]`).length;

    if (addButton) {
      addButton.addEventListener('click', function () {
        const currentInputs = specificationContainer.querySelectorAll(`input[name^="specifications[${ky}]"]`);
        if (currentInputs.length >= 2) {
          errorMessage.textContent = 'Maximum 2 specifications allowed.';
          addButton.disabled = true;
          return;
        }

        const newSpecification = document.createElement('div');
        newSpecification.classList.add('d-flex', 'mb-2');
        newSpecification.innerHTML = `
          <input type="text" class="form-control" name="specifications[${ky}][${currentIndex}]" placeholder="Enter Specification">
          <span class="btn btn-danger ml-3 remove-specification">-</span>
        `;
        specificationContainer.appendChild(newSpecification);

        // Remove specification functionality
        newSpecification.querySelector('.remove-specification').addEventListener('click', function () {
          newSpecification.remove();
          errorMessage.textContent = '';
          addButton.disabled = false;
        });

        currentIndex++;
      });
    }

    // Remove existing specification functionality
    const removeButtons = specificationContainer.querySelectorAll('.remove-specification');
    removeButtons.forEach((button) => {
      button.addEventListener('click', function () {
        button.parentElement.remove();
        errorMessage.textContent = '';
        addButton.disabled = false;
      });
    });
  });
});

// LOCATION 
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