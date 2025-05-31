@extends('layouts.admin')

@section('script')
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap4.min.js"></script>

<script>
    $(document).ready(function () {
        console.log("Initializing surau DataTable...");
        $('#data_table_bootstrap').DataTable({
            responsive: true,
            autoWidth: false,
            dom: 'lfrtip',
            language: {
                search: "Search Complaints:"
            },
        });
    });
</script>
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

<div class="card">
    <div class="card-header">
        <h4 class="card-title">Complaint</h4>
    </div>
    <div class="card-body collapse show">
        <div class="card-block card-dashboard" id="table-display">
            <table id="data_table_bootstrap" class="table table-striped table-responsive-sm datatable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Branch Code</th>
                        <th>Branch Name</th>
                        <th>Office Address</th>
                        <th>Contact Person Name</th>
                        <th>Contact Number</th>
                        <th>Email</th>
                       {{--  <th>Action</th> --}}
                    </tr>
                </thead>
                <tbody>
                    @php
                        $n = 1;
                    @endphp
                    @foreach($serviceCenter as $center)
                        <tr>
                            <td>{{ $n++ }}</td>
                            <td>{{ $center->branch_code }}</td>
                            <td>{{ $center->branch_name }}</td>
                            <td>{{ $center->office_address }}</td>
                            <td>{{ $center->contact_person_name }}</td>
                            <td>{{ $center->contact_number }}</td>
                            <td>{{ $center->email_id }}</td>
                         {{--    <td>
                                <!-- Edit Modal Trigger -->
                                <a href="#" data-bs-toggle="modal" data-bs-target="#addBusinessRegionModal{{ $center->id }}">
                                    <i class="fas fa-edit btn-sm text-primary"></i>
                                </a>
                                
                                <!-- Delete Link -->
                                <a href="">
                                    <i class="fas fa-trash btn-sm text-danger"></i>
                                </a>
                            </td> --}}
                        </tr>
                    @endforeach
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
</script>
@endsection
