@extends('layouts.admin')

@section('content')

    <link rel="stylesheet" href="{{ asset('storage/app/public/Adminassets/css/dataTables.bootstrap4.css') }}">
    <style>
        .tooltip-inner {
            max-width: 500px;
        }
        .table-wrapper {
            display: flex;
        }
        .fixed-column {
            width: 200px; /* Adjust the width according to your needs */
        }
        .scrollable-table {
            overflow-x: auto;
            width: calc(100% - 200px); /* Subtract the width of the fixed column */
        }
        .scrollable-table table {
            width: 100%;
        }
        .table-fixed {
            position: relative;
            display: flex;
            flex-direction: column;
            min-width: 100%;
        }
        .table-fixed thead, .table-fixed tbody, .table-fixed tfoot {
            display: block;
        }
        .table-fixed tbody {
            overflow-y: scroll;
            /* max-height: 300px; Adjust based on your requirements */
        }
        .table-fixed th, .table-fixed td {
            min-width: 100px; /* Adjust based on your requirements */
            white-space: nowrap;
        }
        .table-fixed thead th {
            position: sticky;
            top: 0;
            z-index: 1;
            background: #f8f9fa;
        }
        .emp-id-column {
            display: none; /* Initially hide the Employee ID column */
        }

        .dispatched-bg{
            background-color: #8E44AD; 
        }
        .onsite-bg{
            background-color: #3498DB;
        }
        .completed-bg{
            background-color: #28A745 ;
        }
        .scheduled-bg{
            background-color: #F39C12;
        }
        .incomplete-bg{
            background-color: #FF5733;
        }


        /* width */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: white; 
  border-radius: 10px;
  border:2px solid #5ced73
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: green; 
}

    .active-row {
        background-color: white !important; /* Background color for active row */
    }

    .inactive-cell {
        background-color: #afbdb3 !important; /* Background color for inactive cells */
        color: white; /* Optional: text color for better readability */
    }



    </style>


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
                <div class="col-12 m-0 p-0">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ trans('Gantt') }}</h4>
                        </div>
                        <div class="card-body collapse show px-1">
                            <div class="d-flex bg-navy p-1">
                                <div class="py-auto">
                                    <form class="d-flex" method="get">
                                        <label for="" class="text-dark">Date</label>
                                        <input type="date" name="from_date" class="form-control-xs" id="from_date" min="{{ date('Y-m-d') }}" />
                                        <input type="date" name="to_date" class="form-control-xs" id="to_date" min="{{ date('Y-m-d') }}" />
                                        <input type="submit"  class="btn btn-xs btn-warning" value="view" id="view_date_btn">
                                    </form>
                                </div> &emsp;
                                <form action="" method="get">
                                    <div class="d-flex">
                                        <label for="" class="text-dark">Show</label>
                                        <select name="job" id="job_filter" class="form-control-xs">
                                            <option value="">All Jobs</option>
                                            <option value="4"  >Completed Jobs</option>
                                            <option value="5">InComplete Jobs</option>
                                            <option value="3">OnSite Jobs</option>
                                            <option value="2">Dispatched Jobs</option>
                                            <option value="1">Scheduled Jobs</option>
                                        </select>
                                        <input type="submit" class="btn btn-xs btn-warning" value="view" id="view_technician_btn">
                                    </div>
                                </form> &emsp;
                                <!-- <div class="d-flex">
                                    <label for="" class="text-light">For</label>
                                    <select name="show" id="technician_filter" class="form-control-xs">
                                        <option value="Active Technicians">Active Technicians</option>
                                        <option value="InActive Technicians">InActive Technicians</option>
                                    </select>
                                    <input type="submit" name="submit" class="btn btn-xs btn-warning" value="view" id="view_technician_btn">
                                </div> -->
                            </div>
                            <div class="d-flex">
                                <div style="width: 15px;height:15px;" class="scheduled-bg rounded-circle m-1"></div><span class="">Scheduled </span>&emsp;
                                <div style="width: 15px;height:15px;" class="dispatched-bg rounded-circle m-1"></div><span class="">Dispatched </span>&emsp;
                                <div style="width: 15px;height:15px;" class="onsite-bg rounded-circle m-1"></div><span class="">On-Site </span>&emsp;
                                <div style="width: 15px;height:15px;" class="completed-bg rounded-circle m-1"></div><span class="">Completed </span>&emsp;
                               
                                <div style="width: 15px;height:15px;" class="incomplete-bg rounded-circle m-1"></div><span class="">Incomplete </span>&emsp;
                            </div>
                            <div class="text-center bg-secondary">
                                <b class="text-light">{{ \Carbon\Carbon::today()->format('d-m-Y') }} <?php 
                                if (isset($_GET['job']) && $_GET['job'] != ''){ 
                                    if($_GET['job']==1){
                                        echo " - Scheduled Jobs";
                                    }elseif($_GET['job']==2){
                                        echo " - Dispatched Jobs";
                                    }elseif($_GET['job']==3){
                                        echo " - On-Site Jobs";
                                    }elseif($_GET['job']==4){
                                        echo " - Completed Jobs";
                                    }elseif($_GET['job']==5){
                                        echo " - InComplete Jobs";
                                    }
                                    
                                } ?></b>
                            </div>
                            <div class="table-wrapper">
                                <div class="fixed-column">
                                    <table class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th class="p-1">Resource <small id="toggle-sbc" style="cursor:pointer;text-decoration:underline">(Show SC)</small></th>
                                                <th class="p-1 emp-id-column">SC</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        @foreach ($data as $employee)
                                            <tr>
                                                <td class="p-1 d-flex">
                                                    <div style="width: 10px;height:10px;" class="bg-success rounded-circle m-1"></div>
                                                    <a data-toggle="modal" data-target="#GanttModal">{{ $employee->emp_name }}</a>
                                                </td>
                                                <td class="p-1 emp-id-column">
                                                    @if ($employee->location)
                                                        {{ $employee->location }}
                                                    @else
                                                        N/A
                                                    @endif
                                                </td>
                                            </tr>
                                        @endforeach

                                        </tbody>
                                    </table>
                                </div>
                                <div class="scrollable-table">
                                    <div class="table-fixed">
                                        <table class="table table-bordered table-striped" id="jobs_table">
                                            <thead>
                                                <!-- <tr>
                                                    @for ($i = 0; $i < 24; $i++)
                                                        <th class="p-1">{{ sprintf('%02d:00', $i) }} </th>
                                                    @endfor
                                                </tr> -->
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    @for ($i = 0; $i < 24; $i++)
                                                        <th class="p-1">{{ sprintf('%02d:00', $i) }} </th>
                                                    @endfor
                                                </tr>
                                                
                                                @foreach ($data as $employee)
                                                    <tr>
                                                        @for ($i = 0; $i < 24; $i++)
                                                            <td class="p-1">
                                                                @php $showJob = false; @endphp
                                                                @if ($employee->is_active == 1 && \Carbon\Carbon::parse($employee->is_active_at)->format('H') == $i)
                                                                    <a class="btn btn-sm btn-danger p-0 m-0" data-toggle="tooltip" data-placement="top" data-html="true" title="<div style='font-size:10px;text-align:left'>
                                                                        In-Time: <b>{{ $employee->is_active_at }}</b><br>
                                                                        Phone: <b>{{ $employee->device }}</b><br>
                                                                        Battery: <b>{{ $employee->battery }}</b><br>
                                                                    </div>">
                                                                        <i class="fa fa-user"></i> Present
                                                                    </a>
                                                                    @php $showJob = true; @endphp
                                                                @endif
                                                                @foreach ($employee->orders as $order)
                                                                    @if (isset($_GET['job']) && $_GET['job'] != '')
                                                                        @if (\Carbon\Carbon::parse($order->desired_time)->format('H') == $i && $order->order_status == $_GET['job'])
                                                                            @php
                                                                                $orderStatusColor = '';
                                                                                switch ($order->order_status) {
                                                                                    case 1:
                                                                                        $orderStatusColor = 'scheduled-bg'; // Green for scheduled
                                                                                        break;
                                                                                    case 2:
                                                                                        $orderStatusColor = 'dispatched-bg'; // Orange for dispatched
                                                                                        break;
                                                                                    case 3:
                                                                                        $orderStatusColor = 'onsite-bg'; // Blue for onsite
                                                                                        break;
                                                                                    case 4:
                                                                                        $orderStatusColor = 'completed-bg'; // Red for completed
                                                                                        break;
                                                                                    case 5:
                                                                                        $orderStatusColor = 'incomplete-bg'; // Pink for incomplete
                                                                                        break;
                                                                                }
                                                                            @endphp
                                                                            <a class="btn btn-sm {{ $orderStatusColor }} p-0 m-0" data-toggle="tooltip" data-placement="top" data-html="true" title="
                                                                            <div style='font-size:10px;text-align:left;width:500px;color:white'>
                                                                            Time: <b>{{ $order->created_at }}</b><br>
                                                                            Service Type: <b>{{ $order->product_name }}</b><br>
                                                                            <hr>
                                                                            <b>{{ $order->user->name }}</b><br>
                                                                            Address : <b>{{ $order->landmark }}, {{ $order->street_address }}, {{ $order->pincode }}</b>
                                                                            <hr>
                                                                            Order Number: <b>{{ $order->order_number }}</b><br>
                                                                            Status: <b>
                                                                            @php
                                                                            if($order->order_status == 1){ echo "Scheduled"; }
                                                                            elseif($order->order_status == 2){ echo "Dispatched"; }
                                                                            elseif($order->order_status == 3){ echo "On-Site"; }
                                                                            elseif($order->order_status == 4){ echo "Completed"; }
                                                                            elseif($order->order_status == 5){ echo "InComplete"; }
                                                                            @endphp
                                                                            </b>
                                                                            </div>
                                                                            " data-status="{{ $order->order_status }}">
                                                                                {{ $order->user->name }}
                                                                            </a>
                                                                            @php $showJob = true; @endphp
                                                                        @endif
                                                                    @elseif(isset($_GET['job']) && $_GET['job'] == 'all')
                                                                        @if (\Carbon\Carbon::parse($order->desired_time)->format('H') == $i)
                                                                            @php
                                                                                $orderStatusColor = '';
                                                                                switch ($order->order_status) {
                                                                                    case 1:
                                                                                        $orderStatusColor = 'scheduled-bg';
                                                                                        break;
                                                                                    case 2:
                                                                                        $orderStatusColor = 'dispatched-bg';
                                                                                        break;
                                                                                    case 3:
                                                                                        $orderStatusColor = 'onsite-bg';
                                                                                        break;
                                                                                    case 4:
                                                                                        $orderStatusColor = 'completed-bg';
                                                                                        break;
                                                                                    case 5:
                                                                                        $orderStatusColor = 'incomplete-bg';
                                                                                        break;
                                                                                }
                                                                            @endphp
                                                                            <a class="btn btn-sm {{ $orderStatusColor }} p-0 m-0" data-toggle="tooltip" data-placement="top" data-html="true" title="
                                                                            <div style='font-size:10px;text-align:left;width:500px'>
                                                                            Time: <b>{{ $order->created_at }}</b><br>
                                                                            Service Type: <b>{{ $order->product_name }}</b><br>
                                                                            <hr>
                                                                            <b>{{ $order->user->name }}</b><br>
                                                                            Address : <b>{{ $order->landmark }}, {{ $order->street_address }}, {{ $order->pincode }}</b>
                                                                            <hr>
                                                                            Order Number: <b>{{ $order->order_number }}</b><br>
                                                                            Status: <b>
                                                                            @php
                                                                            if($order->order_status == 1){ echo "Scheduled"; }
                                                                            elseif($order->order_status == 2){ echo "Dispatched"; }
                                                                            elseif($order->order_status == 3){ echo "On-Site"; }
                                                                            elseif($order->order_status == 4){ echo "Completed"; }
                                                                            elseif($order->order_status == 5){ echo "InComplete"; }
                                                                            @endphp
                                                                            </b>
                                                                            </div>
                                                                            " data-status="{{ $order->order_status }}">
                                                                                {{ $order->user->name }}
                                                                            </a>
                                                                            @php $showJob = true; @endphp
                                                                        @endif
                                                                    @else
                                                                    @if (\Carbon\Carbon::parse($order->desired_time)->format('H') == $i)
                                                                            @php
                                                                                $orderStatusColor = '';
                                                                                switch ($order->order_status) {
                                                                                    case 1:
                                                                                        $orderStatusColor = 'scheduled-bg'; // Green for scheduled
                                                                                        break;
                                                                                    case 2:
                                                                                        $orderStatusColor = 'dispatched-bg'; // Orange for dispatched
                                                                                        break;
                                                                                    case 3:
                                                                                        $orderStatusColor = 'onsite-bg'; // Blue for onsite
                                                                                        break;
                                                                                    case 4:
                                                                                        $orderStatusColor = 'completed-bg'; // Red for completed
                                                                                        break;
                                                                                    case 5:
                                                                                        $orderStatusColor = 'incomplete-bg'; // Pink for incomplete
                                                                                        break;
                                                                                }
                                                                            @endphp
                                                                            <a class="btn btn-sm {{ $orderStatusColor }} p-0 m-0" data-toggle="tooltip" data-placement="top" data-html="true" title="
                                                                            <div style='font-size:10px;text-align:left;width:500px'>
                                                                            Time: <b>{{ $order->created_at }}</b><br>
                                                                            Service Type: <b>{{ $order->product_name }}</b><br>
                                                                            <hr>
                                                                            <b>{{ $order->user->name }}</b><br>
                                                                            Address : <b>{{ $order->landmark }}, {{ $order->street_address }}, {{ $order->pincode }}</b>
                                                                            <hr>
                                                                            Order Number: <b>{{ $order->order_number }}</b><br>
                                                                            Status: <b>
                                                                            @php
                                                                            if($order->order_status == 1){ echo "Scheduled"; }
                                                                            elseif($order->order_status == 2){ echo "Dispatched"; }
                                                                            elseif($order->order_status == 3){ echo "On-Site"; }
                                                                            elseif($order->order_status == 4){ echo "Completed"; }
                                                                            elseif($order->order_status == 5){ echo "InComplete"; }
                                                                            @endphp
                                                                            </b>
                                                                            </div>
                                                                            " data-status="{{ $order->order_status }}">
                                                                                {{ $order->user->name }}
                                                                            </a>
                                                                            @php $showJob = true; @endphp
                                                                        @endif
                                                                    @endif
                                                                @endforeach
                                                                @if (!$showJob)
                                                                    <span class="d-none">empty</span>
                                                                @endif
                                                            </td>
                                                        @endfor
                                                    </tr>
                                                @endforeach
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    


