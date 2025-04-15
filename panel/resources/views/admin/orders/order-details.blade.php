@extends('layouts.admin')
@section('title')

@endsection

<style>
    .text-green {
        color: rgba(17, 174, 59, 0.88);
    }

    .text-gap {
        line-height: 0.4;
        font-size: 14px;
    }


    @media print {

        /* Hide everything except the print area */
        body * {
            visibility: hidden;
        }

        .app-sidebar {
            display: none;
        }

        button {
            display: none;
        }

        /* Make the print area visible */
        .print-area,
        .print-area * {
            visibility: visible;
        }

        /* Adjust the print area to fit the page */
        .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
        }
    }
</style>


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
    <div class="row">
        <div class="col-md-12">
            <h4>Invoice</h4>

        </div>
    </div>
    <section class="invoice-template" id="inTemDownload">
        <div class="card print-area">
            <div class="card-body">
                <div id="invoice-template" class="card-block">
                    <!-- Invoice Company Details -->
                    <div id="invoice-company-details" class="row">
                        {{-- NEW INVOICE DESIGN --}}
                        <div class="border border-dark">
                            <div class="mt-3 ml-2 mr-3">
                                {{-- HOMMLIE INFORAMTION --}}
                                <div class="header-section  d-flex align-items-center">
                                    <div class="col-md-6 mt-2">
                                        <h4 class="text-success"><b>ADML TECHNOSERVICES PVT. LTD.</b></h4>
                                        <p>
                                            <b>Registered Office:</b> 57 2nd floor, Place building, 6th Main Rd,
                                            Nagendra Block, Banashankari 1st Stage, Banashankari, Bengaluru, Karnataka
                                            560050.
                                            <br>


                                            <b>Website:</b> <i><u class="text-primary">www.hommlie.com</u></i>
                                            <b>Customer Care:</b> +91 6363865658
                                        </p>
                                    </div>
                                    <div class="col-md-6 text-right">
                                        <img src="{{ asset('storage/app/public/Adminassets/img/sidebar-bg/hommlie-logo.png') }}"
                                            alt="company logo" class="mb-2" width="170">
                                    </div>
                                </div>
                                <hr>
                                {{-- CUSTOMER INFORAMTION --}}
                                <div class="">
                                    <div class="col-md-6">
                                        <h4 class="text-success">SERVICE CONTRACT FORM</h4>
                                    </div>
                                </div>
                                <div class="row d-flex">
                                    <div class="col-md-8 ml-3">
                                        <ul class="list-unstyled">
                                            <li><b>PAN :</b> AAZCA4409K <b class="ml-5">GSTIN :</b> 29AAZCA4409K1ZZ <b
                                                    class="ml-5">CIN :</b> U96908KA2023PTC179034</li>
                                            <br>
                                            <li> <b> Order No :</b> # {{$order_info->order_number}}</li>
                                            <li><b>Order Date: </b> {{$order_info->date}}</li>
                                            <li> <b> Customer Name: </b>
                                                @php
                                                    if ($order_info->bill_to_Name == "") {
                                                        echo $order_info->full_name;
                                                    } else {
                                                        echo $order_info->bill_to_Name;
                                                    }

                                                @endphp

                                            </li>
                                            <li> <b> Service Address :</b>
                                                {{$order_info->street_address}},{{$order_info->landmark}},{{$order_info->pincode}}.
                                            </li>
                                            <li> <b> House Number: </b>
                                                @php
                                                    if ($order_info->house_number) {
                                                        echo $order_info->house_number;
                                                    } else {
                                                        echo "";
                                                    }
                                                @endphp </li>
                                            <li> <b> Email Id : </b>{{$order_info->email}}</li>
                                            <li> <b> Mobile Number : </b>{{$order_info->mobile}}</li>

                                        </ul>
                                    </div>

                                </div>
                                <hr>
                                <h4 class="text-success"><b>Order Details</b></h4>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>SR-ID</th>
                                            {{-- <th>{{ trans('labels.image') }}</th> --}}
                                            <th>{{ trans('labels.name') }}</th>
                                            <th>{{ trans('labels.qty') }}</th>
                                            <th>{{ trans('labels.price') }}</th>
                                            <th>{{trans('Discount ')}}</th>
                                            <th>{{ trans('labels.tax') }}</th>
                                            <th>{{ trans('Desired Date&Time') }}</th>
                                            <th>{{ trans('labels.status') }}</th>
                                            <th>{{ trans('labels.order_total') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach($order_data as $row)

                                            @if ($row->discount_amount == "")
                                                @php     $grand_total = $row->subtotal + $row->tax + $row->shipping_cost; @endphp
                                            @else
                                                @php     $grand_total = $row->subtotal + $row->tax + $row->shipping_cost - $row->discount_amount; @endphp
                                            @endif
                                            <tr>

                                                <td>SR-{{$row->id}}</td>
                                                {{-- <td><img class="media-object round-media height-50"
                                                        src="{{$row->image_url}}" alt="Generic placeholder image"
                                                        style="width: 70px;" /></td>--}}
                                                <td>{{$row->product_name}}
                                                    @if($row->attribute != "")
                                                        @foreach($attrData as $attri)
                                                            @if($row->attribute == $attri->id)
                                                                ({{$attri->attribute}})
                                                            @endif
                                                        @endforeach
                                                    @endif
                                                </td>
                                                <td>{{$row->qty}}</td>
                                                <td>₹{{ number_format($row->price, 2) }}</td>
                                                <td>₹{{ number_format($row->discount_amount, 2) }}</td>
                                                <td>₹{{ number_format($row->tax, 2) }}</td>
                                                <td>{{($row->desired_date . ' ' . $row->desired_time)}}</td>

                                                <td>
                                                    @if ($row->order_status == 1)
                                                        Order placed
                                                    @endif
                                                    @if ($row->order_status == 2)
                                                        Dispatched
                                                    @endif
                                                    @if ($row->order_status == 3)
                                                        On-Site
                                                    @endif
                                                    @if ($row->order_status == 4)
                                                        Completed
                                                    @endif
                                                    @if ($row->order_status == 5)
                                                        InComplete
                                                    @endif

                                                </td>

                                                @if(Auth::user()->roles->first()->name == "admin")
                                                    <td id="tdstatus{{$row->id}}">
                                                        <div class="btn-group">
                                                            @if ($row->status != 4)
                                                                @if ($row->status != 5 && $row->status != 7 && $row->status != 8 && $row->status != 9 && $row->status != 10)
                                                                    <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                                                                        @if ($row->status == 1)
                                                                            Order placed
                                                                        @endif
                                                                        @if ($row->status == 2)
                                                                            Confirmed
                                                                        @endif
                                                                        @if ($row->status == 3)
                                                                            Order shipped
                                                                        @endif
                                                                        @if ($row->status == 4)
                                                                            Delivered
                                                                        @endif
                                                                        <span class="caret"></span>
                                                                    </a>
                                                                @endif
                                                                <ul class="dropdown-menu">
                                                                    @if ($row->status == 1)
                                                                        <button class="dropdown-item changeStatus active"
                                                                            data-id="{{$row->id}}" data-status="1">Order placed</button>
                                                                        <button class="dropdown-item changeStatus"
                                                                            data-id="{{$row->id}}" data-status="2">Confirmed</button>
                                                                        <button class="dropdown-item changeStatus"
                                                                            data-id="{{$row->id}}" data-status="3">Order
                                                                            shipped</button>
                                                                        <button class="dropdown-item changeStatus"
                                                                            data-id="{{$row->id}}" data-status="4">Delivered</button>
                                                                        <button class="dropdown-item changeStatus"
                                                                            data-id="{{$row->id}}" data-status="5">Cancelled</button>
                                                                    @endif
                                                                    @if ($row->status == 2)
                                                                        <button class="dropdown-item changeStatus"
                                                                            data-id="{{$row->id}}" data-status="1">Order placed</button>
                                                                        <button class="dropdown-item changeStatus active"
                                                                            data-id="{{$row->id}}" data-status="2">Confirmed</button>
                                                                        <button class="dropdown-item changeStatus"
                                                                            data-id="{{$row->id}}" data-status="3">Order
                                                                            shipped</button>
                                                                        <button class="dropdown-item changeStatus"
                                                                            data-id="{{$row->id}}" data-status="4">Delivered</button>
                                                                        <button class="dropdown-item changeStatus"
                                                                            data-id="{{$row->id}}" data-status="5">Cancelled</button>
                                                                    @endif
                                                                    @if ($row->status == 3)
                                                                        <button class="dropdown-item changeStatus"
                                                                            data-id="{{$row->id}}" data-status="1">Order placed</button>
                                                                        <button class="dropdown-item changeStatus"
                                                                            data-id="{{$row->id}}" data-status="2">Confirmed</button>
                                                                        <button class="dropdown-item changeStatus active"
                                                                            data-id="{{$row->id}}" data-status="3">Order
                                                                            shipped</button>
                                                                        <button class="dropdown-item changeStatus"
                                                                            data-id="{{$row->id}}" data-status="4">Delivered</button>
                                                                        <button class="dropdown-item changeStatus"
                                                                            data-id="{{$row->id}}" data-status="5">Cancelled</button>
                                                                    @endif
                                                                    @if ($row->status == 4)
                                                                        <button class="dropdown-item changeStatus"
                                                                            data-id="{{$row->id}}" data-status="1">Order placed</button>
                                                                        <button class="dropdown-item changeStatus"
                                                                            data-id="{{$row->id}}" data-status="2">Confirmed</button>
                                                                        <button class="dropdown-item changeStatus"
                                                                            data-id="{{$row->id}}" data-status="3">Order
                                                                            shipped</button>
                                                                        <button class="dropdown-item changeStatus active"
                                                                            data-id="{{$row->id}}" data-status="4">Delivered</button>
                                                                        <button class="dropdown-item changeStatus"
                                                                            data-id="{{$row->id}}" data-status="5">Cancelled</button>
                                                                    @endif
                                                                </ul>
                                                                @if ($row->status == 5)
                                                                    <button class="btn btn-flat btn-danger">Cancelled</button>
                                                                @endif
                                                                @if ($row->status == 7)
                                                                    <button class="btn btn-flat btn-danger">Return</button>
                                                                @endif
                                                                @if ($row->status == 8)
                                                                    <button class="btn btn-flat btn-danger">Return in progress</button>
                                                                @endif
                                                                @if ($row->status == 9)
                                                                    <button class="btn btn-flat btn-danger">Return complete</button>
                                                                @endif
                                                                @if ($row->status == 10)
                                                                    <button class="btn btn-flat btn-danger">Return rejected</button>
                                                                @endif
                                                            @else
                                                                <button class="btn btn-flat btn-success">Delivered</button>
                                                            @endif
                                                        </div>
                                                    </td>
                                                @endif
                                                <td {{ $row->order_status == 4 ? 'style="text-decoration: line-through;"' : '' }}>
                                                    ₹{{ number_format($row->price - $row->discount_amount + $row->tax, 2) }}
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                                <hr>
                                <div class="">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="">
                                                <div class="card-body">
                                                    <h6><b>Payment Type</b></h6>
                                                    <div class="form-check form-check-inline mt-2">
                                                        @if($order_info->payment_type == 1)
                                                            <input type="radio" name="payment_type" value="1" checked
                                                                class="form-check-input">
                                                            <label class="form-check-label">COD</label>
                                                        @else
                                                            <input type="radio" name="payment_type" value="1"
                                                                class="form-check-input">
                                                            <label class="form-check-label">COD</label>
                                                        @endif
                                                    </div>

                                                    <div class="form-check form-check-inline">
                                                        @if($order_info->payment_type == 2)
                                                            <input type="radio" name="payment_type" value="2" checked
                                                                class="form-check-input">
                                                            <label class="form-check-label">Wallet</label>
                                                        @else
                                                            <input type="radio" name="payment_type" value="2"
                                                                class="form-check-input">
                                                            <label class="form-check-label">Wallet</label>
                                                        @endif
                                                    </div>

                                                    <div class="form-check form-check-inline">
                                                        @if($order_info->payment_type == 3)
                                                            <input type="radio" name="payment_type" value="3" checked
                                                                class="form-check-input">
                                                            <label class="form-check-label">RazorPay</label>
                                                        @else
                                                            <input type="radio" name="payment_type" value="3"
                                                                class="form-check-input">
                                                            <label class="form-check-label">RazorPay</label>
                                                        @endif
                                                    </div>

                                                    <div class="form-check form-check-inline">
                                                        @if($order_info->payment_type == 4)
                                                            <input type="radio" name="payment_type" value="4" checked
                                                                class="form-check-input">
                                                            <label class="form-check-label">Stripe</label>
                                                        @else
                                                            <input type="radio" name="payment_type" value="4"
                                                                class="form-check-input">
                                                            <label class="form-check-label">Stripe</label>
                                                        @endif
                                                    </div>

                                                    <div class="form-check form-check-inline">
                                                        @if($order_info->payment_type == 5)
                                                            <input type="radio" name="payment_type" value="5" checked
                                                                class="form-check-input">
                                                            <label class="form-check-label">Flutterwave</label>
                                                        @else
                                                            <input type="radio" name="payment_type" value="5"
                                                                class="form-check-input">
                                                            <label class="form-check-label">Flutterwave</label>
                                                        @endif
                                                    </div>

                                                    <div class="form-check form-check-inline ">
                                                        @if($order_info->payment_type == 6)
                                                            <input type="radio" name="payment_type" value="6" checked
                                                                class="form-check-input">
                                                            <label class="form-check-label">Paystack</label>
                                                        @else
                                                            <input type="radio" name="payment_type" value="6"
                                                                class="form-check-input">
                                                            <label class="form-check-label">Paystack</label>
                                                        @endif
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div>
                                        <div class="col-12">
                                            <div class="">
                                                <div class="">
                                                    <table class="table table-bordered">
                                                        <tr>
                                                            <td class="text-left">Subtotal</td>
                                                            <td class="text-right">
                                                                ₹{{ number_format($order_info->subtotal, 2) }}</td>
                                                        </tr>

                                                        @if (!empty($order_info->grand_discount_amount) && $order_info->grand_discount_amount > 0)
                                                            <tr>
                                                                <td class="text-left">Discount</td>
                                                                <td class="text-right">-
                                                                    ₹{{ number_format($order_info->grand_discount_amount, 2) }}
                                                                </td>
                                                            </tr>
                                                        @endif

                                                        <tr>
                                                            <td class="text-left">TAX</td>
                                                            <td class="text-right">+
                                                                ₹{{ number_format($order_info->tax, 2) }}</td>
                                                        </tr>

                                                        @php
                                                            if (!empty($order_info->grand_discount_amount) && $order_info->grand_discount_amount > 0) {
                                                                $total = $order_info->subtotal + $order_info->tax - $order_info->grand_discount_amount;
                                                            } else {
                                                                $total = $order_info->subtotal + $order_info->tax;
                                                            }
                                                        @endphp

                                                        <tr>
                                                            <td class="text-left font-weight-bold">Total</td>
                                                            <td class="text-right font-weight-bold">
                                                                ₹{{ number_format($total, 2) }}</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12  text-gap mt-lg-5">
                                        <div class="col-md-6 text-left">
                                            <p><b>CUSTOMER ACCEPTANCE </b></p>
                                            <p> I/We agree that the service contract is based on the information
                                                provided
                                                above.</p>
                                            <p> Name of Customer :..................................................................................................
                                            </p>
                                            <p>Preserve this contract form and payment receipt.</p>
                                        </div><br><br><br>
                                        <div class="col-md-6 mt-lg-5">
                                        <p>Signature of Customer</p>
                                            <p>.....................................</p><br/>
                                        </div>
                                    </div>
                                </div><br><br>
                                <hr><br><br>
                                <div class="col-md-12">
                                    <h4><b>About us</b></h4><br>
                                    {!! $aboutData->about_content !!}
                                </div><br>
                                <hr>
                                <div class="col-md-12">
                                    <h4><b>Privacy policy</b></h4> <br>
                                    {!! $policyData->privacypolicy_content !!}
                                </div><br>
                                <hr>
                                <div class="col-md-12">
                                    <h4><b>Terms Conditions</b></h4><br>
                                    {!! $conditionsData->terms_conditions !!}

                                </div><br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
<div class="mt-5 text-right">
    <button onclick="window.print()" class="btn btn-success rounded-0">Print Invoice</button>
    <button id="downloadInvoice" class="btn btn-primary rounded-0">Download Invoice</button>
</div>


</section>

</div>




@endsection
@section('scripttop')
@endsection
@section('scripts')
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
<script type="text/javascript">
    // $.ajaxSetup({
    //     headers: {
    //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    //     }
    // });

    document.getElementById('downloadInvoice').addEventListener('click', () => {
        const element = document.getElementById('inTemDownload');
        const opt = {
            margin: 0,
            filename: 'invoice.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'pt', format: 'a3', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    });


    //Change Status
    $('body').on('click', '.changeStatus', function () {
        let status = $(this).attr('data-status');
        let id = $(this).attr('data-id');
        Swal.fire({
            title: '{{ trans('labels.are_you_sure') }}',
            text: "{{ trans('labels.change_status') }}",
            type: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '{{ trans('labels.yes') }}',
            cancelButtonText: '{{ trans('labels.no') }}'
        }).then((t) => {
            if (t.value == true) {
                $('#preloader').show();
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: '{{route("admin.orders.changeStatus")}}',
                    type: "POST",
                    data: { 'id': id, 'status': status },
                    success: function (data) {
                        $('#preloader').hide();
                        location.reload();
                    }, error: function (data) {
                        $('#preloader').hide();
                        console.log("AJAX error in request: " + JSON.stringify(data, null, 2));
                    }
                });
            }
            else {
                Swal.fire({ type: 'error', title: '{{ trans('labels.cancelled') }}', showConfirmButton: false, timer: 1500 });
            }
        });
    });
</script>
@endsection