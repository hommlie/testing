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
                            <h4 class="card-title">{{ trans('Edit Time Slots') }}</h4>
                            <a href="{{route('admin.timeslot')}}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
                                {{ trans('View Timeslots') }}
                            </a>
                        </div>
                        
                        <div class="card-body p-3">
                            <form action="{{ route('admin.timeslot.update',$data->id) }}" method="post" enctype="multipart/form-data">
                                @csrf
                                @method('PUT')
                                <!-- <label for=""><u>Basic Details</u></label> -->
                                <div class="row mb-3">
                                    <div class="col-lg-3">
                                        <label for="timeslot">Your Time slot </label>
                                    </div>
                                    <div class="col-lg-9">
                                        <input type="text" disabled name="timeslot" placeholder="e.g., 9AM-10AM"  id="timeslot" value="{{ $data->name }} ({{ $data->starttime }} - {{ $data->endtime }})" class="form-control" />
                                        
                                    </div> 
                                </div>
                                <!-- <br> -->
                            <!-- <input type="submit"  name="submit" class="btn btn-primary" id="submit"> -->
                                
                        </div>
                    </div>

                    
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
