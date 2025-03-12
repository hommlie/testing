@extends('layouts.admin')
@section('content')

<form action="{{ route('admin.employees.update',$data->id) }}" method="post" enctype="multipart/form-data">
    @csrf
    @method('PUT')
    <div class="card">                       
        <div class="card-header ">
            <h4 class="card-title">{{ trans('Add Employees') }}</h4>
            @can('question_create')
            <a href="{{route('admin.employees.index')}}" class="btn btn-success mr-1 mb-1 float-right" style="margin-top: -30px;">
                {{ trans('Go Back') }}
            </a>
            @endcan
        </div>
        
        <div class="card-body p-3">
            
                <!-- <label for=""><u>Basic Details</u></label> -->
                <div class="row mb-3">
                    <div class="col-lg-3">
                        <label for="ename">Employee Name</label>
                    </div>
                    <div class="col-lg-9">
                        <input type="text" name="ename" placeholder="Enter Employee Full Name"  id="ename" value="{{ $data->emp_name }}" class="form-control" />
                        @if ($errors->has('ename'))
                            <span class="text-danger">{{ $errors->first('ename') }}</span>
                        @endif
                    </div>
                    
                </div>
                <div class="row mb-3">
                    <div class="col-lg-3">
                        <label for="mobile">Employee Mobile Number</label>
                    </div>
                    <div class="col-lg-9">
                        <input type="text" name="mobile" placeholder="Enter Employee Mobile Number1" value="{{ $data->emp_phone }}"  id="mobile" class="form-control" />
                        @if ($errors->has('mobile'))
                            <span class="text-danger">{{ $errors->first('mobile') }}</span>
                        @endif
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-lg-3">
                        <label for="email">Employee Email Address</label>
                    </div>
                    <div class="col-lg-9">
                        <input type="email" name="email" placeholder="Enter Employee Email Address" value="{{ $data->emp_email }}"  id="email" class="form-control" />
                        @if ($errors->has('email'))
                            <span class="text-danger">{{ $errors->first('email') }}</span>
                        @endif
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-lg-3">
                        <label for="address">Employee  Address</label>
                    </div>
                    <div class="col-lg-9">
                        <textarea type="text" name="address" placeholder="Enter Employee Address" value="{{ $data->emp_address }}" rows="5"  id="address" class="form-control">{{ $data->emp_address }}</textarea>
                        @if ($errors->has('address'))
                            <span class="text-danger">{{ $errors->first('address') }}</span>
                        @endif
                    </div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-lg-3">
                        <label for="profile">Employee Profile Picture</label>
                    </div>
                    <div class="col-lg-9">
                        <input type="file" name="profile" placeholder="Enter Employee DOB" value="{{ old('profile') }}"  id="profile" class="form-control" />
                        <img src="{{ asset('storage/app/public/images/employee/profiles/'.$data->emp_photo) }}" width="150px" height="150px" class="mt-2" alt="{{ $data->emp_photo }}">
                        @if ($errors->has('profile'))
                            <span class="text-danger">{{ $errors->first('profile') }}</span>
                        @endif
                    </div>
                </div>
        </div>
    </div>
    <!-- <br> -->
    <div class="card ">
        <div class="card-header bg-light">
            Bank Details
        </div>
        <div class="card-body p-3">
                <!-- <label for=""><u>Bank Details</u></label> -->

                <div class="row mb-3">
                    <div class="col-lg-3">
                        <label for="bank_name">Bank Name</label>
                    </div>
                    <div class="col-lg-9">
                        <input type="text" name="bank_name" placeholder="Enter Bank Name"  id="bank_name" value="{{ $data->bank_name }}" class="form-control" />
                        @if ($errors->has('bank_name'))
                            <span class="text-danger">{{ $errors->first('bank_name') }}</span>
                        @endif
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-lg-3">
                        <label for="branch">Branch Name</label>
                    </div>
                    <div class="col-lg-9">
                        <input type="text" name="branch" placeholder="Enter Bank Branch"  id="branch" value="{{ $data->bank_branch }}" class="form-control" />
                        @if ($errors->has('branch'))
                            <span class="text-danger">{{ $errors->first('branch') }}</span>
                        @endif
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-lg-3">
                        <label for="ifsc">Bank IFSC Code</label>
                    </div>
                    <div class="col-lg-9">
                        <input type="text" name="ifsc" placeholder="Enter Bank IFSC"  id="ifsc" value="{{ $data->bank_ifsc }}" class="form-control" />
                        @if ($errors->has('ifsc'))
                            <span class="text-danger">{{ $errors->first('ifsc') }}</span>
                        @endif
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-lg-3">
                        <label for="acc_no">Bank Account Number</label>
                    </div>
                    <div class="col-lg-9">
                        <input type="text" name="acc_no" placeholder="Enter Bank Account Number" value="{{ $data->bank_acc_no }}"  id="acc_no" class="form-control" />
                        @if ($errors->has('acc_no'))
                            <span class="text-danger">{{ $errors->first('acc_no') }}</span>
                        @endif
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-lg-3">
                        <label for="name_as_per_bank">Account Holder Name</label>
                    </div>
                    <div class="col-lg-9">
                        <input type="text" name="name_as_per_bank" placeholder="Enter Name as per Bank Passbook"  id="name_as_per_bank" value="{{ $data->name_as_per_bank }}" class="form-control" />
                        @if ($errors->has('name_as_per_bank'))
                            <span class="text-danger">{{ $errors->first('name_as_per_bank') }}</span>
                        @endif
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-lg-3">
                        <label for="bank_image">Bank Passbook Image</label>
                    </div>
                    <div class="col-lg-9">
                        <input type="file" name="bank_image" placeholder="Enter Name as per Bank Passbook"  id="bank_image"  class="form-control" />
                        <img src="{{ asset('storage/app/public/images/employee/bank_images/'.$data->bank_book_image) }}" width="150px" height="150px" class="mt-2" alt="{{ $data->bank_book_image }}">
                        @if ($errors->has('bank_image'))
                            <span class="text-danger">{{ $errors->first('bank_image') }}</span>
                        @endif
                    </div>
                </div>
        </div>
    </div>

    <div class="card ">
        <div class="card-header bg-light">
        Pan Card Details
        </div>
        <div class="card-body p-3">
            <!-- <label for=""><u></u></label> -->
            <div class="row mb-3">
                <div class="col-lg-3">
                    <label for="pan_number">Pan Card Number</label>
                </div>
                <div class="col-lg-9">
                    <input type="text" name="pan_number" placeholder="Enter PAN Card Number" value="{{ $data->pan_no }}"  id="pan_number" class="form-control" />
                    @if ($errors->has('pan_number'))
                            <span class="text-danger">{{ $errors->first('pan_number') }}</span>
                    @endif
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-lg-3">
                    <label for="pan_image">Pan Card Image</label>
                </div>
                <div class="col-lg-9">
                    <input type="file" name="pan_image" placeholder="Enter Name as per Bank Passbook"  id="pan_image" class="form-control" />
                    <img src="{{ asset('storage/app/public/images/employee/pan_images/'.$data->pan_image) }}" width="150px" height="150px" class="mt-2" alt="{{ $data->pan_image }}">
                    @if ($errors->has('pan_image'))
                            <span class="text-danger">{{ $errors->first('pan_image') }}</span>
                        @endif
                </div>
            </div>
        </div>
    </div>

    <div class="card ">
        <div class="card-header bg-light">
        Aadhar Card Details
        </div>
        <div class="card-body p-3">
            <!-- <label for=""><u>Aadhar Details</u></label> -->
            <div class="row mb-3">
                <div class="col-lg-3">
                    <label for="aadhar_number">Aadhar Card Number</label>
                </div>
                <div class="col-lg-9">
                    <input type="text" name="aadhar_number" placeholder="Enter Aadhar Card Number" value="{{ $data->aadhar_no }}"  id="aadhar_number" class="form-control" />
                    @if ($errors->has('aadhar_number'))
                            <span class="text-danger">{{ $errors->first('aadhar_number') }}</span>
                        @endif
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-lg-3">
                    <label for="aadhar_image">Aadhar Card Image</label>
                </div>
                <div class="col-lg-9">
                    <input type="file" name="aadhar_image" placeholder="Enter Name as per Bank Passbook"  id="aadhar_image" class="form-control" />
                    <img src="{{ asset('storage/app/public/images/employee/aadhar_images/'.$data->aadhar_image) }}" width="150px" height="150px" class="mt-2" alt="{{ $data->aadhar_image }}">
                    @if ($errors->has('aadhar_image'))
                            <span class="text-danger">{{ $errors->first('aadhar_image') }}</span>
                        @endif
                </div>
            </div>
            <br>
            <a href="{{ route('admin.employees.index') }}" class="btn btn-danger">Cancel</a>

            <input type="submit"  name="submit" value="Update" class="btn btn-success" id="submit">
        </div>
    </div>
</form>
@endsection
