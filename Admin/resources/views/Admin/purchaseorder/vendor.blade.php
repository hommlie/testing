@extends('layouts.admin')
@section('title')
    
@endsection
@section('css')
<link rel="stylesheet" href="{{asset('storage/app/public/Adminassets/css/dataTables.bootstrap4.css')}}">
@endsection
@section('content')
    <div class="">
        @if(Session::has('success'))
        <div class="alert alert-success">
            {{ Session::get('success') }}
            @php
                Session::forget('success');
            @endphp
        </div>
        @endif

        @if(Session::has('danger'))
        <div class="alert alert-danger">
            {{ Session::get('danger') }}
            @php
                Session::forget('danger');
            @endphp
        </div>
        @endif
        <section id="configuration">
            <div class="row">
                <div class="col-12">
                    @if(Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                        @php
                            Session::forget('success');
                        @endphp
                    </div>
                    @endif
                    <div class="card">                       
                        <div class="card-header">
                            <h4 class="card-title">{{ trans('Purchase Order Vendors') }}</h4>
                            <a href="{{route('admin.purchaseorder.addvendor')}}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
                                {{ trans('Add Vendor') }}
                            </a>
                            <a href="{{route('admin.purchaseorder.add')}}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
                                {{ trans('Send Purchase Order') }}
                            </a>
                        </div>
                        
                        <div class="card-body collapse show">
                            <div class="card-block card-dashboard" id="table-display">
                                    @include('admin.purchaseorder.vendortable')
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </div>


@endsection

@section('scripttop')
@endsection
@section('scripts')
<script src="{{asset('storage/app/public/Adminassets/js/dataTables.js')}}"></script>
<script src="{{asset('storage/app/public/Adminassets/js/dataTables.bootstrap4.js')}}"></script>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
<!-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> -->

<script type="text/javascript">
    // Data Table Script
    new DataTable('#data_table_bootstrap');
    // Ends


    $(document).ready(function() {

        $('.active-btn').on('click', function(e) {
        e.preventDefault();
        var id = $(this).data('id');
        
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Deactivate it!',
            cancelButtonText: 'Cancel', // Set custom text for the cancel button
            showCloseButton: true, // Show close button
          
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '{{ route("admin.quotation.delete") }}',
                    type: 'POST',
                    data: {
                        id: id,
                        _token: '{{ csrf_token() }}'
                    },
                    success: function(response) {
                        if(response.success) {
                            Swal.fire(
                                'Deactivated!',
                                'Your record has been Deactivated.',
                                'success'
                            );
                            // Update the view or perform any necessary actions
                            location.reload(); // For example, reload the page
                        } else {
                            Swal.fire(
                                'Error!',
                                'Failed to Deactive record.',
                                'error'
                            );
                        }
                    },
                    error: function(xhr, status, error) {
                        Swal.fire(
                            'Error!',
                            'Failed to Deactivate record.',
                            'error'
                        );
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your action has been cancelled.',
                    'error'
                );
            }
        });
    });


    $('.deactive-btn').on('click', function(e) {
        e.preventDefault();
        var id = $(this).data('id');
        
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Active it!',
            cancelButtonText: 'Cancel', // Set custom text for the cancel button
            showCloseButton: true, // Show close button
          
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '{{ route("admin.quotation.deactive") }}',
                    type: 'POST',
                    data: {
                        id: id,
                        _token: '{{ csrf_token() }}'
                    },
                    success: function(response) {
                        if(response.success) {
                            Swal.fire(
                                'Activated!',
                                'Your record has been Activated.',
                                'success'
                            );
                            // Update the view or perform any necessary actions
                            location.reload(); // For example, reload the page
                        } else {
                            Swal.fire(
                                'Error!',
                                'Failed to Activate record.',
                                'error'
                            );
                        }
                    },
                    error: function(xhr, status, error) {
                        Swal.fire(
                            'Error!',
                            'Failed to Activate record.',
                            'error'
                        );
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your action has been cancelled.',
                    'error'
                );
            }
        });
    });

});

        

</script>
@endsection