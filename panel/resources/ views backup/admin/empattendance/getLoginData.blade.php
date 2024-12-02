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
                            <h4 class="card-title">{{ trans('Login History') }}</h4>
                            <form action="{{ route('admin.empattendance.getLoginData') }}" method="post" class="float-right">
                                @csrf
                                <div class="d-flex">
                                    <select name="employee" required class="form-control mr-2" id="" style="height: 40px;">
                                        <option value="">-Employee-</option>
                                        @foreach ($employees as $employee)
                                            @if (!empty($employee->emp_name))
                                                <option value="{{ $employee->id }}">{{ $employee->emp_name }}</option>
                                            @endif
                                        @endforeach
                                    </select>
                                    <input type="date" required name="date" class="form-control mr-2" id="" style="height: 40px;">
                                    <input type="submit" name="submit" class="btn btn-raised btn-primary" id="" style="height: 40px;">
                                </div>
                            </form>

                            <!-- <a href="{{route('admin.testimonials.add')}}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
                                {{ trans('View All') }}
                            </a> -->
                            <!-- <a href="{{route('admin.testimonials.add')}}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
                                {{ trans('Verify Attendance') }}
                            </a> -->
                        </div>
                        
                        <div class="card-body collapse show">
                            
                            <div class="card-block card-dashboard" id="table-display">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Employee Name</th>
                                            <th>Total Time Spent</th>
                                            <th>Total Distance Travelled</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{{ $selectedEmployeeName }}</td>
                                            <td>{{ $totalTimeSpentFormatted }}</td>
                                            <td>{{ $totalDistanceTraveled }}Mts</td>
                                            <td>
                                                <form action="{{ route('admin.empattendance.VerifyAttendance') }}" method="post">
                                                    @csrf
                                                    <input type="hidden" name="totaltime" value="{{ $totalTimeSpentFormatted }}" id="">
                                                    <input type="hidden" name="totaldistance" value="{{ $totalDistanceTraveled }}" id="">
                                                    <input type="hidden" name="employee" value="{{ $selectedEmployeeName }}" id="">
                                                    <input type="hidden" name="employeeId" value="{{ $selectedEmployeeId }}" id="">
                                                    <input type="hidden" name="date" value="{{ $requestedDate }}" id="">
                                                    @if ($verificationStatus == 1)
                                                        @if ($totalTimeSpentFormatted != '00:00:00')
                                                            <input type="submit" name="submit" value="Verify" class="btn btn-outline-success" onclick="return confirm('Once Verified, it cannot be modified again. Are you sure you want to continue?');" id="">
                                                        @else
                                                            <input type="submit" name="" class="btn btn-success" disabled value="Unable to Verify" style="cursor: no-drop;" id="">
                                                        @endif
                                                    @else
                                                        <input type="submit" name="" class="btn btn-success" disabled value="Already Verified" id="">
                                                    @endif

                                                    
                                                </form>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br>
                                <table id="data_table_bootstrap" class="table table-striped table-bordered zero-configuration">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>{{ trans('Employee') }}</th>
                                            <th>{{ trans('Login At') }}</th>
                                            <th>{{ trans('Logout At') }}</th>
                                            <th>{{ trans('Distance Travelled') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody> 
                                        @php $n=0 @endphp
                                        @foreach($empAttendance as $row)
                                        <tr>
                                            <td>{{ ++$n }}</td>
                                            <td> {{$row->emp_name}}</td>
                                            <td> {{$row->login_at}}</td>
                                            <td> {{$row->logout_at ? $row->logout_at : 'NULL'}}</td>
                                            <td> {{$row->distance_travelled ? $row->distance_travelled : 'NULL'}}</td>


                                        </tr>
                                        @endforeach
                                </tbody>
                                </table>
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
                    url: '{{ route("admin.testimonials.delete") }}',
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
                    url: '{{ route("admin.testimonials.deactive") }}',
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