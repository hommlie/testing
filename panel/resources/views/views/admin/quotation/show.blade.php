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
                            <h4 class="card-title">{{ trans('Add Permissions') }}</h4>
                            <a href="{{route('admin.permission')}}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
                                {{ trans('View Permissions') }}
                            </a>
                        </div>
                        
                        <div class="card-body p-3">
                            <form action="{{ route('admin.permission.update',$data->id) }}" method="post" enctype="multipart/form-data">
                                @csrf
                                @method('PUT')
                                <!-- <label for=""><u>Basic Details</u></label> -->
                                <div class="row mb-3">
                                    <div class="col-lg-6">
                                        <label for="permission_label">Enter Permission Label</label>
                                        <div class="col-lg-9">
                                            <input type="text" name="permission_label" placeholder="e.g., Add Employee" id="permission_label" value="{{ $data->label }}" class="form-control" />
                                            @if ($errors->has('permission_label'))
                                            <span class="text-danger">{{ $errors->first('permission_label') }}</span>
                                            @endif
                                        </div>
                                    </div>


                                    <div class="col-lg-6">
                                        <label for="permission">Enter Permission Name</label>
                                        <div class="col-lg-9">
                                            <input type="text" name="permission" placeholder="e.g., add_employees" id="permission" value="{{ $data->name }}" class="form-control" />
                                            @if ($errors->has('permission'))
                                            <span class="text-danger">{{ $errors->first('permission') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                                <br>
                            <input type="submit"  name="submit" value="update" class="btn btn-primary" id="submit">
                                
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
