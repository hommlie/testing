@extends('layouts.admin')

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
        <h4 class="card-title">Add SEO</h4>
    </div>

    <div class="card-body" style="overflow-y: auto;">
        <div class="table-responsive">
            <table id="data_table_bootstrap" class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Subcategory</th>
                        <th>Subtitle</th>
                        <th>Banner</th>
                        <th>Description</th>
                        <th>Slug</th>
                        <th>Alt Tag</th>
                        <th>Image Title</th>
                        <th>Meta Title</th>
                        <th>Meta Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    @php $n = 0 @endphp
                    @foreach($seoPages as $seo)
                        <tr>
                            <td>{{ ++$n }}</td>
                             <td>{{ $seo->id }}</td>
                            <td>{{ Str::limit($seo->title, 20, '...') }}</td>
                            <td>
                                @foreach ($subCategory as $subCat)
                                    @if ($subCat->id == $seo->subcat_id)
                                        {{ Str::limit($subCat->subcategory_name, 20, '...') }}
                                    @endif
                                @endforeach
                            </td>
                            <td>{{ Str::limit($seo->sub_title, 20, '...') }}</td>
                            <td>
                                <img src="{{ asset('/storage/app/public/images/seo/' . $seo->banner) }}" 
                                     alt="seo banner" height="50" width="200">
                            </td>
                            <td>{{ Str::limit($seo->description, 20, '...') }}</td>
                            <td>{{ Str::limit($seo->slug, 20, '...') }}</td>
                            <td>{{ Str::limit($seo->alt_tag, 20, '...') }}</td>
                            <td>{{ Str::limit($seo->image_title, 20, '...') }}</td>
                            <td>{{ Str::limit($seo->meta_title, 20, '...') }}</td>
                            <td>{{ Str::limit($seo->meta_description, 20, '...') }}</td>

                            <td>
                                @if($seo->status == 1)
                                    <span class="btn btn-outline-success changeStatus" data-status="2" data-id="{{ $seo->id }}">
                                        Active
                                    </span>
                                @else
                                    <span class="btn btn-outline-danger changeStatus" data-status="1" data-id="{{ $seo->id }}">
                                        Deactive
                                    </span>
                                @endif
                            </td>
                            <td>
                                <a href="{{ route('admin.seopages.edit', $seo->id) }}" class="text-primary">
                                    <i class="fa fa-edit"></i>
                                </a>
                                <a href="javascript:void(0);" class="text-danger ml-2" 
                                   onclick="do_delete('{{ $seo->id }}', '{{ route('admin.seopages.delete') }}')">
                                    <i class="fa fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Include Required Scripts -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap4.min.js"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.5/css/dataTables.bootstrap4.min.css">

<script>
    $(document).ready(function () {
        $('#data_table_bootstrap').DataTable({
            "paging": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "pageLength": 10,
        });
    });

    // Change Status Function
    $('body').on('click', '.changeStatus', function () {
        let status = $(this).data('status');
        let id = $(this).data('id');

        Swal.fire({
            title: "Are you sure?",
            text: "You are about to change the status.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: '{{ route("admin.seopages.changeStatus") }}',
                    type: "POST",
                    data: { id: id, status: status },
                    success: function (response) {
                        Swal.fire("Success!", "Status changed successfully.", "success");
                        location.reload();
                    },
                    error: function (error) {
                        Swal.fire("Error!", "Something went wrong.", "error");
                    }
                });
            }
        });
    });

    // Delete Function
    function do_delete(id, url) {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: url,
                    type: "POST",
                    data: { id: id },
                    success: function (response) {
                        Swal.fire("Deleted!", "The record has been deleted.", "success");
                        location.reload();
                    },
                    error: function (error) {
                        Swal.fire("Error!", "Something went wrong.", "error");
                    }
                });
            }
        });
    }
</script>

@endsection
