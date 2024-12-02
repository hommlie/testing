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
                            <a href="{{route('admin.inventory')}}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
                                {{ trans('View Inventory') }}
                            </a>
                        </div>
                        
                        <div class="card-body p-3">
                            <form action="{{ route('admin.inventory.storeType') }}" method="post" enctype="multipart/form-data">
                                @csrf
                                <div class="row mb-3">
                                    <div class="col-lg-5">
                                        <label for="type">Create New Quantity Type</label>
                                        <div class="col-lg-9">
                                            <input type="text" name="type" placeholder="e.g., Enter new Quantity Type" id="type" value="{{ old('type') }}" class="form-control" />
                                            @if ($errors->has('type'))
                                            <span class="text-danger">{{ $errors->first('type') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="col-lg-5">
                                        <label for="shortcut">Quantity Type Shortcut</label>
                                        <div class="col-lg-9">
                                            <input type="text" name="shortcut" placeholder=" eg. ,  kg" id="shortcut" value="{{ old('shortcut') }}" class="form-control" />
                                            @if ($errors->has('shortcut'))
                                            <span class="text-danger">{{ $errors->first('shortcut') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                                
                                <br>
                                <input type="submit" name="submit" class="btn btn-primary" id="submit">
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

@section('script')
@endsection
