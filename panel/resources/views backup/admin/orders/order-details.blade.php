@extends('layouts.admin')
@section('title')

@endsection

<style>
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
    <section class="invoice-template ">
        <div class="card print-area">
            <div class="card-body p-3">
                <div id="invoice-template" class="card-block">
                    <!-- Invoice Company Details -->
                    <div id="invoice-company-details" class="row">
                        <div class="col-6 text-left">

                            <img src="{{ asset('storage/app/public/Adminassets/img/sidebar-bg/hommlie-logo.png') }}"
                                alt="company logo" class="mb-2" width="70">
                            <ul class="px-0 list-unstyled">
                                <li>{{$order_info->store_address}}</li>
                            </ul>
                        </div>
                        <div class="col-6 text-right">
                            <h2>INVOICE</h2>
                            <p class="pb-3"># {{$order_info->order_number}}</p>
                        </div>
                    </div>
                    <!--/ Invoice Company Details -->
                    <!-- Invoice Customer Details -->
                    <div id="invoice-customer-details" class="row pt-2">
                        <div class="col-sm-12 text-left">
                            <p class="text-muted">Bill To:</p>
                        </div>
                        <div class="col-6 text-left">
                            <ul class="px-0 list-unstyled">
                                <li class="text-bold-800">{{$order_info->full_name}}</li>
                                <li class="text-bold-800">{{$order_info->email}}</li>
                                <li class="text-bold-800">{{$order_info->mobile}}</li>
                                <li>{{$order_info->street_address}},</li>
                                <li>{{$order_info->landmark}},</li>
                                <li>{{$order_info->pincode}}.</li>
                            </ul>
                        </div>
                        <div class="col-6 text-right">
                            <p><span class="text-muted">Invoice Date :</span> {{$order_info->date}}</p>
                        </div>
                    </div>
                    <!--/ Invoice Customer Details -->
                    <!-- Invoice Items Details -->
                    <div id="invoice-items-details" class="pt-2">
                        <div class="row">
                            <div class="table-responsive col-sm-12">
                                <table class="table">
                                    <thetad>
                                        <tr>
                                            <th>SR-ID</th>
                                            <th>{{ trans('labels.image') }}</th>
                                            <th>{{ trans('labels.name') }}</th>
                                            <th>{{ trans('labels.price') }}</th>
                                            <th>{{ trans('labels.qty') }}</th>
                                            <th>{{ trans('labels.tax') }}</th>
                                            <th>{{ trans('Desired Date&Time') }}</th>
                                            <th>{{ trans('labels.status') }}</th>
                                            <th>{{ trans('labels.order_total') }}</th>
                                        </tr>

                                    </thetad>
                                    <tbody>
                                        @foreach($order_data as $row)

                                            @if ($row->discount_amount == "")
                                                @php        $grand_total = $row->subtotal + $row->tax + $row->shipping_cost; @endphp
                                            @else
                                                @php        $grand_total = $row->subtotal + $row->tax + $row->shipping_cost - $row->discount_amount; @endphp
                                            @endif
                                            <tr>
                                                <td>SR-{{$row->id}}</td>
                                                <td><img class="media-object round-media height-50"
                                                        src="{{$row->image_url}}" alt="Generic placeholder image"
                                                        style="width: 70px;" /></td>
                                                <td>{{$row->product_name}} @if($row->variation != "")({{$row->variation}})
                                                @endif</td>
                                                <td>₹{{ number_format($row->price, 2) }}</td>
                                                <td>{{$row->qty}}</td>
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
                                                <td {{ $row->order_status == 4 ? 'style="text-decoration: line-through;"' : '' }}>₹{{ number_format($row->price + $row->tax, 2) }}</td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-sm-12 text-left">
                                <p class="lead">Payment Methods:</p>
                                <div class="row">
                                    <div class="col-12">
                                        <table class="table table-borderless table-sm">
                                            <tbody>
                                                <!-- payment_type = COD : 1, Wallet : 2, RazorPay : 3, Stripe : 4, Flutterwave : 5 , Paystack : 6-->
                                                <td>
                                                    @if($order_info->payment_type == 1)
                                                        COD
                                                    @endif

                                                    @if($order_info->payment_type == 2)
                                                        Wallet
                                                    @endif

                                                    @if($order_info->payment_type == 3)
                                                        RazorPay
                                                    @endif

                                                    @if($order_info->payment_type == 4)
                                                        Stripe
                                                    @endif

                                                    @if($order_info->payment_type == 5)
                                                        Flutterwave
                                                    @endif

                                                    @if($order_info->payment_type == 6)
                                                        Paystack
                                                    @endif
                                                </td>
                                                <td class="text-right">{{$order_info->payment_id}}</td>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6 col-sm-12">
                                <p class="lead">Total due</p>
                                <div class="table-responsive">
                                    <table class="table">
                                        <tbody>
                                            <!-- Subtotal -->
                                            <tr>
                                                <td>Sub Total</td>
                                                <td class="text-right">₹{{ number_format($order_info->subtotal, 2) }}
                                                </td>
                                            </tr>

                                            <!-- Discount (only show if discount_amount is not empty) -->
                                            @if (!empty($order_info->discount_amount) && $order_info->discount_amount > 0)
                                                <tr>
                                                    <td>Discount</td>
                                                    <td class="text-right">-
                                                        ₹{{ number_format($order_info->discount_amount, 2) }}</td>
                                                </tr>
                                            @endif

                                            <!-- Tax -->
                                            <tr>
                                                <td>TAX</td>
                                                <td class="text-right">+ ₹{{ number_format($order_info->tax, 2) }}</td>
                                            </tr>

                                            @php
                                                // Calculate total based on discount presence
                                                if (!empty($order_info->discount_amount) && $order_info->discount_amount > 0) {
                                                    $total = $order_info->subtotal + $order_info->tax - $order_info->discount_amount;
                                                } else {
                                                    $total = $order_info->subtotal + $order_info->tax;
                                                }
                                            @endphp

                                            <!-- Total -->
                                            <tr>
                                                <td class="text-bold-800 font-weight-bold">Total</td>
                                                <td class="text-bold-800 text-right font-weight-bold">
                                                    ₹{{ number_format($total, 2) }}</td>
                                            </tr>
                                        </tbody>

                                    </table>

                                </div>
                                <button onclick="window.print()" class="btn btn-primary">Print Invoice</button>
                            </div>
                        </div>
                    </div>
                    <!-- Invoice Footer -->
                    <!-- <div id="invoice-footer mt-3">
                            <div class="row">
                                <div class="col-md-9 col-sm-12">
                                    <h6>Terms &amp; Condition</h6>
                                    <p>You know, being a test pilot isn't always the healthiest business in the world. We predict too
                                        much for the next year and yet far too little for the next 10.</p>
                                </div>
                            </div>
                        </div> -->
                    <!--/ Invoice Footer -->
                </div>
            </div>
        </div>
    </section>
</div>


@endsection
@section('scripttop')
@endsection
@section('scripts')
<script type="text/javascript">
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
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