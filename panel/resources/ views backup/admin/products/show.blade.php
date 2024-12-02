@extends('layouts.admin')
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
                                            <option value="{{$category->id}}" {{ $data->cat_id == $category->id ? 'selected' : ''}}>{{$category->category_name}}</option>
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
                                            <option value="{{$subcategory->id}}" {{ $data->subcat_id == $subcategory->id ? 'selected' : ''}}>{{$subcategory->subcategory_name}}</option>
                                            @endforeach
                                        </select>
                                        @if ($errors->has('subcat_id'))
                                            <span class="text-danger">{{ $errors->first('subcat_id') }}</span>
                                        @endif
                                      </div>
                                    </div>
                                    <!-- <div class="form-group row">
                                      <label for="innersubcat_id" class="col-sm-2 col-form-label">{{ trans('labels.innersubcategory') }}</label>
                                      <div class="col-sm-10">
                                        <select class="form-control" name="innersubcat_id" id="innersubcat_id">
                                            <option value="">{{ trans('placeholder.select_innersubcategory') }}</option>
                                            @foreach ($innersubcategory as $innersubcategory)
                                            <option value="{{$innersubcategory->id}}" {{ $data->subcat_id == $innersubcategory->id ? 'selected' : ''}}>{{$innersubcategory->innersubcategory_name}}</option>
                                            @endforeach
                                        </select>
                                        @if ($errors->has('innersubcat_id'))
                                            <span class="text-danger">{{ $errors->first('innersubcat_id') }}</span>
                                        @endif
                                      </div>
                                    </div> -->
                                    <div class="form-group row">
                                      <label for="product_name" class="col-sm-2 col-form-label">{{ trans('labels.product_name') }}</label>
                                      <div class="col-sm-10">
                                        <input type="text" class="form-control" id="product_name" name="product_name" placeholder="{{ trans('placeholder.product') }}" value="{{$data->product_name}}">
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
                                            @foreach ($brands as $brand)
                                                <option value="{{$brand->id}}" {{ $data->brand == $brand->id ? 'selected' : ''}}>{{$brand->brand_name}}</option>
                                            @endforeach
                                        </select>
                                        @if ($errors->has('brand'))
                                            <span class="text-danger">{{ $errors->first('brand') }}</span>
                                        @endif
                                      </div>
                                    </div> -->

                                    <!-- <div class="form-group row">
                                      <label for="brand" class="col-sm-2 col-form-label">{{ trans('labels.sku') }}</label>
                                      <div class="col-sm-10">
                                        <input type="text" class="form-control" id="sku" name="sku" placeholder="{{ trans('placeholder.sku') }}" value="{{$data->sku}}">
                                        @if ($errors->has('sku'))
                                            <span class="text-danger">{{ $errors->first('sku') }}</span>
                                        @endif
                                      </div>
                                    </div> -->

                                </div>
                            </div>
                        </div>

                        <!-- <div class="card">
                            <div class="card-header">
                                <h6 class="card-title mb-0">Tags</h6>
                            </div>
                            <div class="card-body">
                                <div class="px-3">
                                  <div class="form-group row">
                                    <label for="tags" class="col-sm-2 col-form-label">Tags</label>
                                    <div class="col-sm-10">
                                      <div class="edit-on-delete form-control" data-tags-input-name="tags">{{$data->tags}}</div>
                                      <p class="text-muted">Type any word related to your product & enter space. This will create tag & use for search your product based on this.</p>
                                      @if ($errors->has('tags'))
                                          <span class="text-danger">{{ $errors->first('tags') }}</span>
                                      @endif
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div> -->

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
                                          <input type="url" name="video" class="form-control" id="video" value="{{ $video ? $video->image : '' }}" placeholder="https://youtube.com" />
                                            <iframe width="100%" height="300px" class="p-3" 
                                            src="https://www.youtube.com/embed/9oKSSjZMUTU?si=rbP4Z8nDKPyLszUO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
                                        
                                         
                                          <input type="text" class="form-control" id="est_shipping_days" name="est_shipping_days" placeholder="{{ trans('placeholder.est_shipping_days') }}"   value="{{ $data->est_shipping_days }}">
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

