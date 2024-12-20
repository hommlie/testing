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
        <h4 class="card-title">Add Complaint</h4>
    </div>
    <div class="card-body collapse show">
    <div class="container mt-5">
   
        <form action="{{route('admin.complaint.store')}}" method="POST">
    @csrf
    <div class="row mb-3">
        <div class="col-md-4">
            <label for="name" class="form-label">First Name</label>
            <input type="text" class="form-control" id="name" name="first_name" value="{{ old('name') }}"  >
            @error('first_name') <small class="text-danger">{{ $message }}</small> @enderror
        </div>
        <div class="col-md-4">
            <label for="name" class="form-label">Last Name</label>
            <input type="text" class="form-control" id="name" name="last_name" value="{{ old('name') }}"  >
            @error('last_name') <small class="text-danger">{{ $message }}</small> @enderror
        </div>
        <div class="col-md-4">
            <label for="mobile" class="form-label">Mobile</label>
            <input type="text" class="form-control" id="mobile" name="mobile" value="{{ old('mobile') }}" >
            @error('mobile') <small class="text-danger">{{ $message }}</small> @enderror
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-md-6">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" name="email" value="{{ old('email') }}" >
            @error('email') <small class="text-danger">{{ $message }}</small> @enderror
        </div>
        <div class="col-md-6">
            <label for="subject" class="form-label">Subject</label>
            <input type="text" class="form-control" id="subject" name="subject" value="{{ old('subject') }}" >
            @error('subject') <small class="text-danger">{{ $message }}</small> @enderror
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-md-12">
            <label for="message" class="form-label">Message</label>
            <textarea class="form-control" id="message" name="message" rows="4" >{{ old('message') }}</textarea>
            @error('message') <small class="text-danger">{{ $message }}</small> @enderror
        </div>
    </div>
    <div class="text-right">
        <button type="submit" class="btn btn-primary">Submit</button>
    </div>
</form>

</div>

    </div>

</div>
@endsection