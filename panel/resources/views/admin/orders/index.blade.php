@extends('layouts.admin')

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
<style>
    .btn-primary.text-light {
        color: #fff !important;
    }

    .bounce {
        animation: bounce 9.1s infinite;
    }

    @keyframes bounce {

        0%,
        100% {
            transform: translateY(0);
        }

        50% {
            transform: translateY(-10px);
        }
    }
</style>
@section('title')

@endsection
@section('css')
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.css"> -->
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
                        <div class="card-header bg-light d-flex justify-content-between align-items-center">
                            <h4 class="card-title">{{ trans('labels.orders') }}</h4>
                            <div class="d-flex " style="margin-left:50%;">
                                 <a href="{{ route('admin.orders.importOrderData') }}"
                                    class="btn btn-raised btn-primary text-light btn-min-width mb-0 me-2 ">
                                    {{ trans(' Import Order Data') }} </a>
                                </a> 
                                <a href="#" class="btn btn-raised btn-primary text-light btn-min-width mb-0"
                                    data-bs-toggle="modal" data-bs-target="#SR_ID" style="margin-left:5%;">
                                    GET OTP / Close Order
                                </a>
                                <a href="{{ route('admin.orders.add') }}"
                                    class="btn btn-raised btn-primary text-light btn-min-width mb-0 me-2 "
                                    style="margin-left:5%;">
                                    {{ trans('Add Order Manually') }}
                                </a>
                            </div>
                        </div>

                        {{-- SR-ID CLOSE MODEL --}}
                        <div class="modal fade" id="SR_ID" tabindex="-1" role="dialog" style="z-index: 9999 !important;">
                            <div class="modal-dialog modal-xl" role="document" style="max-width: 90%;">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Order Data</h5>
                                        <div class="col-md-4 d-flex">
                                            <input type="text" class="form-control" id="orderID"
                                                placeholder="Enter ORDER-ID / SR-ID">
                                            <span class="ml-2 btn btn-outline-secondary" id="orderData">Search</span>
                                            <span id="closeOrderBtn" class="btn btn-success ml-2 " style="height: auto">
                                                <!-- FOR ANIMATION USE THIS CSS --  bounce --  -->
                                                Close Order
                                                <input type="checkbox" id="closeOrder" class="ml-2">
                                            </span>
                                        </div>
                                    </div>
                                    <div id="orderCloseAlert" class="alert alert-success rounded-0" role="alert" style="display: none;">
                                        ✅ Order Close Mode is ON!
                                    </div>

                                    <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
                                        <table class="table table-bordere  d mt-3" id="orderDataTable">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>SR-ID</th>
                                                    <th>Order number</th>
                                                    <th>Customer</th>
                                                    <th>Product name</th>
                                                    <th>Mobile</th>
                                                    <th>Email</th>
                                                    <th>Service Date</th>
                                                    <th>OTP</th>
                                                    <th class="action-column">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <!-- Dynamic Content -->
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="modal-footer d-flex">
                                        <button id="updateButton" style="display:none;"
                                            class="btn btn-primary">Update</button>
                                        <button type="button" class="btn btn-secondary ml-4"
                                            data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card-body collapse show">
                            <div class="card-block card-dashboard" id="table-display">
                                <div id="filter_buttons" class="d-flex align-items-center">
                                    <small style="font-size:20px;" class="mr-3">Filter :</small>
                                    <button class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_day">This
                                        Day</button>
                                    <button class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_week">This
                                        Week</button>
                                    <button class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_month">This
                                        Month</button>
                                    <button class="btn btn-sm btn-outline-success round-pill mx-2" id="filter_custom">Custom
                                        Date</button>
                                    <a href="orders" class="btn btn-sm btn-outline-success round-pill mx-2"
                                        id="filter_reset"> Reset Filter</a>

                                    <a href="orders" class="btn btn-sm btn-outline-success round-pill mx-2" id="dwCsv"><i
                                            class="fa fa-download"></i>CSV</a>
                                    <a href="orders" class="btn btn-sm btn-outline-success round-pill mx-2" id="dwExcel"><i
                                            class="fa fa-download"> </i> Excel</a>
                                </div><br />

                                <div id="custom_date_filter" style="display:none;">
                                    <label for="start_date">Start Date:</label>
                                    <input type="date" id="start_date">
                                    <label for="end_date">End Date:</label>
                                    <input type="date" id="end_date">
                                    <button class="btn btn-raised btn-outline-success round btn-min-width"
                                        id="apply_custom_date">Apply</button>
                                </div>
                                <br>
                                @include('admin.orders.ordersstable')
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </div>
    <div class="modal fade" id="alertModal" tabindex="-1" aria-labelledby="alertModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content " id="model-color">
                <div class="modal-header ">
                    <h5 class="modal-title" id="alertModalLabel">Notification</h5>
                </div>
                <div class="modal-body ">
                    <div id="alert-message"></div>
                </div>
            </div>
        </div>
    </div>



@endsection
@section('scripttop')
@endsection

