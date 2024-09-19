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
                            <h4 class="card-title">{{ trans('Add Testimonials') }}</h4>
                            <a href="{{route('admin.testimonials')}}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
                                {{ trans('View Testimonials') }}
                            </a>
                        </div>
                        
                        <div class="card-body p-3">
                            <form action="{{ route('admin.testimonials.store') }}" method="post" enctype="multipart/form-data">
                                @csrf
                                <div class="row mb-3">
                                    <div class="col-lg-6">
                                        <label for="name">Customer Name</label>
                                        <input type="text" name="name" placeholder="e.g., John Doe" id="name" value="{{ $data->name }}" class="form-control" />
                                        @if ($errors->has('name'))
                                        <span class="text-danger">{{ $errors->first('name') }}</span>
                                        @endif
                                    </div>
                                    <div class="col-lg-6">
                                        <label for="location">Customer Location</label>
                                        <input type="text" name="location" placeholder="e.g.,Bangalore " id="location" value="{{ $data->location }}" class="form-control" />
                                        @if ($errors->has('location'))
                                        <span class="text-danger">{{ $errors->first('location') }}</span>
                                        @endif
                                    </div>

                                    <div class="col-lg-12">
                                        <label for="feedback">Customer Feedack</label>
                                        <textarea name="feedback" rows="5" class="form-control" required id="feedback" placeholder="Write feedback Here..">{{ $data->feedback }}</textarea>
                                        @if ($errors->has('feedback'))
                                        <span class="text-danger">{{ $errors->first('feedback') }}</span>
                                        @endif
                                    </div>

                                    <div class="col-lg-12">
                                        <label for="image">Customer Profile Picture (Optional)</label>
                                        <input type="file" name="image" class="form-control" id="">
                                        @if ($errors->has('image'))
                                        <span class="text-danger">{{ $errors->first('image') }}</span>
                                        @endif
                                        <br>
                                        <img src="{{ asset('storage/app/public/images/testimonials/'.$data->image) }}" style="width: 100px;height:100px" alt="">
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

