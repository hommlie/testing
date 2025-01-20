@extends('layouts.admin')

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>

@section('script')
<script src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap4.min.js"></script>

<script>
    $(document).ready(function () {
        console.log("Initializing DataTable...");

        // Initialize the DataTable
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
                        <th>Zone Name</th>
                        <th>State's</th>
                       {{--  <th>Action</th>--}}
                    </tr>
                </thead>
                <tbody>
                    @php
                        $n = 0;
                    @endphp
                    @foreach($businessregion as $business)
                        <tr>
                            <td>{{++$n}}</td>
                            <td>{{ $business->zone }}</td>
                            <td>{{ $business->state }}</td>
                           {{--  <td>
                                <!-- Trigger modal -->
                                <a href="" data-bs-toggle="modal"
                                    data-bs-target="#addBusinessRegionModal{{ $business->id }}"><i
                                        class="fas fa-edit btn-sm text-primary"></i></a>
                                <a href=""><i class="fas fa-trash brn-sm text-danger"></i> </a>
                            </td>--}}
                        </tr>
                        

                        <!-- ADD BUSINESS REGION MODAL -->
                        <div class="modal fade" id="addBusinessRegionModal{{ $business->id }}" tabindex="-1"
                            aria-labelledby="addBusinessRegionModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="addBusinessRegionModalLabel">Edit Business Region</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        {{-- {{ route('admin.orders.businessUpdate', $business->id) }} --}}
                                        <form action="" method="POST">
                                          {{--   @csrf
                                            @method('PUT') --}}
                                            <div class="mb-3">
                                                <label for="regionName" class="form-label">Region Name</label>
                                                <input type="text" class="form-control" id="regionName" name="regionName"
                                                    placeholder="Enter region name" value="{{ $business->zone }}" required>
                                            </div>

                                            <div class="mb-3">
                                                <label for="stateName" class="form-label">State's Name</label>
                                                <input type="text" class="form-control" id="stateName" name="stateName"
                                                    placeholder="Enter state name" value="{{ $business->state }}" required>
                                            </div>
                                            <button type="submit" class="btn btn-primary">Update Region</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
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
    });
</script>
@endsection