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
        <div class="container mt-5">
            <div class="card">
                <div class="card-header text-center">
                    <h5>Complaint Details</h5>
                </div>
                <div class="card-body">
                    <p><strong>ComplaintID:- </strong>C-ID-  {{ $complaint->id }}</p>
                    <p><strong>Customer Name:</strong> {{ $complaint->first_name }} {{ $complaint->last_name }}</p>
                    <p><strong>Mobile:</strong> {{ $complaint->mobile }}</p>
                    <p><strong>Email:</strong> {{ $complaint->email }}</p>
                    <p><strong>Subject:</strong> {{ $complaint->subject }}</p>
                    <p><strong>Message:</strong> {{ $complaint->message }}</p>
                    <p><strong>Remark:</strong> {{ $complaint->remark }}</p>
                    <p><strong>Status:</strong> {{ ucfirst($complaint->c_status) }}</p>
                </div>
            </div>

            @if($orders->isNotEmpty())
        <div class="card mt-4">
            <div class="card-header bg-light">
                <h4>Register Complaint Order Data</h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>SR-ID</th>
                            <th>Order Number</th>
                            <th>Customer</th>
                            <th>Product Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Service Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($orders as $order)
                            <tr>
                                <td>{{ $loop->iteration }}</td>
                                <td>SR-{{ $order->id }}</td>
                                <td>{{ $order->order_number }}</td>
                                <td>{{ $order->full_name }}</td>
                                <td>{{ $order->product_name }}</td>
                                <td>{{ $order->mobile }}</td>
                                <td>{{ $order->email }}</td>
                                <td>{{ $order->desired_date }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
        @endif

            <div class="text-center mt-4">
                <button onclick="window.print()" class="btn btn-success">Download Invoice</button>
            </div><br>
        </div>
    </div>

@endsection