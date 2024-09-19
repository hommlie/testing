@extends('layouts.admin')
@section('content')

<div class="card">
    <div class="card-header">
        Inventory
    </div>

    <div class="card-body">
        <div class="table-responsive">
            <div id="filter_buttons" class="d-flex align-items-center">
                <small style="font-size:20px;" class="mr-3">Filter :</small>
                <button class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_day">This Day</button>
                <button class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_week">This Week</button>
                <button class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_month">This Month</button>
                <button class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_custom">Custom Date</button>
                <a href="./inventory" class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_reset">Reset Filter</a>
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
                        <th>{{ trans('Id') }}</th>
                        <th>{{ trans('Category') }}</th>
                        <th>{{ trans('Sub-Category') }}</th>
                        <th>{{ trans('Quantity') }}</th>
                        <th>{{ trans('Type') }}</th>
                        <th>{{ trans('Price') }}</th>
                        <th>{{ trans('Total Price') }}</th>
                        <th>{{ trans('Date') }}</th>
                        <th>{{ trans('Vendor') }}</th>
                        
                        <th>{{ trans('status') }}</th>
                        <th>{{ trans('labels.action') }}</th>
                        <th>{{ trans('assign') }}</th>
                    </tr>
                </thead>
                <tbody> 
                    @php $i=1 @endphp
                    @foreach($data as $row)
                    <tr>
                        <td class="d-none"></td>
                        <td>{{ $i }}</td>
                        <td>{{$row['category']}}</td>
                        <td>{{$row['subCategory']}}</td>
                        <td>{{$row['quantity']}}</td>
                        <td>{{$row['type']}}</td>
                        <td>{{$row['price']}}</td>
                        <td>{{$row['total']}}</td>
                        <td>{{ $row['created_at']->format('Y-m-d') }}</td>
                        <td>{{$row['vendor']}}</td>
                        
                        <td>
                            @if($row['status']==1)
                            <button class="active-btn edit btn btn-sm btn-outline-success" data-id="{{ $row->id }}" title="{{ trans('active') }}" >
                                Active
                            </button>
                            @else
                            <button class="deactive-btn edit btn btn-sm btn-outline-danger" data-id="{{ $row->id }}" title="{{ trans('Inactive') }}" >
                                Deactive
                            </button>
                            @endif
                        </td>
                        <td>
                            <a href="{{ route('admin.inventory.show', $row->id) }}" class="badge badge-success edit" title="{{ trans('labels.edit') }}" data-original-title="{{ trans('labels.edit') }}">
                                Edit
                            </a>
                            <a href="{{ route('admin.inventory.outward', $row->id) }}" class="badge badge-danger Outward" title="{{ trans('Outward') }}" data-original-title="{{ trans('Outward') }}">
                                Outward
                            </a>
                            <a href="{{ route('admin.inventory.inward', $row->id) }}" class="badge badge-success inward" title="{{ trans('inward') }}" data-original-title="{{ trans('inward') }}">
                                Inward
                            </a>
                        </td>
                        <td>
                            <button type="button" value="{{ $row->id }}"  data-toggle="modal"  class="btn editbtn btn-sm btn-outline-success edit" title="{{ trans('Assign') }}" data-original-title="{{ trans('Assign') }}">
                                Assign
                            </button>
                        </td>
                    </tr>
                    @php $i++ @endphp
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection

@section('scripts')
@parent
<script>
    $(document).ready(function() {
    // Initialize the DataTable
    var table = $('#data_table_bootstrap').DataTable();

    // Get the index of the "Date" column dynamically
    var dateColumnIndex = table.column(':contains(Date)').index();

    // Filter by Day (Today)
    $('#filter_day').on('click', function() {
        resetFilters(); // Reset any existing filters
        var today = new Date().toISOString().split('T')[0];
        table.columns(dateColumnIndex).search(today).draw();
    });

    // Filter by Week (Last 7 days)
    $('#filter_week').on('click', function() {
        resetFilters(); // Reset any existing filters
        var today = new Date();
        var startOfWeek = new Date(today.setDate(today.getDate() - 6)); // Last 7 days
        filterByDateRange(startOfWeek, new Date());
    });

    // Filter by Month (Last 30 days)
    $('#filter_month').on('click', function() {
        resetFilters(); // Reset any existing filters
        var today = new Date();
        var startOfMonth = new Date(today.setDate(today.getDate() - 29)); // Last 30 days
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
        filterByDateRange(startDate, endDate);
    });

    // Reset Filter
    $('#filter_reset').on('click', function() {
        resetFilters(); // Reset any existing filters
        $('#custom_date_filter').hide();
    });

    // Function to reset all filters
    function resetFilters() {
        table.columns(dateColumnIndex).search('').draw(); // Clear the date filter
        $.fn.dataTable.ext.search.pop(); // Remove any custom filter functions
    }

    // Function to filter by date range
    function filterByDateRange(startDate, endDate) {
        var formattedStartDate = startDate.toISOString().split('T')[0];
        var formattedEndDate = endDate.toISOString().split('T')[0];
        $.fn.dataTable.ext.search.push(
            function(settings, data, dataIndex) {
                var date = data[dateColumnIndex]+'date'; // Use the dynamically determined date column index
                console.log(date);
                return (date >= formattedStartDate && date <= formattedEndDate);
            }
        );
        table.draw();
    }
});

</script>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>


<script type="text/javascript">


    $(document).ready(function() {


        $(document).on('click', '.editbtn', function() {
        var inventoryId = $(this).val(); // Get the inventory ID from the button's value
        var row = $(this).closest('tr'); // Get the current row

        // Populate hidden inputs with inventory data
        $('#inventory_id').val(inventoryId);
        $('#category').val(row.find('td:nth-child(2)').text());
        $('#subCategory').val(row.find('td:nth-child(3)').text());
        $('#inventory_quantity').val(row.find('td:nth-child(4)').text());
        $('#type').val(row.find('td:nth-child(5)').text());
        $('#price').val(row.find('td:nth-child(6)').text());
        $('#inventory_status').val(row.find('.active-btn, .deactive-btn').text().trim());

        // Show the modal
        $('#InventoryAssignModal').modal('show');

        // Populate employee dropdown (as discussed earlier)
        $.ajax({
            type: 'GET',
            url: 'getAllEmployees', // The URL that points to the method
            success: function(response) {
                var empSelect = $('#emp');
                empSelect.empty();
                empSelect.append($('<option>', { value: '', text: '--Select Employee--' }));
                $.each(response.employees, function(index, employee) {
                    if (employee.emp_name && employee.emp_name.trim() !== '') {
                        empSelect.append($('<option>', { 
                            value: employee.id, // Set value to employee ID
                            text: employee.emp_name, // Set text to employee name
                            'data-name': employee.emp_name // Store employee name in a data attribute
                        }));
                    }
                });

                // When an employee is selected, store the ID and name in hidden fields
                $('#emp').change(function() {
                    var selectedOption = $(this).find('option:selected');
                    $('#employee_id').val(selectedOption.val()); // Set hidden input for employee ID
                    $('#employee_name').val(selectedOption.data('name')); // Set hidden input for employee name
                });
            },
            error: function() {
                console.error('Error retrieving employees');
            }
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
                    url: '{{ route("admin.inventory.delete") }}',
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
                    url: '{{ route("admin.inventory.deactive") }}',
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
c