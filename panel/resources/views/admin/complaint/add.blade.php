@extends('layouts.admin')

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
@section('script')
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap4.min.js"></script>

    <script>
        $(document).ready(function () {
            console.log("Initializing surau DataTable...");
            $('#data_table_bootstrap').DataTable({
                responsive: true,
                autoWidth: false,
                dom: 'lfrtip', \
                language: {
                    search: "Search Complaints:"
                },
            });
        });
    </script>
@endsection

@section('content')

    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif
    @if (session('error'))
    <div class="alert alert-danger">
        {{ session('error') }}
    </div>
    @endif

    <div class="card">
        <div class="card-header bg-light d-flex justify-content-between align-items-center">
            <h4>Add Complaint</h4>
            <div class="d-flex " style="margin-left:70%;">
                <a href="#" class="btn btn-raised btn-primary text-light btn-min-width mb-0" data-bs-toggle="modal"
                    data-bs-target="#SR_ID">
                    Add Complaint
                </a>
            </div>
        </div>
        <div class="modal fade" id="SR_ID" tabindex="-1" role="dialog" style="z-index: 9999 !important;">
            <div class="modal-dialog modal-xl" role="document" style="max-width: 90%;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Order Data</h5>
                        <div class="col-md-4 d-flex">
                            <input type="text" class="form-control" id="orderID" placeholder="Enter ORDER-ID / SR-ID">
                            <span class="ml-2 btn btn-outline-secondary" id="orderData">Search</span>
                        </div>
                    </div>
                    <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
                        <table class="table table-bordered mt-3" id="orderDataTable">
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
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Dynamic Content -->
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body collapse show">
        
            <div class="container mt-5">

                <form action="{{route('admin.complaint.store')}}" method="POST">
                    @csrf
                    <input type="hidden" name="ID[]" id="ID">
                    <div class="row mb-3">

                        <div class="col-md-4">
                            <label for="name" class="form-label">First Name</label>
                            <input type="text" placeholder="Enter Frist Name  " class="form-control" id="name"
                                name="first_name" value="{{ old('name') }}">
                            @error('first_name') <small class="text-danger">{{ $message }}</small> @enderror
                        </div>
                        <div class="col-md-4">
                            <label for="name" class="form-label">Last Name</label>
                            <input type="text" placeholder="Enter last Name  " class="form-control" id="name"
                                name="last_name" value="{{ old('name') }}">
                            @error('last_name') <small class="text-danger">{{ $message }}</small> @enderror
                        </div>
                        <div class="col-md-4">
                            <label for="mobile" class="form-label">Mobile</label>
                            <input type="text" placeholder="Enter Mobile Number" class="form-control" id="mobile"
                                name="mobile" value="{{ old('mobile') }}">
                            @error('mobile') <small class="text-danger">{{ $message }}</small> @enderror
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" placeholder="Enter Email" class="form-control" id="email" name="email"
                                value="{{ old('email') }}">
                            @error('email') <small class="text-danger">{{ $message }}</small> @enderror
                        </div>
                        <div class="col-md-6">
                            <label for="subject" class="form-label">Subject</label>
                            <input type="text" placeholder="Enter Subject" class="form-control" id="subject" name="subject"
                                value="{{ old('subject') }}">
                            @error('subject') <small class="text-danger">{{ $message }}</small> @enderror
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-12">
                            <label for="message" class="form-label">Message</label>
                            <textarea class="form-control" placeholder="Enter Message" id="message" name="message"
                                rows="4">{{ old('message') }}</textarea>
                            @error('message') <small class="text-danger">{{ $message }}</small> @enderror
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-12">
                            <label for="status" class="form-label">Status</label>
                            <select class="form-control" name="status">
                                <option value="pending">Pending</option>
                                <option value="unsolved">Unsolved</option>
                                <option value="solved">Solved</option>
                            </select>
                            @error('status') <small class="text-danger">{{ $message }}</small> @enderror
                        </div>
                    </div>
                    <div class="text-right">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script>
        // GET EXISTING CUSTOMER DETAILS (Name, Pincode, Mobile number, Pincode)
        document.getElementById('orderData').addEventListener('click', function () {
            var searchValue = document.getElementById('orderID').value.trim();
            const tableBody = document.getElementById("orderDataTable").getElementsByTagName("tbody")[0];
            tableBody.innerHTML = "";
            let selectedProductIDs = [];

            if (searchValue === "") {
                tableBody.innerHTML = `<tr>
                <td colspan="9" style="text-align: center; font-weight: bold; color: red;">
                    Please enter a valid Order ID / SR-ID
                </td>
            </tr>`;
                return;
            }

            // Show loading spinner
            tableBody.innerHTML = `<tr>
            <td colspan="9" style="text-align: center; font-weight: bold;">
                <i class="fa fa-spinner fa-spin" style="font-size:20px;"></i> Loading...
            </td>
        </tr>`;

            // Fetch order data based on the search value (replace :orderID in URL)
            fetch("{{ route('admin.complaint.getOrderData', ['orderID' => ':orderID']) }}".replace(':orderID', searchValue))
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch order data');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Fetched Order Data:', data);
                    tableBody.innerHTML = ""; // Clear the table body

                    if (data.length === 0) {
                        tableBody.innerHTML = `<tr>
                        <td colspan="9" style="text-align: center; font-weight: bold;">No data available</td>
                    </tr>`;
                    } else {
                        data.forEach(orderData => {
                            const row = document.createElement("tr");

                            row.innerHTML = `
                            <td><input type="checkbox" class="select-product" data-id="${orderData.id}"></td>
                            <td>SR-${orderData.id}</td>
                            <td>${orderData.order_number}</td>
                            <td>${orderData.full_name}</td>
                            <td>${orderData.product_name}</td>
                            <td>${orderData.mobile}</td>
                            <td>${orderData.email}</td>
                            <td>${orderData.desired_date}</td>
                        `;

                            tableBody.appendChild(row);
                        });

                        // Add event listener for each checkbox to update the selected IDs array.
                        document.querySelectorAll(".select-product").forEach(checkbox => {
                            checkbox.addEventListener("change", function () {
                                let id = this.getAttribute("data-id"); // Use orderData.id

                                if (this.checked) {
                                    selectedProductIDs.push(id); // Add if checked
                                } else {
                                    selectedProductIDs = selectedProductIDs.filter(item => item !== id); // Remove if unchecked
                                }

                                // Store the array in the input field (as a JSON string)
                                document.getElementById('ID').value = JSON.stringify(selectedProductIDs);

                                console.log("Selected IDs:", selectedProductIDs);
                            });
                        });
                    }

                    // Open the modal after data is populated.
                    $('#SR_ID').modal('show');
                })
                .catch(error => {
                    console.error('Error fetching order data:', error);
                    tableBody.innerHTML = `<tr>
                    <td colspan="9" style="text-align: center; font-weight: bold; color: red;">
                        Failed to fetch Order data. Please try again.
                    </td>
                </tr>`;
                });
        });


    </script>
@endsection