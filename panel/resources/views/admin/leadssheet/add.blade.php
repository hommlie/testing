@extends('layouts.admin')
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
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
                    <div class="card mb-4">
                        <div class="card-header bg-light">
                            <h5 class="mb-0">Add Lead / Order</h5>
                        </div>
                        <div class="card-body">
                            <form action="{{ route('admin.leadssheet.store') }}" method="post"
                                enctype="multipart/form-data">
                                @csrf

                                {{-- Hidden inputs --}}
                                <input type="hidden" name="hidden_quantity" id="hidden_quantity" value="1">
                                <input type="hidden" name="base_price" id="base_price">
                                <input type="hidden" name="hidden_total_price" id="hidden_total_price">
                                <input type="hidden" name="hidden_tax" id="hidden_tax">
                                <input type="hidden" name="hidden_image" id="hidden_image">
                                <input type="hidden" name="hidden_product_name" id="hidden_product_name">
                                <input type="hidden" name="serviceTypePriceValue" id="serviceTypePriceValue">
                                <input type="hidden" name="serviceAreaPriceValue" id="serviceAreaPriceValue">
                                <input type="hidden" name="couponsprice" id="couponsprice">

                                {{-- Basic Lead Info --}}
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="source">Source</label>
                                        <select name="source" id="source" class="form-control" required>
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

                                    <div class="form-group col-md-6">
                                        <label>Customer Name</label>
                                        <input type="text" name="name" class="form-control" placeholder="Enter full name"
                                            required>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label>Customer E-Mail ID</label>
                                        <input type="email" name="email" class="form-control"
                                            placeholder="Enter email address" required>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label>Customer PHONE</label>
                                        <input type="text" name="phone" class="form-control"
                                            placeholder="Enter phone number" required>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label>Customer Address</label>
                                        <input type="text" name="address" class="form-control" placeholder="Enter address"
                                            required>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label>Lead Type</label>
                                             <select name="lead_type" id="lead_type" class="form-control" required>
                                                <option value="">Select Status</option>
                                                <option value="high" data-color="#28a745">High</option>
                                                <option value="Low" data-color="#dc3545">Low</option>
                                                <option value="medium" data-color="#ffc107">Medium</option>
                                            </select>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="spoken_by">Spoken By</label>
                                        <select name="spoken_by" id="spoken_by" class="form-control" required>
                                            <option value="" disabled selected>- Spoken By -</option>
                                            @foreach($employees as $emp)
                                                <option value="{{ $emp->id }}">
                                                    {{ $emp->emp_name }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>

                                    <div class="form-group col-md-6 d-flex">
                                        <div class="col-md-11">
                                            <label for="lead_status">Lead Status</label>
                                            <select name="lead_status" id="lead_status" class="form-control" required>
                                                <option value="">Select Status</option>
                                                <option value="contacted" data-color="#28a745">Contacted</option>
                                                <option value="follow_up" data-color="#ffc107">Follow Up</option>
                                                <option value="not_interested" data-color="#dc3545">Not Interested</option>
                                                <option value="junk_call" data-color="#007bff">Junk Call</option>
                                            </select>
                                        </div>
                                        <div id="status_indicator" class="d-flex align-items-center mt-4 col-md-2 mt-2"
                                             style="display: none;">
                                            <span id="status_dot" style="
                                                display: inline-block;
                                                width: 20px;
                                                height: 20px;
                                                border-radius: 50%;
                                                margin-right: 8px;
                                            "></span>
                                        </div>
                                    </div>
                                </div>

                                {{-- Attempts & Remarks --}}
                                @for($i = 1; $i <= 3; $i++)
                                    <div class="form-row">
                                        <div class="form-group col-md-4">
                                            <label>Attempt Date {{ $i }}</label>
                                            <input type="date" name="attempt_date_{{ $i }}" class="form-control">
                                        </div>
                                        <div class="form-group col-md-8">
                                            <label>Remark {{ $i }}</label>
                                            <input type="text" name="remark_{{ $i }}" class="form-control"
                                                placeholder="Enter remark">
                                        </div>
                                    </div>
                                @endfor

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label>Total Attempt Count</label>
                                        <input type="number" id="total_attempt_count" name="total_attempt_count"
                                            class="form-control" min="0" placeholder="e.g. 3" readonly>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label>Call Recording Link 1</label>
                                        <input type="url" name="call_recording_link_1" class="form-control"
                                            placeholder="Enter URL">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Call Recording Link 2</label>
                                    <input type="url" name="call_recording_link_2" class="form-control"
                                        placeholder="Enter URL">
                                </div>

                                {{-- Category / Subcategory / Service --}}
                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <label>Category</label>
                                        <select name="category" id="order_category" class="form-control" required>
                                            <option value="">– Select Category –</option>
                                            @foreach($category as $cat)
                                                <option value="{{ $cat->id }}">{{ $cat->category_name }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label>Sub-Category</label>
                                        <select name="subcategory" id="order_subcategory" class="form-control" required>
                                            <option value="">– Select Sub-Category –</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label>Service</label>
                                        <select name="service" id="order_service" class="form-control" required>
                                            <option value="">– Select Service –</option>
                                        </select>
                                    </div>
                                </div>

                                {{-- Variation & Area --}}
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label>Variation</label>
                                        <select name="attribute" id="attribute" class="form-control" required>
                                            <option value="">– Select Variation –</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label>Area / Frequency</label>
                                        <select name="order_service_area" id="order_service_area" class="form-control"
                                            required>
                                            <option value="">– Select Area –</option>
                                        </select>
                                    </div>
                                </div>

                                {{-- Readonly SR fields --}}
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <input type="hidden" name="variationsID" id="variationsID" value="">
                                        <label>No. of Services</label>
                                        <input type="text" name="srTime" id="srTime" class="form-control" readonly required>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label>Scheduled Every</label>
                                        <input type="text" name="srInterval" id="srInterval" class="form-control" readonly
                                            required>
                                    </div>
                                </div>

                                {{-- Quantity & Coupons inline --}}
                                <div class="form-row align-items-end">
                                    <div class="form-group col-md-4">
                                        <label>Select Quantity</label>
                                        <div class="input-group">
                                            <button type="button" class="btn btn-outline-secondary decrement">–</button>
                                            <input type="text" class="form-control text-center quantity-value" value="1"
                                                readonly>
                                            <button type="button" class="btn btn-outline-secondary increment">+</button>
                                        </div>
                                    </div>
                                    <div class="form-group col-md-8">
                                        <label>Coupon Percentage</label>
                                        <select name="coupons" id="coupons" class="form-control">
                                            <option value="">– Select Coupon Percentage –</option>
                                            <option value="5">5% Percentage</option>
                                            <option value="10">10% Percentage</option>
                                        </select>
                                    </div>

                                </div>
                                <div class="form-row">
                                    <div id="follow_up_container" class="form-group col-md-12" style="display: none;">
                                        <label for="follow_up_dt">Follow-Up Date & Time</label>
                                        <input type="text" id="follow_up_dt" name="follow_up_datetime" class="form-control"
                                            placeholder="Select date & time">
                                    </div>

                                    <div id="add_order_container" class="form-group col-md-6"
                                        style="display: none; align-self: flex-end;">
                                        <button type="button" id="add_order_btn" class="btn btn-success">
                                            Add Order
                                        </button>
                                    </div>
                                </div>

                                {{-- Price --}}
                                <div class="form-row">

                                    <div class="form-group col-md-6">
                                        <label>Price (Without GST)</label>
                                        <input type="text" name="price" id="order_price" class="form-control" readonly
                                            required>
                                    </div>
                                    <div class="form-group mt-3 col-md-6 text-right">
                                        <br>
                                        <h4 style="font-size:20px">Total Price : <b>0 /-</b> <small
                                                style="font-size:12px">(Inclusive of All
                                                Taxes)</small>
                                        </h4>
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-success">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    </section>
@endsection
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
@section('scripts')

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const quantityValueSpan = document.querySelector('.quantity-value');
            const incrementBtn = document.querySelector('.increment');
            const decrementBtn = document.querySelector('.decrement');
            const priceInput = document.getElementById('order_price');
            const totalPriceDisplay = document.querySelector('h4 b');


            // Hidden inputs
            const hiddenQuantityInput = document.getElementById('hidden_quantity');
            const hiddenTotalPriceInput = document.getElementById('hidden_total_price');
            const hiddenBasePrice = document.getElementById('base_price');
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
                basePrice = hiddenBasePrice.value;
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

                    const baseUnitPrice = parseFloat(hiddenBasePrice.value) || 0;
                    const originalTotal = baseUnitPrice * quantity;
                    total = subtotal + taxAmount;
                    priceInput.value = subtotal;



                    // Update the display
                    totalPriceDisplay.innerHTML = ` 
                                                 <span style="color:red; text-decoration:line-through;">
                                                  ${originalTotal}
                                                </span>
                                                ${subtotal.toFixed(2)} + ${taxAmount.toFixed(2)} = ${total.toFixed(2)} /- `;

                    hiddenTotalPriceInput.value = total.toFixed(2);
                    hiddenTaxInput.value = taxAmount.toFixed(2);
                }
            }
            function fetchServiceDetails(serviceId) {
                fetch(`get-service-details/${serviceId}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data) {
                            priceInput.value = data.discounted_price;
                            basePrice = parseFloat(data.product_price);
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

                            if (selectedValue) {
                                // Check if the selected value has a '|' and split
                                const [attributeId, productId] = selectedValue.split('|');
                                fetchServiceArea(attributeId, productId);
                            } else {
                                console.log('No service selected.');
                            }
                        });
                    });
            }


            function fetchServiceArea(serviceId, productId) {
                fetch(`get-service-variation-area/${serviceId}/${productId}`)
                    .then(response => response.json())
                    .then(data => {
                        const serviceAreaSelect = document.getElementById('order_service_area');
                        // reset
                        serviceAreaSelect.innerHTML = '<option value="">-select Service-</option>';

                        // build options
                        data.forEach(service => {
                            const variationTimes = service.variation_times;
                            const variationInterval = service.variation_interval;
                            const variationID = service.id;
                            const variationPrice = service.price;  // your actual unit price

                            serviceAreaSelect.innerHTML += `
                                                        <option
                                                          value="${service.discounted_variation_price}"
                                                          data-variation-times="${variationTimes}"
                                                          data-variation-id="${variationID}"
                                                          data-variation-price="${variationPrice}"
                                                          data-variation-interval="${variationInterval}"
                                                        >
                                                          ${service.variation}
                                                        </option>`;
                        });

                        // attach one single listener *after* building options
                        serviceAreaSelect.addEventListener('change', event => {
                            const opt = event.target.selectedOptions[0];
                            const times = opt.getAttribute('data-variation-times');
                            const interval = opt.getAttribute('data-variation-interval');
                            const id = opt.getAttribute('data-variation-id');
                            const price = parseFloat(opt.getAttribute('data-variation-price')) || 0;

                            document.getElementById('variationsID').value = id;
                            document.getElementById('srTime').value = times;
                            document.getElementById('srInterval').value = interval;
                            document.getElementById('base_price').value = price;
                            calculateTotal();  // re-calc now that base_price is correct
                        });
                    })
                    .catch(console.error);
            }

            document.getElementById('coupons').addEventListener('change', function () {
                const couponPct = parseFloat(this.value) || 0;
                const qty = parseInt(quantityValueSpan.textContent, 10) || 1;
                const baseUnitPrice = parseFloat(hiddenBasePrice.value) || 0;
                const baseTotal = baseUnitPrice * qty;
                const discountAmount = (couponPct / 100) * baseTotal;
                const sub = subtotal;
                const taxA = taxAmount;

                const finalTotal = (sub - discountAmount + taxA).toFixed(2);
                totalPriceDisplay.innerHTML = `
                                  <span style="color:red; text-decoration:line-through;">
                                    ${baseTotal.toFixed(2)}
                                  </span>
                                 ${subtotal.toFixed(2)} – ${discountAmount.toFixed(2)} + ${taxA.toFixed(2)} = ${finalTotal} /-
                                `;

                hiddenTotalPriceInput.value = finalTotal;
                document.getElementById('couponsprice').value = discountAmount.toFixed(2);
            });


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
                taxRate = 0;
                let copAmount = 0;
                let copPar = 0;
                calculateTotal();
            }
            function updateAttemptCount() {
                let count = 0;
                for (let i = 1; i <= 3; i++) {
                    const dateVal = document.querySelector(`input[name="attempt_date_${i}"]`).value.trim();
                    const remarkVal = document.querySelector(`input[name="remark_${i}"]`).value.trim();
                    if (dateVal !== '' || remarkVal !== '') {
                        count++;
                    }
                }
                document.getElementById('total_attempt_count').value = count;
            }

            for (let i = 1; i <= 3; i++) {
                document.querySelector(`input[name="attempt_date_${i}"]`)
                    .addEventListener('change', updateAttemptCount);
                document.querySelector(`input[name="remark_${i}"]`)
                    .addEventListener('input', updateAttemptCount);
            }
            updateAttemptCount();
        });

        document.addEventListener('DOMContentLoaded', function () {
            const leadStatusEl = document.getElementById('lead_status');
            const followUpContainer = document.getElementById('follow_up_container');
            const addOrderContainer = document.getElementById('add_order_container');

            leadStatusEl.addEventListener('change', function () {
                const status = this.value;
                followUpContainer.style.display = 'none';
                addOrderContainer.style.display = 'none';

                if (status === 'follow_up') {
                    followUpContainer.style.display = 'block';
                } else if (status === 'contacted') {
                    addOrderContainer.style.display = 'block';
                }
            });
        });
        document.addEventListener('DOMContentLoaded', function () {
            flatpickr("#follow_up_dt", {
                enableTime: true,
                time_24hr: true,
                dateFormat: "Y-m-d H:i",
                minDate: "today"
            });
        });
        document.addEventListener('DOMContentLoaded', function () {
            const select = document.getElementById('lead_status');
            const indicator = document.getElementById('status_indicator');
            const dot = document.getElementById('status_dot');

            select.addEventListener('change', () => {
                const opt = select.options[select.selectedIndex];
                const color = opt.getAttribute('data-color');

                if (!color) {
                    indicator.style.display = 'none';
                    dot.style.border = 'none'; // Reset border
                    return;
                }

                dot.style.backgroundColor = color;
                if (opt.value === 'junk_call') {
                    dot.style.border = '3px solid #6c757d';
                } else {
                    dot.style.border = 'none';
                }

                indicator.style.display = 'flex';
            });
        });
    </script>
@endsection