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
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>View Message</th> 
                    </tr>
                </thead>
                <tbody>
                    @php $n = 0 @endphp
                    @foreach($complaint as $key => $complaint)
                        <tr>
                            <td>{{++$n}}</td>
                            <td>{{ $complaint->first_name }} {{ $complaint->last_name }}</td>
                            <td>{{ $complaint->mobile }}</td>
                            <td>{{ $complaint->email }}</td>
                            <td>{{ $complaint->subject }}</td>
                            <td>
                               
                                <button type="button" class="btn btn-primary" data-toggle="modal"
                                    data-target="#viewMessageModal" data-message="{{ $complaint->message }}">
                                    View
                                </button>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>

<div class="modal fade" id="viewMessageModal" tabindex="-1" role="dialog" aria-labelledby="viewMessageModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="viewMessageModalLabel">Complaint Message</h5>
            </div>
            <div class="modal-body">
                <p id="complaintMessage"></p>
            </div>
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