@endsection

@section('scripts')
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>

    <script src="{{ asset('storage/app/public/Adminassets/js/dataTables.js') }}"></script>
    <script src="{{ asset('storage/app/public/Adminassets/js/dataTables.bootstrap4.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            $('[data-toggle="tooltip"]').tooltip();

            $('#toggle-sbc').click(function() {
                $('.emp-id-column').toggle(); // Toggle the visibility of the Employee ID column
                $(this).text(function(i, text) {
                    return text === "Show SBC" ? "Hide SBC" : "Show SBC";
                });
            });

            var today = new Date().toISOString().slice(0, 10);

            // Set today's date as default for both date fields
            $('input[name="from_date"]').val(today);
            $('input[name="to_date"]').val(today);

            // Update to_date when from_date changes
            $('input[name="from_date"]').on('change', function() {
                var fromDate = $(this).val();
                $('input[name="to_date"]').val(fromDate);
            });

            // Filter jobs based on selected type
            //$('#job_filter').on('change', function() {
              //  var selectedJobType = $(this).val();
               // alert(selectedJobType);
               // var jobTypeText = $(this).find("option:selected").text();
               // $('#selected-job-type').text(' - ' + jobTypeText);
            //});
        });
    </script>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const rows = document.querySelectorAll('table#jobs_table tbody tr');

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            let active = false;

            cells.forEach((cell, index) => {
                if (cell.querySelector('.btn-danger')) {
                    active = true;
                }
                if (active) {
                    cell.classList.remove('inactive-cell');
                } else {
                    cell.classList.add('inactive-cell');
                }
            });
        });
    });
</script>

@endsection
