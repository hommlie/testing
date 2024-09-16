@extends('layouts.admin')
@section('title')
    
@endsection
@section('css')
@endsection
@section('content')
    <div class="">
        @if(Session::has('success'))
        <div class="alert alert-success">
            {{ Session::get('success') }}
            @php
                Session::forget('success');
            @endphp
        </div>
        @endif

        @if(Session::has('danger'))
        <div class="alert alert-danger">
            {{ Session::get('danger') }}
            @php
                Session::forget('danger');
            @endphp
        </div>
        @endif
        <section id="configuration">
            <div class="row">
                <div class="col-12">
                    @if(Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                        @php
                            Session::forget('success');
                        @endphp
                    </div>
                    @endif
                    <div class="card">                       
                        <div class="card-header bg-light">
                            <h4 class="card-title">{{ trans('Add Inventory') }}</h4>
                            <a href="{{ route('admin.inventory') }}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
                                {{ trans('View Inventory') }}
                            </a>
                            <a href="{{ route('admin.inventory.addType') }}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
                                {{ trans('Add Quantity Type') }}
                            </a>
                            <a href="{{ route('admin.inventory.addCategory') }}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
                                {{ trans('Add Category') }}
                            </a>
                        </div>
                        
                        <div class="card-body p-3 col-lg-6 mx-auto">
                            <form action="{{ route('admin.inventory.store') }}" method="post" enctype="multipart/form-data">
                                @csrf
                                <div class="mb-3">
                                    <div class="row col-lg-12 mb-3">
                                        <label class="col-lg-4" for="category">Select Category</label>
                                        <div class="col-lg-8">
                                            <select name="category" id="addcategory" class="form-control">
                                                <option value="">-Select Type-</option>
                                                @foreach ($category as $category_type)
                                                <option value="{{ $category_type->name }}">{{ $category_type->name }}</option>
                                                @endforeach
                                            </select>
                                            @if ($errors->has('category'))
                                            <span class="text-danger">{{ $errors->first('category') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="row col-lg-12 mb-3">
                                        <label class="col-lg-4" for="subCategory">Enter subCategory</label>
                                        <div class="col-lg-8">
                                            <input type="text" name="subCategory" placeholder="e.g., Enter subCategory" id="addsubCategory" value="{{ old('subCategory') }}" class="form-control" />
                                            @if ($errors->has('subCategory'))
                                            <span class="text-danger">{{ $errors->first('subCategory') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="row col-lg-12 mb-3">
                                        <label class="col-lg-4" for="quantity">Enter Quantity</label>
                                        <div class="col-lg-8">
                                            <input type="number" step="any" name="quantity" placeholder="e.g., Enter quantity" id="addquantity" value="{{ old('quantity') }}" class="form-control" />
                                            @if ($errors->has('quantity'))
                                            <span class="text-danger">{{ $errors->first('quantity') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="row col-lg-12 mb-3">
                                        <label class="col-lg-4" for="category">Select Quantity Type</label>
                                        <div class="col-lg-8">
                                            <select name="type" id="addtype" class="form-control">
                                                <option value="">-Select Type-</option>
                                                @foreach ($type as $quantity_type)
                                                <option value="{{ $quantity_type->shortcut }}">{{ $quantity_type->name }}</option>
                                                @endforeach
                                            </select>
                                            @if ($errors->has('type'))
                                            <span class="text-danger">{{ $errors->first('type') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="row col-lg-12 mb-3">
                                        <label class="col-lg-4" for="price">Enter Price (per one piece)</label>
                                        <div class="col-lg-8">
                                            <input type="number" step="any" name="price" placeholder="e.g., Enter price" id="addprice" value="{{ old('price') }}" class="form-control" />
                                            @if ($errors->has('price'))
                                            <span class="text-danger">{{ $errors->first('price') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="row col-lg-12 mb-3">
                                        <label class="col-lg-4" for="total">Total Price</label>
                                        <div class="col-lg-8">
                                            <input type="number"  step="any" name="total" placeholder="Auto Calculation of Total Price" id="addtotal" value="{{ old('total') }}" class="form-control" readonly />
                                            @if ($errors->has('total'))
                                            <span class="text-danger">{{ $errors->first('total') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="row col-lg-12 mb-3">
                                        <label class="col-lg-4" for="vendor">Enter Vendor Name</label>
                                        <div class="col-lg-8">
                                            <input type="text" step="any" name="vendor" placeholder="e.g., Enter vendor" id="addvendor" value="{{ old('vendor') }}" class="form-control" />
                                            @if ($errors->has('vendor'))
                                            <span class="text-danger">{{ $errors->first('vendor') }}</span>
                                            @endif
                                        </div>
                                    </div>

                                </div>
                                <br>
                                <input type="submit" name="submit" class="btn btn-primary" id="addsubmit">
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

@endsection

@section('scripttop')
@endsection

@section('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const quantityInput = document.getElementById('addquantity');
        const priceInput = document.getElementById('addprice');
        const totalInput = document.getElementById('addtotal');

        function calculateTotal() {
            const quantity = parseFloat(quantityInput.value) || 0;
            const price = parseFloat(priceInput.value) || 0;
            totalInput.value = (quantity * price).toFixed(2);
        }

        quantityInput.addEventListener('input', calculateTotal);
        priceInput.addEventListener('input', calculateTotal);
    });
</script>
@endsection
