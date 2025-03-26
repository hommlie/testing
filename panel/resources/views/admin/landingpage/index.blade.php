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
<div class="modal fade" id="comingSoonModal" tabindex="-1" role="dialog" aria-labelledby="comingSoonModalLabel"
    aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
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
    <div class="card-body collapse show"
        style="overflow-x: auto; white-space: nowrap; max-width: 100%; scrollbar-width: none; -ms-overflow-style: none;">
        <div class="card-block card-dashboard" id="table-display">
            <table id="data_table_bootstrap" class="table table-striped table-responsive-sm datatable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Sub Title</th>
                        <th>Hero Image</th>
                        <th>Banner</th>
                        <th>Categories</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @php $n = 0; @endphp

                    @foreach ($datas as $data)
                    
                        <tr>
                            <td>{{ ++$n }}</td>
                            <td>{{ Str::words($data->title, 5, '...') }}</td>
                            <td>{{ Str::words($data->sub_title, 5, '...') }}</td>
                            <td class="text-center">
                                @if ($data->hero_image)
                                    <img src="{{ asset('/storage/app/public/images/landing/'. $data->hero_image) }}" width="50" height="50">
                                @else
                                    No Image
                                @endif
                            </td>
                            <td class="text-center">
                                @if ($data->banner)
                                    <img src="{{ asset('/storage/app/public/images/landing/'. $data->banner) }}" width="50" height="50">
                                @else
                                    No Image
                                @endif
                            </td>
                            <td>
                                @foreach ($categories as $category)
                                    @if ($category->id == $data->cat_id)
                                        {{ $category->category_name  }}
                                    @endif
                                @endforeach
                            </td>
                            <td>
                                    @if($data->status == 1)
                                        <span class="btn btn-raised btn-outline-success round btn-min-width mr-1 mb-1 changeStatus"
                                            data-status="2" data-id="{{ $data->id }}">Active</span>
                                    @else
                                        <span class="btn btn-raised btn-outline-danger round btn-min-width mr-1 mb-1 changeStatus"
                                            data-status="1" data-id="{{ $data->id }}">Deactive</span>
                                    @endif

                                </td>
                            <td>
                                <a href="{{route('admin.landingpage.edit',$data->id)}}" class="btn text-primary"><i class="fa fa-pencil-alt"></i></a>
                                <a href="javascript:void(0);" class="danger p-0 text-danger ml-2" 
                                    data-original-title="{{ trans('labels.delete') }}" title="{{ trans('labels.delete') }}"
                                    onclick="do_delete('{{$data->id}}','{{route('admin.landingpage.delete')}}','{{ trans('labels.delete') }}')">
                                    <i class="ft-trash font-medium-3"></i>
                                </a>
                            </td>

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
            "pageLength": 10,
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


    function do_delete(id, page_name, name, titles) {
        Swal.fire({
            title: '{{ trans('labels.are_you_sure') }}',
            text: "{{ trans('labels.delete_text') }} " + name + "!",
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
                    url: page_name,
                    type: "POST",
                    data: { 'id': id },

                    success: function (data) {
                        $('#preloader').hide();
                        if (data == 1000) {
                            $('#del-' + id).remove();
                            Swal.fire({ type: 'success', title: '{{ trans('labels.success') }}', showConfirmButton: false, timer: 1500 });
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


    }

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
                    url: '{{route("admin.landingpage.changeStatus")}}',
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


</script>
@endsection