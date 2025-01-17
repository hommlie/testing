@extends('layouts.admin')

@section('script')
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap4.min.js"></script>

<script>
    $(document).ready(function () {
        console.log("Initializing surau DataTable...");
        $('#data_table_bootstrap').DataTable({
            responsive: true,
            autoWidth: false,
            dom: 'lfrtip', \
            language: {
                search: "Search Complaints:"
            },
        });
    });
</script>
@endsection

@section('content')

@if (session('success'))
    <div class="alert alert-success">
        {{ session('success') }}
    </div>
@endif

<div class="card">
    <div class="card-header">
        <h4 class="card-title">Add Inspections</h4>
    </div>
    <div class="card-body collapse show">
        <div class="container mt-5">

            <form action="{{route('admin.inspections.store')}}" method="POST">
                @csrf
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="fullName">Full Name</label>
                        <input type="text" name="fullName" id="fullName" class="form-control"
                            placeholder="Enter Full Name" value="{{ old('fullName') }}" >
                        @error('fullName')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="form-group col-md-6">
                        <label for="address">Address</label>
                        <input type="text" name="address" id="address" class="form-control" placeholder="Enter Address"
                            value="{{ old('address') }}" >
                        @error('address')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="mobile">Mobile</label>
                        <input type="text" name="mobile" id="mobile" class="form-control"
                            placeholder="Enter Mobile Number" value="{{ old('mobile') }}" >
                        @error('mobile')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="form-group col-md-6">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" class="form-control"
                            placeholder="Enter Email Address" value="{{ old('email') }}" >
                        @error('email')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="date">Date</label>
                        <input type="date" name="date" id="date" class="form-control"
                            value="" >
                        @error('date')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="form-group col-md-6">
                        <label for="time">Time</label>
                        <input type="time" name="time" id="time" class="form-control"
                            value="" >
                        @error('time')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>
                </div>

                <button type="submit" class="btn btn-primary ">Submit</button>



            </form>

        </div>

    </div>

</div>
@endsection