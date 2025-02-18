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
                            <h4 class="card-title">{{ trans('Outward Inventory') }}</h4>
                            <a href="{{route('admin.inventory')}}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
                                {{ trans('View Inventory') }}
                            </a>
                        </div>
                        
                        <div class="card-body p-3 col-lg-6 mx-auto">
                            <form action="{{ route('admin.inventory.OutwardUpdate',$data->id) }}" method="post" enctype="multipart/form-data">
                                @csrf
                                @method('PUT')
                                <!-- <label for=""><u>Basic Details</u></label> -->
                                <div class="mb-3">
                                    <div class="row col-lg-12 mb-3">
                                        <label class="col-lg-4" for="category"> Category</label>
                                        <div class="col-lg-8">
                                            <input type="text" value="{{ $data->category }}"  class="form-control" readonly name="category" id="">
                                            @if ($errors->has('category'))
                                            <span class="text-danger">{{ $errors->first('category') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="row col-lg-12 mb-3">
                                        <label class="col-lg-4" for="subCategory"> subCategory</label>
                                        <div class="col-lg-8">
                                            <input type="text" name="subCategory" placeholder="e.g., Enter subCategory" id="subCategory" value="{{ $data->subCategory }}" class="form-control" readonly />
                                            @if ($errors->has('subCategory'))
                                            <span class="text-danger">{{ $errors->first('subCategory') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="row col-lg-12 mb-3">
                                        <label class="col-lg-4" for="quantity">Current Quantity</label>
                                        <div class="col-lg-8">
                                            <input type="number" step="any" name="quantity" placeholder="e.g., Enter quantity" id="quantity" value="{{ $data->quantity }}" class="form-control" readonly />
                                            @if ($errors->has('quantity'))
                                            <span class="text-danger">{{ $errors->first('quantity') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="row col-lg-12 mb-3">
                                        <label class="col-lg-4" for="category"> Quantity Type</label>
                                        <div class="col-lg-8">
                                            <input type="text" step="any" name="type" placeholder="e.g., Enter type" id="type" value="{{ $data->type }}" class="form-control" readonly />
                                            @if ($errors->has('type'))
                                            <span class="text-danger">{{ $errors->first('type') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="row mb-3 col-lg-12">
                                        <label class="col-lg-4" for="outward">Enter Quantity to Outward</label>
                                        <div class="col-lg-8">
                                            <input type="number" step="any" name="outward" placeholder="e.g., Enter Consumed quantity" id="outward" value="" class="form-control" />
                                            @if ($errors->has('outward'))
                                            <span class="text-danger">{{ $errors->first('outward') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    
                                    <div class="row col-lg-12 mb-3">
                                        <label class="col-lg-4" for="price">Price of one Piece</label>
                                        <div class="col-lg-8">
                                            <input type="number" step="any" name="price" placeholder="e.g., Enter price" id="price" value="{{ $data->price }}" class="form-control" required readonly />
                                            @if ($errors->has('price'))
                                            <span class="text-danger">{{ $errors->first('price') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="row col-lg-12 mb-3">
                                        <label class="col-lg-4" for="total">Total Price</label>
                                        <div class="col-lg-8">
                                            <input type="number"  step="any" name="total" placeholder="Auto Calculation of Total Price" id="total" value="{{ $data->total }}" class="form-control" readonly />
                                            @if ($errors->has('total'))
                                            <span class="text-danger">{{ $errors->first('total') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="row col-lg-12 mb-3">
                                        <label class="col-lg-4" for="vendor">Vendor Name</label>
                                        <div class="col-lg-8">
                                            <input type="text" step="any" name="vendor" placeholder="e.g., Enter vendor" id="vendor" value="{{ $data->vendor }}" class="form-control" readonly />
                                            @if ($errors->has('vendor'))
                                            <span class="text-danger">{{ $errors->first('vendor') }}</span>
                                            @endif
                                        </div>
                                    </div>

                                </div>

                                <!-- <div class="row mb-3">
                                    <div class="col-lg-3">
                                        <label for="category">Category</label>
                                        <div class="col-lg-9">
                                            <input type="text" name="category" value="{{ $data->category }}" class="form-control" readonly id="" />
                                            @if ($errors->has('category'))
                                            <span class="text-danger">{{ $errors->first('category') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="col-lg-3">
                                        <labelnsubCategory">subCategory</label>
                                        <div class="col-lg-9">
                                            <input type="text" name="subCategory" placeholder="e.g., Enter subCategory" id="subCategory" value="{{ $data->subCategory }}" class="form-control" readonly />
                                            @if ($errors->has('subCategory'))
                                            <span class="text-danger">{{ $errors->first('subCategory') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="col-lg-3">
                                        <label for="quantity">Current Stock Quantity</label>
                                        <div class="col-lg-9">
                                            <input type="number" step="any" name="quantity" placeholder="e.g., Enter quantity" readonly id="quantity" value="{{ $data->quantity }}" class="form-control" />
                                            @if ($errors->has('quantity'))
                                            <span class="text-danger">{{ $errors->first('quantity') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="col-lg-3">
                                        <label for="outward">Enter Quantity to Outward</label>
                                        <div class="col-lg-9">
                                            <input type="number" step="any" name="outward" placeholder="e.g., Enter Consumed quantity" id="outward" value="" class="form-control" />
                                            @if ($errors->has('outward'))
                                            <span class="text-danger">{{ $errors->first('outward') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="col-lg-3">
                                        <label for="type">Quantity Type</label>
                                        <div class="col-lg-9">
                                            <input type="text" name="type" value="{{ $data->type }}" class="form-control" readonly id="">
                                            @if ($errors->has('type'))
                                            <span class="text-danger">{{ $errors->first('type') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                </div> -->
                                <br>
                                <input type="submit" name="submit" value="update" class="btn btn-primary" id="submit">
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
