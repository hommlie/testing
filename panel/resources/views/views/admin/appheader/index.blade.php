@extends('layouts.admin')
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>

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
        <h4 class="card-title">App Header</h4>
    </div>
    @if ($errors->has('error'))
        <div class="alert alert-danger">
            {{ $errors->first('error') }}
        </div>
    @endif

    <div class="card-body collapse show">
        <div class="card-block card-dashboard" id="table-display">
            <table class="table table-bordered">

                <thead>
                    <tr>
                        <th>Background Color</th>
                        <th>Text Color</th>
                        <th>Sub text Color</th>
                        <th>Image</th>
                        <th>Status</th>

                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    @forelse ($appHeaderData as $header)

                                        @php
                                            $id = $header->id;
                                         @endphp
                                        <tr>
                                        <tr>
                                            <td> @php
                                                if ($id == 1) {
                                                    echo "<h5 class='text-success '><b>App Header</b></h5>";
                                                } elseif ($id == 2) {
                                                    echo "<h5  class='text-success '><b>Shop Header</b></h5>";
                                                }
                                            @endphp
                                            </td>
                                        </tr>
                                        <td>{{ $header->bg_color }}</td>
                                        <td>{{ $header->text_color }}</td>
                                        <td>{{ $header->sub_text_color }}</td>


                                        <td>
                                            @if ($header->image)
                                                <img src="{{ asset('/storage/app/public/appHeaderImgae/' . $header->image) }}" alt="Image"
                                                    width="300px" height="200px">
                                            @else
                                                N/A
                                            @endif
                                        </td>
                                        <td id="tdstatus{{$header->id}}">
                                            @if($header->status == '1')
                                                <span class="btn btn-raised btn-outline-success round btn-min-width mr-1 mb-1 changeStatus"
                                                    data-status="0" data-id="{{$header->id}}">
                                                    <span class="green-text">{{ trans('labels.active') }}</span>
                                                </span>
                                            @else
                                                <span class="btn btn-raised btn-outline-danger round btn-min-width mr-1 mb-1 changeStatus"
                                                    data-status="1" data-id="{{$header->id}}">
                                                    <span class="red-text">{{ trans('labels.deactive') }}</span>
                                                </span>
                                            @endif
                                        </td>
                                        <td>
                                            <button class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                                data-bs-target="#editModal{{ $header->id }}">
                                                Edit
                                            </button>
                                        </td>
                                        </tr>

                                        <!-- Edit Modal -->
                                        <div class="modal fade" id="editModal{{ $header->id }}" tabindex="-1" role="dialog"
                                            aria-labelledby="editModalLabel" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="editModalLabel">Edit App Header</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <form action="{{ route('admin.appheader.update', $header->id) }}" method="POST"
                                                        enctype="multipart/form-data">
                                                        @csrf
                                                        @method('POST')
                                                        <div class="modal-body">
                                                            <div class="form-group ">
                                                                <label for="bg_color">Background Color</label>
                                                                <input type="color" name="bg_color"
                                                                    class="form-control col-md-2 form-control-color"
                                                                    value="{{ $header->bg_color }}" required>
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="text_color">Text Color</label>
                                                                <input type="color" name="text_color"
                                                                    class="form-control col-md-2 form-control-color"
                                                                    value="{{ $header->text_color }}" required>
                                                            </div>
                                                            <div class="form-group">
                                                                <label for="text_color">Text Sub Color</label>
                                                                <input type="color" name="sub_text_color"
                                                                    class="form-control col-md-2 form-control-color"
                                                                    value="{{ $header->sub_text_color }}" required>
                                                            </div>

                                                            <div class="form-group">
                                                                <label for="image">Image <span class="text-success"
                                                                        style="font-size:12px;">(Accepted formats: jpeg, png, jpg, gif | Max
                                                                        size: 1MB)</span></label>
                                                                <input type="file" name="image" class="form-control">
                                                                @if ($header->image)
                                                                    <img src="{{ asset('/storage/app/public/appHeaderImgae/' . $header->image) }}"
                                                                        alt="Header Image" width="50" class="mt-2">
                                                                @endif
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary"
                                                                data-bs-dismiss="modal">Close</button>
                                                            <button type="submit" class="btn btn-success">Save Changes</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- End of Modal -->
                    @empty
                        <tr>
                            <td colspan="4">No records found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    //Change Status
    $('body').on('click','.changeStatus',function() {
        let status=$(this).attr('data-status');
        let id=$(this).attr('data-id');
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
            if(t.value==true){
                $('#preloader').show();
                $.ajax({
                    headers: {
                      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: '{{route("admin.appheader.changeStatus")}}',
                    type: "POST",
                    data : {'id':id,'status':status},
                    success:function(data)
                    { 
                        $('#preloader').hide();
                        if(data == 1000)
                        {
                            Swal.fire({type: 'success',title: "{{ trans('labels.success') }}",showConfirmButton: false,timer: 1500});    
                            if(status=='1'){
                                $('#tdstatus'+id).html('<span class="btn btn-raised btn-outline-success round btn-min-width mr-1 mb-1 changeStatus" data-status="2"  data-id="'+id+'">{{ trans('labels.active') }}</span>');
                            }else{
                                $('#tdstatus'+id).html('<span class="btn btn-raised btn-outline-danger round btn-min-width mr-1 mb-1 changeStatus" data-status="1"  data-id="'+id+'">{{ trans('labels.deactive') }}</span>');
                            }
                        }
                        else
                        {
                            Swal.fire({type: 'error',title: '{{ trans('labels.cancelled') }}', showConfirmButton: false,timer: 1500});
                        }
                            
                    },error:function(data){
                        $('#preloader').hide();
                        console.log("AJAX error in request: " + JSON.stringify(data, null, 2));
                    }
                });
            }
            else
            {
                Swal.fire({type: 'error',title: '{{ trans('labels.cancelled') }}',showConfirmButton: false,timer: 1500});

            }
        });
    });
</script>
@endsection