<script>
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
                                        <label for="free_shipping" class="col-sm-4 col-form-label">Free Shipping </label>
                                      <div class="float-right">
                                        <label class="switch">
                                          <input type="checkbox" name="free_shipping" id="free_shipping" @if ($data->free_shipping == '1') checked="true" @endif>
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
                                          <input type="checkbox" name="flat_rate" id="flat_rate" @if(old('flat_rate') == "on") checked="" @endif @if ($data->flat_rate == '1') checked="" @endif>
                                          <span class="slider"></span>
                                        </label>
                                      </div>
                                    </div>
                                    @if ($errors->has('shipping_cost'))
                                        <span class="text-danger">{{ $errors->first('shipping_cost') }}</span>
                                    @endif
                                </div>

                                <div class="px-3 flat_rate_shipping_div" @if ($data->flat_rate == '2') style="display: none" @endif>
                                    <div class="form-group row">
                                      <label for="shipping_cost" class="col-sm-4 col-form-label">Shipping cost</label>
                                      <div class="col-sm-8">
                                        <input type="text" class="form-control" id="shipping_cost" name="shipping_cost" placeholder="{{ trans('placeholder.shipping_cost') }}" value="{{$data->shipping_cost}}">
                                        
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">
                                <h6 class="card-title mb-0">Return policy</h6>
                            </div>
                            <div class="card-body">
                                <div class="px-3">
                                    <div class="form-group pb-1">
                                        <label for="is_return" class="col-sm-4 col-form-label">Is return available ?</label>
                                      <div class="float-right">
                                        <label class="switch">
                                          <input type="checkbox" name="is_return" id="is_return" @if(old('is_return') == "on") checked="" @endif @if ($data->is_return == '1') checked="" @endif>
                                          <span class="slider"></span>
                                        </label>
                                      </div>
                                    </div>
                                </div>

                                <div class="px-3 is_return_div" @if ($data->return_days == '1') style="display: none" @endif>
                                    <div class="form-group row">
                                      <label for="return_days" class="col-sm-4 col-form-label">Days</label>
                                      <div class="col-sm-8">
                                        <input type="text" class="form-control" id="return_days" name="return_days" placeholder="{{ trans('placeholder.return_days') }}" value="{{$data->return_days}}">
                                        
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">
                                <h6 class="card-title mb-0">Low Stock Quantity Warning</h6>
                            </div>
                            <div class="card-body">
                                <div class="px-3">
                                    <div class="form-group row">
                                      <label for="available_stock" class="col-sm-4 col-form-label">Quantity</label>
                                      <div class="col-sm-8">
                                        <input type="text" class="form-control" id="available_stock" name="available_stock" placeholder="{{ trans('placeholder.available_stock') }}" value="{{$data->available_stock}}">
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
                                          <input type="checkbox" name="is_featured" id="is_featured" @if ($data->is_featured == '1') checked="" @endif>
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
                                        <input type="text" class="form-control" id="tax" name="tax" placeholder="{{ trans('placeholder.tax') }}" value="{{$data->tax}}">
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


                       

                        

                    </div>

                    <div class="col-lg-12">
                    <div class="card">
                            <div class="card-header">
                                <h6 class="card-title mb-0">Product price + Variation</h6>
                            </div>
                            <div class="card-body">
                                <div class="px-3">

                                  <div class="form-group row">
                                    <label for="is_variation" class="col-sm-2 col-form-label">{{ trans('labels.is_variation_available') }}</label>
                                    <div class="col-sm-10">
                                      <input class="is_variation" type="checkbox" {{ $data->is_variation == '1' ? 'checked' : ''}} name="is_variation"/>
                                    </div>
                                  </div>

                                  

                                  <div class="form-group row default_price" @if ($data->is_variation == '1') style="display: none;" @endif>
                                    <label for="product_price" class="col-sm-2 col-form-label">Service price</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="product_price" name="product_price" placeholder="{{ trans('Enter Actual Price') }}" value="{{$data->product_price}}">
                                        @if ($errors->has('product_price'))
                                            <span class="text-danger">{{ $errors->first('product_price') }}</span>
                                        @endif
                                    </div>

                                    <label for="discounted_percentage" class="col-sm-2 col-form-label">Discount (%)</label>
                                    <div class="col-sm-4">
                                        <?php if($data->product_price > 0){ ?>
                                        <input type="text" class="form-control" id="discounted_percentage" name="discounted_percentage" placeholder="{{ trans('Enter Discount %') }}" value="{{ (($data->product_price - $data->discounted_price)*100)/$data->product_price }}">
                                        <?php }else{ ?>
                                          <input type="text" class="form-control" id="discounted_percentage" name="discounted_percentage" placeholder="{{ trans('Enter Discount %') }}" value="0">
                                        <?php } ?>  

                                        @if ($errors->has('discounted_percentage'))
                                            <span class="text-danger">{{ $errors->first('discounted_percentage') }}</span>
                                        @endif
                                    </div>
                                </div>

                                <div class="form-group row default_price" @if ($data->is_variation == '1') style="display: none;" @endif>
                                    <label for="discounted_price" class="col-sm-2 col-form-label">{{ trans('labels.discounted_price') }}</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="discounted_price" name="discounted_price" placeholder="{{ trans('placeholder.discounted_price') }}" value="{{$data->discounted_price}}" readonly>
                                        @if ($errors->has('discounted_price'))
                                            <span class="text-danger">{{ $errors->first('discounted_price') }}</span>
                                        @endif
                                    </div>
                                </div>

                                  <div class="form-group row default_price" @if ($data->is_variation == '1') style="display: none;" @endif>
                                    <label for="product_qty" class="col-sm-2 col-form-label">{{ trans('labels.qty') }}</label>
                                    <div class="col-sm-10">
                                      <input type="text" class="form-control" id="product_qty" name="product_qty" placeholder="{{ trans('placeholder.product_qty') }}" value="{{$data->product_qty}}">
                                      @if ($errors->has('product_qty'))
                                          <span class="text-danger">{{ $errors->first('product_qty') }}</span>
                                      @endif
                                    </div>
                                  </div>

                                  <!-- <div class="form-group row variation" @if ($data->is_variation != '1') style="display: none;" @endif>
                                    <label for="attribute" class="col-sm-2 col-form-label">{{ trans('labels.attribute') }}</label>
                                    <div class="col-sm-10">
                                      <select class="form-control" name="attribute" id="attribute">
                                          <option value="">{{ trans('placeholder.select_attribute') }}</option>
                                          @foreach ($attribute as $attributes)
                                            <option value="{{$attributes->id}}" {{ $data->attribute == $attributes->id ? 'selected' : ''}}>{{$attributes->attribute}}</option>
                                          @endforeach
                                      </select>
                                      @if ($errors->has('attribute'))
                                          <span class="text-danger">{{ $errors->first('attribute') }}</span>
                                      @endif
                                    </div>
                                  </div> -->

                                  <div class="panel-body variation" @if ($data->is_variation != '1') style="display: none;" @endif>
                                
                                    @foreach ($variations as $ky => $variation)
                                    <div class="row" id="del-{{$variation->id}}">
                                      <input type="hidden" name="variation_id[]" value="{{$variation->id}}">

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

                                      <div class="col-sm-1 nopadding">
                                        <div class="form-group">
                                          <label for="variation" class="col-form-label">Variation</label>
                                            <input type="text" class="form-control" name="variation[{{$ky}}]" id="variation" value="{{$variation->variation}}" placeholder="Variation">
                                        </div>
                                      </div>

                                      <div class="col-sm-2 nopadding">
                                        <div class="form-group">
                                          <label for="variation_interval" class="col-form-label">Interval(AMC)</label>
                                            <input type="number" class="form-control discount-percentage" id="variation_interval" name="variation_interval[{{$ky}}]"  value="{{$variation->variation_interval}}" placeholder="In days">
                                        </div>
                                      </div>


                                      <div class="col-sm-1 nopadding">
                                        <div class="form-group">
                                          <label for="variation_times" class="col-form-label">Times(AMC)</label>
                                            <input type="text" class="form-control discount-percentage" id="variation_times" name="variation_times[{{$ky}}]" pattern="[0-9]+" value="{{$variation->variation_times}}" placeholder="e.g., 5">
                                        </div>
                                      </div>

                                      <div class="col-sm-1 nopadding">
                                        <div class="form-group">
                                          <label for="price" class="col-form-label">Price</label>
                                            <input type="text" class="form-control" id="var_price" name="price[{{$ky}}]" pattern="[0-9]+" value="{{$variation->price}}" placeholder="Price">
                                        </div>
                                      </div>

                                      <div class="col-sm-2 nopadding">
                                        <div class="form-group">
                                          <label for="discounted_variation_price" class="col-form-label">Discounted Price</label>
                                            <input type="text" class="form-control discounted-pric" id="discounted_variation_price" name="discounted_variation_price[{{$ky}}]" value="{{ $variation->discounted_variation_price }}" pattern="[0-9]+" placeholder="{{ trans('placeholder.discounted_price') }}">
                                        </div>
                                      </div>
                                      
                                      <div class="col-sm-1 nopadding">
                                        <div class="form-group">
                                          <label for="qty" class="col-form-label">{{ trans('Qty') }}</label>
                                          <input type="text" class="form-control" name="qty[{{$ky}}]" pattern="[0-9]+" value="{{ $variation->qty }}" id="qty" placeholder="QTY">
                                        </div>
                                      </div>
                                     

                                      <!-- <div class="col-sm-2 nopadding">
                                        <div class="form-group">
                                          <label for="variation" class="col-form-label">Variation</label>
                                            <input type="text" class="form-control" name="variation[{{$ky}}]" id="variation" placeholder="Variation" value="{{$variation->variation}}">
                                        </div>
                                      </div>

                                      <div class="col-sm-3 nopadding">
                                        <div class="form-group">
                                          <label for="price" class="col-form-label">Price</label>
                                            <input type="text" class="form-control" id="price" name="price[{{$ky}}]" pattern="[0-9]+" placeholder="Price" value="{{$variation->price}}">
                                        </div>
                                      </div>

                                      <div class="col-sm-3 nopadding">
                                        <div class="form-group">
                                          <label for="discounted_variation_price" class="col-form-label">Discounted Price</label>
                                            <input type="text" class="form-control" id="discounted_variation_price" name="discounted_variation_price[{{$ky}}]" pattern="[0-9]+" placeholder="{{ trans('placeholder.discounted_price') }}" value="{{$variation->discounted_variation_price}}">
                                        </div>
                                      </div>
                                      
                                      <div class="col-sm-2 nopadding">
                                        <div class="form-group">
                                          <label for="qty" class="col-form-label">{{ trans('labels.qty') }}</label>
                                          <input type="text" class="form-control" name="qty[{{$ky}}]" pattern="[0-9]+" id="qty" value="{{$variation->qty}}">
                                        </div>
                                      </div> -->

                                      <div class="col-sm-1 nopadding">
                                        <div class="form-group">
                                          <div class="input-group">
                                            <div class="input-group-btn">
                                              <a href="javascript:void(0);" class="danger p-0" data-original-title="{{ trans('labels.delete') }}" title="{{ trans('labels.delete') }}" onclick="do_delete('{{$variation->id}}','{{route('admin.variation.delete')}}','You want to Delete variation','{{ trans('labels.delete') }}')">
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
                                            <button class="btn btn-success" type="button"  onclick="variation_fields();"> + </button>
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
                                            <input type="text" class="form-control" name="variation[{{$i}}]" id="variation" placeholder="Variation">
                                            @if ($errors->has('variation.'.$i))
                                                <span class="text-danger">Required *</span>
                                            @endif
                                        </div>
                                      </div>

                                      <div class="col-sm-3 nopadding">
                                        <div class="form-group">
                                          <label for="price" class="col-form-label">Price</label>
                                            <input type="text" class="form-control" id="price" name="price[{{$i}}]" pattern="[0-9]+" placeholder="Price">
                                            @if ($errors->has('price.'.$i))
                                                <span class="text-danger">Required *</span>
                                            @endif
                                        </div>
                                      </div>

                                      <div class="col-sm-3 nopadding">
                                        <div class="form-group">
                                          <label for="discounted_variation_price" class="col-form-label">Discounted Price</label>
                                            <input type="text" class="form-control" id="discounted_variation_pric" name="discounted_variation_price[{{$i}}]" pattern="[0-9]+" placeholder="{{ trans('placeholder.discounted_variation_price') }}">
                                            @if ($errors->has('discounted_variation_price.'.$i))
                                                <span class="text-danger">Required *</span>
                                            @endif
                                        </div>
                                      </div>
                                      
                                      <div class="col-sm-2 nopadding">
                                        <div class="form-group">
                                          <label for="qty" class="col-form-label">{{ trans('labels.qty') }}</label>
                                          <input type="text" class="form-control" name="qty[{{$i}}]" pattern="[0-9]+" id="qty" value="{{old('qty')[$i]}}">
                                          @if ($errors->has('qty.'.$i))
                                              <span class="text-danger">Required *</span>
                                          @endif
                                        </div>
                                      </div>

                                      <div class="col-sm-1 nopadding">
                                        <div class="form-group">
                                          <div class="input-group">
                                            <div class="input-group-btn">
                                              <button class="btn btn-danger" type="button" onclick="remove_variation_fields('{{$i}}');"> - </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      </div>
                                      <?php $i++; ?>
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
                                      <textarea class="form-control d-none" id="description"  name="description" rows="8" placeholder="{{ trans('placeholder.description') }}">{!! $data->description !!}</textarea>
                                      <div id="editor">{!! $data->description !!}</div>
                                      @if ($errors->has('description'))
                                          <span class="text-danger">{{ $errors->first('description') }}</span>
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
                    <img class="card-img img-fluid mb-3 w-50" src="{{$img->image_url}}" alt="Product Images">
                  </div>
                </div>
                <div class="card-footer border-top-blue-grey border-top-lighten-5 text-muted">
                  <span class="tags float-right">
                    <span class="badge bg-success white" onClick="EditDocument('{{$img->id}}')">Edit</span>
                    <span class="badge bg-danger white" onclick="DeleteImage('{{$img->id}}','{{$img->product_id}}')">Delete</span>
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
<div class="modal fade" id="AddProduct" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <form method="post" action="{{ route('admin.products.storeimages') }}" class="addproduct" enctype="multipart/form-data">
          @csrf
            <span id="msg"></span>
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ trans('labels.images') }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="{{ trans('labels.close') }}"><span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <span id="iiemsg"></span>
                <div class="modal-body">
                    <input type="hidden" name="pro_id" id="pro_id" value="{{$data->id}}">
                    <div class="form-group">
                        <label for="colour" class="col-form-label">{{ trans('labels.images') }}:</label>
                        <input type="file" multiple="true" class="form-control" name="file[]" id="file" accept="image/*" required="">
                    </div>
                    <div class="gallery"></div>

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
  var variationdata = 0;

  $(document).ready(function(){
    var counter = document.getElementById('counter');
    variationdata = "{{old('update') ? count(old('update')) + count($variations) : count($variations)}}";

    console.log(variationdata);
  });  

  function variation_fields() {

        var objTo = document.getElementById('variation_fields')
        var divtest = document.createElement("div");
        divtest.setAttribute("class", "form-group removeclass"+variationdata);
        var rdiv = 'removeclass'+variationdata;
        divtest.innerHTML = `
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
                <input type="text" class="form-control variation-input" name="variation[`+ variationdata +`]" placeholder="Variation">
            </div>
        </div>
     
        

        <div class="col-sm-2 nopadding">
          <div class="form-group">
            <label for="variation_interval" class="col-form-label">Interval(AMC)</label>
              <input type="number" class="form-control discount-percentage" id="variation_interval" name="variation_interval[`+ variationdata +`]"  value="" placeholder="e.g., 5">
          </div>
        </div>

        <div class="col-sm-1 nopadding">
          <div class="form-group">
            <label for="variation_times" class="col-form-label">Times(AMC)</label>
              <input type="text" class="form-control discount-percentage" id="variation_times" name="variation_times[`+ variationdata +`]" pattern="[0-9]+" value="" placeholder="e.g., 5">
          </div>
        </div>

       <div class="col-sm-1 nopadding">
            <div class="form-group">
                <label for="price" class="col-form-label">Price</label>
                <input type="text" class="form-control var-price" name="price[`+ variationdata +`]" pattern="[0-9]+" placeholder="Price">
            </div>
        </div>

        <div class="col-sm-2 nopadding">
            <div class="form-group">
                <label for="discounted_variation_price" class="col-form-label">Discounted Price</label>
                <input type="text" class="form-control discounted-price" name="discounted_variation_price[`+ variationdata +`]" pattern="[0-9]+" placeholder="{{ trans('placeholder.discounted_price') }}">
            </div>
        </div>
        <div class="col-sm-1 nopadding">
            <div class="form-group">
                <label for="qty" class="col-form-label">{{trans('QTY')}}</label>
                <input type="text" class="form-control qty-input" name="qty[`+ variationdata +`]" pattern="[0-9]+" placeholder="Qty">
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
        <div class="clear">
        
        </div></div>`;
        
        // divtest.innerHTML = '<input type="hidden" class="form-control" name="update[]" id="update"><div class="row panel-body variation"><div class="col-sm-3 nopadding"> <div class="form-group"> <label for="variation" class="col-form-label">Variation</label> <input type="text" class="form-control" name="variation['+ variationdata +']" id="variation" placeholder="Variation" > </div></div><div class="col-sm-3 nopadding"> <div class="form-group"> <label for="price" class="col-form-label">Price</label> <input type="text" class="form-control" id="price" name="price['+ variationdata +']" pattern="[0-9]+" placeholder="Price" > </div></div><div class="col-sm-3 nopadding"> <div class="form-group"> <label for="discounted_variation_price" class="col-form-label">Discounted Price</label> <input type="text" class="form-control" id="discounted_variation_price" name="discounted_variation_price['+ variationdata +']" pattern="[0-9]+" placeholder="{{ trans('placeholder.discounted_price') }}"> </div></div><div class="col-sm-2 nopadding"> <div class="form-group"> <label for="qty" class="col-form-label">{{trans('labels.qty')}}</label> <input type="text" class="form-control" name="qty['+ variationdata +']" pattern="[0-9]+" id="qty"> </div></div><div class="col-sm-1 nopadding"> <div class="form-group"> <div class="input-group"> <div class="input-group-btn"> <button class="btn btn-danger" type="button" onclick="remove_variation_fields('+ variationdata +');"> - </button> </div></div></div></div><div class="clear"></div></div>';
      // counter.innerHTML = variationdata;
      variationdata++;
      objTo.appendChild(divtest)
  }
  function remove_variation_fields(rid) {
     $('.removeclass'+rid).remove();
  }

  jQuery(document).ready(function($) {
      $("#cat_id").change(function () {
          var cat_id = $("#cat_id").val();
          jQuery.ajax({
              headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              },
              type:'POST',
              url:"{{ route('admin.products.subcat') }}",
              data:{      
              'cat_id':cat_id
              },
              dataType: "json",
              success: function(response) {
                  let html ='';
                  html = '<option value="">{{ trans('placeholder.select_subcategory') }}</option>';
                  for(i in response){              
                      html+='<option value="'+response[i].id+'">'+response[i].subcategory_name+'</option>'
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
              type:'POST',
              url:"{{ route('admin.products.innersubcat') }}",
              data:{      
              'subcat_id':subcat_id
              },
              dataType: "json",
              success: function(response) {
                  let html ='';
                  html = '<option value="">{{ trans('placeholder.select_innersubcategory') }}</option>';
                  for(i in response){              
                      html+='<option value="'+response[i].id+'">'+response[i].innersubcategory_name+'</option>'
                  }
                  $('#innersubcat_id').html(html);
              },              
          });
      });
  });

  $(document).ready(function(){
      $('.is_variation').change(function(){
          if(this.checked) {
              $('.variation').fadeIn('slow');
              $('.default_price').fadeOut('slow');
          } else {
              $('.variation').fadeOut('slow');
              $('.default_price').fadeIn('slow');
          }
      });
  });

  $(document).ready(function(){

      $("#free_shipping").on("change",function(){
          $('#flat_rate').prop('checked', false); // Unchecks it
          $(".flat_rate_shipping_div").hide();
      });

      $("#flat_rate").on('change', function() {
          if ($(this).is(':checked')) {
            $(".flat_rate_shipping_div").show();
            $('#free_shipping').prop('checked', false); // Unchecks it
          }
          else {
            $('#free_shipping').prop('checked', false); // Unchecks it
            $(".flat_rate_shipping_div").hide();
          }
      });

      $("#is_return").on('change', function() {
          if ($(this).is(':checked')) {
              $(".is_return_div").show();
              $('#free_shipping').prop('checked', false); // Unchecks it
          }
          else {
             $(".is_return_div").hide();
          }
      });

      $('#editimg').on('submit', function(event){
          event.preventDefault();
          var form_data = new FormData(this);
          $('#preloader').show();
          $.ajax({
            url:"{{ route('admin.products.updateimage') }}",
              method:'POST',
              data:form_data,
              cache: false,
              contentType: false,
              processData: false,
              dataType: "json",
              success: function(result) {
                  $('#preloader').hide();
                  var msg = '';
                  if(result.ResponseCode == 1)
                  {
                    location.reload();
                  }
                  else
                  {
                    for(var count = 0; count < result.error.length; count++)
                    {
                        msg += '<div class="alert alert-danger">'+result.error[count]+'</div>';
                    }
                    $('#emsg').html(msg);
                    setTimeout(function(){
                      $('#emsg').html('');
                    }, 5000);
                  }
              },
          });
      });
  });

  function do_delete(id,page_name,name,titles)
  {
      Swal.fire({
          title: '{{ trans('labels.are_you_sure') }}',
          text: "{{ trans('labels.delete_text') }} "+name+"!",
          type: 'error',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '{{ trans('labels.yes') }}',
          cancelButtonText: '{{ trans('labels.no') }}'
      }).then((t) => {
          if(t.value==true){  
              $('#preloader').show();
              $.ajax({
                   headers: {
                      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                  },
                  url: page_name,
                  type: "POST",
                  data : {'id':id},

                  success:function(data)
                  { 
                      $('#preloader').hide();
                      if(data == 1000)
                      {
                        console.log('#del-'+id);
                          $('#del-'+id).remove();
                          Swal.fire({type: 'success',title: '{{ trans('labels.success') }}',showConfirmButton: false,timer: 1500});    
                      }
                      else
                      {
                          Swal.fire({type: 'error',title: '{{ trans('labels.cancelled') }}',showConfirmButton: false,timer: 1500});
                      }    
                  },error:function(data){
                      $('#preloader').hide();
                      console.log("AJAX error in request: " + JSON.stringify(data, null, 2));
                  }
              });
          }
          else
          {
              Swal.fire({type: 'error',title: '{{ trans('labels.cancelled') }}',showConfirmButton: false,timer: 1500});

          }
      });

  }

  function EditDocument(id) {
      $('#preloader').show();
      $.ajax({
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          url:"{{ route('admin.products.showimage') }}",
          data: {
              id: id
          },
          method: 'POST', //Post method,
          dataType: 'json',
          success: function(response) {
              $('#preloader').hide();
              jQuery("#EditImages").modal('show');
              $('#idd').val(response.ResponseData.id);
              $('.galleryim').html("<img src="+response.ResponseData.img+" class='img-fluid' style='max-height: 200px;'>");
              $('#old_img').val(response.ResponseData.image);
          },
          error: function(error) {
              $('#preloader').hide();
          }
      })
  }

  function DeleteImage(id,product_id) {
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
          if(t.value==true){
              $('#preloader').show();
              $.ajax({
                  headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                  },
                  url: '{{route("admin.products.destroyimage")}}',
                  type: "POST",
                  data : {'id':id,'product_id':product_id},
                  success:function(data)
                  { 
                    $('#preloader').hide();
                    if(data == 1)
                    {
                        location.reload();
                    }
                    if(data == 2)
                    {
                        Swal.fire({type: 'error',title: '{{ trans('labels.cancelled') }}',text: "You can't delete this image", showConfirmButton: false,timer: 1500});
                    }     
                  },error:function(data){
                      $('#preloader').hide();
                      console.log("AJAX error in request: " + JSON.stringify(data, null, 2));
                  }
              });
          }
          else
          {
              Swal.fire({type: 'error',title: '{{ trans('labels.cancelled') }}',showConfirmButton: false,timer: 1500});

          }
      });
  }
</script>

<script src="https://cdn.ckeditor.com/ckeditor5/41.3.1/classic/ckeditor.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", function() {
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
</script>

<script>
    document.getElementById('discounted_percentage').addEventListener('input', function() {
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
  document.addEventListener('input', function(event) {
      if (event.target && event.target.classList.contains('discount-percentage')) {
          calculateDiscount(event.target);
      }
  });

</script>

@endsection