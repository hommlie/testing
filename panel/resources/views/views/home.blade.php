@extends('layouts.admin')
@section('css')

    <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdn.datatables.net/2.1.5/css/dataTables.bootstrap5.css">
    </head>

@endsection
@section('content')
    <div class="content">
        <div class="row p-3">
            {{--TOTAL USER--}}
            <div class="col-lg-3 my-2">
                <a href="{{ url('admin/customers') }}">
                    <div class="d-flex justify-content-between p-3 bg-white rounded mx-2"
                        style="box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;border-bottom:3px solid green">
                        <div>
                            <span style="font-size: 40px;font-weight:bolder">{{ $customerCount }}</span><br>
                            <span>Total Users</span>
                        </div>
                        <i class="fas fa-users my-auto text-success font-weight-bold" style="font-size:30px"></i>
                    </div>
                </a>
            </div>
            {{-- TOTAL ORDERS--}}
            <div class="col-lg-3 my-2">
                <a href="{{ url('admin/orders') }}">
                    <div class="d-flex justify-content-between p-3 bg-white rounded mx-2"
                        style="box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;border-bottom:3px solid green">
                        <div>
                            <span style="font-size: 40px;font-weight:bolder">{{ $orderCount }}</span><br>
                            <span>Total Orders</span>
                        </div>
                        <i class="fas fa-shopping-cart my-auto text-success font-weight-bold" style="font-size:30px"></i>
                    </div>
                </a>
            </div>
            {{-- TOTAL COMPLETED ORDERS --}}
            <div class="col-lg-3 my-2">
                <a href="{{ url('admin/orders') }}">
                    <div class="d-flex justify-content-between p-3 bg-white rounded mx-2"
                        style="box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;border-bottom:3px solid green">
                        <div>
                            <span style="font-size: 40px;font-weight:bolder">{{ $orderComplete }}</span><br>
                            <span>Total Completed Orders</span>
                        </div>
                        <i class="fas fa-check-circle my-auto text-success font-weight-bold" style="font-size:30px"></i>
                    </div>
                </a>
            </div>
            {{-- TOTAL EMPLOYEES --}}
            <div class="col-lg-3 my-2">
                <a href="{{ url('admin/employees') }}">
                    <div class="d-flex justify-content-between p-3 bg-white rounded mx-2"
                        style="box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;border-bottom:3px solid green">
                        <div>
                            <span style="font-size: 40px;font-weight:bolder">{{ $employeeCount }}</span><br>
                            <span>Total Employees</span>
                        </div>
                        <i class="	fas fa-address-book my-auto text-success font-weight-bold" style="font-size:30px"></i>
                    </div>
                </a>
            </div>
            {{-- TOTAL PRODUCTS --}}
            <div class="col-lg-3 my-2">
                <a href="{{ url('admin/product') }}">
                    <div class="d-flex justify-content-between p-3 bg-white rounded mx-2"
                        style="box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;border-bottom:3px solid green">
                        <div>
                            <span style="font-size: 40px;font-weight:bolder">{{ $productCount }}</span><br>
                            <span>Total Products</span>
                        </div>
                        <i class="fas fa-briefcase my-auto text-success font-weight-bold" style="font-size:30px"></i>
                    </div>
                </a>
            </div>
            {{-- TOTAL CATEGORIES --}}
            <div class="col-lg-3 my-2">
                <div class="d-flex justify-content-between p-3 bg-white rounded mx-2"
                    style="box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;border-bottom:3px solid green">
                    <div>
                        <span style="font-size: 40px;font-weight:bolder">{{ $todayOrderCount }}</span><br>
                        <span>Today's Orders</span>
                    </div>
                    <i class="fas fa-calendar-check my-auto text-success font-weight-bold" style="font-size:30px"></i>
                </div>
            </div>
            {{-- TOTAL TOMORROW'S ORDERS--}}
            <div class="col-lg-3 my-2">
                <div class="d-flex justify-content-between p-3 bg-white rounded mx-2"
                    style="box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;border-bottom:3px solid green">
                    <div>
                        <span style="font-size: 40px;font-weight:bolder">{{ $tomorrowOrderCount }}</span><br>
                        <span>Tomorrow's Orders</span>
                    </div>
                    <i class="fas fa-calendar-alt my-auto text-success font-weight-bold" style="font-size:30px"></i>
                </div>
            </div>
            {{-- TOTAL COMPLAINTS --}}
            <div class="col-lg-3 my-2">
                <div class="d-flex justify-content-between p-3 bg-white rounded mx-2"
                    style="box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;border-bottom:3px solid green">
                    <div>
                        <span style="font-size: 40px;font-weight:bolder">{{ $complaintCount }}</span><br>
                        <span>Total Complaint</span>
                    </div>
                    <i class="fas fa-comments my-auto text-success font-weight-bold" style="font-size:30px"></i>
                </div>
            </div>
        </div>
        {{-- RECENT ORDERS --}}
        <div class="p-3">
            <div class="card">
                <div class="card-header">
                    <h3>Recent Orders</h3>
                </div>
                <div class="card-body">
                    <table id="data_table_bootstrap" class="table table-striped table-responsive-sm">
                        <thead>
                            <tr>
                                <!-- <th>#</th> -->
                                <th class="text-center">{{ trans('labels.order_number') }}</th>
                                <th class="text-center">{{ trans('labels.no_of_products') }}</th>
                                <th class="text-center">{{ trans('labels.customer') }}</th>
                                <th class="text-center">{{ trans('Mobile') }}</th>
                                <th class="text-center">{{ trans('labels.order_total') }}</th>
                                <th class="text-center">{{ trans('labels.date') }}</th>
                                <th class="text-center">{{ trans('labels.action') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php $n = 0 @endphp
                            @forelse($data as $row)
                            <tr id="del-{{$row->id}}">
                                <!-- <td class="text-center">{{++$n}}</td> -->
                                <td class="text-center">{{$row->order_number}}</td>
                                <td class="text-center">{{$row->no_products}}</td>
                                <td class="text-center">{{$row->full_name}}</td>
                                <td class="text-center">{{$row->mobile}}</td>
                                <td class="text-center">{{$row->grand_total}}</td>
                                <td class="text-center">{{$row->date}}</td>
                                <td class="text-center d-flex">
                                    <!-- View Button -->
                                    <a href="{{ URL::to('admin/orders/order-details/' . $row->order_number) }}"
                                        class="success p-0 mx-1" data-original-title="{{ trans('labels.view') }}"
                                        title="{{ trans('labels.view') }}">
                                        <span class="badge badge-success">View</span>
                                    </a>
                                    
                                    <!-- Dropdown for Edit Options using JavaScript -->
                                    @if($row->no_products > 1)
                                        <div class="custom-dropdown">
                                            <button class="badge badge-warning border-0 dropdown-toggle" type="button"
                                                onclick="toggleDropdown('{{ $row->id }}')">
                                                Edit
                                            </button>
                                            <div id="dropdown-{{ $row->id }}" class="dropdown-menu" style="display: none;">
                                                @php
                                                    $n = 1
                                                @endphp
                                                @foreach(explode(',', $row->order_ids) as $id)
                                                    <a class="dropdown-item"
                                                        href="{{ URL::to('admin/orders/editorder/' . $id) }}">Service ID:
                                                        {{ $n++ }}</a>
                                                @endforeach
                                            </div>
                                        </div>
                                    @else
                                        <!-- Single Edit Button -->
                                        <a href="{{ URL::to('admin/orders/editorder/' . $row->id) }}" class="success p-0"
                                            data-original-title="{{ trans('labels.view') }}" title="{{ trans('labels.view') }}">
                                            <span class="badge badge-warning">Edit</span>
                                        </a>
                                    @endif
                                </td>
                            </tr>
                            @empty
                                <!-- Handle empty data -->
                            @endforelse
                        </tbody>
                    </table>
                    <script>
                        function toggleDropdown(id) {
                            const dropdownMenu = document.getElementById(`dropdown-${id}`);
                            dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
                        }
                        // Close dropdowns when clicking outside
                        document.addEventListener('click', function (event) {
                            const dropdowns = document.querySelectorAll('.dropdown-menu');
                            dropdowns.forEach(dropdown => {
                                if (!dropdown.contains(event.target) && !event.target.classList.contains('dropdown-toggle')) {
                                    dropdown.style.display = 'none';
                                }
                            });
                        });
                    </script>

                    <style>
                        .custom-dropdown {
                            position: relative;
                            display: inline-block;
                        }

                        .dropdown-menu {
                            position: absolute;
                            top: 100%;
                            left: 0;
                            z-index: 1000;
                            display: block;
                            min-width: 160px;
                            padding: 5px 0;
                            margin: 0;
                            background-color: #fff;
                            border: 1px solid rgba(0, 0, 0, 0.15);
                            border-radius: 4px;
                            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
                        }
                    </style>

                </div>
            </div>
        </div>
    </div>
@endsection
@section('scripts')
    @parent
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.datatables.net/2.1.5/js/dataTables.js"></script>
    <script src="https://cdn.datatables.net/2.1.5/js/dataTables.bootstrap5.js"></script>



    <script>
        new DataTable('#HomeTable');
    </script>

    <script src="https://cdn.ckeditor.com/ckeditor5/41.3.1/classic/ckeditor.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            ClassicEditor
                .create(document.querySelector('#editor'))
                .then(editor => {
                    editor.model.document.on('change:data', () => {
                        document.querySelector('#description').value = editor.getData();
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        });
    </script>
@endsection