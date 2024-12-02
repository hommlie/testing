@extends('layouts.admin')
@section('css')
<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.css"> -->
<link rel="stylesheet" href="{{asset('storage/app/public/Adminassets/css/dataTables.bootstrap4.css')}}">
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
        <h4 class="card-title">Inspections</h4>
    </div>
    <div class="card-body collapse show">
        <div id="myTable" class="display">

            <table id="data_table_bootstrap" class="table table-striped table-responsive-sm datatable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Address</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($inspections as $key => $inspection)
                        <tr>
                            <td>{{ $loop->iteration }}</td>
                            <td>{{ $inspection->fullName }}</td>
                            <td>{{ $inspection->address }}</td>
                            <td>{{ $inspection->mobile }}</td>
                            <td>{{ $inspection->email }}</td>
                            <td>{{ $inspection->date }}</td>
                            <td>{{ $inspection->time }}</td>
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

        // Get the index of the "Date" column dynamically
        var dateColumnIndex = table.column(':contains(Date)').index();
        console.log("Date column index: " + dateColumnIndex);

        // Log all dates in the table for debugging purposes
        table.rows().every(function (rowIdx, tableLoop, rowLoop) {
            var data = this.data();
            var date = data[dateColumnIndex];
            console.log("Date in Row " + rowIdx + ": " + date);
        });
    });
</script>

@endsection