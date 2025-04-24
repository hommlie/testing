@extends('layouts.admin')

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
                dom: 'lfrtip',
                language: {
                    search: "Search Complaints:"
                },
            });
        });
    </script>
@endsection

@section('content')
    {{-- Display validation errors --}}
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    {{-- Display success message --}}
    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <div class="card">
        <div class="card-header">
            <h4 class="card-title">Add Blog</h4>
        </div>

        {{-- FORM START --}}
        <div class="card-body">
            <form action="{{ route('admin.leadssheet.store') }}" method="POST" enctype="multipart/form-data">
                @csrf

                {{-- Form Name --}}
                <div class="mb-3">
                    <label class="form-label">Form Name</label>
                    <input type="text" name="form_name" class="form-control" value="{{ old('form_name') }}"
                        placeholder="Enter Form Name" required>
                </div>

                {{-- Platform + Lead Status in one row --}}
                <div class="row mb-3">
                    {{-- Platform --}}
                    <div class="col-md-6">
                        <label class="form-label">Platform</label>
                        <select name="platform" class="form-control" required>
                            <option value="" disabled selected>- Business Lead -</option>
                            <option value="exhibition">Exhibition</option>
                            <option value="webLead">Web Lead</option>
                            <option value="serviceLead">Service Lead</option>
                            <option value="customerReferral">Customer Referral</option>
                            <option value="coldCall">Cold Call</option>
                            <option value="socialMedia">Social Media</option>
                            <option value="whatsappChatBot">What's App Chat Bot</option>
                            <option value="vendors">Vendors</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    {{-- Lead Status --}}
                    <div class="col-md-6">
                        <label class="form-label">Lead Status</label>
                        <select name="lead_status" class="form-control" required>
                            <option value="">Select Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Complete">Complete</option>
                        </select>
                    </div>
                </div>

                {{-- Customer Name + Phone Number in one row --}}
                <div class="row mb-3">
                    {{-- Customer Name --}}
                    <div class="col-md-6">
                        <label class="form-label">Customer Name</label>
                        <input type="text" name="name" class="form-control" placeholder="Enter Name" required>
                    </div>

                    {{-- Phone Number --}}
                    <div class="col-md-6">
                        <label class="form-label">Phone Number</label>
                        <input type="text" name="phone_number" class="form-control" placeholder="Enter Phone Number"
                            required>
                    </div>
                </div>

                {{-- Email + Address in one row --}}
                <div class="row mb-3">
                    {{-- Email --}}
                    <div class="col-md-6">
                        <label class="form-label">Email</label>
                        <input type="email" name="email" class="form-control" placeholder="Enter Email (optional)">
                    </div>

                    {{-- Address --}}
                    <div class="col-md-6">
                        <label class="form-label">Address</label>
                        <input type="text" name="address" class="form-control" placeholder="Enter Address" required>
                    </div>
                </div>

                <div class="col-md-12">
                    <label class="form-label">Remarks</label>
                    <input type="text" name="remarks" class="form-control" placeholder="Enter Remarks (optional)">
                </div>

                <div class="col-md-12 mt-4">
                    <label class="form-label">What Type Of Pest Problem Are You Currently Facing?</label>
                    <textarea name="pest_problem" id="editor" class="form-control bootstrap-editor" rows="5"
                        placeholder="Describe the pest problem..." required>{{ old('pest_problem') }}</textarea>
                </div>

                {{-- Submit and Cancel buttons --}}
                <div class="mt-5">
                    <button type="submit" class="btn btn-success">Add</button>
                    <a href="{{ route('admin.leadssheet') }}" class="btn btn-secondary">Cancel</a>
                </div>
            </form>
        </div>
    </div>

    {{-- CKEditor Script --}}
    <script src="https://cdn.ckeditor.com/4.20.1/standard/ckeditor.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            if (document.getElementById('editor')) {
                CKEDITOR.replace('editor', {
                    removeButtons: 'PasteFromWord'
                });
            }
        });
    </script>
@endsection