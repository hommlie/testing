@extends('layouts.admin')

@section('script')
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap4.min.js"></script>[;\]
@endsection

@section('content')
@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

@if (session('success'))
    <div class="alert alert-success">
        {{ session('success') }}
    </div>
@endif

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

<div class="card">
    <div class="card-header">
        <h4 class="card-title">Blogs</h4>
    </div>
    <div class="card-body collapse show">
        <div class="card-block card-dashboard" id="table-display">
            <table id="data_table_bootstrap" class="table table-striped table-responsive-sm datatable">
                <thead>
                    <tr>
                    </tr>
                </thead>
                <tbody>
                   
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script>
    $(document).ready(function () {
        var table = $('#data_table_bootstrap').DataTable({
            "columnDefs": [
                {
                    "targets": 0,
                    "orderable": false,
                    "searchable": false
                }
            ]
        });

        var dateColumnIndex = table.column(':contains(Date)').index();
        console.log("Date column index: " + dateColumnIndex);

        table.rows().every(function (rowIdx, tableLoop, rowLoop) {
            var data = this.data();
            var date = data[dateColumnIndex];
            console.log("Date in Row " + rowIdx + ": " + date);
        });

        $('#viewMessageModal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget);

            var message = button.data('message');

            var modal = $(this);
            modal.find('#complaintMessage').text(message);
        });
    });

    window.onload = function () {
      const modal = new bootstrap.Modal(document.getElementById('comingSoonModal'));
      modal.show();
    };
  
</script>
@endsection
