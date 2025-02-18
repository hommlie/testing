@extends('layouts.admin')
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap4.min.js"></script>

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
    <div class="card-header d-flex justify-content-between align-items-center">
        <h4 class="card-title">Add Pincode</h4>
    </div>

    <div class="card-body collapse show">
        <div class="card-block card-dashboard" id="table-display">
            <table id="data_table_bootstrap" class="table table-striped table-responsive-sm datatable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Pincode</th>
                        <th>Days</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    @php $n = 0 @endphp
                    @foreach($pincode as $pin)
                        <tr>
                            <td>{{ ++$n }}</td>
                            <td>{{ $pin->pincode }}</td>
                            <td>{{ $pin->days }}</td>
                            <td>{{ $pin->location }}</td>
                            <td>
                                @if($pin->status == 1)
                                    <span class="btn btn-raised btn-outline-success round btn-min-width mr-1 mb-1 changeStatus"
                                        data-status="2" data-id="{{ $pin->id }}">Active</span>
                                @else
                                    <span class="btn btn-raised btn-outline-danger round btn-min-width mr-1 mb-1 changeStatus"
                                        data-status="1" data-id="{{ $pin->id }}">Deactive</span>
                                @endif

                            </td>
                            <td>
                                <a href="{{ route('admin.addpincode.edit', $pin->id) }}" class="text-primary">
                                    <i class="fa fa-edit"></i>
                                </a>

                                <form action="{{ route('admin.addpincode.delete', $pin->id) }}" method="POST"
                                    style="display:inline;">
                                    @csrf
                                    @method('POST')
                                    <button type="submit" class="text-danger btn ml-3">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </form>

                            </td>
                        </tr>
                    @endforeach
                </tbody>

            </table>
        </div>
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    //Change Status
    $('body').on('click', '.changeStatus', function () {
        let status = $(this).attr('data-status');
        let id = $(this).attr('data-id');
        Swal.fire({
            title: '{{ trans('labels.are_you_sure') }}',
            text: "{{ trans('labels.change_status') }}",
            type: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '{{ trans('labels.yes') }}',
            cancelButtonText: '{{ trans('labels.no') }}'
        }).then((t) => {
            if (t.value == true) {
                $('#preloader').show();
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: '{{route("admin.addpincode.changeStatus")}}',
                    type: "POST",
                    data: { 'id': id, 'status': status },   
                    success: function (data) {
                        $('#preloader').hide();
                        if (data == 1000) {
                            Swal.fire({ type: 'success', title: "{{ trans('labels.success') }}", showConfirmButton: false, timer: 1500 });
                            location.reload();
                        }
                        else {
                            Swal.fire({ type: 'error', title: '{{ trans('labels.cancelled') }}', showConfirmButton: false, timer: 1500 });
                        }

                    }, error: function (data) {
                        $('#preloader').hide();
                        console.log("AJAX error in request: " + JSON.stringify(data, null, 2));
                    }
                });
            }
            else {
                Swal.fire({ type: 'error', title: '{{ trans('labels.cancelled') }}', showConfirmButton: false, timer: 1500 });

            }
        });
    });
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