@extends('layouts.admin')

@section('script')
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap4.min.js"></script>

    <script>
        $(document).ready(function () {
            $('#orderDataTable').DataTable({
                responsive: true,
                autoWidth: false,
                dom: 'lfrtip',
                language: {
                    search: "Search Order Data:"
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
            <h4>Edit Complaint</h4>
        </div>
        <div class="card-body">
            <form action="{{ route('admin.complaint.update', $complaint->id) }}" method="POST">
                @csrf
            
                <div class="row mb-3">
                    <div class="col-md-4">
                        <label for="first_name" class="form-label">First Name</label>
                        <input type="text" class="form-control" name="first_name" value="{{ $complaint->first_name }}">
                    </div>
                    <div class="col-md-4">
                        <label for="last_name" class="form-label">Last Name</label>
                        <input type="text" class="form-control" name="last_name" value="{{ $complaint->last_name }}">
                    </div>
                    <div class="col-md-4">
                        <label for="mobile" class="form-label">Mobile</label>
                        <input type="text" class="form-control" name="mobile" value="{{ $complaint->mobile }}">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" name="email" value="{{ $complaint->email }}">
                    </div>
                    <div class="col-md-6">
                        <label for="subject" class="form-label">Subject</label>
                        <input type="text" class="form-control" name="subject" value="{{ $complaint->subject }}">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-12">
                        <label for="message" class="form-label">Message</label>
                        <textarea class="form-control" name="message" rows="4">{{ $complaint->message }}</textarea>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-12">
                        <label for="status" class="form-label">Status</label>
                        <select class="form-control" name="status">
                            <option value="pending" {{ $complaint->c_status == 'pending' ? 'selected' : '' }}>Pending</option>
                            <option value="unsolved" {{ $complaint->c_status == 'unsolved' ? 'selected' : '' }}>Unsolved</option>
                            <option value="solved" {{ $complaint->c_status == 'solved' ? 'selected' : '' }}>Solved</option>
                        </select>
                    </div>
                </div>
                <div class="text-right">
                    <button type="submit" class="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    </div>

    <div class="card mt-4">
        <div class="card-header bg-light">
            <h4>Register Complaint Order Data</h4>
        </div>
        <div class="card-body">
            <table class="table table-bordered" id="orderDataTable">
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
@endsection
