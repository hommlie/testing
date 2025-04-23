@extends('layouts.admin')
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
<style>
    .btn-primary.text-light {
        color: #fff !important;
    }

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
                    <div class="card-header bg-light">
                        <h4 class="card-title">{{ trans('Edit Order') }}</h4>
                        <a href="{{route('admin.orders')}}"
                            class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right"
                            style="margin-top: -30px;">
                            {{ trans('View Orders') }}
                        </a>
                    </div>

                    <div class="card-body p-3">
                        <form action="{{ route('admin.orders.updateorder', $data->id) }}" method="post"
                            enctype="multipart/form-data">
                            @csrf
                            @method('PUT')
                            <input type="hidden" name="hidden_quantity" id="hidden_quantity" value="{{ $data->qty }}">
                            <input type="hidden" name="hidden_total_price" id="hidden_total_price">
                            <input type="hidden" name="hidden_tax" value="{{ $data->tax }}" id="hidden_tax">
                            <input type="hidden" name="hidden_image" id="hidden_image" value="{{ $data->image }}">
                            <input type="hidden" name="hidden_product_name" id="hidden_product_name"
                                value="{{ $data->product_name }}">
                            <input type="hidden" name="serviceTypePriceValue" id="serviceTypePriceValue">
                            <input type="hidden" name="serviceAreaPriceValue" id="serviceAreaPriceValue">
                            <input type="hidden" name="couponsprice" id="couponsprice"
                                value="{!! $data->discount_amount !!}">

                            <div id="addresorder">
                                <div class="row mb-3">
                                    <div class="col-lg-4">
                                        {{-- SERVICE CENTER TYPE --}}
                                        <label for="serviceCenterType"><span class="text-success">**</span> Service
                                            Center Type <span class="text-success">**</span></label>
                                        <select name="serviceCenterType" id="serviceCenterType" class="form-control">
                                            <option value="" disabled <?= empty($data->service_center_type) ? 'selected' : ''; ?>>- Service Center Type -</option>
                                            <option value="hommlie">Hommlie</option>
                                            <option value="vendor">Vendor</option>
                                            <option value="franchisee">Franchisee</option>
                                        </select>
                                        @error('serviceCenterType')
                                            <div class="text-danger">{{ $message }}</div>
                                        @enderror
                                        <br />

                                        {{-- ACCOUNT TYPE --}}

                                        <label for="accountType"> <span class="text-success">**</span> Account Type
                                            <span class="text-success">**</span></label>
                                        <select name="accountType" id="accountType" class="form-control">
                                            <option value="" disabled <?= empty($data->account_sub_type) ? 'selected' : ''; ?>>- Account Type -</option>
                                            <option value="individual" <?= $data->account_sub_type === "individual" ? 'selected' : ''; ?>>Individual</option>
                                            <option value="bulkBooking" <?= $data->account_sub_type === "bulkBooking" ? 'selected' : ''; ?>>Bulk Booking</option>
                                        </select>

                                        @error('accountType')
                                            <div class="text-danger">{{ $message }}</div>
                                        @enderror
                                        <br />
                                        {{-- BUSINESS SUB REGION --}}
                                        <label for="businessSubRegion"> <span class="text-success">**</span> Business
                                            Sub Region <span class="text-success">**</span></label>
                                        <select name="businessSubRegion" id="businessSubRegion" class="form-control">
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
                                            value="{{ $data->employee_name ?? optional($userdata->first())->name ?? 'Default Name' }}" readonly>
                                        @error('employeeName')\
                                            <div class="text-danger">{{ $message }}</div>

                                        @enderror
                                        <br />

                                        {{-- ACCOUNT SUB TYPE --}}
                                        <label for="accountSubType"><span class="text-success">**</span> Account Sub
                                            Type <span class="text-success">**</span></label>
                                        <select name="accountSubType" id="accountSubType" name="accountSubType"
                                            class="form-control">
                                            <option value="" disabled selected>- Account Sub Type -</option>
                                        </select>
                                        @error('accountSubType')
                                            <div class="text-danger">{{ $message }}</div>
                                        @enderror
                                        <br />

                                        {{-- BRANCH CODE --}}

                                        <label for="branchCode" class="form-label"><span class="text-success">**</span>
                                            Branch Code <span class="text-success">**</span></label>
                                        <input type="text" class="form-control" id="branchcode" name="branchcode"
                                            value="{{$data->branch_code}}" readonly placeholder="">
                                        @error('branchcode')
                                            <div class="text-danger">{{ $message }}</div>
                                        @enderror
                                        <br />

                                    </div>

                                    <div class="col-lg-4">
                                        {{-- BILLING --}}
                                        <label for="billing"><span class="text-success">**</span> Billing <span
                                                class="text-success">**</span></label>
                                        <select name="billing" id="billing" class="form-control">
                                            <option value="" disabled <?= empty($data->billing) ? 'selected' : ''; ?>>-
                                                Billing -</option>
                                            <option value="headOffice" <?= $data->billing === "headOffice" ? 'selected' : ''; ?>>Head Office</option>
                                            <option value="regionalOffice" <?= $data->billing === "regionalOffice" ? 'selected' : ''; ?>>Regional Office</option>
                                            <option value="branchOffice" <?= $data->billing === "branchOffice" ? 'selected' : ''; ?>>Branch Office</option>
                                        </select>

                                        @error('billing')
                                            <div class="text-danger">{{ $message }}</div>
                                        @enderror
                                        <br />
                                        {{-- BUSINESS REGION --}}
                                        <label for="businessRegion"><span class="text-success">**</span> Business Region
                                            <span class="text-success">**</span></label>
                                        <select name="businessRegion" id="businessRegion" class="form-control">
                                            <option value="" disabled selected>- Business Region -</option>
                                            @foreach($businessregion as $region)
                                                <option value="{{ $region->id}}" {{ $region->id == $data->business_region ? 'selected' : '' }}>{{ $region->state }}</option>
                                            @endforeach
                                        </select>
                                        @error('businessRegion')
                                            <div class="text-danger">{{ $message }}</div>
                                        @enderror
                                        <br />

                                        {{-- BILL TO ACCOUNT NAME --}}
                                        <label for="billToAccountName"><span class="text-success">**</span> Bill To:
                                            Account Name <span class="text-success">**</span></label>
                                        <input type="text" name="billToAccountName" id="billToAccountName"
                                            class="form-control" placeholder="Bill To: Account Name"
                                            value="{{ $data->bill_to_Name }}">

                                    </div>
                                </div>
                            </div>
                            {{--NEW SECTION FOR CUSTOMER INFO --}}
                            <div class="row">
                                <div class="col-md-12">
                                    {{-- CUSTOMER TYPE --}}
                                    <label for="customerType"><span class="text-success">**</span> Customer Type <span
                                            class="text-success">**</span></label>
                                    <select name="customerType" id="customerType" class="form-control">
                                        <option value="" disabled <?= empty($data->customer_type) ? 'selected' : ''; ?>>-
                                            Customer Type -</option>
                                        <option value="newCustomer" <?= $data->customer_type === "newCustomer" ? 'selected' : ''; ?>>New Customer</option>
                                        <option value="existingCustomer" <?= $data->customer_type === "existingCustomer" ? 'selected' : ''; ?>>Existing Customer</option>
                                    </select>

                                    @error('customerType')
                                        <div class="text-danger">{{ $message }}</div>
                                    @enderror
                                    <br />
                                </div>
                            </div>

                            <!-- <label for=""><u>Basic Details</u></label> -->
                            <div class="row mb-3">
                                <div class="col-lg-6">
                                    <label for="category"><span class="text-danger">**</span> Category <span
                                            class="text-danger">**</span></label>
                                    <select name="category" id="order_category" class="form-control">
                                        <option value="">-select Category-</option>
                                        @foreach ($category as $cat)
                                            <option value="{{ $cat->id }}" {{ $cat->id == $getCategoryId->cat_id ? 'selected' : '' }}>{{ $cat->category_name }}</option>
                                        @endforeach
                                    </select>
                                    @if ($errors->has('category'))
                                        <span class="text-danger">{{ $errors->first('category') }}</span>
                                    @endif
                                    <br>

                                    <label for="subcategory"> <span class="text-danger">**</span> Sub-Category <span
                                            class="text-danger">**</span></label>
                                    <select name="subcategory" id="order_subcategory" class="form-control">
                                        <option value="">-select Sub-Category-</option>

                                        {{-- @foreach ($subcategory as $subcat)
                                        <option value="{{ $subcat->id }}" {{ $subcat->id == $getCategoryId->subcat_id ?
                                            'selected' : '' }}>{{ $subcat->subcategory_name }}</option>
                                        @endforeach --}}
                                    </select>
                                    @if ($errors->has('subcategory'))
                                        <span class="text-danger">{{ $errors->first('subcategory') }}</span>
                                    @endif
                                    <br>

                                    <label for="service"><span class="text-danger">**</span> Service <span
                                            class="text-danger">**</span></label>
                                    <select name="service" id="order_service" class="form-control">
                                        <option value="">-select Service-</option>
                                        @foreach ($product as $products)
                                            <option value="{{ $products->id }}" {{ $products->id == $getCategoryId->product_id ? 'selected' : '' }}>{{ $products->product_name }}</option>
                                        @endforeach
                                    </select>
                                    @if ($errors->has('service'))
                                        <span class="text-danger">{{ $errors->first('service') }}</span>
                                    @endif

                                    <br>
                                    <label for="variation"><span class="text-danger">**</span> Variation <span
                                            class="text-danger">**</span></label>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <select name="attribute" id="attribute" class="form-control">
                                                <option value="">-select Type-</option>

                                            </select>
                                            @if ($errors->has('order_type'))
                                                <span class="text-danger">{{ $errors->first('order_type') }}</span>
                                            @endif
                                        </div>

                                        <div class="col-lg-6">
                                            <select name="order_service_area" id="order_service_area"
                                                class="form-control">
                                                <option value="">-select Area-</option>

                                            </select>
                                            @if ($errors->has('order_area'))
                                                <span class="text-danger">{{ $errors->first('order_area') }}</span>
                                            @endif
                                        </div>
                                    </div>

                                    <br>
                                    <div class="row">
                                        {{-- VARIATION ID --}}
                                        <input type="hidden" name="variationsID" id="variationsID" value="">
                                        <div class="col-md-6">
                                            <label for=""><span class="text-danger">**</span> No. of Services <span
                                                    class="text-danger">**</span></label>
                                            <input type="text" name="srTime" placeholder="SR-No. of Services"
                                                id="srTime" readonly class="form-control" readonly="" />
                                            @if ($errors->has('srTime'))
                                                <span class="text-danger">The No. of Services field is required.</span>
                                            @endif

                                        </div>
                                        <div class="col-md-6">
                                            <label for=""><span class="text-danger">**</span> Scheduled every <span
                                                    class="text-danger">**</span> </label>
                                            <input type="text" name="srInterval" placeholder="SR-Scheduled every"
                                                id="srInterval" readonly class="form-control" readonly="" />
                                            @if ($errors->has('srInterval'))
                                                <span class="text-danger">The Scheduled every field is required.</span>
                                            @endif

                                        </div>


                                    </div><br>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <label for=""><span class="text-danger">**</span> Select Quantity <span
                                                    class="text-danger">**</span></label>
                                            <br>
                                            <span class="border rounded p-2 form-control">
                                                <span class="px-2 bg-light ms-4 decrement"
                                                    style="cursor: pointer;">-</span>
                                                <span class="p-2 ms-3 quantity-value">{{ $data->qty }}</span>
                                                <span class="px-2 ms-3 bg-light increment"
                                                    style="cursor: pointer;">+</span>
                                            </span>
                                        </div>
                                        <div class="col-md-8">
                                            {{-- COUPONS --}}
                                            <label for="coupons"><span class="text-danger">**</span> Coupons <span
                                                    class="text-danger">**</span></label>
                                            <select name="coupons" id="coupons" class="form-control">
                                                <option value="">- Coupons -</option>
                                            </select>

                                        </div>

                                    </div>
                                    <br>
                                    <label for="price"><span class="text-danger">**</span> Price (Without GST) <span
                                            class="text-danger">**</span> </label>
                                    <input type="hidden" id="order_price">
                                    <input type="text" name="price" placeholder="Price" id=""
                                        value="{{ number_format($data->price, 2)}}" readonly class="form-control" />
                                    @if ($errors->has('price'))
                                        <span class="text-danger">{{ $errors->first('price') }}</span>
                                    @endif
                                    <br />
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <label for="desired_date"><span class="text-success">**</span> Desired date
                                                <span class="text-success">**</span></label>
                                            <input type="date" name="desired_date" placeholder="desired_date"
                                                value="{{ $data->desired_date }}" id="desired_date"
                                                class="form-control" />
                                            @if ($errors->has('desired_date'))
                                                <span class="text-danger">{{ $errors->first('desired_date') }}</span>
                                            @endif
                                        </div>
                                        <div class="col-lg-6">
                                            <label for="desired_time"><span class="text-success">**</span> Desired Time
                                                <span class="text-success">**</span></label>
                                            <input type="time" name="desired_time" placeholder="desired_time"
                                                value="{{ $data->desired_time }}" id="desired_time"
                                                class="form-control" />
                                            @if ($errors->has('desired_time'))
                                                <span class="text-danger">{{ $errors->first('desired_time') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <label for="fullname"><span class="text-success">**</span> Customer Name <span
                                            class="text-success">**</span></label>
                                    <input type="text" name="fullname" placeholder="Enter Customer name"
                                        value="{{ $data->full_name }}" id="fullname" class="form-control" />
                                    @if ($errors->has('fullname'))
                                        <span class="text-danger">{{ $errors->first('fullname') }}</span>
                                    @endif
                                    <br>
                                    <label for="email"><span class="text-success">**</span> Email <span
                                            class="text-success">**</span></label>
                                    <input type="email" name="email" placeholder="Enter Customer email" id="email"
                                        value="{{ $data->email }}" class="form-control" />
                                    @if ($errors->has('email'))
                                        <span class="text-danger">{{ $errors->first('email') }}</span>
                                    @endif
                                    <br>
                                    <label for="mobile"> <span class="text-success">**</span> Mobile Number <span
                                            class="text-success">**</span></label>
                                    <input type="text" name="mobile" placeholder="Enter Customer mobile Number"
                                        value="{{ $data->mobile }}" id="mobile" class="form-control" />
                                    @if ($errors->has('mobile'))
                                        <span class="text-danger">{{ $errors->first('mobile') }}</span>
                                    @endif
                                    <br>
                                    <label for="landmark"><span class="text-success">**</span> Landmark <span
                                            class="text-success">**</span></label>
                                    <input type="text" name="landmark" placeholder="Enter Customer landmark"
                                        id="landmark" value="{{ $data->landmark }}" class="form-control" />
                                    @if ($errors->has('landmark'))
                                        <span class="text-danger">{{ $errors->first('landmark') }}</span>
                                    @endif
                                    <br>
                                    <label for="address"><span class="text-success">**</span> Address <span
                                            class="text-success">**</span></label>
                                    <input type="text" name="address" placeholder="Enter Customer address" id="address"
                                        value="{{ $data->street_address }}" class="form-control" />
                                    @if ($errors->has('address'))
                                        <span class="text-danger">{{ $errors->first('address') }}</span>
                                    @endif
                                    <br>

                                    <label for="pincode"><span class="text-success">**</span> Pincode <span
                                            class="text-success">**</span></label>
                                    <input type="number" name="pincode" placeholder="Enter Customer pincode"
                                        value="{{ $data->pincode }}" id="pincode" class="form-control" />
                                    @if ($errors->has('pincode'))
                                        <span class="text-danger">{{ $errors->first('pincode') }}</span>
                                    @endif
                                    <br>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <label for="pincode"><span class="text-danger">**</span> Total Price
                                                (Without
                                                Coupons)<span class="text-danger">**</span></label>
                                            <input type="text" name="order_total" placeholder="Total Amount"
                                                value="{{ $data->order_total + $data->discount_amount }}"
                                                id="order_total" class="form-control" readonly />

                                            @if ($errors->has('order_total'))
                                                <span class="text-danger">{{ $errors->first('order_total') }}</span>
                                            @endif

                                            <br>
                                        </div>
                                        <div class="col-md-6">
                                            <label for=""><span class="text-danger">**</span> Total Price (With
                                                Coupons)<span class="text-danger">**</span></label>
                                            <input type="text" name="" placeholder="" value="{{ $data->order_total }}"
                                                id="" class="form-control" readonly />

                                            @if ($errors->has('order_total'))
                                                <span class="text-danger">{{ $errors->first('order_total') }}</span>
                                            @endif
                                            <br>

                                        </div>
                                    </div>

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
                                            <label for=""><span class="text-success">**</span> House / Flat Number <span
                                                    class="text-success">**</span></label>
                                            <input type="text" name="houseNo" id="houseNo" class="form-control"
                                                placeholder="Customer House / Flat Number"
                                                value="{{ $data->house_number }}">
                                            @if ($errors->has('houseNo'))
                                                <span class="text-danger">{{ $errors->first('houseNo') }}</span>
                                            @endif
                                        </div>
                                        <div class="col-md-6">
                                            <label for="latlong"> <span class="text-success">**</span> Latlong <span
                                                    class="text-success">**</span></label>
                                            <div class="d-flex">
                                                <input type="text" id="clatlon" name="clatlon" class="form-control"
                                                    readonly value="{{$data->latitude}},{{$data->longitude}}"><br />
                                                <span id="latlong" class="btn btn-outline-secondary ms-2"
                                                    data-bs-toggle="modal" data-bs-target="#mapModal">Latlong</span>
                                            </div>
                                            @if ($errors->has('clatlon'))
                                                <span class="text-danger">{{ $errors->first('clatlon') }}</span>
                                            @endif
                                        </div>

                                    </div><br>

                                    {{-- NEW SECTION --}}
                                    <div class="row">
                                        <div class="col-md-12">
                                            {{-- TECHNICIAN ASSIGN --}}
                                            <label for="technicianAssign"><span class="text-success">**</span>
                                                Technician Assign <span class="text-success">**</span></label>
                                            <select name="technicianAssign" id="technicianAssign" class="form-control">
                                                <option value="" disabled selected>- Technician Assign -</option>
                                                @foreach ($employees as $employee)
                                                    @if(!empty($employee->emp_name))
                                                        <option value="{{ $employee->id }}" {{ $employee->id == $data->assigned_to ? 'selected' : '' }}>
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
                            <h5 class="fw-bold">
                                Services Price <span class="fs-6">(Without Coupons)</span> :
                                {!! number_format($data->price, 2) !!} + {!! number_format($data->tax, 2) !!} =
                                {!! number_format($data->price + $data->tax, 2) !!}
                            </h5>
                            <br>
                            <!-- <br> -->
                            <input type="submit" value="Update Order" class="btn btn-success" name="submit" id="">


                    </div>
                </div>
                </form>
            </div>
        </div>
</div>
</div>

</section>
</div>


@endsection
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.2/js/bootstrap.bundle.min.js"></script>
<script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCwqf4NpjMnz8J-LuEwgJAdVrn_1_5Zt6g&libraries=drawing,places"></script>

<script src="https://www.google.com/recaptcha/api.js"></script>

@section('scripts')
<script>

    // BUSINESS REGION ID 
    const getServiceUrl = "{{ route('admin.orders.getServiceCenter', ['regionId' => ':regionId']) }}";

    document.getElementById('businessRegion').addEventListener('change', function () {
    const regionId = this.value;
    const subRegionSelect = document.getElementById('businessSubRegion');
    if (!subRegionSelect) {
        return;
    }

    if (regionId) {
        const url = getServiceUrl.replace(':regionId', regionId);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                let optionsHtml = '<option value="" disabled selected>- Select Branch -</option>';
                const businessSubRegion = {!! json_encode($data->business_sub_region ?? null) !!};

                data.forEach(center => {
                    const isSelected = (businessSubRegion !== null && center.id === businessSubRegion) ? 'selected' : '';
                    optionsHtml += `<option value="${center.id}" data-branch-code="${center.branch_code}" ${isSelected}>${center.branch_name}</option>`;
                });

                subRegionSelect.innerHTML = optionsHtml;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                subRegionSelect.innerHTML = '<option value="" disabled selected>- Select Branch -</option>';
            });
    } else {
        subRegionSelect.innerHTML = '<option value="" disabled selected>- Select Branch -</option>';
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const businessRegion = document.getElementById('businessRegion');
    if (businessRegion && businessRegion.value) {
        businessRegion.dispatchEvent(new Event('change')); // Trigger change event on page load
    }
});


    // SHOW BRANCH CODE BASED ON SELECTION 
    document.getElementById('businessSubRegion').addEventListener('change', function () {
        var selectedOption = this.options[this.selectedIndex];
        var branchCode = selectedOption.getAttribute('data-branch-code');
        document.getElementById('branchcode').value = branchCode;
    });

    // GENRATE BRANCH CODE AUTOMATIC
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

    // MAP 
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
    console.log(input);
    if (input) {
        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.setFields(['place_id', 'geometry', 'name']);  
        autocomplete.addListener('place_changed', function() {
            const place = autocomplete.getPlace();
            console.log(place);
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

    // ACCOUNT TYPE 
    const accountTypeDropdown = document.getElementById('accountType');
    const accountSubTypeDropdown = document.getElementById('accountSubType');

    function updateAccountSubType() {

        const accountType = accountTypeDropdown.value;

        if (accountType === 'bulkBooking') {
            accountSubTypeDropdown.innerHTML = `
            <option value="" disabled>- Account Sub Type -</option>
            <option value="Education & Institute" ${accountSubTypeDropdown.value === "Education & Institute" ? 'selected' : ''}>Education & Institute</option>
            <option value="Flat / Housing Society" ${accountSubTypeDropdown.value === "Flat / Housing Society" ? 'selected' : ''}>Flat / Housing Society</option>
            <option value="Government" ${accountSubTypeDropdown.value === "Government" ? 'selected' : ''}>Government</option>
            <option value="Housing Society" ${accountSubTypeDropdown.value === "Housing Society" ? 'selected' : ''}>Housing Society</option>
            <option value="Builder" ${accountSubTypeDropdown.value === "Builder" ? 'selected' : ''}>Others</option>
            <option value="VIP" ${accountSubTypeDropdown.value === "VIP" ? 'selected' : ''}>VIP</option>
        `;
        } else if (accountType === 'individual') {
            accountSubTypeDropdown.innerHTML = `
            <option value="Residential Order" ${accountSubTypeDropdown.value === "Residential Order" ? 'selected' : ''}>Residential Order</option>
        `;
        } else {
            accountSubTypeDropdown.innerHTML = `
            <option value="" disabled selected>- Account Sub Type -</option>
        `;
        }
    }

    accountTypeDropdown.addEventListener('change', function () {
        updateAccountSubType();
    });


    window.onload = function () {
        updateAccountSubType();
    };

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


    // Independent Dropdown selection 
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
        let taxType = '';
        let taxRate = 0;
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
            fetch(`../get-service-details/${serviceId}`)
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
            fetch(`../get-subcategories/${categoryId}`)
                .then(response => response.json())
                .then(data => {
                    const subcategorySelect = document.getElementById('order_subcategory');
                    subcategorySelect.innerHTML = '<option value="">-select Sub-Category-</option>';
                    data.forEach(subcategory => {
                        subcategorySelect.innerHTML += `<option value="${subcategory.id}" ${subcategory.id == {!! $getCategoryId->subcat_id !!} ? 'selected' : ''}>${subcategory.subcategory_name}</option>`;
                    });
                });
            fetch(`../get-coupons/${categoryId}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched Coupons Data:', data);
                    const couponsData = {};

                    const couponsSelect = document.getElementById('coupons');

                    couponsSelect.innerHTML = '<option value="" >- Coupons -</option>';
                    data.forEach(coupon => {
                        couponsData[coupon.id] = {
                            amount: coupon.amount,
                            percentage: coupon.percentage,
                            couponName: coupon.coupon_name
                        };

                        couponsSelect.innerHTML += `<option value="${coupon.id}" ${coupon.id == {{ $data->coupon_id ?? 'null' }} ? 'selected' : ''}>${coupon.coupon_name}</option>`;

                    });
                })
                .catch(error => {
                    console.error('Error fetching coupons:', error);
                });
        }
        window.addEventListener('DOMContentLoaded', () => {
            const orderCategorySelect = document.getElementById('order_category');
            const preselectedCategoryId = orderCategorySelect ? orderCategorySelect.value : null;

            if (preselectedCategoryId) {
                fetchSubcategories(preselectedCategoryId);
            }
            if (orderCategorySelect) {
                orderCategorySelect.addEventListener('change', (event) => {
                    const selectedCategoryId = event.target.value;
                    if (selectedCategoryId) {
                        fetchSubcategories(selectedCategoryId);
                    }
                });
            }
        });



        function fetchServices(subcategoryId) {
            fetch(`../get-services/${subcategoryId}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const serviceSelect = document.getElementById('order_service');
                    serviceSelect.innerHTML = '<option value="">-select Service-</option>';
                    data.forEach(service => {
                        serviceSelect.innerHTML += `<option value="${service.id}">${service.product_name}</option>`;
                    });
                })
                .catch(error => {
                    console.error('Error fetching services:', error);
                    const serviceSelect = document.getElementById('order_service');
                    serviceSelect.innerHTML = '<option value="">Error loading services</option>';
                });
        }

        window.addEventListener('DOMContentLoaded', () => {
            const order_service = document.getElementById('order_service');
            const attribute = document.getElementById('attribute');
            const subcategorySelect = document.getElementById('subcategorySelect');
            if (order_service.value) {
                order_service.dispatchEvent(new Event('change'));
            }
            if (attribute.value) {
                fetchServices(attribute.value);
            }
            subcategorySelect.addEventListener('change', () => {
                const attributeValue = attribute.value;
                if (attributeValue) {
                    fetchServices(attributeValue);
                }
            });
        });



        function fetchServiceType(serviceId) {
            console.log(serviceId);
            fetch(`../get-service-variation-type/${serviceId}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Response From ", data);

                    const serviceTypeSelect = document.getElementById('attribute');
                    serviceTypeSelect.innerHTML = '<option value="">-select Service-</option>';

                    data.services.forEach(service => {
                        serviceTypeSelect.innerHTML += `<option value="${service.id}|${data.product_id}" ${service.id == {!! $data->attribute !!} ? 'selected' : ''}>${service.attribute}</option>`;
                    });

                    // Trigger fetchServiceArea if an option is selected on load
                    if (serviceTypeSelect.value) {
                        const [attributeId, productId] = serviceTypeSelect.value.split('|');
                        console.log('Auto-triggering fetchServiceArea for Attribute ID:', attributeId, 'and Product ID:', productId);
                        fetchServiceArea(attributeId, productId);
                    }

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

        window.addEventListener('DOMContentLoaded', () => {
            const attribute = document.getElementById('attribute');
            const orderServiceArea = document.getElementById('order_service_area');


            if (attribute.value) {
                const [attributeId, productId] = attribute.value.split('|');
                console.log('Auto-triggering fetchServiceArea for Attribute ID:', attributeId, 'and Product ID:', productId);
                fetchServiceArea(attributeId, productId);
            }
        });

        function fetchServiceArea(serviceId, productId) {
            console.log('Fetching service area for Attribute ID:', serviceId, 'and Product ID:', productId);

            fetch(`../get-service-variation-area/${serviceId}/${productId}`)
                .then(response => response.json())
                .then(data => {
                    const serviceAreaSelect = document.getElementById('order_service_area');
                    serviceAreaSelect.innerHTML = '<option value="">-select Service-</option>';
                    data.forEach(service => {

                        const combinedValue = `${service.variation_times}${service.variation_interval}`;
                        const variationTimes = service.variation_times;
                        const variationInterval = service.variation_interval;
                        const variationID = service.id;

                        serviceAreaSelect.innerHTML += `
                    <option id="${combinedValue}" value="${service.discounted_variation_price}" 
                        data-variation-times="${variationTimes}" data-variatio-id="${variationID}" data-variation-interval="${variationInterval}" ${service.id == {{ $data->variation }} ? 'selected' : ''}>
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
                        document.getElementById('variationsID').value = variationID;
                        document.getElementById('srTime').value = variationTimes;
                        document.getElementById('srInterval').value = variationInterval;
                    });
                    const preselectedOption = serviceAreaSelect.querySelector('option[selected]');
                    if (preselectedOption) {
                        serviceAreaSelect.value = preselectedOption.value;
                        serviceAreaSelect.dispatchEvent(new Event('change'));
                    }
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
            calculateTotal();
        }
    });

</script>
@endsection