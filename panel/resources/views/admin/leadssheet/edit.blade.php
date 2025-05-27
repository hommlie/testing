{{-- resources/views/admin/leadssheet/edit.blade.php --}}
@extends('layouts.admin')

@section('title', 'Edit Lead / Order')

@section('css')
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet"href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"/>
@endsection

@section('content')
    <div class="container-fluid">
        @if(Session::has('success'))
            <div class="alert alert-success">{{ Session::get('success') }}</div>
            @php Session::forget('success'); @endphp
        @endif
        @if(Session::has('danger'))
            <div class="alert alert-danger">{{ Session::get('danger') }}</div>
            @php Session::forget('danger'); @endphp
        @endif

        <div class="card mb-4">
            <div class="card-header bg-light">
                <h5 class="mb-0">Edit Lead / Order</h5>
            </div>
            <div class="card-body">
                <form action="{{ route('admin.leadssheet.update', $lead->id) }}" method="POST"
                    enctype="multipart/form-data">
                    @csrf

                    {{-- Hidden inputs --}}
                    <input type="hidden" name="hidden_quantity" id="hidden_quantity"
                        value="{{ old('hidden_quantity', 1) }}">
                    <input type="hidden" name="base_price" id="base_price"
                        value="{{ old('base_price', $lead->variations->price ?? '') }}">
                    <input type="hidden" name="hidden_total_price" id="hidden_total_price"
                        value="{{ old('hidden_total_price') }}">
                    <input type="hidden" name="hidden_tax" id="hidden_tax" value="{{ old('hidden_tax') }}">
                    <input type="hidden" name="hidden_image" id="hidden_image" value="{{ old('hidden_image') }}">
                    <input type="hidden" name="hidden_product_name" id="hidden_product_name"
                        value="{{ old('hidden_product_name') }}">
                    <input type="hidden" name="serviceTypePriceValue" id="serviceTypePriceValue" value="">
                    <input type="hidden" name="serviceAreaPriceValue" id="serviceAreaPriceValue" value="">
                    <input type="hidden" name="couponsprice" id="couponsprice" value="{{ old('couponsprice') }}">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="source">Source</label>
                            <select name="source" id="source" class="form-control" required>
                                <option value="" disabled {{ old('source', $lead->source) == '' ? 'selected' : '' }}>-
                                    Business Lead -</option>
                                <option value="exhibition" {{ old('source', $lead->source) == 'exhibition' ? 'selected' : '' }}>Exhibition</option>
                                <option value="webLead" {{ old('source', $lead->source) == 'webLead' ? 'selected' : '' }}>Web
                                    Lead</option>
                                <option value="serviceLead" {{ old('source', $lead->source) == 'serviceLead' ? 'selected' : '' }}>Service Lead</option>
                                <option value="customerReferral" {{ old('source', $lead->source) == 'customerReferral' ? 'selected' : '' }}>Customer Referral</option>
                                <option value="coldCall" {{ old('source', $lead->source) == 'coldCall' ? 'selected' : '' }}>
                                    Cold Call</option>
                                <option value="socialMedia" {{ old('source', $lead->source) == 'socialMedia' ? 'selected' : '' }}>Social Media</option>
                                <option value="whatsappChatBot" {{ old('source', $lead->source) == 'whatsappChatBot' ? 'selected' : '' }}>What's App Chat Bot</option>
                                <option value="vendors" {{ old('source', $lead->source) == 'vendors' ? 'selected' : '' }}>
                                    Vendors</option>
                                <option value="others" {{ old('source', $lead->source) == 'others' ? 'selected' : '' }}>Others
                                </option>
                            </select>
                        </div>

                        <div class="form-group col-md-6">
                            <label>Customer Name</label>
                            <input type="text" name="name" class="form-control" value="{{ old('name', $lead->name) }}"
                                required>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label>Customer E-Mail ID</label>
                            <input type="email" name="email" class="form-control" value="{{ old('email', $lead->email) }}"
                                required>
                        </div>
                        <div class="form-group col-md-6">
                            <label>Customer PHONE</label>
                            <input type="text" name="phone" class="form-control" value="{{ old('phone', $lead->phone) }}"
                                required>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label>Customer Address</label>
                            <input type="text" name="address" class="form-control"
                                value="{{ old('address', $lead->address) }}" required>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="lead_type">Lead Type</label>
                            <select name="lead_type" id="lead_type" class="form-control" required>
                              <option value="">Select Type</option>
                              <option value="high"   data-color="#28a745" {{ old('lead_type', $lead->lead_type)=='high'   ? 'selected':'' }}>High</option>
                              <option value="low"    data-color="#dc3545" {{ old('lead_type', $lead->lead_type)=='low'    ? 'selected':'' }}>Low</option>
                              <option value="medium" data-color="#ffc107" {{ old('lead_type', $lead->lead_type)=='medium' ? 'selected':'' }}>Medium</option>
                            </select>
                          </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="spoken_by">Spoken By</label>
                            <select name="spoken_by" id="spoken_by" class="form-control" required>
                                <option value="" disabled {{ old('spoken_by', $lead->spoken_by) ? '' : 'selected' }}>
                                    – Spoken By –
                                </option>
                                @foreach($employees as $emp)
                                    <option value="{{ $emp->id }}" {{ old('spoken_by', $lead->spoken_by) == $emp->id ? 'selected' : '' }}>
                                        {{ $emp->emp_name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group col-md-6">
                          <label for="lead_status">Lead Status</label>
                          <select name="lead_status" id="lead_status" class="form-control" required>
                            <option value="" disabled {{ old('lead_status', $lead->lead_status) ? '' : 'selected' }}>
                              – Select Status –</option>
                            @foreach([ 'contacted'      => 'Contacted', 'follow_up'      => 'Follow Up', 'not_interested' => 'Not Interested', 'junk_call' => 'Junk Call'] as $value => $label)
                              <option
                                value="{{ $value }}"
                                {{ old('lead_status', $lead->lead_status) == $value ? 'selected' : '' }}
                                >
                                {{ $label }}
                              </option>
                            @endforeach
                          </select>
                        </div>
                    </div>

                    {{-- Attempts & Remarks --}}
                    @for($i = 1; $i <= 3; $i++)
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label>Attempt Date {{ $i }}</label>
                                <input type="date" name="attempt_date_{{ $i }}" class="form-control"
                                    value="{{ old("attempt_date_$i", $lead->{"attempt_date_$i"}) }}">
                            </div>
                            <div class="form-group col-md-8">
                                <label>Remark {{ $i }}</label>
                                <input type="text" name="remark_{{ $i }}" class="form-control"
                                    value="{{ old("remark_$i", $lead->{"remark_$i"}) }}" placeholder="Enter remark">
                            </div>
                        </div>
                    @endfor

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label>Total Attempt Count</label>
                            <input type="number" id="total_attempt_count" name="total_attempt_count" class="form-control"
                                value="{{ old('total_attempt_count', $lead->total_attempt_count) }}" readonly>
                        </div>
                        <div class="form-group col-md-6">
                            <label>Call Recording Link 1</label>
                            <input type="url" name="call_recording_link_1" class="form-control"
                                value="{{ old('call_recording_link_1', $lead->call_recording_link_1) }}">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Call Recording Link 2</label>
                        <input type="url" name="call_recording_link_2" class="form-control"
                            value="{{ old('call_recording_link_2', $lead->call_recording_link_2) }}">
                    </div>

                    {{-- Category / Subcategory / Service --}}
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label>Category</label>
                            <select name="category" id="order_category" class="form-control" required>
                                <option value="">– Select Category –</option>
                                @foreach($categories as $cat)
                                    <option value="{{ $cat->id }}" {{ old('category', $lead->category_id) == $cat->id ? 'selected' : '' }}>
                                        {{ $cat->category_name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                            <label>Sub-Category</label>
                            <select name="subcategory" id="order_subcategory" class="form-control" required>
                                {{-- populated by JS --}}
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                            <label>Service</label>
                            <select name="service" id="order_service" class="form-control" required>
                                {{-- populated by JS --}}
                            </select>
                        </div>
                    </div>

                    {{-- Variation & Area --}}
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label>Variation</label>
                            <select name="attribute" id="attribute" class="form-control" required>
                                {{-- populated by JS --}}
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label>Area / Frequency</label>
                            <select name="order_service_area" id="order_service_area" class="form-control" required>
                                {{-- populated by JS --}}
                            </select>
                        </div>
                    </div>

                    {{-- Readonly SR fields --}}
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <input type="hidden" name="variationsID" id="variationsID"
                                value="{{ old('variationsID', $lead->variations_id) }}">
                            <label>No. of Services</label>
                            <input type="text" name="srTime" id="srTime" class="form-control" readonly
                                value="{{ old('srTime', $lead->srTime) }}">
                        </div>
                        <div class="form-group col-md-6">
                            <label>Scheduled Every</label>
                            <input type="text" name="srInterval" id="srInterval" class="form-control" readonly
                                value="{{ old('srInterval', $lead->srInterval) }}">
                        </div>
                    </div>

                    {{-- Quantity & Coupons --}}
                    <div class="form-row align-items-end">
                        <div class="form-group col-md-4">
                            <label>Select Quantity</label>
                            <div class="input-group">
                                <button type="button" class="btn btn-outline-secondary decrement">–</button>
                                <input type="text" class="form-control text-center quantity-value"
                                    value="{{ old('quantity', 1) }}" readonly>
                                <button type="button" class="btn btn-outline-secondary increment">+</button>
                            </div>
                        </div>
                        <div class="form-group col-md-8">
                            <label>Coupon Percentage</label>
                            <select name="coupons" id="coupons" class="form-control">
                                <option value="">– Select Coupon Percentage –</option>
                                <option value="5" {{ old('coupons', $lead->coupons) == 5 ? 'selected' : '' }}>5% Percentage
                                </option>
                                <option value="10" {{ old('coupons', $lead->coupons) == 10 ? 'selected' : '' }}>10% Percentage
                                </option>
                            </select>
                        </div>
                    </div>
                     <div id="follow_up_container" class="form-group col-md-12" style="display: none;">
                     <label for="follow_up_dt">Follow-Up Date & Time</label>
                     <input type="text" id="follow_up_dt" name="follow_up_datetime" class="form-control" placeholder="Select date & time"value="{{ old('follow_up_datetime', $lead->follow_up_dt) }}"  ></div>

                    {{-- Price & Total --}}
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label>Price (Without GST)</label>
                            <input type="text" name="price" id="order_price" class="form-control" readonly
                                value="{{ old('price', $lead->price) }}">
                        </div>
                        <div class="form-group col-md-6 text-right">
                            <br>
                            <h4 style="font-size:20px">
                                Total Price :
                                <b id="display_total">{{ old('total_price', '0') }} /-</b>
                                <small style="font-size:12px">(Inclusive of All Taxes)</small>
                            </h4>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-success">Update Lead</button>
                </form>
            </div>
        </div>
    </div>
@endsection

<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
@section('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', async function () {
            const BASE = '{{ url("admin/leadssheet") }}';
            const categorySelect = document.getElementById('order_category');
            const subcategorySelect = document.getElementById('order_subcategory');
            const serviceSelect = document.getElementById('order_service');
            const attributeSelect = document.getElementById('attribute');
            const serviceAreaSelect = document.getElementById('order_service_area');
            const quantityValueSpan = document.querySelector('.quantity-value');
            const incrementBtn = document.querySelector('.increment');
            const decrementBtn = document.querySelector('.decrement');
            const priceInput = document.getElementById('order_price');
            const totalPriceDisplay = document.getElementById('display_total');
            const couponsSelect = document.getElementById('coupons');

            const hiddenQuantityInput = document.getElementById('hidden_quantity');
            const hiddenBasePrice = document.getElementById('base_price');
            const hiddenTotalPriceInput = document.getElementById('hidden_total_price');
            const hiddenTaxInput = document.getElementById('hidden_tax');

            let currentPrice = 0,
                serviceTypePrice = 0,
                serviceAreaPrice = 0,
                taxAmount = 0,
                taxType = '',
                taxRate = 0,
                subtotal = 0;

            async function fetchSubcategories(catId) {
                const res = await fetch(`${BASE}/get-subcategories/${catId}`);
                const data = await res.json();
                subcategorySelect.innerHTML = '<option value="">– Select Sub-Category –</option>';
                data.forEach(sc => subcategorySelect.innerHTML += `<option value="${sc.id}">${sc.subcategory_name}</option>`);
            }

            async function fetchServices(subcatId) {
                const res = await fetch(`${BASE}/get-services/${subcatId}`);
                const data = await res.json();
                serviceSelect.innerHTML = '<option value="">– Select Service –</option>';
                data.forEach(s => serviceSelect.innerHTML += `<option value="${s.id}">${s.product_name}</option>`);
            }

            async function fetchServiceType(serviceId) {
                const res = await fetch(`${BASE}/get-service-variation-type/${serviceId}`);
                const data = await res.json();
                attributeSelect.innerHTML = '<option value="">– Select Variation –</option>';
                data.services.forEach(v => {
                    attributeSelect.innerHTML += `
                  <option value="${v.id}|${data.product_id}">
                    ${v.attribute}
                  </option>`;
                });
            }

            async function fetchServiceArea(attrId, prodId) {
                const res = await fetch(`${BASE}/get-service-variation-area/${attrId}/${prodId}`);
                const data = await res.json();
                serviceAreaSelect.innerHTML = '<option value="">– Select Area –</option>';
                data.forEach(a => {
                    serviceAreaSelect.innerHTML += `
                  <option
                    value="${a.discounted_variation_price}"
                    data-variation-times="${a.variation_times}"
                    data-variation-interval="${a.variation_interval}"
                    data-variation-id="${a.id}"
                    data-variation-price="${a.price}"
                  >${a.variation}</option>`;
                });
            }

            async function fetchServiceDetails(serviceId) {
                const res = await fetch(`${BASE}/get-service-details/${serviceId}`);
                const data = await res.json();
                priceInput.value = data.discounted_price;
                currentPrice = parseFloat(data.discounted_price) || 0;
                taxRate = parseFloat(data.tax) || 0;
                taxType = data.tax_type;
                hiddenTaxInput.value = taxRate;
                calculateTotal();
            }

            function calculateTotal() {
                const qty = parseInt(quantityValueSpan.textContent, 10) || 1;
                hiddenQuantityInput.value = qty;
                subtotal = (serviceTypePrice + serviceAreaPrice) * qty;
                taxAmount = taxType === 'percent'
                    ? subtotal * taxRate / 100
                    : parseFloat(hiddenTaxInput.value) || 0;
                const total = subtotal + taxAmount;
                const baseTot = (parseFloat(hiddenBasePrice.value) || 0) * qty;
                priceInput.value = subtotal.toFixed(2);
                totalPriceDisplay.innerHTML = `
              <span style="color:red;text-decoration:line-through;">
                ${baseTot.toFixed(2)}
              </span>
               ${subtotal.toFixed(2)} + ${taxAmount.toFixed(2)} = ${total.toFixed(2)} /-`;
                hiddenTotalPriceInput.value = total.toFixed(2);
            }

            function updateAttemptCount() {
                let cnt = 0;
                for (let i = 1; i <= 3; i++) {
                    if (document.querySelector(`input[name="attempt_date_${i}"]`).value.trim()
                        || document.querySelector(`input[name="remark_${i}"]`).value.trim()) cnt++;
                }
                document.getElementById('total_attempt_count').value = cnt;
            }

            function resetPriceAndTax() {
                priceInput.value = '';
                currentPrice = serviceTypePrice = serviceAreaPrice = taxAmount = taxType = taxRate = 0;
                calculateTotal();
            }

            // Attach listeners (same as before)…
            incrementBtn.addEventListener('click', () => { let v = parseInt(quantityValueSpan.textContent) || 1; quantityValueSpan.textContent = ++v; calculateTotal(); });
            decrementBtn.addEventListener('click', () => { let v = parseInt(quantityValueSpan.textContent) || 1; if (v > 1) quantityValueSpan.textContent = --v; calculateTotal(); });
            priceInput.addEventListener('input', () => { currentPrice = parseFloat(priceInput.value) || 0; calculateTotal(); });
            couponsSelect.addEventListener('change', () => { /* discount calc here… */ });
            categorySelect.addEventListener('change', async () => { if (categorySelect.value) await fetchSubcategories(categorySelect.value); });
            subcategorySelect.addEventListener('change', async () => { if (subcategorySelect.value) await fetchServices(subcategorySelect.value); });
            serviceSelect.addEventListener('change', async () => {
                if (!serviceSelect.value) return resetPriceAndTax();
                await fetchServiceDetails(serviceSelect.value);
                await fetchServiceType(serviceSelect.value);
                const [a, p] = attributeSelect.value.split('|');
                await fetchServiceArea(a, p);
            });
            attributeSelect.addEventListener('change', async () => {
                const [a, p] = attributeSelect.value.split('|');
                await fetchServiceArea(a, p);
            });
            serviceAreaSelect.addEventListener('change', () => {
                serviceAreaPrice = parseFloat(serviceAreaSelect.value) || 0;
                const opt = serviceAreaSelect.selectedOptions[0];
                document.getElementById('variationsID').value = opt.dataset.variationId;
                document.getElementById('srTime').value = opt.dataset.variationTimes;
                document.getElementById('srInterval').value = opt.dataset.variationInterval;
                hiddenBasePrice.value = opt.dataset.variationPrice;
                calculateTotal();
            });

            // **Initialization on load** with explicit option selection
            if (categorySelect.value) {
                await fetchSubcategories(categorySelect.value);
                subcategorySelect.value = '{{ $lead->subcategory_id }}';

                await fetchServices(subcategorySelect.value);
                serviceSelect.value = '{{ $lead->product_id }}';

                await fetchServiceDetails(serviceSelect.value);
                await fetchServiceType(serviceSelect.value);

                const attrVal = '{{ $lead->attribute_id }}|{{ $lead->product_id }}';
                attributeSelect.value = attrVal;
                const [a, p] = attrVal.split('|');
                await fetchServiceArea(a, p);

                // ↙ select by data-variation-id, not value
                const variationId = '{{ $lead->variations_id }}';
                const matchingOpt = serviceAreaSelect.querySelector(`option[data-variation-id="${variationId}"]`);
                if (matchingOpt) {
                    matchingOpt.selected = true;
                    serviceAreaSelect.dispatchEvent(new Event('change'));
                }
            }

            for (let i = 1; i <= 3; i++) {
                document.querySelector(`input[name="attempt_date_${i}"]`).addEventListener('change', updateAttemptCount);
                document.querySelector(`input[name="remark_${i}"]`).addEventListener('input', updateAttemptCount);
            }
            updateAttemptCount();

            function followUP(){
                flatpickr("#follow_up_dt", {
                    enableTime: true,
                    time_24hr: true,
                    dateFormat: "Y-m-d H:i",
                    minDate: "today"
                });s
            }
            followUP();
            
            
        });
        document.addEventListener('DOMContentLoaded', function() {
          const statusSelect    = document.getElementById('lead_status');
          const followContainer = document.getElementById('follow_up_container');
          flatpickr("#follow_up_dt", {
            enableTime: true,
            time_24hr: true,
            dateFormat: "Y-m-d H:i",
            minDate: "today"
          });
          function toggleFollowUp() {
            followContainer.style.display =
              statusSelect.value === 'follow_up' ? 'block' : 'none';
          }
          toggleFollowUp();
          statusSelect.addEventListener('change', toggleFollowUp);
        });
    </script>
@endsection