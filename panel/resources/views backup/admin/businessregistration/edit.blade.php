@extends('layouts.admin')

@section('content')
<div class="card">
    <div class="card-header">
        <h4 class="card-title">Edit Complaint</h4>
    </div>
    <div class="card-body">
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        @if (session('error'))
            <div class="alert alert-danger">
                {{ session('error') }}
            </div>
        @endif

        <form action="{{ route('admin.businessregistration.update', $data->id) }}" method="POST">
            @csrf
    
            <div class="row">
                <div class="form-group col-md-6">
                    <label>Business Name</label>
                    <input type="text" name="businessName" class="form-control" value="{{ $data->businessName }}" required>
                </div>

                <div class="form-group col-md-6">
                    <label>User Name</label>
                    <input type="text" name="userName" class="form-control" value="{{ $data->userName }}" required>
                </div>

                <div class="form-group col-md-6">
                    <label>Phone Number</label>
                    <input type="text" name="phoneNumber" class="form-control" value="{{ $data->phoneNumber }}" required>
                </div>

                <div class="form-group col-md-6">
                    <label>Address</label>
                    <input type="text" name="address" class="form-control" value="{{ $data->address }}" required>
                </div>

                <div class="form-group col-md-6">
                    <label>City</label>
                    <input type="text" name="city" class="form-control" value="{{ $data->city }}" required>
                </div>

                <div class="form-group col-md-6">
                    <label>Pincode</label>
                    <input type="text" name="pincode" class="form-control" value="{{ $data->pincode }}" required>
                </div>

                <div class="form-group col-md-6">
                    <label>Area</label>
                    <input type="text" name="area" class="form-control" value="{{ $data->area }}" required>
                </div>

                <div class="form-group col-md-6">
                    <label>Landmark</label>
                    <input type="text" name="landmark" class="form-control" value="{{ $data->landmark }}" required>
                </div>

                <div class="form-group col-md-6">
                    <label>State</label>
                    <input type="text" name="state" class="form-control" value="{{ $data->state }}" required>
                </div>

                <div class="form-group col-md-6">
                    <label>Status</label>
                    <select name="status" class="form-control" required>
                        <option value="" {{ $data->status == '' ? 'selected' : '' }}>Select Status</option>
                        <option value="active" {{ $data->status == 'active' ? 'selected' : '' }}>Active</option>
                        <option value="pending" {{ $data->status == 'pending' ? 'selected' : '' }}>Pending</option>
                        <option value="rejected" {{ $data->status == 'rejected' ? 'selected' : '' }}>Rejected</option>
                    </select>
                </div>
            </div>

            <button type="submit" class="btn btn-primary">Update</button>
            <a href="{{ route('admin.businessregistration') }}" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
</div>
@endsection
