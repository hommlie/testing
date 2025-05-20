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
            <h4 class="card-title">Edit Lead</h4>
        </div>
        <div class="card-body">
            <form action="{{ route('admin.leadssheet.update', $lead->id) }}" method="POST">
                @csrf

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="form-label">Customer Name</label>
                        <input type="text" name="customer_name" value="{{ old('customer_name', $lead->customer_name) }}" class="form-control" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Phone Number</label>
                        <input type="text" name="phone_number" value="{{ old('phone_number', $lead->phone_number) }}" class="form-control" required>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="form-label">Email</label>
                        <input type="email" name="email" value="{{ old('email', $lead->email) }}" class="form-control">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Address / Location</label>
                        <input type="text" name="address_location" value="{{ old('address_location', $lead->address_location) }}" class="form-control" required>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="form-label">Lead Source</label>
                        <input type="text" name="lead_source" value="{{ old('lead_source', $lead->lead_source) }}" class="form-control" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Lead Status</label>
                        <select name="lead_status" class="form-control" required>
                            <option value="">Select Status</option>
                            <option value="Contacted" {{ $lead->lead_status == 'Contacted' ? 'selected' : '' }}>Contacted</option>
                            <option value="Not Contacted" {{ $lead->lead_status == 'Not Contacted' ? 'selected' : '' }}>Not Contacted</option>
                            <option value="Pending" {{ $lead->lead_status == 'Pending' ? 'selected' : '' }}>Pending</option>
                            <option value="Complete" {{ $lead->lead_status == 'Complete' ? 'selected' : '' }}>Complete</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-4">
                        <label class="form-label">First Contact Date</label>
                        <input type="date" name="date_of_first_contact" value="{{ old('date_of_first_contact', $lead->date_of_first_contact) }}" class="form-control" required>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">Last Contact Date</label>
                        <input type="date" name="last_contact_date" value="{{ old('last_contact_date', $lead->last_contact_date) }}" class="form-control" required>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">Next Follow-Up</label>
                        <input type="date" name="next_follow_up_date" value="{{ old('next_follow_up_date', $lead->next_follow_up_date) }}" class="form-control" required>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">Interested In (Product/Service)</label>
                    <input type="text" name="product_service_interested_in" value="{{ old('product_service_interested_in', $lead->product_service_interested_in) }}" class="form-control" required>
                </div>

                <div class="row mb-3">
                    <div class="col-md-4">
                        <label class="form-label">Lead Value (₹)</label>
                        <input type="number" step="0.01" name="lead_value" value="{{ old('lead_value', $lead->lead_value) }}" class="form-control" required>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">BHK / Sq.ft</label>
                        <input type="text" name="bhk_sq_ft" value="{{ old('bhk_sq_ft', $lead->bhk_sq_ft) }}" class="form-control" required>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">B2B / B2C</label>
                        <select name="b2b_b2c" class="form-control" required>
                            <option value="">Select</option>
                            <option value="B2B" {{ $lead->b2b_b2c == 'B2B' ? 'selected' : '' }}>B2B</option>
                            <option value="B2C" {{ $lead->b2b_b2c == 'B2C' ? 'selected' : '' }}>B2C</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="form-label">Priority Level</label>
                        <input type="text" name="priority_level" value="{{ old('priority_level', $lead->priority_level) }}" class="form-control" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Disposition</label>
                        <input type="text" name="disposition" value="{{ old('disposition', $lead->disposition) }}" class="form-control" required>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="form-label">Conversion Date</label>
                        <input type="date" name="conversion_date" value="{{ old('conversion_date', $lead->conversion_date) }}" class="form-control" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Remarks / Notes</label>
                        <input type="text" name="remarks_notes" value="{{ old('remarks_notes', $lead->remarks_notes) }}" class="form-control" required>
                    </div>
                </div>

                <div class="mt-4">
                    <button type="submit" class="btn btn-primary">Update</button>
                    <a href="{{ route('admin.leadssheet') }}" class="btn btn-secondary">Cancel</a>
                </div>
            </form>
        </div>
    </div>
@endsection
