@extends('layouts.admin')
@section('title')

@endsection

@section('content')




<div class="">
  <section class="basic-elements">
    <div class="row">
      <div class="col-sm-12">
        <div class="content-header">{{ trans('Add Service') }}</div>
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
    <form class="form" method="post" action="{{ route('admin.products.store') }}" enctype="multipart/form-data">
      @csrf
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h6 class="card-title mb-0">Service Information</h6>
            </div>
            <div class="card-body">
              <div class="px-3">
                <div class="form-group row">
                  <label for="cat_id" class="col-sm-2 col-form-label">{{ trans('labels.category') }}</label>
                  <div class="col-sm-10">
                    <select class="form-control" name="cat_id" id="cat_id" required>
                      <option value="">{{ trans('placeholder.select_category') }}</option>
                      @foreach ($data as $category)
              <option value="{{$category->id}}" {{ old('cat_id') == $category->id ? 'selected' : ''}}>
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
                    </select>
                    @if ($errors->has('subcat_id'))
            <span class="text-danger">{{ $errors->first('subcat_id') }}</span>
          @endif
                  </div>
                </div>
                <!--   <div class="form-group row">
                                      <label for="innersubcat_id" class="col-sm-2 col-form-label">{{ trans('labels.innersubcategory') }}</label>
                                      <div class="col-sm-10">
                                        <select class="form-control" name="innersubcat_id" id="innersubcat_id">
                                            <option value="">{{ trans('placeholder.select_innersubcategory') }}</option>
                                        </select>
                                        @if ($errors->has('innersubcat_id'))
                                            <span class="text-danger">{{ $errors->first('innersubcat_id') }}</span>
                                        @endif
                                      </div>
                                    </div>-->
                <div class="form-group row">
                  <label for="product_name" class="col-sm-2 col-form-label">{{ trans('Service Name') }}</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="product_name" name="product_name" required
                      placeholder="{{ trans('Enter Service Name') }}" value="{{old('product_name')}}">
                    @if ($errors->has('product_name'))
            <span class="text-danger">{{ $errors->first('product_name') }}</span>
          @endif
                  </div>
                </div>

                <!-- <div class="form-group row">
                                      <label for="brand" class="col-sm-2 col-form-label">{{ trans('labels.brand') }}</label>
                                      <div class="col-sm-10">
                                        <select class="form-control" name="brand" id="brand">
                                            <option value="">Select brand</option>
                                            @foreach ($brands as $brands)
                                            <option value="{{$brands->id}}">{{$brands->brand_name}}</option>
                                            @endforeach
                                        </select>
                                        @if ($errors->has('brand'))
                                            <span class="text-danger">{{ $errors->first('brand') }}</span>
                                        @endif
                                      </div>
                                    </div> -->

                <div class="form-group row d-none">
                  <label for="brand" class="col-sm-2 col-form-label">{{ trans('labels.sku') }}</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="sku" name="sku"
                      placeholder="{{ trans('placeholder.sku') }}" value="NA">
                    @if ($errors->has('sku'))
            <span class="text-danger">{{ $errors->first('sku') }}</span>
          @endif
                  </div>
                </div>

                <!-- <div class="form-group row">
                  <label for="image" class="col-sm-2 col-form-label">{{ trans('Images') }}</label>
                  <div class="col-sm-10">
                    <input type="file" required class="form-control" id="prod_image" name="image[]" multiple="true">
                    @if ($errors->has('image'))
                  <span class="text-danger">{{ $errors->first('image') }}</span>
                    @endif
                  </div>
                </div> -->
                <div class="form-group row">
                  <label for="image" class="col-sm-2 col-form-label">Images</label>
                  <div class="col-sm-10">
                    <input type="file" required class="form-control" id="prod_image" name="image[]" multiple
                      accept="image/*">
                    <div class="gallery row mt-3"></div> <!-- Container for image previews -->
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
                        <input type="url" name="video" class="form-control" id="video"
                          placeholder="https://youtube.com" />
                        <!-- <input type="file" name="video" class="form-control" id="video"> -->
                      </div>
                      <div class="col-lg-6 d-none">
                        <label for="video_thumbnail">VideoThumbnail</label>
                        <input type="file" name="video_thumbnail" class="form-control" id="video_thumbnail">
                      </div>
                    </div>
                    <!-- <div class="form-group row">
                                        <label for="est_shipping_days" class="col-sm-6 col-form-label">Duration(in mins)</label>
                                        <div class="col-sm-6">
                                          <input type="text" class="form-control" id="est_shipping_days" name="est_shipping_days" placeholder="{{ trans('placeholder.est_shipping_days') }}" value="0">
                                          @if ($errors->has('est_shipping_days'))
                                              <span class="text-danger">{{ $errors->first('est_shipping_days') }}</span>
                                          @endif
                                        </div>
                                      </div> -->
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
                      placeholder="{{ trans('placeholder.est_shipping_days') }}" value="0">
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
                    <input type="hidden" name="tags" id="tags-hidden" value="">
                    <p class="text-muted">Type a word and press enter to add a tag. Click a tag to remove it.</p>
                    @if ($errors->has('tags'))
            <span class="text-danger">{{ $errors->first('tags') }}</span>
          @endif
                  </div>
                </div>
              </div>
            </div>
          </div>

          <script>
            document.addEventListener('DOMContentLoaded', function () {
              const tagInput = document.getElementById('tag-input');
              const tagsContainer = document.getElementById('tags-container');
              const hiddenInput = document.getElementById('tags-hidden');
              let tags = [];

              // Listen for Enter key to add tags
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

              // Update hidden input with comma-separated values
              function updateHiddenInput() {
                hiddenInput.value = tags.join(',');
              }
            });
          </script>

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


        </div>

        <div class="col-md-4">
          <!-- <div class="card">
                            <div class="card-header">
                                <h6 class="card-title mb-0">Shipping Configuration</h6>
                            </div>
                            <div class="card-body">
                                <div class="px-3">
                                    <div class="form-group pb-1">
                                        <label for="free_shipping" class="col-sm-4 col-form-label">Free Shipping</label>
                                      <div class="float-right">
                                        <label class="switch">
                                          <input type="checkbox" name="free_shipping" id="free_shipping">
                                          <span class="slider"></span>
                                        </label>
                                      </div>
                                    </div>
                                </div>
                                <div class="px-3">
                                    <div class="form-group pb-1">
                                        <label for="flat_rate" class="col-sm-4 col-form-label">Flat Rate</label>
                                      <div class="float-right">
                                        <label class="switch">
                                          <input type="checkbox" name="flat_rate" id="flat_rate">
                                          <span class="slider"></span>
                                        </label>
                                      </div>
                                    </div>
                                </div>

                                <div class="px-3 flat_rate_shipping_div" style="display: none">
                                    <div class="form-group row">
                                      <label for="shipping_cost" class="col-sm-4 col-form-label">Shipping cost</label>
                                      <div class="col-sm-8">
                                        <input type="text" class="form-control" id="shipping_cost" name="shipping_cost" placeholder="{{ trans('placeholder.shipping_cost') }}" value="0">
                                        @if ($errors->has('shipping_cost'))
                                            <span class="text-danger">{{ $errors->first('shipping_cost') }}</span>
                                        @endif
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->

          <!-- <div class="card">
                            <div class="card-header">
                                <h6 class="card-title mb-0">Return policy</h6>
                            </div>
                            <div class="card-body">
                                <div class="px-3">
                                    <div class="form-group pb-1">
                                        <label for="is_return" class="col-sm-4 col-form-label">Is return available ?</label>
                                      <div class="float-right">
                                        <label class="switch">
                                          <input type="checkbox" name="is_return" id="is_return">
                                          <span class="slider"></span>
                                        </label>
                                      </div>
                                    </div>
                                </div>

                                <div class="px-3 is_return_div" style="display: none">
                                    <div class="form-group row">
                                      <label for="return_days" class="col-sm-4 col-form-label">Days</label>
                                      <div class="col-sm-8">
                                        <input type="text" class="form-control" id="return_days" name="return_days" placeholder="{{ trans('placeholder.return_days') }}" value="0">
                                        @if ($errors->has('return_days'))
                                            <span class="text-danger">{{ $errors->first('return_days') }}</span>
                                        @endif
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->

          <!-- <div class="card">
                            <div class="card-header">
                                <h6 class="card-title mb-0">Low Stock Quantity Warning</h6>
                            </div>
                            <div class="card-body">
                                <div class="px-3">
                                    <div class="form-group row">
                                      <label for="available_stock" class="col-sm-4 col-form-label">Quantity</label>
                                      <div class="col-sm-8">
                                        <input type="text" class="form-control" id="available_stock" name="available_stock" placeholder="{{ trans('placeholder.available_stock') }}" value="0">
                                        @if ($errors->has('available_stock'))
                                            <span class="text-danger">{{ $errors->first('available_stock') }}</span>
                                        @endif
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->

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
                      <input type="checkbox" name="is_featured" id="is_featured">
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
                      <input type="checkbox" name="is_hot" id="is_hot">
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
                      placeholder="{{ trans('placeholder.tax') }}" value="0">
                    @if ($errors->has('tax'))
            <span class="text-danger">{{ $errors->first('tax') }}</span>
          @endif
                  </div>
                  <div class="col-lg-6">

                    <select class="form-control" name="tax_type" id="tax_type">
                      <option value="amount">Flat</option>
                      <option value="percent">Percent</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h6 class="card-title mb-0">Product Rating</h6>
            </div>
            <div class="card-body">
              <div class="px-3">
                <div class="form-group row">
                  <div class="col-sm-12">
                    <input type="number" class="form-control" id="productRating" name="productRating"
                      placeholder="Product Rating" required min="1" max="5" value="5">
                    <span id="ratingError" class="text-danger d-none">Rating must be between 1 and 5.</span>
                    @if ($errors->has('productRating'))
            <span class="text-danger">{{ $errors->first('productRating') }}</span>
            @endif
                  </div>
                </div>
              </div>
            </div>
          </div>



        </div>

        <div class="col-lg-12">

          <div class="card">
            <div class="card-header">
              <h6 class="card-title mb-0">Service price + Variation</h6>
            </div>
            <div class="card-body">
              <div class="px-3">

                <div class="form-group row">
                  <label for="is_variation"
                    class="col-sm-2 col-form-label">{{ trans('labels.is_variation_available') }}</label>
                  <div class="col-sm-10">
                    <input class="is_variation" type="checkbox" {{ old('is_variation') == 'on' ? 'checked' : ''}}
                      name="is_variation" />
                  </div>
                </div>

                <div class="form-group row default_price" @if (old('is_variation') == 'on') style="display: none;" @endif>
                  <label for="product_price" class="col-sm-2 col-form-label">Service price</label>
                  <div class="col-sm-4">
                    <input type="text" class="form-control" id="product_price" name="product_price"
                      placeholder="{{ trans('Enter Actual Price') }}" value="{{old('product_price')}}">
                    @if ($errors->has('product_price'))
            <span class="text-danger">{{ $errors->first('product_price') }}</span>
          @endif
                  </div>
                  <label for="discounted_percentage" class="col-sm-2 col-form-label">Discount (%)</label>
                  <div class="col-sm-4">
                    <input type="text" class="form-control" id="discounted_percentage" name="discounted_percentage"
                      placeholder="{{ trans('Enter Discount %') }}" value="{{old('discounted_percentage')}}">
                    @if ($errors->has('discounted_percentage'))
            <span class="text-danger">{{ $errors->first('discounted_percentage') }}</span>
          @endif
                  </div>
                </div>

                <div class="form-group row default_price" @if (old('is_variation') == 'on') style="display: none;" @endif>
                  <label for="discounted_price"
                    class="col-sm-2 col-form-label">{{ trans('labels.discounted_price') }}</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="discounted_price" name="discounted_price"
                      placeholder="{{ trans('placeholder.discounted_price') }}" value="{{old('discounted_price')}}"
                      readonly>
                    @if ($errors->has('discounted_price'))
            <span class="text-danger">{{ $errors->first('discounted_price') }}</span>
          @endif
                  </div>
                </div>


                <div class="form-group row default_price" @if (old('is_variation') == 'on') style="display: none;" @endif>
                  <label for="product_qty" class="col-sm-2 col-form-label">{{ trans('labels.qty') }}</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="product_qty" name="product_qty"
                      placeholder="{{ trans('Services Available') }}" value="{{old('product_qty')}}">
                    @if ($errors->has('product_qty'))
            <span class="text-danger">{{ $errors->first('product_qty') }}</span>
          @endif
                  </div>
                </div>

                {{-- <div class="form-group row variation" @if (old('is_variation') !='on' ) style="display: none;"
                  @endif>
                  <label for="attribute" class="col-sm-2 col-form-label">{{ trans('labels.attribute') }}</label>
                  <div class="col-sm-10">
                    <select class="form-control" name="attribute" id="attribute">
                      <option value="">{{ trans('placeholder.select_attribute') }}</option>
                      @foreach ($attribute as $attributes)
                      <option value="{{$attributes->id}}">{{$attributes->attribute}}</option>
                      @endforeach
                    </select>
                    @if ($errors->has('attribute'))
                    <span class="text-danger">{{ $errors->first('attribute') }}</span>
                    @endif
                  </div>
                </div> --}}

                <div class="row panel-body variation" @if (old('is_variation') != 'on') style="display: none;" @endif>

                  @if (old('variation'))
            @foreach(old('variation') as $i => $quty)
        <div class="row removeclass{{$loop->index}}">

        <label for="attribute" class="col-sm-2 col-form-label">{{ trans('labels.attribute') }}</label>
        <div class="col-sm-10">
          <select class="form-control" name="attribute" id="attribute">
          <option value="">{{ trans('placeholder.select_attribute') }}</option>
          @foreach ($attribute as $attributes)
        <option value="{{$attributes->id}}">{{$attributes->attribute}}</option>
      @endforeach
          </select>
          @if ($errors->has('attribute'))
        <span class="text-danger">{{ $errors->first('attribute') }}</span>
      @endif
        </div>

        <div class="col-sm-3 nopadding">
          <div class="form-group">
          <label for="variation" class="col-form-label">Variation</label>
          <input type="text" class="form-control" name="variation[{{$i}}]" id="variation"
          value="{{$quty}}" placeholder="Variation">
          @if ($errors->has('variation.' . $i))
        <span class="text-danger">Required *</span>
      @endif
          </div>
        </div>

        <div class="col-sm-3 nopadding">
          <div class="form-group">
          <label for="price" class="col-form-label">Price</label>
          <input type="text" class="form-control" id="price" name="price[{{$i}}]" pattern="[0-9]+"
          value="{{old('price')[$loop->index]}}" placeholder="Price">
          @if ($errors->has('price.' . $i))
        <span class="text-danger">Required *</span>
      @endif
          </div>
        </div>

        <div class="col-sm-2 nopadding">
          <div class="form-group">
          <label for="variation_discount_percentage" class="col-form-label">Discount (%)</label>
          <input type="text" class="form-control" id="variation_discount_percentage"
          name="variation_discount_percentage[{{$i}}]" pattern="[0-9]+"
          value="{{old('variation_discount_percentage')[$loop->index]}}" placeholder="e.g., 5">
          @if ($errors->has('variation_discount_percentage.' . $i))
        <span class="text-danger">Required *</span>
      @endif
          </div>
        </div>

        <div class="col-sm-3 nopadding">
          <div class="form-group">
          <label for="discounted_variation_price" class="col-form-label">Discounted Price</label>
          <input type="text" class="form-control" id="discounted_variation_price"
          name="discounted_variation_price[{{$i}}]" pattern="[0-9]+"
          placeholder="{{ trans('placeholder.discounted_variation_price') }}"
          value="{{old('discounted_variation_price')[$loop->index]}}">
          @if ($errors->has('discounted_variation_price.' . $i))
        <span class="text-danger">Required *</span>
      @endif
          </div>
        </div>

        <div class="col-sm-2 nopadding">
          <div class="form-group">
          <label for="qty" class="col-form-label">{{ trans('labels.qty') }}</label>
          <input type="text" class="form-control" name="qty[{{$i}}]" pattern="[0-9]+" id="qty"
          value="{{old('qty')[$loop->index]}}">
          @if ($errors->has('qty.' . $i))
        <span class="text-danger">Required *</span>
      @endif
          </div>
        </div>

        @if ($loop->index == 0)
      <div class="col-sm-1 nopadding">
        <div class="form-group">
        <div class="input-group">
        <div class="input-group-btn">
        <button class="btn btn-success" type="button" onclick="variation_fields();"> + </button>
        </div>
        </div>
        </div>
      </div>
    @else
    <div class="col-sm-1 nopadding">
      <div class="form-group">
      <div class="input-group">
      <div class="input-group-btn">
      <button class="btn btn-danger" type="button"
      onclick="remove_variation_fields('{{$loop->index}}');"> - </button>
      </div>
      </div>
      </div>
    </div>
  @endif
        </div>
      @endforeach
          @else



            <div class="col-sm-2 nopadding">
            <div class="form-group">
              <label for="attribute" class="col-sm-12 col-form-label">{{ trans('labels.attribute') }}</label>
              <div class="col-sm-112">
              <select class="form-control" name="attribute[]" id="attribute">
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
              <input type="text" class="form-control" name="variation[]" id="variation"
              value="{{old('variation')}}" placeholder="Variation">
            </div>
            </div>



            <!-- <div class="col-sm-2 nopadding">
      <div class="form-group">
      <label for="variation_discount_percentage" class="col-form-label">Discount (%)</label>
      <input type="text" class="form-control discount-percentage" id="variation_discount_percentage" name="variation_discount_percentage[]" pattern="[0-9]+" value="{{old('variation_discount_percentage')}}" placeholder="e.g., 5">
      </div>
      </div> -->

            <div class="col-sm-2 nopadding">
            <div class="form-group">
              <label for="variation_interval" class="col-form-label">Interval(AMC)</label>
              <input type="number" class="form-control discount-percentage" id="variation_interval"
              name="variation_interval[]" value="{{old('variation_interval')}}" placeholder="In days">
            </div>
            </div>


            <div class="col-sm-1 nopadding">
            <div class="form-group">
              <label for="variation_times" class="col-form-label">Times(AMC)</label>
              <input type="text" class="form-control discount-percentage" id="variation_times"
              name="variation_times[]" pattern="[0-9]+" value="{{old('variation_times')}}"
              placeholder="e.g., 5">
            </div>
            </div>

            <div class="col-sm-1 nopadding">
            <div class="form-group">
              <label for="price" class="col-form-label">Price</label>
              <input type="text" class="form-control" id="var_price" name="price[]" pattern="[0-9]+"
              value="{{old('price')}}" placeholder="Price">
            </div>
            </div>

            <div class="col-sm-2 nopadding">
            <div class="form-group">
              <label for="discounted_variation_price" class="col-form-label">Discounted Price</label>
              <input type="text" class="form-control discounted-price" id="discounted_variation_price"
              name="discounted_variation_price[]" pattern="[0-9]+"
              placeholder="{{ trans('placeholder.discounted_price') }}">
            </div>
            </div>

            <div class="col-sm-1 nopadding">
            <div class="form-group">
              <label for="qty" class="col-form-label">{{ trans('Qty') }}</label>
              <input type="text" class="form-control" name="qty[]" pattern="[0-9]+" id="qty" placeholder="QTY">
            </div>
            </div>

            <div class="col-sm-1 nopadding">
            <div class="form-group">
              <div class="input-group">
              <div class="input-group-btn">
                <button class="btn btn-success" type="button" onclick="variation_fields();"> + </button>
              </div>
              </div>
            </div>
            </div>
      @endif

                  <div class="clear"></div>

                </div>

                <div id="variation_fields"></div>

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
                    <textarea class="form-control d-none" required id="description" name="description" rows="8"
                      placeholder="{{ trans('Service description') }}">{{old('description')}}</textarea>
                    <div id="editor"></div>
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
                    <textarea class="form-control d-none" required id="faqs" name="faqs" rows="8"
                      placeholder=""></textarea>
                    <div id="faqeditor"></div>
                    @if ($errors->has('faqs'))
              <span class="text-danger">{{ $errors->first('faqs') }}</span>
              @endif
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mx-auto">
            <a href="{{ route('admin.product') }}" class="btn btn-raised btn-warning mr-1">
              <i class="ft-x"></i> {{ trans('labels.cancel') }}
            </a>
            <button type="submit" class="btn btn-raised btn-primary">
              <i class="fa fa-check-square-o"></i> {{ trans('labels.save') }}
            </button>
          </div>
        </div>
    </form>
  </section>
