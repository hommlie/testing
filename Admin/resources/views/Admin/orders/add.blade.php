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
                            <h4 class="card-title">{{ trans('Add Order') }}</h4>
                            <a href="{{route('admin.orders')}}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
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

                                <!-- <label for=""><u>Basic Details</u></label> -->
                                <div class="row mb-3">
                                    <div class="col-lg-6">
                                        <label for="category">Category</label>
                                        <select name="category" id="order_category" class="form-control">
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
                                        <select name="subcategory" id="order_subcategory" class="form-control">
                                            <option value="">-Select Sub-Category-</option>
                                        </select>
                                        @if ($errors->has('subcategory'))
                                            <span class="text-danger">{{ $errors->first('subcategory') }}</span>
                                        @endif
                                        <br>

                                        <label for="service">Service</label>
                                        <select name="service" id="order_service" class="form-control">
                                            <option value="">-Select Service-</option>
                                        </select>
                                        @if ($errors->has('service'))
                                            <span class="text-danger">{{ $errors->first('service') }}</span>
                                        @endif

                                        <br>
                                        <label for="variation">Variation</label>
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <select name="order_service_type" id="order_service_type" class="form-control">
                                                    <option value="">-Select Type-</option>
                                                </select>
                                                @if ($errors->has('order_type'))
                                                    <span class="text-danger">{{ $errors->first('order_type') }}</span>
                                                @endif
                                            </div>
                                            <div class="col-lg-6">
                                                <select name="order_service_area" id="order_service_area" class="form-control">
                                                    <option value="">-Select Area-</option>
                                                </select>
                                                @if ($errors->has('order_area'))
                                                    <span class="text-danger">{{ $errors->first('order_area') }}</span>
                                                @endif
                                            </div>
                                        </div>

                                        <br>

                                        <label for="">Select Quantity</label>
                                        <br>
                                        <span class="border rounded p-2">
                                            <span class="px-2 bg-light decrement" style="cursor: pointer;">-</span>
                                            <span class="p-2 quantity-value">1</span>
                                            <span class="px-2 bg-light increment" style="cursor: pointer;">+</span>
                                        </span>
                                        <br><br>
                                        <label for="price">Price (Without GST)</label>
                                        <input type="text" name="price" placeholder="Price"  id="order_price" readonly class="form-control" />
                                        @if ($errors->has('price'))
                                            <span class="text-danger">{{ $errors->first('price') }}</span>
                                        @endif
                                        <br>

                                        
                                    
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <label for="desired_date">Desired date</label>
                                                <input type="date" name="desired_date" placeholder="desired_date"  id="desired_date"  class="form-control" />
                                                @if ($errors->has('desired_date'))
                                                    <span class="text-danger">{{ $errors->first('desired_date') }}</span>
                                                @endif
                                            </div>
                                            <div class="col-lg-6">
                                                <label for="desired_time">Desired Time</label>
                                                <input type="time" name="desired_time" placeholder="desired_time"  id="desired_time"  class="form-control" />
                                                @if ($errors->has('desired_time'))
                                                    <span class="text-danger">{{ $errors->first('desired_time') }}</span>
                                                @endif
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="col-lg-6">
                                        <label for="fullname">Customer Name</label>
                                        <input type="text" name="fullname" placeholder="Enter Customer name"  id="fullname" class="form-control" />
                                        @if ($errors->has('fullname'))
                                            <span class="text-danger">{{ $errors->first('fullname') }}</span>
                                        @endif
                                        <br>
                                        <label for="email">Email</label>
                                        <input type="email" name="email" placeholder="Enter Customer email"  id="email" class="form-control" />
                                        @if ($errors->has('email'))
                                            <span class="text-danger">{{ $errors->first('email') }}</span>
                                        @endif
                                        <br>
                                        <label for="mobile">Mobile Number</label>
                                        <input type="text" name="mobile" placeholder="Enter Customer mobile Number"  id="mobile" class="form-control" />
                                        @if ($errors->has('mobile'))
                                            <span class="text-danger">{{ $errors->first('mobile') }}</span>
                                        @endif
                                        <br>
                                        <label for="landmark">Landmark</label>
                                        <input type="text" name="landmark" placeholder="Enter Customer landmark"  id="landmark" class="form-control" />
                                        @if ($errors->has('landmark'))
                                            <span class="text-danger">{{ $errors->first('landmark') }}</span>
                                        @endif
                                        <br>
                                        <label for="address">Address</label>
                                        <input type="text" name="address" placeholder="Enter Customer address"  id="address" class="form-control" />
                                        @if ($errors->has('address'))
                                            <span class="text-danger">{{ $errors->first('address') }}</span>
                                        @endif
                                        <br>
                                        <label for="pincode">Pincode</label>
                                        <input type="number" name="pincode" placeholder="Enter Customer pincode"  id="pincode" class="form-control" />
                                        @if ($errors->has('pincode'))
                                            <span class="text-danger">{{ $errors->first('pincode') }}</span>
                                        @endif
                                        <br>

                                    </div>
                                    
                                </div>
                                <br>
                                <h4>Total Price : <b>0 /-</b> <small style="font-size:13px">(Inclusive of All Taxes)</small></h4>
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
