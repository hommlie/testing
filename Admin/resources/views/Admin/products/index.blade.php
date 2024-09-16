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
                            <h4 class="card-title">{{ trans('labels.products') }}</h4>
                            <a href="{{route('admin.products.add')}}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
                                {{ trans('labels.add_product') }}
                            </a>
                        </div>

                        
                        <div class="card-body collapse show">
                            <div class="card-block card-dashboard" id="table-display">
                                <div id="filter_buttons" class="d-flex align-items-center">
                                    <small style="font-size:20px;" class="mr-3">Filter :</small>
                                    <button class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_day">This Day</button>
                                    <button class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_week">This Week</button>
                                    <button class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_month">This Month</button>
                                    <button class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_custom">Custom Date</button>
                                    <a href="product" class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_reset">Reset Filter</a>
                                </div>

                                <div id="custom_date_filter" style="display:none;">
                                    <label for="start_date">Start Date:</label>
                                    <input type="date" id="start_date">
                                    <label for="end_date">End Date:</label>
                                    <input type="date" id="end_date">
                                    <button class="btn btn-raised btn-outline-success round btn-min-width" id="apply_custom_date">Apply</button>
                                </div>
                                <br>
                                    @include('admin.products.productstable')
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

<script type="text/javascript">

    
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    function CategoryTable() {
        $('#preloader').show();
        $.ajax({
            url:"{{ route('admin.products.list') }}",
            method:'get',
            success:function(data){
                $('#preloader').hide();
                $('#table-display').html(data);
                $(".zero-configuration").DataTable({
                  aaSorting: [[0, 'DESC']]
                })
            }
        });
    }

    function do_delete(id,page_name,name,titles)
    {
        Swal.fire({
            title: '{{ trans('labels.are_you_sure') }}',
            text: "{{ trans('labels.delete_text') }} "+name+"!",
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
                    url: page_name,
                    type: "POST",
                    data : {'id':id},

                    success:function(data)
                    { 
                        $('#preloader').hide();
                        if(data == 1000)
                        {
                            $('#del-'+id).remove();
                            Swal.fire({type: 'success',title: '{{ trans('labels.success') }}',showConfirmButton: false,timer: 1500});    
                        }
                        else
                        {
                            Swal.fire({type: 'error',title: '{{ trans('labels.cancelled') }}',showConfirmButton: false,timer: 1500});
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

    }
    
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
                    url: '{{route("admin.products.changeStatus")}}',
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