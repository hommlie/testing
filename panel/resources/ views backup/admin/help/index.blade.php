@extends('layouts.admin')
@section('title')
    
@endsection
@section('css')
<link rel="stylesheet" href="{{asset('storage/app/public/Adminassets/css/dataTables.bootstrap4.css')}}">

@endsection
@section('content')
    <div class="">
        <section id="striped-light">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Help</h4>
                        </div>
                        <div class="card-body">
                            <div class="card-block">
                                <div id="filter_buttons" class="d-flex align-items-center">
                                    <small style="font-size:20px;" class="mr-3">Filter :</small>
                                    <button class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_day">This Day</button>
                                    <button class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_week">This Week</button>
                                    <button class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_month">This Month</button>
                                    <button class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_custom">Custom Date</button>
                                    <a href="help" class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_reset">Reset Filter</a>
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
                                            <th>Sno</th>
                                            <th>Username</th>
                                            <th>Contact Info.</th>
                                            <th>Subject</th>
                                            <th>Message</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @php $n=1 @endphp
                                        @forelse($data as $row)
                                        <tr>
                                            <th class="d-none"></th>
                                            <td>{{ $n++ }}</td>
                                            <td>{{$row->first_name}} {{$row->last_name}}</td>
                                            <td>{{$row->mobile}} <br><br> {{$row->email}} </td>
                                            <td>{{$row->subject}}</td>
                                            <td>{{$row->message}}</td>
                                            <td>{{ \Carbon\Carbon::parse($row->created_at)->format('Y-m-d') }}</td>
                                        </tr>
                                        @empty
                                        @endforelse
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

<!-- Modal Add Review-->
<div class="modal fade text-left" id="PayNow" tabindex="-1" role="dialog" aria-labelledby="RditProduct"
aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <label class="modal-title text-text-bold-600" id="RditProduct">Add Review</label>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div id="errorr" style="color: red;"></div>
      
      <form method="post" action="{{ route('admin.payout.update') }}" method="post">
      {{csrf_field()}}
        <div class="modal-body">

            <table class="table table-striped mar-no">
              <tbody>
              <tr>
                  <td>Bank name</td>
                  <td id="bank_name"></td>
              </tr>
              <tr>
                  <td>Account type</td>
                  <td id="account_type"></td>
              </tr>
              <tr>
                  <td>Account number</td>
                  <td id="account_number"></td>
              </tr>
              <tr>
                  <td>Routing number</td>
                  <td id="routing_number"></td>
              </tr>
              </tbody>
          </table>

          <label>Request ID </label>
          <div class="form-group">
            <input type="text" class="form-control" name="request_id" id="request_id" readonly="">
          </div>

          <label>Vendor Name </label>
          <div class="form-group">
            <input type="text" class="form-control" name="vendor_name" id="vendor_name" readonly="">
            <input type="hidden" class="form-control" name="vendor_id" id="vendor_id" readonly="">
          </div>

          <label>Payable amount </label>
          <div class="form-group">
            <input type="text" class="form-control" name="pay_amount" id="pay_amount" readonly="">
          </div>

          <label>Payment method </label>
          <div class="form-group">
            <select class="form-control" name="payment_method" required>
                <option value="">Select payment method</option>
                <option value="cash">cash</option>
                <option value="bank">Bank payment</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <input type="submit" class="btn btn-raised btn-primary" value="Submit">
        </div>
      </form>
    </div>
  </div>
</div>
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

    $(document).ready(function(){
       $(".pay-now").click(function(){ // Click to only happen on announce links

         $("#request_id").val($(this).attr('data-request-id'));
         $("#vendor_name").val($(this).attr('data-vendor-name'));
         $("#vendor_id").val($(this).attr('data-vendor-id'));
         $("#pay_amount").val($(this).attr('data-amount'));
         $("#bank_name").text($(this).attr('data-bank-name'));
         $("#account_type").text($(this).attr('data-account-type'));
         $("#account_number").text($(this).attr('data-account-number'));
         $("#routing_number").text($(this).attr('data-routing-number'));
         $('#PayNow').modal('show');
       });
    });
</script>
@endsection
