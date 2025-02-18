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
        <h4 class="card-title">Add SEO </h4>
    </div>

    <div class="card-body collapse show"
        style=" overflow-y: scroll; scrollbar-width: thin; scrollbar-color: #888 #f1f1f1;">
        <div class="card-block card-dashboard" id="table-display">
            <table id="data_table_bootstrap" class="table table-striped table-responsive-sm datatable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>title</th>
                        <th>subcat_id</th>
                        <th>sub_title</th>
                        <th>banner</th>
                        <th>description</th>
                        <th>slug</th>
                        <th>alt_tag</th>
                        <th>image_title</th>
                        <th>meta_title</th>
                        <th>meta_description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    @php $n = 0 @endphp
                    @foreach($seoPages as $seo)
                        <tr>
                            <td>{{ ++$n }}</td>
                            <td>{{ Str::limit($seo->title, 20, '...') }}</td>
                            <td>
                                @foreach ($subCategory as $subCat)
                                        @if ($subCat->id == $seo->subcat_id)
                                                {{ Str::limit($subCat->subcategory_name, 20, '...') }}
                                            </td>
                                        @endif
                                @endforeach
                            </td>
                            <td>{{ Str::limit($seo->sub_title, 20, '...') }}</td>
                            <td> <img  src="{{ asset('/storage/app/public/images/seo/' . $seo->banner) }}" alt="seo banner" height="50" width="200" ></td>
                            <td>{{ Str::limit($seo->description, 20, '...') }}</td>
                            <td>{{ Str::limit($seo->slug, 20, '...') }}</td>
                            <td>{{ Str::limit($seo->alt_tag, 20, '...') }}</td>
                            <td>{{ Str::limit($seo->image_title, 20, '...') }}</td>
                            <td>{{ Str::limit($seo->meta_title, 20, '...') }}</td>
                            <td>{{ Str::limit($seo->meta_description, 20, '...') }}</td>

                            <td>
                                @if($seo->status == 1)
                                    <span class="btn btn-raised btn-outline-success round btn-min-width mr-1 mb-1 changeStatus"
                                        data-status="2" data-id="{{ $seo->id }}">Active</span>
                                @else
                                    <span class="btn btn-raised btn-outline-danger round btn-min-width mr-1 mb-1 changeStatus"
                                        data-status="1" data-id="{{ $seo->id }}">Deactive</span>
                                @endif

                            </td>
                            <td>
                                <a href="{{ route('admin.seopages.edit', $seo->id) }}" class="text-primary">
                                    <i class="fa fa-edit"></i>
                                </a>
                                <a href="javascript:void(0);" class="danger p-0 text-danger ml-2" 
                                    data-original-title="{{ trans('labels.delete') }}" title="{{ trans('labels.delete') }}"
                                    onclick="do_delete('{{$seo->id}}','{{route('admin.seopages.delete')}}','{{ trans('labels.delete_slider') }}','{{ trans('labels.delete') }}')">
                                    <i class="ft-trash font-medium-3"></i>
                                </a>
                            </td>
                            <td>

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
                    url: '{{route("admin.seopages.changeStatus")}}',
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