@extends('layouts.admin')
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
                        <h4 class="card-title">{{ trans('Add Residential Order') }}</h4>
                        <a href="{{route('admin.orders')}}"
                            class="btn btn-raised btn-primary  btn-min-width mr-1 mb-1 float-right"
                            style="margin-top: -30px;">
                            {{ trans('View Orders') }}
                        </a>
                        <a href="" class="btn btn-raised btn-primary  btn-min-width mr-1 mb-1 float-right"
                            style="margin-top: -30px; color:white;">
                            Add Business Region
                        </a>
                    </div>

                    <div class="card-body p-3">
                        <form action="" method="post" enctype="multipart/form-data">
                            @csrf
                            <!-- <input type="hidden" name="hidden_quantity" id="hidden_quantity" value="1">
                            <input type="hidden" name="hidden_total_price" id="hidden_total_price">
                            <input type="hidden" name="hidden_tax" id="hidden_tax">
                            <input type="hidden" name="hidden_image" id="hidden_image">
                            <input type="hidden" name="hidden_product_name" id="hidden_product_name">
                            <input type="hidden" name="serviceTypePriceValue" id="serviceTypePriceValue">
                            <input type="hidden" name="serviceAreaPriceValue" id="serviceAreaPriceValue"> -->
                            <div class="row mb-3">

                                {{--
                                ==========================================================================================================================
                                -- }}
                                {{-- LEFT DIV SECTION --}}
                                <div class="col-lg-4">
                                    {{-- SERVICES CENTER TYPE--}}
                                    <label for="Services ">Service Center Type</label>
                                    <select name="" id="" class="form-control">
                                        <option value="" disabled selected>- Service Center Type -</option>
                                        <option value="hommlie">Hommlie</option>
                                        <option value="vendor">Vendor</option>
                                        <option value="franchisee">Franchisee</option>
                                    </select><br />

                                    {{-- ACCOUNT SUB TYPE --}}
                                    <label for="">Account Type</label>
                                    <select name="" id="" class="form-control">
                                        <option value="" disabled selected>- Account Type -</option>
                                        <option value="">Induvial</option>
                                        <option value="">Bulk Booking</option>
                                    </select><br />

                                    {{-- CUSTOMER TYPE --}}
                                    <label for="">Customer Type </label>
                                    <select name="" id="" class="form-control">
                                        <option value="" disabled selected>- Customer Type -</option>
                                        <option value="">New Customer </option>
                                        <option value="">Exesting Customer</option>
                                    </select><br />

                                    {{--BUSINESS REGION --}}
                                    <label for="">Business Sub Region </label>
                                    <select name="" id="" class="form-control">
                                        <option value="" disabled selected>- Business Sub Region -</option>
                                        <option value="">South 1 </option>
                                    </select><br />

                                    <label for="">House / Flat Number</label>
                                    <input type="text" name="" id="" class="form-control"
                                        placeholder="Customer House / Flat Number"><br />

                                    <label for="">Landmark</label>
                                    <input type="text" name="" id="" class="form-control"
                                        placeholder="Customer Landmark"><br />

                                    <label for="">Latlong</label>
                                    <input type="text" name="" id="" class="form-control" placeholder=" Latlong "><br />


                                    <label for="">Desired Time</label>
                                    <input type="time" name="" id="" class="form-control"
                                        placeholder="Contract Start Date"><br />

                                    <label for="">Frequncy</label>
                                    <select name="" id="" class="form-control">
                                        <option value="" disabled selected>- Frequncy -</option>
                                        <option value=""></option>
                                    </select><br />

                                    <label for="">Coupons</label>
                                    <select name="" id="" class="form-control">
                                        <option value="" disabled selected>- Coupons -</option>
                                        <option value=""></option>

                                    </select><br />

                                    <label for="price">Price (Without GST)</label>
                                    <input type="text" name="price" placeholder="Price" id="order_price" readonly
                                        class="form-control" />


                                </div>


                                {{--
                                ==========================================================================================================================
                                -- }}

                                {{-- CENTER DIV SECTION---}}

                                <div class="col-lg-4">
                                    {{-- EMPLOYEE NAME --}}
                                    <label for="">Employee Name</label>
                                    <input type="text" name="" id="" class="form-control"
                                        placeholder=" Employee Name"><br />

                                    {{--ACCOUNT SUB TYPE --}}
                                    <label for="">Account Sub Type</label>
                                    <select name="" id="" class="form-control">
                                        <option value="" disabled selected>- Account Sub Type -</option>
                                        <option value="">Induvial</option>
                                        <option value="">Bulk Booking</option>
                                    </select><br />


                                    {{-- BUSINESS LEAD --}}
                                    <label for=""> Business Lead </label>
                                    <select name="" id="" class="form-control">
                                        <option value="" disabled selected>- Business Lead -</option>
                                        <option value="">Exhibitation </option>
                                        <option value="">Web Lead </option>
                                        <option value="">Service Lead </option>
                                        <option value="">Customer Referral </option>
                                        <option value="">Cold Call </option>
                                        <option value="">Social Media </option>
                                        <option value="">What's up chat bot </option>
                                        <option value="">Vendor's </option>
                                        <option value="">Others </option>
                                    </select><br />

                                    {{-- BILL TO ACCOUNT NAME --}}
                                    <label for="">Bill To: Account Name</label>
                                    <input type="text" name="" id="" class="form-control"
                                        placeholder="Customer    Bill To: Account Name"><br />

                                    <label for="">Steret Name</label>
                                    <input type="text" name="" id="" class="form-control"
                                        placeholder="Customer Steret Name"><br />

                                    <label for="">Pincode</label>
                                    <input type="text" name="" id="" class="form-control"
                                        placeholder="Customer Pincode"><br />

                                    <label for=""> Techinican Assign </label>
                                    <select name="" id="" class="form-control">
                                        <option value="" disabled selected>- Techinican Assign -</option>
                                        <option value="">Suraj</option>
                                    </select><br />

                                    <label for="">Category</label>
                                    <select name="" id="" class="form-control">
                                        <option value="" disabled selected>- Category -</option>
                                        <option value=""></option>

                                    </select><br />

                                    <label for="">Sequence</label>
                                    <select name="" id="" class="form-control">
                                        <option value="" disabled selected>- Sequence -</option>
                                        <option value=""></option>

                                    </select><br />
                                    <label for="">Contract Start Date</label>
                                    <input type="text" name="" id="" class="form-control"
                                        placeholder="Contract Start Date"><br />




                                </div>


                                {{--
                                ==========================================================================================================================
                                -- }}

                                {{-- RIGHT DIV SECTION --}}

                                <div class="col-lg-4">

                                    {{-- EMPLOYEE NAME --}}
                                    <label for="">Billing</label>
                                    <select name="" id="" class="form-control">
                                        <option value="" disabled selected>- Billing -</option>
                                        <option value="">Head Office</option>
                                        <option value="">Regional Office </option>
                                        <option value="">Branch Office</option>
                                    </select><br />

                                    {{--SERVICES TYEP --}}
                                    <label for="">Service Type</label>
                                    <select name="" id="" class="form-control">
                                        <option value="" disabled selected>- Service Type -</option>
                                        <option value="">One Time </option>
                                        <option value="">AMC</option>
                                    </select><br />

                                    {{--BUSINESS REGION --}}
                                    <label for="">Business Region </label>
                                    <select name="" id="" class="form-control">
                                        <option value="" disabled selected>- Business Region -</option>
                                        <option value="">South 1 </option>
                                    </select><br />

                                    {{-- CUSTOMER NAME --}}
                                    <label for="">Customer Name</label>
                                    <input type="text" name="" id="" class="form-control"
                                        placeholder=" Customer Name"><br />

                                    <label for="">Address</label>
                                    <input type="text" name="" id="" class="form-control"
                                        placeholder="Customer Address"><br />

                                    <label for="">E-Mail</label>
                                    <input type="text" name="" id="" class="form-control"
                                        placeholder="Customer E-Mail"><br />

                                    <label for="">Desired Date</label>
                                    <input type="date" name="" id="" class="form-control"
                                        placeholder="Contract Start Date"><br />



                                    <label for="">Sub Category</label>
                                    <select name="" id="" class="form-control">
                                        <option value="" disabled selected>- Sub Category -</option>
                                        <option value=""></option>

                                    </select><br />


                                    <label for="">BHK</label>
                                    <select name="" id="" class="form-control">
                                        <option value="" disabled selected>- BHK -</option>
                                        <option value=""></option>

                                    </select><br />

                                    <label for="">Contract End Date</label>
                                    <input type="text" name="" id="" class="form-control"
                                        placeholder=" Contract End Date"><br />


                                </div>


                            </div>
                            
                            <div class="d-flex justify-content-end " style="margin-right:5%">
                                <div class="text-end">
                                    <h4>Total Price: <b>0 /-</b> <small style="font-size:13px"><br>(Inclusive of All
                                            Taxes)</small>

                                        </h4>
                                        <input type="submit" value="Place Order" class="btn btn-success" name="submit"
                                        id="">
                                </div>
                            </div>

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

