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
        <h4 class="card-title">Add blogs</h4>
    </div>
    <div class="card-body collapse show">
    <div class="container mt-5">
   
        <form action="" > {{-- route('admin.complaint.store') method="POST"--}}
    @csrf
    
    <div class="row mb-3">
        <div class="col-md-12">
            <label for="message"  class="form-label">Message</label>
            <textarea class="form-control" placeholder="Enter Message" id="message" name="message" rows="4" >{{ old('message') }}</textarea>
            @error('message') <small class="text-danger">{{ $message }}</small> @enderror
        </div>
    </div>
    <div class="text-right">
        <button type="submit" class="btn btn-primary">Submit</button>
    </div>
</form>

</div>
<!-- Coming Soon Modal -->
<div class="modal fade" id="comingSoonModal" tabindex="-1" role="dialog" aria-labelledby="comingSoonModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content text-center">
          
            <div class="modal-body">
                <i class="fas fa-clock fa-3x text-primary mb-3"></i>
                <p>We're working on it! This feature will be available soon.</p>
            </div>
           
        </div>
    </div>
</div>
<script>
     window.onload = function () {
      const modal = new bootstrap.Modal(document.getElementById('comingSoonModal'));
      modal.show();
    };
</script>
@endsection