</div>


@endsection
@section('scripttop')
@endsection
@section('scripts')
<script type="text/javascript">
  var variationdata = 1;

  function variation_fields() {
    variationdata++;
    var objTo = document.getElementById('variation_fields');
    var divtest = document.createElement("div");
    divtest.setAttribute("class", "row variation removeclass" + variationdata);

    var rdiv = 'removeclass' + variationdata;
    divtest.innerHTML = `
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
                <input type="text" class="form-control variation-input" name="variation[]" placeholder="Variation">
            </div>
        </div>
     
        

        <div class="col-sm-2 nopadding">
          <div class="form-group">
            <label for="variation_interval" class="col-form-label">Interval(AMC)</label>
              <input type="number" class="form-control discount-percentage" id="variation_interval" name="variation_interval[]"  value="{{old('variation_interval')}}" placeholder="e.g., 5">
          </div>
        </div>

        <div class="col-sm-1 nopadding">
          <div class="form-group">
            <label for="variation_times" class="col-form-label">Times(AMC)</label>
              <input type="text" class="form-control discount-percentage" id="variation_times" name="variation_times[]" pattern="[0-9]+" value="{{old('variation_times')}}" placeholder="e.g., 5">
          </div>
        </div>

       <div class="col-sm-1 nopadding">
            <div class="form-group">
                <label for="price" class="col-form-label">Price</label>
                <input type="text" class="form-control var-price" name="price[]" pattern="[0-9]+" placeholder="Price">
            </div>
        </div>

        <div class="col-sm-2 nopadding">
            <div class="form-group">
                <label for="discounted_variation_price" class="col-form-label">Discounted Price</label>
                <input type="text" class="form-control discounted-price" name="discounted_variation_price[]" pattern="[0-9]+" placeholder="{{ trans('placeholder.discounted_price') }}">
            </div>
        </div>
        <div class="col-sm-1 nopadding">
            <div class="form-group">
                <label for="qty" class="col-form-label">{{trans('QTY')}}</label>
                <input type="text" class="form-control qty-input" name="qty[]" pattern="[0-9]+" placeholder="Qty">
            </div>
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
        <div class="clear"></div>`;

    objTo.appendChild(divtest);

    // Attach event listener for the new discount percentage input
    divtest.querySelector('.discount-percentage').addEventListener('input', function () {
      calculateDiscount(this);
    });
  }

  function calculateDiscount(inputElement) {
    const row = inputElement.closest('.row'); // Find the closest row

    if (row) {
      const actualPriceElement = row.querySelector('.var-price');
      const discountPercentageElement = inputElement;
      const discountedPriceElement = row.querySelector('.discounted-price');

      // Check if the elements exist before accessing their values
      if (actualPriceElement && discountPercentageElement && discountedPriceElement) {
        const actualPrice = parseFloat(actualPriceElement.value);
        const discountPercentage = parseFloat(discountPercentageElement.value);

        if (!isNaN(actualPrice) && !isNaN(discountPercentage)) {
          const discountedPrice = actualPrice - (actualPrice * discountPercentage / 100);
          discountedPriceElement.value = discountedPrice.toFixed(2);
        } else {
          discountedPriceElement.value = '';
        }
      } else {
        console.error("One of the required elements was not found. Check the class names and the DOM structure.");
        console.log({ actualPriceElement, discountPercentageElement, discountedPriceElement });
      }
    } else {
      console.error("The closest row for the input element was not found.");
    }
  }


  // Event delegation for dynamically added rows
  document.addEventListener('input', function (event) {
    if (event.target && event.target.classList.contains('discount-percentage')) {
      calculateDiscount(event.target);
    }
  });

  function remove_variation_fields(rid) {
    $('.removeclass' + rid).remove();
  }

  $(document).ready(function ($) {
    $("#cat_id").change(function () {
      var cat_id = $("#cat_id").val();
      $.ajax({
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
      $.ajax({
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

  // $(document).ready(function () {
  //   var imagesPreview = function (input, placeToInsertImagePreview) {
  //     if (input.files) {
  //       var filesAmount = input.files.length;
  //       $('div.gallery').html('');
  //       var n = 0;
  //       for (i = 0; i < filesAmount; i++) {
  //         var reader = new FileReader();
  //         reader.onload = function (event) {
  //           $($.parseHTML('<div>')).attr('class', 'imgdiv').attr('id', 'img_' + n).html('<img src="' + event.target.result + '" class="img-fluid">').appendTo(placeToInsertImagePreview);
  //           n++;
  //         }
  //         reader.readAsDataURL(input.files[i]);
  //       }
  //     }
  //   };

  //   $('#image').on('change', function () {
  //     imagesPreview(this, 'div.gallery');
  //   });
  // });

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
              .attr('class', 'imgdiv col-4 col-md-3 position-relative')
              .attr('id', 'img_' + n)
              .html(`
                        <img src="${event.target.result}" class="img-fluid rounded-0" alt="Image ${n + 1}" title="Image ${n + 1}">
                        <!-- Image preview container -->
                        <div class="image-info col-6 col-md-12">
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
                        </div>
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








  //   $(document).ready(function () {
  //     $('#prod_image').on('change', function () {
  //         var input = this; // Reference to file input
  //         var previewContainer = $('.gallery'); // Preview container
  //         previewContainer.empty(); // Clear previous previews

  //         if (input.files) {
  //             // Loop through each selected file
  //             Array.from(input.files).forEach(function (file) {
  //                 var reader = new FileReader();

  //                 reader.onload = function (event) {
  //                     // Create preview element
  //                     var previewHTML = `
  //                         <div class="imgdiv col-4 col-md-3">
  //                             <img src="${event.target.result}" class="img-fluid" alt="Preview">
  //                         </div>`;
  //                     previewContainer.append(previewHTML);
  //                 };

  //                 reader.readAsDataURL(file); // Read file as Base64 URL
  //             });
  //         }
  //     });
  // });

  const productRatingInput = document.getElementById('productRating');
  const ratingError = document.getElementById('ratingError');

  productRatingInput.addEventListener('input', function () {
    if (this.value > 5) {
      this.value = 5;
      ratingError.classList.remove('d-none');
      ratingError.textContent = 'Rating cannot exceed 5.';
    } else if (this.value < 0) {
      this.value = 0;
      ratingError.classList.remove('d-none');
      ratingError.textContent = 'Rating cannot be less than 1.';
    } else {
      ratingError.classList.add('d-none');
    }
  });


  var images = [];
  function removeimg(id) {
    images.push(id);
    $("#img_" + id).remove();
    $('#remove_' + id).remove();
    $('#removeimg').val(images.join(","));
    input.replaceWith(input.val('').clone(true));
  }

  $("#price").on("keypress keyup blur", function (event) {
    $(this).val($(this).val().replace(/[^0-9\.|\,]/g, ''));
    debugger;
    if (event.which == 44) {
      return true;
    }
    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
      event.preventDefault();
    }
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
  });
</script>
<!-- Dynamic Price calculation by %  -->
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
    ClassicEditor
      .create(document.querySelector('#faqeditor'))
      .then(editor => {
        editor.model.document.on('change:data', () => {
          document.querySelector('#faqs').value = editor.getData();
        });
      })
      .catch(error => {
        console.error(error);
      });
  });
</script>

@endsection