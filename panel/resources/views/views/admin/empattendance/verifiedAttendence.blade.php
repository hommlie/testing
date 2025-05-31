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
                                    <select name="employee" class="form-control mr-2" id="" style="height: 40px;">
                                        <option value="">-Employee-</option>
                                        @foreach ($employees as $employee)
                                            @if (!empty($employee->emp_name))
                                                <option value="{{ $employee->id }}">{{ $employee->emp_name }}</option>
                                            @endif
                                        @endforeach
                                    </select>
                                    <input type="date" name="date" class="form-control mr-2" id="" style="height: 40px;">
                                    <input type="submit" name="submit" class="btn btn-raised btn-primary" id="" style="height: 40px;">
                                </div>
                            </form>

                        </div>
                        
                        <div class="card-body collapse show">
                            <div class="card-block card-dashboard" id="table-display">
                                <div id="filter_buttons" class="d-flex align-items-center">
                                    <small style="font-size:20px;" class="mr-3">Filter :</small>
                                    <button class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_day">This Day</button>
                                    <button class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_week">This Week</button>
                                    <button class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_month">This Month</button>
                                    <button class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_custom">Custom Date</button>
                                    <a href="verifiedAttendence" class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_reset">Reset Filter</a>
                                </div>

                                <div id="custom_date_filter" style="display:none;">
                                    <label for="start_date">Start Date:</label>
                                    <input type="date" id="start_date">
                                    <label for="end_date">End Date:</label>
                                    <input type="date" id="end_date">
                                    <button class="btn btn-raised btn-outline-success round btn-min-width" id="apply_custom_date">Apply</button>
                                </div>
                                <br>

                                <table id="data_table_bootstrap" class="table table-striped table-bordered zero-configuration datatable">
                                    <thead>
                                        <tr>
                                            <th class="d-none"></th>
                                            <th>#</th>
                                            <th>{{ trans('Employee') }}</th>
                                            <th>{{ trans('Date') }}</th>
                                            <th>{{ trans('Total Time') }}</th>
                                            <th>{{ trans('Total Distance') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody> 
                                        @php $n=0 @endphp
                                        @foreach($data as $row)
                                        <tr>
                                            <th class="d-none"></th>
                                            <td>{{ ++$n }}</td>
                                            <td> {{$row->emp_name}}</td>
                                            <td> {{$row->date}}</td>
                                            <td> {{$row->totaltime}}</td>
                                            <td> {{ $row->totaldistance ? number_format($row->totaldistance / 1000, 2) . ' km' : 'NULL' }}</td>
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
<script>
    $(document).ready(function() {
        // Initialize the DataTable
        var table = $('#data_table_bootstrap').DataTable();

        // Get the index of the "Date" column dynamically
        var dateColumnIndex = table.column(':contains(Date)').index();
        console.log("Date column index: " + dateColumnIndex);

        // Log all dates in the table for debugging purposes
        table.rows().every(function(rowIdx, tableLoop, rowLoop) {
            var data = this.data();
            var date = data[dateColumnIndex];
            console.log("Date in Row " + rowIdx + ": " + date);
        });

        // Filter by Day (Today)
        $('#filter_day').on('click', function() {
            resetFilters(); // Reset any existing filters

            // Get today's date in the format YYYY-MM-DD
            var today = new Date().toISOString().split('T')[0];
            console.log("Filtering by today's date: " + today);

            $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
                // Retrieve the date from the table row
                var dateStr = table.cell(dataIndex, dateColumnIndex).node().innerText.trim();

                // Convert date string to Date object (assuming dateStr is in 'YYYY-MM-DD' format)
                var rowDate = new Date(dateStr);
                var formattedRowDate = rowDate.toISOString().split('T')[0];

                // Check if the row date matches today's date
                return formattedRowDate === today;
            });

            table.draw(); // Redraw the table to apply the date filter
        });

        // Filter by Week (Last 7 days)
        $('#filter_week').on('click', function() {
            resetFilters(); // Reset any existing filters
            var today = new Date();
            var startOfWeek = new Date(today.setDate(today.getDate() - 6)); // Last 7 days
            console.log("Filtering by date range from: " + startOfWeek + " to: " + new Date());
            filterByDateRange(startOfWeek, new Date());
        });

        // Filter by Month (Last 30 days)
        $('#filter_month').on('click', function() {
            resetFilters(); // Reset any existing filters
            var today = new Date();
            var startOfMonth = new Date(today.setDate(today.getDate() - 29)); // Last 30 days
            console.log("Filtering by date range from: " + startOfMonth + " to: " + new Date());
            filterByDateRange(startOfMonth, new Date());
        });

        // Show Custom Date Filter
        $('#filter_custom').on('click', function() {
            resetFilters(); // Reset any existing filters
            $('#custom_date_filter').toggle();
        });

        // Apply Custom Date Filter
        $('#apply_custom_date').on('click', function() {
            resetFilters(); // Reset any existing filters
            var startDate = new Date($('#start_date').val());
            var endDate = new Date($('#end_date').val());

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                console.error("Invalid start or end date.");
            } else {
                console.log("Applying custom date filter from: " + startDate + " to: " + endDate);
                filterByDateRange(startDate, endDate);
            }
        });

        // Reset Filter
        $('#filter_reset').on('click', function() {
            resetFilters(); // Reset any existing filters
            $('#custom_date_filter').hide();
        });

        // Function to reset all filters
        function resetFilters() {
            console.log("Resetting all filters.");
            table.columns(dateColumnIndex).search('').draw(); // Clear the date filter
            $.fn.dataTable.ext.search.pop(); // Remove any custom filter functions
        }

        // Function to filter by date range
        function filterByDateRange(startDate, endDate) {
            var formattedStartDate = startDate.toISOString().split('T')[0];
            var formattedEndDate = endDate.toISOString().split('T')[0];
            console.log("Formatted start date: " + formattedStartDate + ", Formatted end date: " + formattedEndDate);

            $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
                // Retrieve the date cell directly from the DOM using row and column index
                var dateStr = table.cell(dataIndex, dateColumnIndex).node().innerText.trim();
                console.log("Date in current row (index " + dataIndex + "): " + dateStr);

                if (!dateStr) {
                    console.error("Invalid date found in row " + dataIndex + ": " + dateStr);
                    return false;
                }

                var rowDate = new Date(dateStr); // Convert date string to Date object
                if (isNaN(rowDate.getTime())) {
                    console.error("Invalid date found in row " + dataIndex + ": " + dateStr);
                    return false; // Skip invalid dates
                }

                console.log("Row date: " + rowDate + " | Start date: " + startDate + " | End date: " + endDate);
                // Compare the row date with the specified range
                return (rowDate >= startDate && rowDate <= endDate);
            });

            table.draw(); // Redraw the table to apply the date filter
        }
    });
</script>

@endsection