@section('scripts')
<script>
    // document.addEventListener('DOMContentLoaded', function () {
    //     const quantityValueSpan = document.querySelector('.quantity-value');
    //     const incrementBtn = document.querySelector('.increment');
    //     const decrementBtn = document.querySelector('.decrement');
    //     const priceInput = document.getElementById('price');
    //     const totalInput = document.getElementById('total');

    //     function calculateTotal() {
    //         const quantity = parseFloat(quantityValueSpan.textContent) || 0;
    //         const price = parseFloat(priceInput.value) || 0;
    //         totalInput.value = (quantity * price).toFixed(2);
    //     }

    //     incrementBtn.addEventListener('click', function () {
    //         let currentValue = parseInt(quantityValueSpan.textContent);
    //         currentValue++;
    //         quantityValueSpan.textContent = currentValue-1;
    //         calculateTotal();
    //     });

    //     decrementBtn.addEventListener('click', function () {
    //         let currentValue = parseInt(quantityValueSpan.textContent);
    //         if (currentValue > 1) {
    //             currentValue--;
    //             quantityValueSpan.textContent = currentValue+1;
    //             calculateTotal();
    //         }
    //     });

    //     priceInput.addEventListener('input', calculateTotal);
    // });

    // Independent Dropdown selection 
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
        let taxType = ''; // 'percent' or 'amount'
        let taxRate = 0; // Holds the tax rate value if it's percentage

        function calculateTotal() {
            const quantity = parseInt(quantityValueSpan.textContent) || 1;
            hiddenQuantityInput.value = quantity; // Update hidden quantity input

            if (!isNaN(currentPrice) && !isNaN(quantity)) {
                const subtotal = (serviceTypePrice + serviceAreaPrice) * quantity;
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

        document.getElementById('order_service_type').addEventListener('change', function () {
            serviceTypePrice = parseFloat(this.value) || 0;
            const selectedOption = this.options[this.selectedIndex];

            // Retrieve the value and textContent of the selected option
            const optionValue = selectedOption.value;
            const optionText = selectedOption.textContent;

            document.getElementById('serviceTypePriceValue').value = optionText;




            // console.log('Selected Value:', optionValue);
            // console.log('Selected Text:', optionText);

            calculateTotal();
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
                    const serviceSelect = document.getElementById('order_service');
                    serviceSelect.innerHTML = '<option value="">-select Service-</option>';
                    data.forEach(service => {
                        serviceSelect.innerHTML += `<option value="${service.id}">${service.product_name}</option>`;
                    });
                });
        }

        function fetchServiceType(serviceId) {
            fetch(`get-service-variation-type/${serviceId}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Response From " + data);
                    console.log(data);
                    const serviceTypeSelect = document.getElementById('order_service_type');
                    serviceTypeSelect.innerHTML = '<option value="">-select Service-</option>';
                    data.forEach(service => {
                        serviceTypeSelect.innerHTML += `<option value="${service.discounted_variation_price}">${service.variation}</option>`;
                    });
                });
        }

        function fetchServiceArea(serviceId) {
            fetch(`get-service-variation-area/${serviceId}`)
                .then(response => response.json())
                .then(data => {
                    const serviceAreaSelect = document.getElementById('order_service_area');
                    serviceAreaSelect.innerHTML = '<option value="">-select Service-</option>';
                    data.forEach(service => {
                        serviceAreaSelect.innerHTML += `<option value="${service.discounted_variation_price}">${service.variation}</option>`;
                    });
                });
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