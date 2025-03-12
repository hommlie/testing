@extends('layouts.admin')
@section('content')

<div class="card col-lg-7 mx-auto">
    <div class="card-header ">
        <h4 class="card-title">{{ trans('Employee Full Profile') }}</h4>
        @can('question_create')
        <a href="{{route('admin.employees.show',$data->id)}}" class="btn btn-success mr-1 mb-1 float-right" style="margin-top: -30px;">
            {{ trans('Edit') }}
        </a>
        @endcan
        <a href="{{route('admin.employees.index')}}" class="btn btn-success mr-1 mb-1 float-right" style="margin-top: -30px;">
            {{ trans('Go Back') }}
        </a>
    </div>

    <div class="card-body p-3">
        <h4 class="text-center font-weight-bold">Basic Profile</h4>
        <div class="row">
            <div class="col-lg-8">
                <p><b>Name: </b>{{ $data->emp_name }}</p>
                <p><b>Mobile: </b>{{ $data->emp_phone }}</p>
                <p><b>E-Mail: </b>{{ $data->emp_email }}</p>
                <p><b>Address: </b>{{ $data->emp_address }}</p>
            </div>
            <div class="col-lg-4 justify-content-center">
                <center>
                    <img src="{{ asset('storage/app/public/images/employee/profiles/'.$data->emp_photo) }}" width="150px" height="150px" class="mt-2" alt="{{ $data->emp_photo }}">
                    <br><br>
                    <a href="{{ asset('storage/app/public/images/employee/profiles/'.$data->emp_photo) }}" target="_blank" class="btn btn-sm btn-success">Preview</a>
                </center>
            </div>
        </div>
        <hr>

        <h4 class="text-center font-weight-bold">Bank Details</h4>
        <div class="row">
            <div class="col-lg-8">
                <p><b>Bank Name: </b>{{ $data->bank_name }}</p>
                <p><b>Branch: </b>{{ $data->bank_branch }}</p>
                <p><b>IFSC: </b>{{ $data->bank_ifsc }}</p>
                <p><b>Account No.: </b>{{ $data->bank_acc_no }}</p>
                <p><b>Accountant Name: </b>{{ $data->name_as_per_bank }}</p>
            </div>
            <div class="col-lg-4">
                <center>
                    <img src="{{ asset('storage/app/public/images/employee/bank_images/'.$data->bank_book_image) }}" width="150px" height="150px" class="mt-2" alt="{{ $data->bank_book_image }}">
                    <br><br>
                    <a href="{{ asset('storage/app/public/images/employee/bank_images/'.$data->bank_book_image) }}" target="_blank" class="btn btn-sm btn-success">Preview</a>
                </center>
            </div>
        </div>
        <hr>
        
        <div class="row">
            <div class="col-lg-6">
                <center>
                    <p><b>PAN No. : </b>{{ $data->pan_no }}</p>
                    <img src="{{ asset('storage/app/public/images/employee/pan_images/'.$data->pan_image) }}" width="150px" height="150px" class="mt-2" alt="{{ $data->pan_image }}">
                    <br><br>
                    <a href="{{ asset('storage/app/public/images/employee/pan_images/'.$data->pan_image) }}" target="_blank" class="btn btn-sm btn-success">Preview</a>
                </center>
            </div>
            <div class="col-lg-6">
                <center>
                    <p><b>Aadhar No. : </b>{{ $data->aadhar_no }}</p>
                    <img src="{{ asset('storage/app/public/images/employee/aadhar_images/'.$data->aadhar_image) }}" width="150px" height="150px" class="mt-2" alt="{{ $data->aadhar_image }}">
                    <br><br>
                    <a href="{{ asset('storage/app/public/images/employee/aadhar_images/'.$data->aadhar_image) }}" target="_blank" class="btn btn-sm btn-success">Preview</a>
                </center>
            </div>
            
        </div>

        <br>

    </div>
</div>

<br>
        <br>

@endsection
