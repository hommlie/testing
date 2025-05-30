@extends('layouts.admin')

@section('content')
<div class="container">
    <div class="card">
        <div class="card-header">
            <h4>Edit Pincode</h4>
        </div>
        <div class="card-body">
            <form action="{{ route('admin.addpincode.update', $pincode->id) }}" method="POST">
                @csrf
                <div class="form-group">
                    <label>Pincode</label>
                    <input type="text" name="pincode" class="form-control" value="{{ $pincode->pincode }}" required>
                </div>
                <div class="form-group">
                    <label>Days</label>
                    <input type="text" name="days" class="form-control" value="{{ $pincode->days}}" required>
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" name="location" class="form-control" value="{{ $pincode->location }}" required>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-success">Update</button>
                    <a href="{{ route('admin.addpincode') }}" class="btn btn-secondary">Back</a>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