@section('scripts')
    <script>

        // GET EXISTING CUSTOMER DETAILS (Name, Pincode, Mobile number, Pincode)
        document.getElementById('orderData').addEventListener('click', function () {
            var orderID = document.getElementById('orderID').value.trim();
            const tableBody = document.getElementById("orderDataTable").getElementsByTagName("tbody")[0];
            const closeOrderCheckbox = document.getElementById("closeOrder");
            let selectedOrderID = null;

            tableBody.innerHTML = "";
            updateButton.style.display = "none";

            if (orderID === "") {
                const row = document.createElement("tr");
                row.innerHTML = `<td colspan="8" style="text-align: center; font-weight: bold; color: red;">
                Please enter a valid Order ID / SR-ID</td>`;
                tableBody.appendChild(row);
                return;
            }

            const loadingRow = document.createElement("tr");
            loadingRow.innerHTML = `<td colspan="8" style="text-align: center; font-weight: bold;">
            <i class="fa fa-spinner fa-spin" style="font-size:20px;"></i></td>`;
            tableBody.appendChild(loadingRow);

            // Fetch order data
            fetch("{{ route('admin.orders.getOrderData', ['orderID' => ':orderID']) }}".replace(':orderID', orderID))
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch customer data');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Order Data:', data);
                    tableBody.innerHTML = "";

                    if (data.length === 0) {
                        const row = document.createElement("tr");
                        row.innerHTML = `<td colspan="8" style="text-align: center; font-weight: bold;">No data available</td>`;
                        tableBody.appendChild(row);
                    } else {
                        data.forEach(orderData => {
                            const row = document.createElement("tr");
                            row.setAttribute("data-order-id", orderData.id);
                            const otpCell = `<i class="fa fa-spinner fa-spin" style="font-size:15px; color:green;"></i>`;

                            let orderStatusOptions = {
                                1: "Scheduled",
                                2: "Dispatched",
                                3: "OnSite",
                                4: "Completed",
                                5: "Incomplete"
                            };

                            let statusOptionsHTML = Object.entries(orderStatusOptions).map(([key, value]) => `
                            <option value="${key}" ${key == orderData.order_status ? "selected" : ""}>${value}</option>
                        `).join('');

                            row.innerHTML = `
                            <td>
                                <input class="action-column row-select" type="checkbox" onclick="selectRow(this, ${orderData.id})">
                            </td>
                            <td>SR-${orderData.id}</td>
                            <td>${orderData.order_number}</td>
                            <td>${orderData.full_name}</td>
                            <td>${orderData.product_name}</td>
                            <td>${orderData.mobile}</td>
                            <td>${orderData.email}</td>
                            <td>${orderData.desired_date}</td>
                            <td class="otp-cell">${otpCell}</td>
                            <td class="action-column">
                                <select class='form-control order-status'>
                                    ${statusOptionsHTML}
                                </select>
                            </td>
                        `;
                            tableBody.appendChild(row);

                            if (orderData.otp) {
                                const otpElement = row.querySelector(".otp-cell");
                                otpElement.innerHTML = orderData.otp;
                            }
                        });
                    }

                    // Show modal
                    $('#SR_ID').modal('show');
                    const actionColumnHead = document.querySelector("#orderDataTable thead tr th:nth-child(0)"); 
                    const actionColumnHeader = document.querySelector("#orderDataTable thead tr th:nth-child(10)"); 
                     if (closeOrderCheckbox.checked) {
                        showActionColumn(actionColumnHeader, actionColumnHead);
                        showOrderCloseAlert();  
                    } else {
                        hideActionColumn(actionColumnHeader, actionColumnHead);
                        hideOrderCloseAlert();  
                    }
                })
                .catch(error => {
                    console.error('Error fetching customer data:', error);
                    tableBody.innerHTML = "";
                    const errorRow = document.createElement("tr");
                    errorRow.innerHTML = `<td colspan="8" style="text-align: center; font-weight: bold; color: red;">
                    Failed to fetch Order data. Please try again.</td>`;
                    tableBody.appendChild(errorRow);
                });
        });

        // Function to show order close mode success message
        function showOrderCloseAlert() {
            const alertDiv = document.getElementById("orderCloseAlert");
            alertDiv.style.display = "block";
        }

        // Function to hide order close mode success message
        function hideOrderCloseAlert() {
            const alertDiv = document.getElementById("orderCloseAlert");
            alertDiv.style.display = "none";
        }

        // Function to select a row and show update button
        window.selectRow = function (checkbox, orderID) {
            let checkedBoxes = document.querySelectorAll(".row-select:checked");
            checkedBoxes.forEach(cb => {
                if (cb !== checkbox) {
                    console.log("Unchecked Order ID:", cb.closest("tr").getAttribute("data-order-id"));
                    cb.checked = false;
                    cb.closest("tr").style.backgroundColor = "";
                }
            });

            if (checkbox.checked) {
                checkbox.closest("tr").style.backgroundColor = "lightgreen";
                selectedOrderID = orderID;
                updateButton.style.display = "block";
            } else {
                checkbox.closest("tr").style.backgroundColor = "";
                selectedOrderID = null;
                updateButton.style.display = "none";
            }
        };

        // Update button click event
        updateButton.addEventListener("click", function () {
            if (selectedOrderID) {
                const selectedRow = document.querySelector(`tr[data-order-id='${selectedOrderID}']`);
                const selectedStatus = selectedRow.querySelector(".order-status").value;
                updateOrderStatus(selectedOrderID, selectedStatus);
            }
        });

        // Fix: Define `showActionColumn` and `hideActionColumn` correctly
        function hideActionColumn(actionColumnHeader, actionColumnHead) {
            if (actionColumnHeader) actionColumnHeader.style.display = "none";
            if (actionColumnHead) actionColumnHead.style.display = "none";
            document.querySelectorAll("#orderDataTable tbody tr .action-column").forEach(td => {
                td.style.display = "none";
            });
        }

        function showActionColumn(actionColumnHeader, actionColumnHead) {
            if (!actionColumnHeader || !actionColumnHead) {
                console.warn("Action column elements not found, skipping showActionColumn()");
                return;
            }
            actionColumnHeader.style.display = "table-cell";
            actionColumnHead.style.display = "table-cell";
            document.querySelectorAll("#orderDataTable tbody tr .action-column").forEach(td => {
                td.style.display = "table-cell";
            });
        }


        // UPDATE ORDER STATUS
        function updateOrderStatus(orderId, newStatus) {
            fetch("{{ route('admin.orders.updateStatus') }}", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({ order_id: orderId, order_status: newStatus })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        showAlertMessage('✅ Order status updated successfully!', 'success');
                        $('#SR_ID').modal('hide');

                    } else {
                        showAlertMessage('❌ Failed to update order status.', 'danger');
                        $('#SR_ID').modal('hide');

                    }
                })
                .catch(error => console.error('Error:', error));
        }

        // SHOW NOTIFICATION MODEL

        function showAlertMessage(message, type) {
            const alertMessage = document.getElementById('alert-message');
            const alertbgcolor = document.getElementById('model-color');
            alertMessage.innerHTML = message;
            alertbgcolor.className = `alert alert-${type}`;

            const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
            alertModal.show();
            setTimeout(() => {
                alertModal.hide();
                location.reload();
            }, 2000);
        }


        $(document).ready(function () {
            // Initialize the DataTable
            var table = $('#data_table_bootstrap').DataTable();

            // Get the index of the "Date" column dynamically
            var dateColumnIndex = table.column(':contains(Date)').index();
            console.log("Date column index: " + dateColumnIndex);

            // Log all dates in the table for debugging purposes
            table.rows().every(function (rowIdx, tableLoop, rowLoop) {
                var data = this.data();
                var date = data[dateColumnIndex];
                console.log("Date in Row " + rowIdx + ": " + date);
            });

            // Filter by Day (Today)
            $('#filter_day').on('click', function () {
                resetFilters(); // Reset any existing filters

                // Get today's date in the format YYYY-MM-DD
                var today = new Date().toISOString().split('T')[0];
                console.log("Filtering by today's date: " + today);

                $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
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
            $('#filter_week').on('click', function () {
                resetFilters(); // Reset any existing filters
                var today = new Date();
                var startOfWeek = new Date(today.setDate(today.getDate() - 6)); // Last 7 days
                console.log("Filtering by date range from: " + startOfWeek + " to: " + new Date());
                filterByDateRange(startOfWeek, new Date());
            });

            // Filter by Month (Last 30 days)
            $('#filter_month').on('click', function () {
                resetFilters(); // Reset any existing filters
                var today = new Date();
                var startOfMonth = new Date(today.setDate(today.getDate() - 29)); // Last 30 days
                console.log("Filtering by date range from: " + startOfMonth + " to: " + new Date());
                filterByDateRange(startOfMonth, new Date());
            });

            // Show Custom Date Filter
            $('#filter_custom').on('click', function () {
                resetFilters(); // Reset any existing filters
                $('#custom_date_filter').toggle();
            });

            // Apply Custom Date Filter
            $('#apply_custom_date').on('click', function () {
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
            $('#filter_reset').on('click', function () {
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

                $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
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


        //Download Excel Data 
        // document.getElementById("dwExcel").addEventListener("click", function () {
        //   {{--  console.log(@json($data1)); --}}
        //  {{--   const data2 = @json($data1); --}}
        //     const worksheet = XLSX.utils.json_to_sheet(data2);
        //     const header = worksheet['!cols'] = worksheet['!cols'] || [];
        //     header[0] = { width: 30 };
        //     header[1] = { width: 50 };
        //     const workbook = XLSX.utils.book_new();
        //     XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
        //     XLSX.writeFile(workbook, "orders.xlsx");
        // });

        //Download CSV Data
        // document.getElementById("dwCsv").addEventListener("click", function () {
        //  {{--    console.log(@json($data1)); --}}
        //   {{--  const data2 = @json($data1); --}}
        //     const worksheet = XLSX.utils.json_to_sheet(data2);
        //     const csv = XLSX.utils.sheet_to_csv(worksheet);
        //     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        //     const link = document.createElement("a");
        //     link.href = URL.createObjectURL(blob);
        //     link.download = "orders.csv";
        //     link.click();
        // });

    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.1/xlsx.full.min.js"></script>


@endsection