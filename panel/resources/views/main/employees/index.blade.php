@extends('layouts.admin')
@section('title')
    
@endsection
@section('css')
<!-- <link rel="stylesheet" href="{{asset('storage/app/public/Adminassets/css/dataTables.bootstrap4.css')}}"> -->
<link rel="stylesheet" href="https://cdn.datatables.net/2.1.4/css/dataTables.dataTables.css">
<link rel="stylesheet" href="https://cdn.datatables.net/buttons/3.1.1/css/buttons.dataTables.css">
<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">



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
                            <h4 class="card-title">{{ trans('Employees') }}</h4>
                            <a href="{{route('admin.employees.add')}}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
                                {{ trans('Add Employees') }}
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
                                    <a href="employees" class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_reset">Reset Filter</a>
                                </div>

                                <div id="custom_date_filter" style="display:none;">
                                    <label for="start_date">Start Date:</label>
                                    <input type="date" id="start_date">
                                    <label for="end_date">End Date:</label>
                                    <input type="date" id="end_date">
                                    <button class="btn btn-raised btn-outline-success round btn-min-width" id="apply_custom_date">Apply</button>
                                </div>
                                <br>


                                    @include('admin.employees.employeestable')


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




<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

<script type="text/javascript">
    $(document).ready(function() {

        $(document).ready(function() {
    $(document).on('click', '.editbtn', function() {
        var emp_id = $(this).val();
        $('#emp_id').val(emp_id); // Set the hidden emp_id input in the form

        $('#EmployeeAssignModal').modal('show');

        $.ajax({
            type: 'GET',
            url: 'getassignemployee/' + emp_id,
            success: function(response) {
                var roleSelect = $('#role');
                var locationSelect = $('#location');
                var timeslotSelect = $('#timeslot');
                var emp_categoryContainer = $('#emp_category_container');

                // Clear existing options and checkboxes
                roleSelect.empty();
                locationSelect.empty();
                timeslotSelect.empty();
                emp_categoryContainer.empty();  // Clear the category checkboxes

                // Append default options
                roleSelect.append($('<option>', { value: '', text: '--Select Role--' }));
                locationSelect.append($('<option>', { value: '', text: '--Select Location--' }));
                timeslotSelect.append($('<option>', { value: '', text: '--Select Timeslot--' }));

                // Populate role options
                $.each(response.roles, function(index, role) {
                    roleSelect.append($('<option>', { value: role.id, text: role.label }));
                });

                // Populate location options
                $.each(response.location, function(index, location) {
                    locationSelect.append($('<option>', { value: location.id, text: location.name }));
                });

                // Populate timeslot options
                $.each(response.timeslot, function(index, timeslot) {
                    var timeslotLabel = timeslot.name + " (" + timeslot.starttime + " - " + timeslot.endtime + ")";
                    timeslotSelect.append($('<option>', { value: timeslot.id, text: timeslotLabel }));
                });

                // Create a row to hold the columns
                var row = $('<div>').addClass('row');

                // Populate category checkboxes in two columns
                $.each(response.category, function(index, category) {
                    // Create a checkbox for each category
                    var checkbox = $('<div>').addClass('form-check');
                    var input = $('<input>').attr({
                        type: 'checkbox',
                        name: 'emp_category[]', // Allow multiple selections
                        value: category.id,
                        class: 'form-check-input',
                        id: 'category_' + category.id
                    });
                    var label = $('<label>').attr('for', 'category_' + category.id).addClass('form-check-label').text(category.category_name);

                    // Append the checkbox and label to the form-check div
                    checkbox.append(input).append(label);

                    // Create a column to contain the checkbox and append it to the row
                    var column = $('<div>').addClass('col-md-6 mb-2'); // Each column takes up half the width (6 out of 12)
                    column.append(checkbox);
                    
                    // Append the column to the row
                    row.append(column);
                });

                // Append the row to the container
                emp_categoryContainer.append(row);

                // Set selected values if available
                if (response.emp.role) {
                    roleSelect.val(response.emp.role);
                }
                if (response.emp.location) {
                    locationSelect.val(response.emp.location);
                }
                if (response.emp.timeslot) {
                    timeslotSelect.val(response.emp.timeslot);
                }

                // Handle selected categories (assuming you are receiving selected categories in the response)
                if (response.emp.emp_category) {
                    var selectedCategories = response.emp.emp_category.split(','); // Assuming it’s a comma-separated string
                    $.each(selectedCategories, function(index, value) {
                        $('#category_' + value).prop('checked', true); // Check the checkbox for the selected category
                    });
                }
            }
        });


    });

    $('#change_password_for').on('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        var emp_id = $('#emp_id').val();
        var formData = $(this).serialize();

        $.ajax({
            type: 'PUT',
            url: 'employee/assign/' + emp_id,
            data: formData,
            success: function(response) {
                if (response.status === 200) {
                    alert('Record updated successfully');
                    $('#EmployeeAssignModal').modal('hide');
                    location.reload(); // Reload the page to see the changes
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function(xhr) {
                alert('Error: ' + xhr.responseText);
            }
        });
    });
});





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
                    url: '{{ route("admin.employees.delete") }}',
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
                    url: '{{ route("admin.employees.deactive") }}',
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