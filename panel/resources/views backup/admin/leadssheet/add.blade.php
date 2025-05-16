@extends('layouts.admin')

@section('script')
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.ckeditor.com/4.20.1/standard/ckeditor.js"></script>
@endsection

@section('content')
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>@foreach ($errors->all() as $error)<li>{{ $error }}</li>@endforeach</ul>
        </div>
    @endif

    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <div class="card">
        <div class="card-header">
            <h4 class="card-title">Add Lead</h4>
        </div>
        <div class="card-body">
            <form action="{{ route('admin.leadssheet.store') }}" method="POST">
                @csrf

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="form-label">Customer Name</label>
                        <input type="text" name="customer_name" class="form-control" placeholder="Enter full name" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Phone Number</label>
                        <input type="text" name="phone_number" class="form-control" placeholder="Enter phone number" required>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="form-label">Email</label>
                        <input type="email" name="email" class="form-control" placeholder="Enter email address">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Address / Location</label>
                        <input type="text" name="address_location" class="form-control" placeholder="Enter address or location" required>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="form-label">Lead Source</label>
                        <input type="text" name="lead_source" class="form-control" placeholder="e.g. Website, Referral" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Lead Status</label>
                        <select name="lead_status" class="form-control" required>
                            <option value="">Select Status</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Contacted">Not Contacted</option>
                            <option value="Pending">Pending</option>
                            <option value="Complete">Complete</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-4">
                        <label class="form-label">First Contact Date</label>
                        <input type="date" name="date_of_first_contact" class="form-control" required>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">Last Contact Date</label>
                        <input type="date" name="last_contact_date" class="form-control" required>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">Next Follow-Up</label>
                        <input type="date" name="next_follow_up_date" class="form-control" required>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">Interested In (Product/Service)</label>
                    <input type="text" name="product_service_interested_in" class="form-control" placeholder="e.g. 2BHK Flat, Website Design" required>
                </div>

                <div class="row mb-3">
                    <div class="col-md-4">
                        <label class="form-label">Lead Value (₹)</label>
                        <input type="number" step="0.01" name="lead_value" class="form-control" placeholder="e.g. 10000.00" required>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">BHK / Sq.ft</label>
                        <input type="text" name="bhk_sq_ft" class="form-control" placeholder="e.g. 2BHK / 1200 Sq.ft" required>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">B2B / B2C</label>
                        <select name="b2b_b2c" class="form-control" required>
                            <option value="">Select</option>
                            <option value="B2B">B2B</option>
                            <option value="B2C">B2C</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="form-label">Priority Level</label>
                        <input type="text" name="priority_level" class="form-control" placeholder="e.g. Hot" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Disposition</label>
                        <input type="text" name="disposition" class="form-control" placeholder="e.g. Interested, Not Interested, Follow-Up" required>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="form-label">Conversion Date</label>
                        <input type="date" name="conversion_date" class="form-control" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Remarks / Notes</label>
                        <input type="text" name="remarks_notes" class="form-control" placeholder="Enter additional notes or remarks" required >
                    </div>
                </div>

                <div class="mt-4">
                    <button type="submit" class="btn btn-success">Submit</button>
                    <a href="{{ route('admin.leadssheet') }}" class="btn btn-secondary">Cancel</a>
                </div>
            </form>
        </div>
    </div>
@endsection
