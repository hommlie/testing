@extends('layouts.admin')
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
<style>
    .btn-primary.text-light {
        color: #fff !important;
    }

    #map {
        height: 400px;
        width: 100%;
    }

    #pac-input {
        z-index: 9999 !important;
    }

    .gm-style-iw {
        z-index: 9999 !important;
    }

    .modal-content {
        position: relative;
        z-index: 9998;
    }

    #customerModal .modal-content {
        font-size: 8px !important;
        z-index: 9999 !important;
    }

    .pac-container {
        z-index: 1051;
    }
</style>
@section('title')
@endsection
@section('css')

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
                    <div class="card-header bg-light d-flex align-items-center">
                        <h4 class="card-title mb-0 mr-3">{{ trans('Add Order') }}</h4>

                        <!-- ADD RESIDENTIAL ORDER SELECT MENU -->
                        <div class="col-md-7">
                            <select id="addResidentialOrder" class="form-select col-md-3 mb-0 border-0 mr-3"
                                aria-label="Select Order">
                                <option value="" disabled selected>- Select an Order -</option>

                            </select>
                        </div>

                        <!-- ADD BUSINESS SUB REGION BUTTON (Right aligned) -->
                        <a href="#" class="btn btn-raised btn-primary text-light ml-auto btn-min-width mb-0"
                            data-bs-toggle="modal" data-bs-target="#addBusinessRegionModal">
                            Add Business Region
                        </a>

                        <!-- ADD BUSINESS REGION BUTTON (Right aligned) -->
                        <a href="#" class="btn btn-raised btn-primary text-light ml-auto btn-min-width mb-0"
                            data-bs-toggle="modal" data-bs-target="#addBusinesSub">
                            Service Center
                        </a>

                        <!-- VIEW ORDERS BUTTON -->
                        <a href="{{ route('admin.orders') }}"
                            class="btn btn-raised btn-primary text-light ml-auto btn-min-width mb-0">
                            {{ trans('View Orders') }}
                        </a>
                    </div>


                    <div class="card-body p-3">
                        <form action="{{ route('admin.orders.store') }}" method="post" enctype="multipart/form-data">
                            @csrf
                            <input type="hidden" name="hidden_quantity" id="hidden_quantity" value="1">
                            <input type="hidden" name="hidden_total_price" id="hidden_total_price">
                            <input type="hidden" name="hidden_tax" id="hidden_tax">
                            <input type="hidden" name="hidden_image" id="hidden_image">
                            <input type="hidden" name="hidden_product_name" id="hidden_product_name">
                            <input type="hidden" name="serviceTypePriceValue" id="serviceTypePriceValue">
                            <input type="hidden" name="serviceAreaPriceValue" id="serviceAreaPriceValue">
                            <input type="hidden" name="couponsprice" id="couponsprice">

                            {{-- By default, this section is hidden. If you Select the "Add Residential Order" button,
                            the section will be displayed. --}}
                            {{-- ADD Residential ORDER SECTION --}}
                            <div id="addresorder">
                                <div class="row mb-3">
                                    <div class="col-lg-4">
                                        {{-- SERVICE CENTER TYPE --}}
                                        <label for="serviceCenterType">Service Center Type</label>
                                        <select name="serviceCenterType" id="serviceCenterType" name="serviceCenterType"
                                            class="form-control" required>
                                            <option value="" disabled selected>- Service Center Type -</option>
                                            <option value="hommlie">Hommlie</option>
                                            <option value="vendor">Vendor</option>
                                            <option value="franchisee">Franchisee</option>
                                        </select>
                                        @error('serviceCenterType')
                                            <div class="text-danger">{{ $message }}</div>
                                        @enderror
                                        <br />

                                        {{-- ACCOUNT TYPE --}}

                                        <label for="accountType">Account Type</label>
                                        <select name="accountType" id="accountType" name="accountType"
                                            class="form-control" required>
                                            <option value="" disabled selected>- Account Type -</option>
                                            <option value="individual">Individual</option>
                                            <option value="bulkBooking">Bulk Booking</option>
                                        </select>
                                        @error('accountType')
                                            <div class="text-danger">{{ $message }}</div>
                                        @enderror
                                        <br />
                                        {{-- BUSINESS SUB REGION --}}
                                        <label for="businessSubRegion">Business Sub Region</label>
                                        <select name="businessSubRegion" id="businessSubRegion" class="form-control" required>
                                            <option value="" disabled selected>- Select Branch -</option>

                                        </select>
                                        @error('businessSubRegion')
                                            <div class="text-danger">{{ $message }}</div>
                                        @enderror
                                        <br />
                                    </div>

                                    <div class="col-lg-4">
                                        {{-- EMPLOYEE NAME --}}
                                        <label for="employeeName">Employee Name</label>
                                        <input type="text" name="employeeName" id="employeeName" class="form-control"
                                            value="{{ $userdata->first()->name ?? '' }}" readonly required> 
                                        @error('employeeName')
                                            <div class="text-danger">{{ $message }}</div>
                                        @enderror
                                        <br />

                                        {{-- ACCOUNT SUB TYPE --}}
                                        <label for="accountSubType">Account Sub Type</label>
                                        <select name="accountSubType" id="accountSubType" name="accountSubType"
                                            class="form-control" required>
                                            <option value="" disabled selected>- Account Sub Type -</option>

                                        </select>
                                        @error('accountSubType')
                                            <div class="text-danger">{{ $message }}</div>
                                        @enderror
                                        <br />

                                        {{-- BRANCH CODE --}}

                                        <label for="branchCode" class="form-label">Branch Code</label>
                                        <input type="text" class="form-control" id="branchcode" name="branchcode"
                                            value="{{ old('branch_code') }}" readonly placeholder="" required>
                                        @error('branchcode')
                                            <div class="text-danger">{{ $message }}</div>
                                        @enderror
                                        <br />

                                    </div>

                                    <div class="col-lg-4">
                                        {{-- BILLING --}}
                                        <label for="billing">Billing</label>
                                        <select name="billing" id="billing" name="billing" class="form-control" required>
                                            <option value="" disabled selected>- Billing -</option>
                                            <option value="headOffice">Head Office</option>
                                            <option value="regionalOffice">Regional Office</option>
                                            <option value="branchOffice">Branch Office</option>
                                        </select>
                                        @error('billing')
                                            <div class="text-danger">{{ $message }}</div>
                                        @enderror
                                        <br />


                                        {{-- BUSINESS REGION --}}
                                        <label for="businessRegion">Business Region</label>
                                        <select name="businessRegion" id="businessRegion" class="form-control" required>
                                            <option value="" disabled selected>- Business Region -</option>
                                            @foreach($businessregion as $region)
                                                <option value="{{ $region->id }}">{{ $region->state }}
                                                </option>
                                            @endforeach
                                        </select>

                                        @error('businessRegion')
                                            <div class="text-danger">{{ $message }}</div>
                                        @enderror
                                        <br />

                                        {{-- BILL TO ACCOUNT NAME --}}
                                        <label for="billToAccountName">Bill To: Account Name</label>
                                        <input type="text" name="billToAccountName" id="billToAccountName"
                                            class="form-control" placeholder="Bill To: Account Name">

                                    </div>
                                </div>
                            </div>
                            {{--NEW SECTION FOR CUSTOMER INFO --}}
                            <div class="row">
                                <div class="col-md-6">
                                    {{-- CUSTOMER TYPE --}}
                                    <label for="customerType">Customer Type</label>
                                    <select name="customerType" id="customerType" class="form-control" required>
                                        <option value="" disabled selected>- Customer Type -</option>
                                        <option value="newCustomer">New Customer</option>
                                        <option value="existingCustomer">Existing Customer</option>
                                    </select>
                                    @error('customerType')
                                        <div class="text-danger">{{ $message }}</div>
                                    @enderror
                                    <br />
                                </div>
                                <div class="col-md-6">
                                    {{-- BUSINESS LEAD --}}
                                    <div id="businessLead">
                                        <label for="businessLead">Business Lead</label>
                                        <select name="businessLead" id="businessLeadDropdown" class="form-control" required>  
                                            <option value="" disabled selected>- Business Lead -</option>
                                        </select>
                                        @error('businessLead')
                                            <div class="text-danger">{{ $message }}</div>
                                        @enderror
                                        <br />
                                        {{-- CUSTOMER ID --}}
                                        <div id="customerInput" style="display:none;">
                                            <div class="d-flex">
                                                <!-- <label for="customerInput">Customer ID</label> -->
                                                <input type="text" id="customerID" class="form-control"
                                                    placeholder="Customer Mobile Number" >
                                                <span id="costomerData"
                                                    class="btn btn-outline-secondary ms-2">Search</span>
                                            </div>
                                            <span id="error-message"
                                                style="color: red; display: none; font-size:13px;">Mobile number must be
                                                exactly 10 digits.</span>
                                            <br>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- <label for=""><u>Basic Details</u></label> -->
                            <div class="row ">
                                <div class="col-lg-6">
                                    <label for="category">Category</label>
                                    <select name="category" id="order_category" class="form-control" required>
                                        <option value="">-Select Category-</option>
                                        @foreach ($category as $cat)
                                            <option value="{{ $cat->id }}">{{ $cat->category_name }}</option>
                                        @endforeach
                                    </select>
                                    @if ($errors->has('category'))
                                        <span class="text-danger">{{ $errors->first('category') }}</span>
                                    @endif
                                    <br>

                                    <label for="subcategory">Sub-Category</label>
                                    <select name="subcategory" id="order_subcategory" class="form-control" required>
                                        <option value="">-Select Sub-Category-</option>
                                    </select>
                                    @if ($errors->has('subcategory'))
                                        <span class="text-danger">{{ $errors->first('subcategory') }}</span>
                                    @endif
                                    <br>

                                    <label for="service">Service</label>
                                    <select name="service" id="order_service" class="form-control" required>
                                        <option value="">-Select Service-</option>
                                    </select>
                                    @if ($errors->has('service'))
                                        <span class="text-danger">{{ $errors->first('service') }}</span>
                                    @endif

                                    <br>
                                    <label for="variation">Variation</label>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <select name="attribute" id="attribute" class="form-control" required>
                                                <option value="">-Select Type-</option>
                                            </select>
                                            @if ($errors->has('attribute'))
                                                <span class="text-danger">The Variation field is required.</span>
                                            @endif
                                        </div>
                                        <div class="col-lg-6">
                                            <select name="order_service_area" id="order_service_area"
                                                class="form-control" required>
                                                <option value="">-Select Area-</option>
                                            </select>
                                            @if ($errors->has('variationsID'))
                                                <span class="text-danger">The field is required.</span>
                                            @endif
                                        </div>
                                    </div>

                                    <br>
                                    <div class="row">
                                        {{-- VARIATION ID --}}
                                        <input type="hidden" name="variationsID" id="variationsID" value="">
                                        <div class="col-md-6">
                                            <label for="">No. of Services </label>
                                            <input type="text" name="srTime" placeholder="SR-No. of Services"
                                                id="srTime" readonly class="form-control" readonly="" required />
                                            @if ($errors->has('srTime'))
                                                <span class="text-danger">The No. of Services field is required.</span>
                                            @endif

                                        </div>
                                        <div class="col-md-6">
                                            <label for="">Scheduled every </label>
                                            <input type="text" name="srInterval" placeholder="SR-Scheduled every"
                                                id="srInterval" readonly class="form-control" readonly=""  required/>
                                            @if ($errors->has('srInterval'))
                                                <span class="text-danger">The Scheduled every field is required.</span>
                                            @endif

                                        </div>


                                    </div><br>
                                    <div class="row">

                                        <div class="col-md-4">
                                            <label for="">Select Quantity </label>

                                            <span class="border rounded  form-control">
                                                <span class="px-2 ms-4 bg-light decrement"
                                                    style="cursor: pointer;">-</span>
                                                <span class="p-2 ms-3 quantity-value">1</span>
                                                <span class="px-2 ms-3 bg-light increment"
                                                    style="cursor: pointer;">+</span>
                                            </span>
                                        </div>
                                        <div class="col-md-8">
                                            {{-- COUPONS --}}
                                            <label for="coupons">Coupons</label>
                                            <select name="coupons" id="coupons" class="form-control">
                                                <option value="">- Coupons -</option>
                                            </select>

                                        </div>
                                    </div>
                                    <br>
                                    {{--NEW SECTION FOR DATE --}}
                                    {{-- <div class="row">
                                        <div class="col-md-6">
                                            {{-- CONTRACT START DATE
                                            <label for="contractStartDate">Contract Start Date</label>
                                            <input type="text" name="contractStartDate" id="contractStartDate"
                                                class="form-control" placeholder="Contract Start Date" readonly><br />
                                        </div>
                                        <div class="col-md-6">
                                            {{-- CONTRACT END DATE
                                            <label for="contractEndDate">Contract End Date</label>
                                            <input type="text" name="contractEndDate" id="contractEndDate"
                                                class="form-control" placeholder="Contract End Date" readonly><br />
                                        </div>

                                    </div> --}}
                                    <label for="price">Price (Without GST)</label>
                                    <input type="text" name="price" placeholder="Price" id="order_price" readonly
                                        class="form-control" required />
                                    @if ($errors->has('price'))
                                        <span class="text-danger">{{ $errors->first('price') }}</span>
                                    @endif
                                    <br>



                                    <div class="row">
                                        <div class="col-lg-6">
                                            <label for="desired_date">Contract Start Date</label>
                                            <input type="date" name="desired_date" placeholder="desired_date"
                                                id="desired_date" class="form-control" required />
                                            @if ($errors->has('desired_date'))
                                                <span class="text-danger">{{ $errors->first('desired_date') }}</span>
                                            @endif
                                        </div>
                                        <div class="col-lg-6">
                                            <label for="desired_time"> Time</label>
                                            <input type="time" name="desired_time" placeholder="desired_time"
                                                id="desired_time" class="form-control" required />
                                            @if ($errors->has('desired_time'))
                                                <span class="text-danger">{{ $errors->first('desired_time') }}</span>
                                            @endif
                                        </div>
                                    </div>

                                </div>
                                <div class="col-lg-6">
                                    <label for="fullname">Customer Name</label>
                                    <input type="text" name="fullname" placeholder="Enter Customer name" id="fullname"
                                        class="form-control"  required />
                                    @if ($errors->has('fullname'))
                                        <span class="text-danger">{{ $errors->first('fullname') }}</span>
                                    @endif
                                    <br>
                                    <label for="email">Email</label>
                                    <input type="email" name="email" placeholder="Enter Customer email" id="email"
                                        class="form-control" required  />
                                    @if ($errors->has('email'))
                                        <span class="text-danger">{{ $errors->first('email') }}</span>
                                    @endif
                                    <br>
                                    <label for="mobile">Mobile Number</label>
                                    <input type="text" name="mobile" placeholder="Enter Customer mobile Number"
                                        id="mobile" class="form-control" required />
                                    @if ($errors->has('mobile'))
                                        <span class="text-danger">{{ $errors->first('mobile') }}</span>
                                    @endif
                                    <br>
                                    <label for="landmark">Landmark</label>
                                    <input type="text" name="landmark" placeholder="Enter Customer landmark"
                                        id="landmark" class="form-control" required  />
                                    @if ($errors->has('landmark'))
                                        <span class="text-danger">{{ $errors->first('landmark') }}</span>
                                    @endif
                                    <br>
                                    <label for="address">Address</label>
                                    <input type="text" name="address" placeholder="Enter Customer address" id="address"
                                        class="form-control"  required />
                                    @if ($errors->has('address'))
                                        <span class="text-danger">{{ $errors->first('address') }}</span>
                                    @endif
                                    <br>
                                    <label for="pincode">Pincode</label>
                                    <input type="number" name="pincode" placeholder="Enter Customer pincode"
                                        id="pincode" class="form-control" required />
                                    @if ($errors->has('pincode'))
                                        <span class="text-danger">{{ $errors->first('pincode') }}</span>
                                    @endif
                                    <br>
                                    {{-- LATLONG --}}
                                    {{-- MAP MODE --}}
                                    <div class="modal fade" id="mapModal" tabindex="-1" role="dialog"
                                        aria-labelledby="mapModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-lg" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h4>Search Location</h4>

                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <input id="pac-input" class="controls form-control rounded-0"
                                                        type="text" placeholder="Search Box">
                                                    <div class="col-lg-12">

                                                        <div id="map-canvas" style="height: 500px; width:100%;"></div>
                                                        <div id="info"></div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">

                                                    <div id="latlong" class="mr-auto"></div>

                                                    <button type="button" class="btn btn-primary rounded-0"
                                                        id="save-location">Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    {{--NEW SECTION --}}
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label for="">House / Flat Number</label>
                                            <input type="text" name="houseNo" id="houseNo" class="form-control"
                                                placeholder="Customer House / Flat Number" required>
                                            
                                            @if ($errors->has('houseNo'))
                                                <span class="text-danger">{{ $errors->first('houseNo') }}</span>
                                            @endif
                                            
                                        </div>
                                        <div class="col-md-6">
                                            <label for="latlong">Latlong</label>
                                            <div class="d-flex">
                                                <input required type="text" id="clatlon" name="clatlon" class="form-control"
                                                    readonly ><br />
                                                <span id="latlong" class="btn btn-outline-secondary ms-2"
                                                    data-bs-toggle="modal" data-bs-target="#mapModal">Latlong</span>
                                            </div>
                                            @if ($errors->has('clatlon'))
                                                <span class="text-danger">{{ $errors->first('clatlon') }}</span>
                                            @endif
                                        </div>

                                    </div>
                                    {{-- NEW SECTION --}}
                                    <div class="row">
                                        <div class="col-md-12 mt-4">
                                            {{-- TECHNICIAN ASSIGN --}}

                                            <label for="technicianAssign">Technician Assign</label>
                                            <select name="technicianAssign" id="technicianAssign" class="form-control">
                                                <option value="" disabled selected>- Technician Assign -</option>
                                                @foreach ($employees as $employee)
                                                    @if(!empty($employee->emp_name))
                                                        <option value="{{ $employee->id }}">
                                                            {{ $employee->emp_name }}
                                                        </option>
                                                    @endif
                                                @endforeach
                                            </select><br />
                                        </div>

                                    </div>

                                </div>

                            </div>
                            <br>
                            <h4>Total Price : <b>0 /-</b> <small style="font-size:13px">(Inclusive of All Taxes)</small>
                            </h4>
                            <br>
                            <input type="submit" value="Place Order" class="btn btn-success" name="submit" id="">
                    </div>
                </div>
                </form>
            </div>
        </div>
</div>
</div>
</section>
{{-- ADD BUSINESS SUB REGION MODEL--}}
<div class="modal fade" id="addBusinesSub" tabindex="-1" aria-labelledby="addBusinessRegionModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addBusinessRegionModalLabel">Add Sub Business
                    Region</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form action="{{ route('admin.orders.serviceStore') }}" method="post" enctype="multipart/form-data">
                    @csrf

                    <!-- REGION NAME AND NAME OF THE BRANCH IN SAME ROW -->
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="regionName" class="form-label">Region Name</label>
                            <select class="form-control" id="regionName" name="region_name">
                                <option value="" disabled selected>- Select Region Name -</option>
                                @foreach($businessregion as $region)
                                    <option value="{{ $region->id }}">{{ $region->state }}</option>
                                @endforeach
                            </select>
                            @error('region_name')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="col-md-6">
                            <label for="branchName" class="form-label">Name of the Branch</label>
                            <input type="text" class="form-control" id="branchName" name="branch_name"
                                placeholder="Enter branch name">
                            @error('branch_name')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                    <!-- BRANCH CODE -->
                    <div class="mb-3">
                        <label for="branchCode" class="form-label">Branch Code</label>
                        <input type="text" class="form-control" id="branchCode" name="branch_code"
                            value="{{ old('branch_code') }}" readonly>
                        @error('branch_code')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <!-- REGISTERED OFFICE ADDRESS -->
                    <div class="mb-3">
                        <label for="officeAddress" class="form-label">Registered Office Address</label>
                        <textarea class="form-control" name="office_address" id="officeAddress" rows="2"
                            placeholder="Enter office address">{{ old('office_address') }}</textarea>
                        @error('office_address')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <!-- GST NUMBER AND AGRI-LICENCE IN SAME ROW -->
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="gstNumber" class="form-label">(GSTN) Number</label>
                            <select class="form-control" name="gstn" id="gstNumber" onchange="toggleImageUpload()">
                                <option value="" disabled selected>- Select GST Status -</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                                <option value="pending">Pending</option>
                            </select>
                            @error('gstn')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                            <!-- GST Image Upload -->
                            <div class="mt-2" id="gstImageContainer" style="display: none;">
                                <label for="gstImage" class="form-label">Upload GST Image</label>
                                <input type="file" class="form-control" id="gstImage" name="gst_image[]" multiple>
                            </div>
                        </div>

                        <!-- AGRI-LICENCE -->
                        <div class="col-md-6">
                            <label for="agriLicence" class="form-label">Agri-Licence</label>
                            <select class="form-control" name="agri_licence" id="agriLicence"
                                onchange="toggleImageUpload()">
                                <option value="" disabled selected>- Select Agri-Licence Status -</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                                <option value="pending">Pending</option>
                            </select>
                            @error('agri_licence')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                            <!-- Agri-Licence Image Upload -->
                            <div class="mt-2" id="agriImageContainer" style="display: none;">
                                <label for="agriImage" class="form-label">Upload Agri-Licence Image</label>
                                <input type="file" class="form-control" id="agriImage" name="agri_image[]" multiple>
                            </div>
                        </div>
                    </div>

                    <!-- SHOP AND ESTABLISHMENT AND CONTACT PERSON NAME IN SAME ROW -->
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="shopEstablishment" class="form-label">Shop and Establishment</label>
                            <select class="form-control" name="shop_establishment" id="shopEstablishment"
                                onchange="toggleImageUpload()">
                                <option value="" disabled selected>- Select Status -</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                                <option value="pending">Pending</option>
                            </select>
                            @error('shop_establishment')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                            <!-- Shop Establishment Image Upload -->
                            <div class="mt-2" id="shopImageContainer" style="display: none;">
                                <label for="shopImage" class="form-label">Upload Shop Establishment Image</label>
                                <input type="file" class="form-control" id="shopImage" name="shop_image[]" multiple>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <label for="contactPerson" class="form-label">Contact Person Name</label>
                            <input type="text" name="contact_person_name" class="form-control" id="contactPerson"
                                placeholder="Enter contact person name">
                            @error('contact_person_name')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                    <!-- CONTACT NUMBER AND EMAIL ID IN SAME ROW -->
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="contactNumber" class="form-label">Contact Number</label>
                            <input type="text" name="contact_number" class="form-control" id="contactNumber"
                                placeholder="Enter contact number">
                            @error('contact_number')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        <div class="col-md-6">
                            <label for="emailId" class="form-label">Email ID</label>
                            <input type="email" name="email_id" class="form-control" id="emailId"
                                placeholder="Enter email ID">
                            @error('email_id')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                    <!-- SAVE BUTTON -->
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary">Create Branch</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</div>


{{-- ADD BUSINESS REGION MODEL--}}
<div class="modal fade" id="addBusinessRegionModal" tabindex="-1" aria-labelledby="addBusinessRegionModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addBusinessRegionModalLabel">Add Business Region</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form action="{{ route('admin.orders.businessStore') }}" method="POST">
                    @csrf
                    <div class="mb-3">
                        <label for="regionName" class="form-label d-flex justify-content-between">
                            <span>Region Name</span>
                        </label>
                        <input type="text" class="form-control" id="regionName" name="regionName"
                            placeholder="Enter region name" required>
                    </div>

                    <div class="mb-3">
                        <label for="stateName" class="form-label d-flex justify-content-between">
                            <span>State's Name</span>
                        </label>
                        <input type="text" class="form-control" id="stateName" name="stateName"
                            placeholder="Enter State name" required>
                    </div><br />

                    <button type="submit" class="btn btn-primary">Save Region</button>
                </form>

            </div>
        </div>
    </div>
</div>

{{-- CUSTOMER DATA MODEL --}}
<div class="modal fade " id="customerModal" tabindex="-1" role="dialog" style="z-index: 9999 !important;">
    <div class="modal-dialog modal-xl" role="document" style="max-width: 65%;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Customer Data</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
                <table class="table table-bordered mt-3" id="customerTable" style="font-size:12px;">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Street Address</th>
                            <th>Landmark</th>
                            <th>Pincode</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Latlong</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>

        </div>
    </div>
</div>



@endsection
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.2/js/bootstrap.bundle.min.js"></script>
<script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCwqf4NpjMnz8J-LuEwgJAdVrn_1_5Zt6g&libraries=drawing,places"></script>
@section('scripts')

<script>
    // BUSINESS REGION ID 
    const getServiceUrl = "{{ route('admin.orders.getServiceCenter', ['regionId' => ':regionId']) }}";

    document.getElementById('businessRegion').addEventListener('change', function () {
        const regionId = this.value;

        if (regionId) {
            const url = getServiceUrl.replace(':regionId', regionId);
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(`Entries for Region ID ${regionId}:`, data);
                    const subRegionSelect = document.getElementById('businessSubRegion');
                    subRegionSelect.innerHTML = '<option value="" disabled selected>- Select Branch -</option>';
                    data.forEach(center => {
                        subRegionSelect.innerHTML += `<option value="${center.id}" data-branch-code="${center.branch_code}">${center.branch_name}</option>`;
                    });
                })
                .catch(error => console.error('Error fetching data:', error));
        } else {
            document.getElementById('businessSubRegion').innerHTML = '<option value="" disabled selected>- Select Branch -</option>';
        }
    });


    // SHOW BRANCH CODE BASED ON SELECTION 
    document.getElementById('businessSubRegion').addEventListener('change', function () {
        var selectedOption = this.options[this.selectedIndex];
        var branchCode = selectedOption.getAttribute('data-branch-code');
        document.getElementById('branchcode').value = branchCode;
    });
    document.addEventListener("DOMContentLoaded", function () {
        fetch('{{ route('admin.orders.getbranchcode') }}')
            .then(response => response.json())
            .then(data => {
                document.getElementById("branchCode").value = data.branch_code;
            })
            .catch(error => {
                console.error('Error fetching branch code:', error);
            });
    });

    // MAP AND SEARCH BOX IN MODEL
    var map, marker, searchBox;

    function InitMap() {

        var location;
        var latLon = document.getElementById('clatlon').value;
        if (latLon) {
            var latLng = latLon.split(',');
            var lat = parseFloat(latLng[0]);
            var lng = parseFloat(latLng[1]);

            if (!isNaN(lat) && !isNaN(lng)) {

                location = new google.maps.LatLng(lat, lng);
            } else {

                location = new google.maps.LatLng(12.9715987, 77.5945627);
            }
        } else {

            location = new google.maps.LatLng(12.9715987, 77.5945627);
        }
        var mapOptions = {
            zoom: 12,
            center: location,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        marker = new google.maps.Marker({
            map: map,
            position: location,
            draggable: true
        });

        searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('pac-input'));

        google.maps.event.addListener(searchBox, 'places_changed', function () {
            var places = searchBox.getPlaces();
            if (places.length == 0) return;

            var bounds = new google.maps.LatLngBounds();

            places.forEach(function (place) {
                if (!place.geometry || !place.geometry.location) return;

                marker.setPosition(place.geometry.location);
                bounds.extend(place.geometry.location);
            });

            map.fitBounds(bounds);
            map.setZoom(Math.min(map.getZoom(), 12));
        });
    }

    document.getElementById('save-location').addEventListener('click', function () {
        var position = marker.getPosition();
        console.log("Latitude: " + position.lat() + ", Longtude: " + position.lng());
        document.getElementById('clatlon').value = position.lat() + "," + position.lng();
        $('#mapModal').modal('hide');
    });

    $('#mapModal').on('shown.bs.modal', function () {
    if (!map) {
        InitMap();
    }
    const input = document.getElementById('pac-input');
    if (input) {
        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.setFields(['place_id', 'geometry', 'name']);  
        autocomplete.addListener('place_changed', function() {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                map.setCenter(place.geometry.location);
                map.setZoom(13); 
                marker.setPosition(place.geometry.location);
                document.getElementById('coordinates').value = `${lat}, ${lng}`;
                document.getElementById('info').innerHTML = `Selected: ${place.name}`;
            }
        });
    }
});




    // ADD RESIDENTIAL ORDER
    document.getElementById('addResidentialOrder').addEventListener('change', function () {
        var addresorderSection = document.getElementById('addresorder');

        if (this.value === 'residential') {
            addresorderSection.style.display = 'block';
        } else {
            addresorderSection.style.display = 'none';
        }
    });

    // ACCOUNT TYPE
    const accountTypeDropdown = document.getElementById('accountType');
    const accountSubTypeDropdown = document.getElementById('accountSubType');
    accountTypeDropdown.addEventListener('change', function () {
        if (this.value === 'bulkBooking') {
            accountSubTypeDropdown.innerHTML = `
        <option value="" disabled selected>- Account Sub Type -</option>
        <option value="Education & Institute">Education & Institute</option>
        <option value="Flat / Housing Society">Flat / Housing Society</option>
        <option value="Government">Government</option>
        <option value="Housing Society">Housing Society</option>
        <option value="Builder">Others</option>
        <option value="VIP">VIP</option>
        `;
        } else if (this.value === 'individual') {
            accountSubTypeDropdown.innerHTML = `
            <option value="Residential Order" selected>Residential Order</option>
            `;
        } else {
            accountSubTypeDropdown.innerHTML = `
            <option value="" disabled selected>- Account Sub Type -</option>
            `;
        }
    });

    const customerTypeDropdown = document.getElementById('customerType');
    const businessLeadDropdown = document.getElementById('businessLeadDropdown');
    const customerInput = document.getElementById('customerInput');


    const newCustomerOptions = `
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
    `;
    
        const existingCustomerOption = `
    <option value="na" selected>N/A</option>
    `;

    customerTypeDropdown.addEventListener('change', function () {
        if (this.value === 'newCustomer') {
            businessLeadDropdown.innerHTML = newCustomerOptions;
            businessLeadDropdown.style.display = 'block';
            customerInput.style.display = 'none';

        } else if (this.value === 'existingCustomer') {
            businessLeadDropdown.innerHTML = existingCustomerOption;
            businessLeadDropdown.style.display = 'none';
            customerInput.style.display = 'block'
            customerInput.addEventListener('input', function () {
                console.log(customerInput.value);
            });



        } else {
            businessLeadDropdown.innerHTML = '';
            businessLeadDropdown.style.display = 'none';
        }
    });

    // GET EXISTING CUSTOMER DETAILS (Name, Pincode, Mobile number, Pincode)
    document.getElementById('costomerData').addEventListener('click', function () {
        var cusID = document.getElementById('customerID').value.trim();
        var errorMessage = document.getElementById('error-message');

        // Validate customer ID
        if (!/^\d{10}$/.test(cusID)) {
            errorMessage.style.display = 'block';
        } else {
            errorMessage.style.display = 'none';
            console.log('Mobile Number:', cusID);

            fetch("{{ route('admin.orders.getCustomerData', ['cusID' => ':cusID']) }}".replace(':cusID', cusID))
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch customer data');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Customer Data:', data);

                    const tableBody = document.getElementById("customerTable").getElementsByTagName("tbody")[0];
                    tableBody.innerHTML = ""; // Clear the table body

                    data.forEach(customer => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${customer.name}</td>
                            <td>${customer.address}</td>
                            <td>${customer.landmark}</td>
                            <td>${customer.pincode}</td>
                            <td>${customer.mobile}</td>
                            <td>${customer.email}</td>
                            <td>${customer.latitude && customer.longitude ? `${customer.latitude},${customer.longitude}` : 'N/A'}</td>
                            <td><span class="btn btn-primary btn-sm address-btn">Add</span></td>
                            `;
                        tableBody.appendChild(row);

                        // Add event listener to the "Add" button
                        const addButton = row.querySelector('.address-btn');
                        addButton.addEventListener('click', () => {
                            console.log('Customer Data:', customer);
                            document.getElementById('fullname').value = customer.name;
                            document.getElementById('address').value = customer.address;
                            document.getElementById('landmark').value = customer.landmark;
                            document.getElementById('pincode').value = customer.pincode;
                            document.getElementById('mobile').value = customer.mobile;
                            document.getElementById('email').value = customer.email;
                            document.getElementById('clatlon').value = customer.latitude && customer.longitude
                                ? `${customer.latitude}, ${customer.longitude}`
                                : '';

                            $('#customerModal').modal('hide');
                        });
                    });

                    // Show modal
                    $('#customerModal').modal('show');
                })
                .catch(error => {
                    console.error('Error fetching customer data:', error);
                    alert('Failed to fetch customer data. Please try again.');
                });
        }
    });




    // GST
    function toggleImageUpload() {
        const gstStatus = document.getElementById('gstNumber').value;
        const agriStatus = document.getElementById('agriLicence').value;
        const shopStatus = document.getElementById('shopEstablishment').value;
        const gstImageContainer = document.getElementById('gstImageContainer');
        if (gstStatus === 'yes') {
            gstImageContainer.style.display = 'block';
        } else {
            gstImageContainer.style.display = 'none';
        }
        const agriImageContainer = document.getElementById('agriImageContainer');
        if (agriStatus === 'yes') {
            agriImageContainer.style.display = 'block';
        } else {
            agriImageContainer.style.display = 'none';
        }
        const shopImageContainer = document.getElementById('shopImageContainer');
        if (shopStatus === 'yes') {
            shopImageContainer.style.display = 'block';
        } else {
            shopImageContainer.style.display = 'none';
        }
    }



    document.addEventListener('DOMContentLoaded', function () {
        const quantityValueSpan = document.querySelector('.quantity-value');
        const incrementBtn = document.querySelector('.increment');
        const decrementBtn = document.querySelector('.decrement');
        const priceInput = document.getElementById('order_price');
        const totalPriceDisplay = document.querySelector('h4 b');


        // Hidden inputs
        const hiddenQuantityInput = document.getElementById('hidden_quantity');
        const hiddenTotalPriceInput = document.getElementById('hidden_total_price');
        const hiddenTaxInput = document.getElementById('hidden_tax');
        const hiddenImage = document.getElementById('hidden_image');
        const hiddenProductName = document.getElementById('hidden_product_name');


        let currentPrice = 0;
        let serviceTypePrice = 0;
        let serviceAreaPrice = 0;
        let taxAmount = 0;
        let taxType = ''; // 'percent' or 'amount'
        let taxRate = 0; // Holds the tax rate value if it's percentage
        let subtotal = 0;



        function calculateTotal() {
            const quantity = parseInt(quantityValueSpan.textContent) || 1;
            hiddenQuantityInput.value = quantity; // Update hidden quantity input

            if (!isNaN(currentPrice) && !isNaN(quantity)) {
                subtotal = (serviceTypePrice + serviceAreaPrice) * quantity;
                let total = subtotal;

                // Calculate tax based on taxType
                if (taxType === 'percent') {
                    // Calculate tax as percentage of the subtotal
                    taxAmount = (subtotal * taxRate / 100);
                } else if (taxType === 'amount') {
                    // Tax amount is fixed per item
                    taxAmount = parseFloat(hiddenTaxInput.value) || 0;
                }

                total = subtotal + taxAmount;
                priceInput.value = subtotal;

                // Update the display
                totalPriceDisplay.innerHTML = ` ${subtotal.toFixed(2)} + ${taxAmount.toFixed(2)} = ${total.toFixed(2)} /- `;

                hiddenTotalPriceInput.value = total.toFixed(2); // Update hidden total price input
                hiddenTaxInput.value = taxAmount.toFixed(2); // Update hidden tax input with calculated tax
            }
        }

        // Fetch service details based on selected service
        function fetchServiceDetails(serviceId) {
            fetch(`get-service-details/${serviceId}`)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        priceInput.value = data.discounted_price;
                        hiddenImage.value = data.image;
                        hiddenProductName.value = data.product_name;
                        currentPrice = parseFloat(data.discounted_price);
                        taxRate = parseFloat(data.tax || 0); // Store tax rate if percentage
                        taxType = data.tax_type; // Tax type: 'amount' or 'percent'
                        hiddenTaxInput.value = taxRate; // Update hidden tax input with tax rate
                        calculateTotal();
                    }
                });
        }

        // Handle quantity increment
        incrementBtn.addEventListener('click', function () {
            let currentValue = parseInt(quantityValueSpan.textContent);
            if (!isNaN(currentValue)) {
                currentValue++;
                quantityValueSpan.textContent = currentValue;
                calculateTotal();
            }
        });

        // Handle quantity decrement
        decrementBtn.addEventListener('click', function () {
            let currentValue = parseInt(quantityValueSpan.textContent);
            if (!isNaN(currentValue) && currentValue > 1) {
                currentValue--;
                quantityValueSpan.textContent = currentValue;
                calculateTotal();
            }
        });

        // Ensure total price is calculated whenever price input changes
        priceInput.addEventListener('input', function () {
            currentPrice = parseFloat(priceInput.value) || 0;
            calculateTotal();
        });

        // Event listeners for category, subcategory, and service selection
        document.getElementById('order_category').addEventListener('change', function () {
            const categoryId = this.value;
            if (categoryId) {
                fetchSubcategories(categoryId);
            } else {
                resetDropdowns();
            }
        });

        document.getElementById('order_subcategory').addEventListener('change', function () {
            const subcategoryId = this.value;
            if (subcategoryId) {
                fetchServices(subcategoryId);
            } else {
                resetServiceDropdown();
            }
        });

        document.getElementById('order_service').addEventListener('change', function () {
            const serviceId = this.value;
            console.log("serviceId -- " + serviceId);
            if (serviceId) {
                fetchServiceDetails(serviceId);
                fetchServiceType(serviceId);
                fetchServiceArea(serviceId);
            } else {
                resetPriceAndTax();
            }
        });




        document.getElementById('order_service_area').addEventListener('change', function () {
            serviceAreaPrice = parseFloat(this.value) || 0;

            const selectedOption = this.options[this.selectedIndex];

            // Retrieve the value and textContent of the selected option
            const optionValue = selectedOption.value;
            const optionText = selectedOption.textContent;

            document.getElementById('serviceAreaPriceValue').value = optionText;

            calculateTotal();
        });


        function fetchSubcategories(categoryId) {
            fetch(`get-subcategories/${categoryId}`)
                .then(response => response.json())
                .then(data => {
                    const subcategorySelect = document.getElementById('order_subcategory');
                    subcategorySelect.innerHTML = '<option value="">-select Sub-Category-</option>';
                    data.forEach(subcategory => {
                        subcategorySelect.innerHTML += `<option value="${subcategory.id}">${subcategory.subcategory_name}</option>`;
                    });
                });
            fetch(`get-coupons/${categoryId}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched Coupons Data:', data);
                    const couponsData = {};
                    const couponsSelect = document.getElementById('coupons');

                    couponsSelect.innerHTML = '<option value="">- Coupons -</option>';
                    data.forEach(coupon => {
                        couponsData[coupon.id] = {
                            amount: coupon.amount,
                            percentage: coupon.percentage,
                            couponName: coupon.coupon_name
                        };

                        couponsSelect.innerHTML += `<option value="${coupon.id}">${coupon.coupon_name}</option>`;
                    });
                    // console.log('Coupons Data:', couponsData);
                    couponsSelect.addEventListener('change', () => {
                        const selectedId = couponsSelect.value;
                        if (selectedId) {
                            const selectedCoupon = couponsData[selectedId];
                            if (selectedCoupon) {
                                // console.log(`Amount: ${selectedCoupon.amount}, Percentage: ${selectedCoupon.percentage}`);
                                if (selectedCoupon.amount !== '' && selectedCoupon.amount != null) {
                                    copAmount = parseInt(selectedCoupon.amount);
                                    const finaltot = (subtotal + taxAmount - copAmount).toFixed(2);
                                    totalPriceDisplay.innerHTML = `${subtotal.toFixed(2)} + ${taxAmount.toFixed(2)} - ${copAmount.toFixed(2)} = ${finaltot}
                                        /-`;

                                    // Update hidden inputs
                                    hiddenTotalPriceInput.value = finaltot;
                                    document.getElementById('couponsprice').value = copAmount;

                                } else {
                                    const finaltot = (subtotal).toFixed(2);
                                    const copPer = (selectedCoupon.percentage / 100) * finaltot;
                                    const totalAfterDiscount = (finaltot - copPer + taxAmount).toFixed(2);
                                    totalPriceDisplay.innerHTML = `${subtotal.toFixed(2)} + ${taxAmount.toFixed(2)} - ${copPer.toFixed(2)} =
                                        ${totalAfterDiscount} /-`;
                                    // Update hidden inputs
                                    hiddenTotalPriceInput.value = totalAfterDiscount;
                                    document.getElementById('couponsprice').value = copPer;
                                }
                            }
                        } else {
                            console.log('No coupon selected.');
                        }
                    });

                })
                .catch(error => {
                    console.error('Error fetching coupons:', error);
                });

        }

        function fetchServices(subcategoryId) {
            fetch(`get-services/${subcategoryId}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const serviceSelect = document.getElementById('order_service');
                    serviceSelect.innerHTML = '<option value="">-select Service-</option>';
                    data.forEach(service => {
                        serviceSelect.innerHTML += `<option value="${service.id}">${service.product_name}</option>`;
                    });
                });
        }

    

        function fetchServiceType(serviceId) {
            console.log(serviceId);
            fetch(`get-service-variation-type/${serviceId}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Response From ", data);
                    console.log(data);
                    const serviceTypeSelect = document.getElementById('attribute');
                    serviceTypeSelect.innerHTML = '<option value="">-select Service-</option>';

                    data.services.forEach(service => {
                        serviceTypeSelect.innerHTML += `<option value="${service.id}|${data.product_id}">${service.attribute}</option>`;
                    });
                    serviceTypeSelect.addEventListener('change', function () {

                        const selectedValue = serviceTypeSelect.value;
                        console.log('Selected value:', selectedValue);

                        if (selectedValue) {
                            // Check if the selected value has a '|' and split
                            const [attributeId, productId] = selectedValue.split('|');
                            console.log('Selected Attribute ID (Service ID):', attributeId);
                            console.log('Product ID:', productId);
                            fetchServiceArea(attributeId, productId);
                        } else {
                            console.log('No service selected.');
                        }
                    });
                });
        }


        function fetchServiceArea(serviceId, productId) {
            console.log('Fetching service area for Attribute ID:', serviceId, 'and Product ID:', productId);

            fetch(`get-service-variation-area/${serviceId}/${productId}`)
                .then(response => response.json())
                .then(data => {
                    const serviceAreaSelect = document.getElementById('order_service_area');
                    serviceAreaSelect.innerHTML = '<option value="">-select Service-</option>';
                    data.forEach(service => {
                        // Combine the values to split later
                        const combinedValue = `${service.variation_times}${service.variation_interval}`;

                        // Split the combined value into two parts: variation_times and variation_interval
                        const variationTimes = service.variation_times;
                        const variationInterval = service.variation_interval;
                        const variationID = service.id;

                        // Add the option with both values
                        serviceAreaSelect.innerHTML += `
                        <option id="${combinedValue}" value="${service.discounted_variation_price}" data-variation-times="${variationTimes}"
                            data-variatio-id="${variationID}" data-variation-interval="${variationInterval}">
                            ${service.variation}
                        </option>
                        `;
                    });

                    serviceAreaSelect.addEventListener('change', (event) => {
                        const selectedOption = event.target.selectedOptions[0];
                        const variationTimes = selectedOption.getAttribute('data-variation-times');
                        const variationInterval = selectedOption.getAttribute('data-variation-interval');
                        const variationID = selectedOption.getAttribute('data-variatio-id');
                        console.log('Selected Variation ID ', variationID);
                        console.log('Selected Variation Times:', variationTimes);
                        console.log('Selected Variation Interval:', variationInterval);
                        // Set the values in corresponding fields
                        document.getElementById('variationsID').value = variationID;
                        document.getElementById('srTime').value = variationTimes;
                        document.getElementById('srInterval').value = variationInterval;

                    });
                })
                .catch(error => console.error('Error fetching service area data:', error));
        }




        function resetDropdowns() {
            document.getElementById('order_subcategory').innerHTML = '<option value="">-select Sub-Category-</option>';
            document.getElementById('order_service').innerHTML = '<option value="">-select Service-</option>';
            resetPriceAndTax();
        }

        function resetServiceDropdown() {
            document.getElementById('order_service').innerHTML = '<option value="">-select Service-</option>';
            resetPriceAndTax();
        }

        function resetPriceAndTax() {
            priceInput.value = '';
            currentPrice = 0;
            serviceTypePrice = 0;
            serviceAreaPrice = 0;
            taxAmount = 0;
            taxType = '';
            taxRate = 0; // Reset tax rate
            let copAmount = 0; // Fixed discount amount
            let copPar = 0;
            calculateTotal();
        }
    });

</script>
@endsection