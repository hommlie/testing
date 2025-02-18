<aside class="main-sidebar sidebar-dark-primary elevation-4" style="min-height: 917px;">
    <!-- Brand Logo -->
    <a href="#" class="brand-link bg-light">
        <!-- <span class="brand-text font-weight-light">HOMMLIE</span> -->
        <!-- <img src="{{ asset('storage/app/public/assets/hommlie-logo-dark.png') }}" alt=""> -->
        <img src="{{ asset('storage/app/public/Adminassets/img/sidebar-bg/hommlie-logo.png') }}" style="width: 90%;"
            alt="">
    </a>

    <!-- Sidebar -->
    <div class="sidebar bg-success" style="height:100vh;overflow-y:scroll">
        <!-- Sidebar user (optional) -->

        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li class="nav-item">
                    <a href="{{ route("admin.home") }}" class="nav-link">
                        <p>
                            <i class="fas fa-tachometer-alt mr-2"></i>
                            <span>{{ trans('global.dashboard') }}</span>
                        </p>
                    </a>

                </li>


                @can('gantt_access')
                    <li class="nav-item">
                        <a href="{{ route("admin.gantt") }}"
                            class="nav-link {{ request()->is('admin/gantt') ? 'active' : '' }}">
                            <i class="fas fa-chart-bar mr-2">
                            </i>
                            <p>
                                <span>{{ trans('Gantt') }}</span>
                            </p>
                        </a>
                    </li>
                @endcan

                @can('manualorderassign_access')
                    <li class="nav-item">
                        <a href="{{ route("admin.manualorderassign") }}"
                            class="nav-link {{ request()->is('admin/manualorderassign') ? 'active' : '' }}">
                            <i class="fas fa-plus mr-2">
                            </i>
                            <p>
                                <span>{{ trans('Manual Order Assign ') }}</span>
                            </p>
                        </a>
                    </li>
                @endcan



                @can('help_access')
                    <li class="nav-item">
                        <a href="{{ route("admin.help") }}"
                            class="nav-link {{ request()->is('admin/help') ? 'active' : '' }}">
                            <i class="fas fa-question-circle mr-2">
                            </i>
                            <p>
                                <span>{{ trans('Help ') }}</span>
                            </p>
                        </a>
                    </li>
                @endcan

                @can('order_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/orders*') ? 'menu-open' : '' }} {{ request()->is('admin/orders/add*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fas fa-shopping-cart mr-2">

                            </i>
                            <p>
                                <span>{{ trans('Manage Orders') }}</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            {{-- VIEW ORDERS --}}
                            @can('order_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.orders") }}"
                                        class="nav-link {{ request()->is('admin/orders') ? 'active' : '' }}">
                                        <i class="fa fa-check-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('View Orders') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            {{-- ADD ORDERS --}}
                            @can('order_add_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.orders.add") }}"
                                        class="nav-link {{ request()->is('admin/orders/add') ? 'active' : '' }}">
                                        <i class="fa fa-plus-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('Add Orders') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan 
                               {{-- VIEW SERVICE CENTER --}}
                              @can('order_access')
                            <li class="nav-item">
                                <a href="{{ route("admin.orders.region") }}"
                                    class="nav-link {{ request()->is('admin/orders/region') ? 'active' : '' }}">
                                    <i class="fa fa-check-circle mr-2">

                                    </i>
                                    <p>
                                        <span>View Business Region</span>
                                    </p>
                                </a>
                            </li>
                            @endcan
                               {{-- VIEW SERVICE CENTER --}}
                                @can('order_access')
                            <li class="nav-item">
                                <a href="{{ route("admin.orders.services-center") }}"
                                    class="nav-link {{ request()->is('admin/orders/services-center') ? 'active' : '' }}">
                                    <i class="fa fa-check-circle mr-2">

                                    </i>
                                    <p>
                                        <span>View Services Center</span>
                                    </p>
                                </a>
                            </li>
                            @endcan
                            
                        </ul>
                    </li>
                @endcan

                @can('attendance_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/empattendance*') ? 'menu-open' : '' }}  {{ request()->is('admin/verifiedAttendence*') ? 'menu-open' : '' }}">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fas fa-book mr-2">

                            </i>
                            <p>
                                <span>{{ trans('Employee Attendance') }}</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('attendance_login_history_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.empattendance") }}"
                                        class="nav-link {{ request()->is('admin/empattendance') ? 'active' : '' }}">
                                        <i class="fas fa-unlock-alt">

                                        </i>
                                        <p>
                                            <span>{{ trans('Login History') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('verified_attendance_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.empattendance.verifiedAttendence") }}"
                                        class="nav-link {{ request()->is('admin/verifiedAttendence') ? 'active' : '' }}">
                                        <i class="fas fa-briefcase">

                                        </i>
                                        <p>
                                            <span>{{ trans('Verified Attendance') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan

                        </ul>
                    </li>
                @endcan



                @can('customer_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/customers*') ? 'menu-open' : '' }} {{ request()->is('admin/customers/add*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fas fa-users mr-2">

                            </i>
                            <p>
                                <span>{{ trans('Manage Customers') }}</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('customer_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.customers") }}"
                                        class="nav-link {{ request()->is('admin/customers') ? 'active' : '' }}">
                                        <i class="fa fa-check-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('View Customers') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('customer_bulk_upload_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.bulkupload") }}"
                                        class="nav-link {{ request()->is('admin/customers/bulkupload') ? 'active' : '' }}">
                                        <i class="fa fa-upload mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('Upload Customers') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                        </ul>
                    </li>
                @endcan





                @can('product_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/product*') ? 'menu-open' : '' }} {{ request()->is('admin/product/add*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fas fa-cogs mr-2">

                            </i>
                            <p>
                                <span>{{ trans('Manage Products') }}</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('product_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.product") }}"
                                        class="nav-link {{ request()->is('admin/product') ? 'active' : '' }}">
                                        <i class="fa fa-check-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('View Products') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('product_add_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.products.add") }}"
                                        class="nav-link {{ request()->is('admin/product/add') ? 'active' : '' }}">
                                        <i class="fa fa-plus-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('Add Products') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                        </ul>
                    </li>
                @endcan



                @can('employee_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/employees*') ? 'menu-open' : '' }} {{ request()->is('admin/employees/add*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fa fa-address-book mr-2">

                            </i>
                            <p>
                                <span>{{ trans('Manage Employees') }}</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('employee_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.employees.index") }}"
                                        class="nav-link {{ request()->is('admin/employees') ? 'active' : '' }}">
                                        <i class="fa fa-check-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('View Employees') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('employee_add_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.employees.add") }}"
                                        class="nav-link {{ request()->is('admin/employees/add') ? 'active' : '' }}">
                                        <i class="fa fa-plus-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('Add Employees') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                        </ul>
                    </li>
                @endcan

                @can('timeslot_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/timeslot*') ? 'menu-open' : '' }} {{ request()->is('admin/timeslot/add*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fa fa-clock mr-2">

                            </i>
                            <p>
                                <span>{{ trans('Manage Timeslots') }}</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('timeslot_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.timeslot") }}"
                                        class="nav-link {{ request()->is('admin/timeslot') ? 'active' : '' }}">
                                        <i class="fa fa-check-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('View Timeslots') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('timeslot_add_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.timeslot.add") }}"
                                        class="nav-link {{ request()->is('admin/timeslot/add') ? 'active' : '' }}">
                                        <i class="fa fa-plus-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('Add Timeslots') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                        </ul>
                    </li>
                @endcan

                @can('inventory_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/inventory*') ? 'menu-open' : '' }} {{ request()->is('admin/inventory_history*') ? 'menu-open' : '' }} {{ request()->is('admin/assigned_inventory_history*') ? 'menu-open' : '' }} {{ request()->is('admin/inventory/add*') ? 'menu-open' : '' }}">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fas fa-coins mr-2">

                            </i>
                            <p>
                                <span>{{ trans('Manage Inventory') }}</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('view_inventory_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.inventory") }}"
                                        class="nav-link {{ request()->is('admin/inventory') ? 'active' : '' }}">
                                        <i class="fas fa-unlock-alt">

                                        </i>
                                        <p>
                                            <span>{{ trans('View Inventory') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('inventory_add_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.inventory.add") }}"
                                        class="nav-link {{ request()->is('admin/inventory/add') ? 'active' : '' }}">
                                        <i class="fas fa-unlock-alt">

                                        </i>
                                        <p>
                                            <span>{{ trans('Add Inventory') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('assigned_inventory_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.inventory.assigned_inventory_history") }}"
                                        class="nav-link {{ request()->is('admin/assigned_inventory_history') ? 'active' : '' }}">
                                        <i class="fas fa-briefcase">

                                        </i>
                                        <p>
                                            <span>{{ trans('Assigned Inventory') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('all_history_inventory_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.inventory.inventory_history") }}"
                                        class="nav-link {{ request()->is('admin/inventory_history') ? 'active' : '' }}">
                                        <i class="fas fa-user">

                                        </i>
                                        <p>
                                            <span>{{ trans('All History') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                        </ul>
                    </li>
                @endcan


                @can('testimonial_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/testimonials*') ? 'menu-open' : '' }} {{ request()->is('admin/testimonials/add*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fa fa-quote-left mr-2">

                            </i>
                            <p>
                                <span>{{ trans('Manage Testimonials') }}</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('testimonial_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.testimonials") }}"
                                        class="nav-link {{ request()->is('admin/testimonials') ? 'active' : '' }}">
                                        <i class="fa fa-check-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('View Testimonials') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('testimonial_add_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.testimonials.add") }}"
                                        class="nav-link {{ request()->is('admin/testimonials/add') ? 'active' : '' }}">
                                        <i class="fa fa-plus-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('Add Testimonials') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                        </ul>
                    </li>
                @endcan

                @can('location_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/location*') ? 'menu-open' : '' }} {{ request()->is('admin/location/add*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fa fa-map-marker-alt mr-2">

                            </i>
                            <p>
                                <span>{{ trans('Manage Locations') }}</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('location_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.location") }}"
                                        class="nav-link {{ request()->is('admin/location') ? 'active' : '' }}">
                                        <i class="fa fa-check-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('View Locations') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('location_add_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.location.add") }}"
                                        class="nav-link {{ request()->is('admin/location/add') ? 'active' : '' }}">
                                        <i class="fa fa-plus-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('Add Locations') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                        </ul>
                    </li>
                @endcan





                @can('quotation_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/quotation*') ? 'menu-open' : '' }} {{ request()->is('admin/quotation/add*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fas fa-file-pdf mr-2">

                            </i>
                            <p>
                                <span>{{ trans('Manage Quotations') }}</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('quotation_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.quotation") }}"
                                        class="nav-link {{ request()->is('admin/quotation') ? 'active' : '' }}">
                                        <i class="fa fa-check-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('View Quotations') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('quotation_add_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.quotation.add") }}"
                                        class="nav-link {{ request()->is('admin/quotation/add') ? 'active' : '' }}">
                                        <i class="fa fa-plus-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('Send Quotations') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                        </ul>
                    </li>
                @endcan

                @can('purchaseorder_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/purchaseorder*') ? 'menu-open' : '' }} {{ request()->is('admin/purchaseorder/add*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fas fa-file-pdf mr-2">

                            </i>
                            <p>
                                <span>{{ trans('Manage Purchase Orders') }}</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('purchaseorder_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.purchaseorder") }}"
                                        class="nav-link {{ request()->is('admin/purchaseorder') ? 'active' : '' }}">
                                        <i class="fa fa-check-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('View Purchase Orders') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('purchaseorder_add_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.purchaseorder.add") }}"
                                        class="nav-link {{ request()->is('admin/purchaseorder/add') ? 'active' : '' }}">
                                        <i class="fa fa-plus-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('Send Purchase Orders') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                        </ul>
                    </li>
                @endcan










                @can('category_main_menu_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/category*') ? 'menu-open' : '' }}   {{ request()->is('admin/subcategory*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fa fa-list-alt">

                            </i>
                            <p>
                                <span>{{ trans('Manage Categories') }}</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('category_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.category") }}"
                                        class="nav-link {{ request()->is('admin/category') ? 'active' : '' }}">
                                        <i class="fa fa-check-circle">

                                        </i>
                                        <p>
                                            <span>{{ trans('View Category') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('category_add_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.category.add") }}"
                                        class="nav-link {{ request()->is('admin/category/add') ? 'active' : '' }}">
                                        <i class="fa fa-plus-circle">

                                        </i>
                                        <p>
                                            <span>{{ trans('Add Category') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('subcategory_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.subcategory") }}"
                                        class="nav-link {{ request()->is('admin/subcategory') ? 'active' : '' }}">
                                        <i class="fa fa-check-circle">

                                        </i>
                                        <p>
                                            <span>{{ trans('View Sub Category') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('subcategory_add_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.subcategory.add") }}"
                                        class="nav-link {{ request()->is('admin/subcategory/add') ? 'active' : '' }}">
                                        <i class="fa fa-plus-circle">

                                        </i>
                                        <p>
                                            <span>{{ trans('Add Sub Category') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan

                            <!-- @can('innersubcategory_access')
                                    <li class="nav-item">
                                        <a href="{{ route("admin.innersubcategory") }}" class="nav-link {{ request()->is('admin/innersubcategory')  ? 'active' : '' }}">
                                            <i class="fa fa-check-circle">

                                            </i>
                                            <p>
                                                <span>{{ trans('View Inner Subcategory') }}</span>
                                            </p>
                                        </a>
                                    </li>
                                @endcan

                                @can('innersubcategory_add_access')
                                    <li class="nav-item">
                                        <a href="{{ route("admin.innersubcategory.add") }}" class="nav-link {{ request()->is('admin/innersubcategory/add')  ? 'active' : '' }}">
                                            <i class="fa fa-plus-circle">

                                            </i>
                                            <p>
                                                <span>{{ trans('Add Inner Sub Category') }}</span>
                                            </p>
                                        </a>
                                    </li>
                                @endcan -->

                        </ul>
                    </li>
                @endcan

                @can('slider_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/slider*') ? 'menu-open' : '' }} {{ request()->is('admin/slider/add*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fas fa-sliders-h mr-2">

                            </i>
                            <p>
                                <span>{{ trans('Manage Sliders') }}</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('slider_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.slider") }}"
                                        class="nav-link {{ request()->is('admin/slider') ? 'active' : '' }}">
                                        <i class="fa fa-check-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('View Sliders') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('slider_add_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.slider.add") }}"
                                        class="nav-link {{ request()->is('admin/slider/add') ? 'active' : '' }}">
                                        <i class="fa fa-plus-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('Add Sliders') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                        </ul>
                    </li>
                @endcan
                <!-- MANAGE APP HEADER  -->

                @can('appheader_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/appheader*') ? 'menu-open' : '' }} {{ request()->is('admin/appheader/index*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fas fa-mobile-alt mr-2">

                            </i>
                            <p>
                                <span>Manage App Header</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('appheader_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.appheader") }}"
                                        class="nav-link {{ request()->is('admin/appheader') ? 'active' : '' }}">
                                        <i class="fa fa-check-circle mr-2">

                                        </i>
                                        <p>
                                            <span>View App Header</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                        </ul>
                    </li>
                @endcan





                @can('banner_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/banner*') ? 'menu-open' : '' }} {{ request()->is('admin/banner/add*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fa fa-image mr-2">

                            </i>
                            <p>
                                <span>{{ trans('Manage Banners') }}</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('banner_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.banner") }}"
                                        class="nav-link {{ request()->is('admin/banner') ? 'active' : '' }}">
                                        <i class="fa fa-check-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('View Banners') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('banner_add_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.banner.add") }}"
                                        class="nav-link {{ request()->is('admin/banner/add') ? 'active' : '' }}">
                                        <i class="fa fa-plus-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('Add Banners') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                        </ul>
                    </li>
                @endcan

                @can('attribute_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/attribute*') ? 'menu-open' : '' }} {{ request()->is('admin/attribute/add*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fa fa-braille mr-2">

                            </i>
                            <p>
                                <span>{{ trans('Manage Attributes') }}</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('attribute_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.attribute") }}"
                                        class="nav-link {{ request()->is('admin/attribute') ? 'active' : '' }}">
                                        <i class="fa fa-check-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('View Attributes') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('attribute_add_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.attribute.add") }}"
                                        class="nav-link {{ request()->is('admin/attribute/add') ? 'active' : '' }}">
                                        <i class="fa fa-plus-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('Add Attributes') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                        </ul>
                    </li>
                @endcan




                @can('coupon_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/coupons*') ? 'menu-open' : '' }} {{ request()->is('admin/coupons/add*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fas fa-gift mr-2">

                            </i>
                            <p>
                                <span>{{ trans('Manage Coupons') }}</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('coupon_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.coupons") }}"
                                        class="nav-link {{ request()->is('admin/coupons') ? 'active' : '' }}">
                                        <i class="fa fa-check-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('View Coupons') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('coupon_add_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.coupons.add") }}"
                                        class="nav-link {{ request()->is('admin/coupons/add') ? 'active' : '' }}">
                                        <i class="fa fa-plus-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('Add Coupons') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                        </ul>
                    </li>
                @endcan


                <!-- ===================================== thoughtful-Curations==================================== -->

                @can('thoughtful_curations_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/thoughtful-curations*') ? 'menu-open' : '' }} {{ request()->is('admin/thoughtful-curations/add*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fa fa-video mr-2">

                            </i>
                            <p>
                                <span>{{ trans('Thoughtful Curations') }}</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('thoughtful_curations_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.thoughtful-curations") }}" class="nav-link {{ request()->is('admin/
                                            thoughtful-curations') ? 'active' : '' }}">
                                        <i class="fa fa-check-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('View Thoughtful') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('thoughtful_curations_add_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.thoughtful-curations.add") }}"
                                        class="nav-link {{ request()->is('admin/thoughtful-curations/add') ? 'active' : '' }}">
                                        <i class="fa fa-plus-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('Add Thoughtful') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                        </ul>
                    </li>
                @endcan
                <!-- ========================================================================= -->

                @can('cms_main_menu_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/about*') ? 'menu-open' : '' }}   {{ request()->is('admin/privacy-policy*') ? 'menu-open' : '' }} {{ request()->is('admin/terms-conditions*') ? 'menu-open' : '' }}">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fas fa-tasks mr-2">

                            </i>
                            <p>
                                <span>{{ trans('CMS Pages') }}</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('about_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.about") }}"
                                        class="nav-link {{ request()->is('admin/about') ? 'active' : '' }}">
                                        <i class="fas fa-unlock-alt">

                                        </i>
                                        <p>
                                            <span>{{ trans('About') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('privacypolicy_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.privacy-policy") }}"
                                        class="nav-link {{ request()->is('admin/privacy-policy') ? 'active' : '' }}">
                                        <i class="fas fa-briefcase">

                                        </i>
                                        <p>
                                            <span>{{ trans('Privacy Policy') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan

                            @can('termsconditions_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.terms-conditions") }}"
                                        class="nav-link {{ request()->is('admin/terms-conditions') ? 'active' : '' }}">
                                        <i class="fas fa-briefcase">

                                        </i>
                                        <p>
                                            <span>{{ trans('Terms & Conditions') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan

                        </ul>
                    </li>
                @endcan

                @can('question_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/question*') ? 'menu-open' : '' }} {{ request()->is('admin/question/add*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fas fa-question-circle mr-2">

                            </i>
                            <p>
                                <span>{{ trans('Manage Questions') }}</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('question_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.question") }}"
                                        class="nav-link {{ request()->is('admin/question') ? 'active' : '' }}">
                                        <i class="fa fa-check-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('View Questions') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('question_add_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.question.add") }}"
                                        class="nav-link {{ request()->is('admin/question/add') ? 'active' : '' }}">
                                        <i class="fa fa-plus-circle mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('Add Questions') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                        </ul>
                    </li>
                @endcan


                <!-- COMPALINT MANAGEMENT (Help's) -->
                @can('complaint_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/complaint*') ? 'menu-open' : '' }} {{ request()->is('admin/complaint/index*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fa fa-comments mr-2"></i>
                            </i>
                            <p>
                                <span>Manage Complaint</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('complaint_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.complaint") }}"
                                        class="nav-link {{ request()->is('admin/complaint') ? '' : '' }}">
                                        <i class="fa fa-check-circle mr-2">

                                        </i>
                                        <p>
                                            <span>View Complaint</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('complaint_add_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.complaint.add") }}"
                                        class="nav-link {{ request()->is('admin/complaint/add') ? '' : '' }}">
                                        <i class="fa fa-plus-circle mr-2">

                                        </i>
                                        <p>
                                            <span>Add Complaint</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan

                        </ul>
                    </li>
                @endcan

                <!-- INSPECTIONS MANAGEMENT  -->
                @can('inspections_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/inspections*') ? 'menu-open' : '' }} {{ request()->is('admin/inspections/index*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fa fa-clipboard-check mr-2"></i>
                            </i>
                            <p>
                                <span>Manage Inspections</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('inspections_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.inspections") }}"
                                        class="nav-link {{ request()->is('admin/inspections') ? '' : '' }}">
                                        <i class="fa fa-plus-circle mr-2">

                                        </i>
                                        <p>
                                            <span>View Inspections</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('inspections_add_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.inspections.add") }}"
                                        class="nav-link {{ request()->is('admin/inspections/add') ? '' : '' }}">
                                        <i class="fa fa-check-circle mr-2">

                                        </i>
                                        <p>
                                            <span>Add Inspections</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan

                        </ul>
                    </li>
                @endcan

                <!-- MANAGE Business DETAILS   -->
                
                @can('businessregistration_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/businessregistration*') ? 'menu-open' : '' }} {{ request()->is('admin/businessregistration/index*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="far fa-address-card mr-2"></i>
                            </i>
                            <p>
                                <span> Business Registration</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('businessregistration_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.businessregistration") }}"
                                        class="nav-link {{ request()->is('admin/businessregistration') ? '' : '' }}">
                                        <i class="fa fa-plus-circle mr-2">

                                        </i>
                                        <p>
                                            <span>View Registration</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                           {{--  @can('businessregistration_add_access')  
                                <li class="nav-item">
                                    <a href="{{ route("admin.businessregistration.add") }}"
                                        class="nav-link {{ request()->is('admin/businessregistration/add') ? '' : '' }}">
                                        <i class="fa fa-check-circle mr-2">

                                        </i>
                                        <p>
                                            <span>Add Registration</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan --}}

                        </ul>
                    </li>
                @endcan
                {{-- MANAGE BLOGS --}}
                @can('blogs_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/blogs*') ? 'menu-open' : '' }} {{ request()->is('admin/blogs/index*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fas fa-newspaper mr-2"></i>
                            </i>
                            <p>
                                <span> Manage Blogs </span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('blogs_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.blogs.add") }}"
                                        class="nav-link {{ request()->is('admin/blogs/add') ? '' : '' }}">
                                        <i class="fa fa-plus-circle mr-2">
                                        </i>
                                        {{-- ADD BLOGS --}}
                                        <p>
                                            <span>Add Blogs</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('blogs_add_access')  
                                <li class="nav-item">
                                    <a href="{{ route("admin.blogs") }}"
                                        class="nav-link {{ request()->is('admin/blogs') ? '' : '' }}">
                                        <i class="fa fa-check-circle mr-2">
                                        </i>
                                        {{-- VIEW BLOGS --}}
                                        <p>
                                            <span>View Blogs</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan 

                        </ul>
                    </li>
                @endcan
                {{-- ADD PINCODE --}}
                @can('pincode_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/addpincode*') ? 'menu-open' : '' }} {{ request()->is('admin/addpincode/index*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fas fa-map-pin mr-2"></i>
                            </i>
                            <p>
                                <span> Add Pincode </span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('pincode_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.addpincode") }}"
                                        class="nav-link {{ request()->is('admin/addpincode') ? '' : '' }}">
                                        <i class="fa fa-check-circle mr-2">
                                        </i>
                                        {{-- ADD PINCODE --}}
                                        <p>
                                            <span>View Pincode</span>

                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('pincode_add_access')  
                                <li class="nav-item">
                                    <a href="{{ route("admin.addpincode.add") }}"
                                        class="nav-link {{ request()->is('admin/addpincode/add') ? '' : '' }}">
                                        <i class="fa fa-plus-circle mr-2">
                                       
                                        </i>
                                        {{-- VIEW PINCODE --}}
                                        <p>
                                            <span>Add Pincode</span>
                                        </p>
                                    </a>
                                </li>   
                            @endcan
                        </ul>
                    </li>
                @endcan
                {{--MAGAGE SEOPAGE --}}
                @can('seopage_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/seopages*') ? 'menu-open' : '' }} {{ request()->is('admin/seopages/index*') ? 'menu-open' : '' }} ">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fas fa-search mr-2"></i>
                            </i>
                            <p>
                                <span> Manage Seo Page </span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('seopages_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.seopages") }}"
                                        class="nav-link {{ request()->is('admin/seopages') ? '' : '' }}">
                                        <i class="fa fa-check-circle mr-2">
                                        </i>
                                        {{-- ADD SEO --}}
                                        <p>
                                            <span>View SEO</span>

                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('seopages_add_access')  
                                <li class="nav-item">
                                    <a href="{{ route("admin.seopages.add") }}"
                                        class="nav-link {{ request()->is('admin/seopages/add') ? '' : '' }}">
                                        <i class="fa fa-plus-circle mr-2">
                                        
                                        </i>
                                        {{-- VIEW SEO --}}
                                        <p>
                                            <span>Add SEO</span>
                                        </p>
                                    </a>
                                </li>   
                            @endcan
                        </ul>
                        
                    </li>
                @endcan
                
                @can('user_management_access')
                    <li
                        class="nav-item has-treeview {{ request()->is('admin/permissions*') ? 'menu-open' : '' }} {{ request()->is('admin/roles*') ? 'menu-open' : '' }} {{ request()->is('admin/users*') ? 'menu-open' : '' }}">
                        <a class="nav-link nav-dropdown-toggle">
                            <i class="fas fa-users mr-2">

                            </i>
                            <p>
                                <span>{{ trans('Access Management') }}</span>
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview ml-4">
                            @can('permission_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.permissions.index") }}"
                                        class="nav-link {{ request()->is('admin/permissions') || request()->is('admin/permissions/*') ? 'active' : '' }}">
                                        <i class="fas fa-unlock-alt mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('global.permission.title') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('role_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.roles.index") }}"
                                        class="nav-link {{ request()->is('admin/roles') || request()->is('admin/roles/*') ? 'active' : '' }}">
                                        <i class="fas fa-briefcase mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('global.role.title') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                            @can('user_access')
                                <li class="nav-item">
                                    <a href="{{ route("admin.users.index") }}"
                                        class="nav-link {{ request()->is('admin/users') || request()->is('admin/users/*') ? 'active' : '' }}">
                                        <i class="fas fa-user mr-2">

                                        </i>
                                        <p>
                                            <span>{{ trans('global.user.title') }}</span>
                                        </p>
                                    </a>
                                </li>
                            @endcan
                        </ul>
                    </li>
                @endcan



                @can('payment_access')
                    <li class="nav-item">
                        <a href="{{ route("admin.payments") }}"
                            class="nav-link {{ request()->is('admin/payments') ? 'active' : '' }}">
                            <i class="fas fa-dollar-sign mr-2">
                            </i>
                            <p>
                                <span>{{ trans('Payments ') }}</span>
                            </p>
                        </a>
                    </li>
                @endcan


                @can('settings_access')
                    <li class="nav-item">
                        <a href="{{ route("admin.settings") }}"
                            class="nav-link {{ request()->is('admin/settings') ? 'active' : '' }}">
                            <i class="fas fa-cogs mr-2">
                            </i>
                            <p>
                                <span>{{ trans('Settings ') }}</span>
                            </p>
                        </a>
                    </li>
                @endcan







                <li class="nav-item">
                    <a href="#" class="nav-link"
                        onclick="event.preventDefault(); document.getElementById('logoutform').submit();">
                        <p>
                            <i class="fas fa-sign-out-alt mr-2">

                            </i>
                            <span>{{ trans('global.logout') }}</span>
                        </p>
                    </a>
                </li>
                <li class="" style="height:150px">
                    <a class="">
                        <p>

                            <span></span>
                        </p>
                    </a>
                </li>

            </ul>
        </nav>
        <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
</aside>




<div class="modal fade text-left" id="EmployeeAssignModal" role="dialog" aria-labelledby="myModalLabel33"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <label class="modal-title text-text-bold-600" id="myModalLabel33">{{ trans('Assign Employee') }}</label>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="change_password_for">
                @csrf
                <input type="hidden" name="emp_id" id="emp_id">
                <div class="modal-body">
                    <label class="d-none">{{ trans('Select Role') }}: </label>
                    <div class="form-group d-none">
                        <select name="role" id="role" class="form-control">
                            <option value="5" selected>-Role-</option>
                        </select>
                        <span class="error" id="role-error"></span>
                    </div>

                    <label>{{ trans('Timeslot') }}: </label>
                    <div class="form-group">
                        <select name="timeslot" id="timeslot" class="form-control">
                            <option value="">-Timeslot-</option>
                        </select>
                        <span class="error" id="timeslot-error"></span>
                    </div>

                    <label>{{ trans('Location Range') }}: </label>
                    <div class="form-group">
                        <select name="location" id="location" class="form-control">
                            <option value="">-Location-</option>
                        </select>
                        <span class="error" id="location-error"></span>
                    </div>
                    <label>{{ trans('Assign category') }}: </label>
                    <div class="form-group" id="emp_category_container">
                        <!-- Checkboxes will be dynamically added here -->
                    </div>
                    <span class="error" id="category-error"></span>

                </div>
                <div class="modal-footer">
                    <input type="reset" class="btn btn-raised btn-warning" data-dismiss="modal"
                        value="{{ trans('labels.close') }}">
                    <button type="submit" class="btn btn-raised btn-primary submit">{{ trans('Update') }}</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!--Inventory Assign to  Employee  Modal -->
<div class="modal fade text-left" id="InventoryAssignModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel33"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <label class="modal-title text-text-bold-600"
                    id="myModalLabel33">{{ trans('Assign Inventory') }}</label>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form action="{{ route('admin.StoreAssignedInventory') }}" method="POST" id="AssignInventoryForm">
                @csrf
                <input type="hidden" name="inventory_id" id="inventory_id">
                <input type="hidden" name="category" id="category">
                <input type="hidden" name="subCategory" id="subCategory">
                <input type="hidden" name="quantity" id="inventory_quantity">
                <input type="hidden" name="type" id="type">
                <input type="hidden" name="price" id="price">
                <input type="hidden" name="status" id="inventory_status">
                <input type="hidden" name="employee_id" id="employee_id">
                <input type="hidden" name="employee_name" id="employee_name">
                <div class="modal-body">
                    <label class="">{{ trans('Select Employee') }}: </label>
                    <div class="form-group ">
                        <select name="emp" id="emp" class="form-control">
                            <option value="">-Employee-</option>
                        </select>
                        <span class="error" id="role-error"></span>
                    </div>

                    <label>{{ trans('Enter Quantity to Assign') }}: </label>
                    <div class="form-group">
                        <input type="number" class="form-control" step="any" name="quantity" id="">
                        <span class="error" id="timeslot-error"></span>
                    </div>

                </div>
                <div class="modal-footer">
                    <input type="reset" class="btn btn-raised btn-warning" data-dismiss="modal"
                        value="{{ trans('labels.close') }}">
                    <button type="submit" class="btn btn-raised btn-primary submit">{{ trans('Assign') }}</button>
                </div>
            </form>
        </div>
    </div>
</div>




<!-- Questions Assign to Sub Categories model -->
<div class="modal fade text-left" id="QuestionAssignModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel33"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <label class="modal-title text-text-bold-600"
                    id="myModalLabel33">{{ trans('Assign Questions') }}</label>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form action="{{ route('admin.employees.getassignemployee', 2) }}" id="QuestionAssignForm">
                @csrf
                <input type="hidden" name="subcat_id" id="subcat_id_emp">
                <div class="modal-body">
                    <label>{{ trans('Select Questions for On-Site Stage') }}: </label>
                    <div class="form-group">
                        <select name="onsite" id="onsite" class="form-control" multiple>
                        </select>
                        <span class="error" id="onsite-error"></span>
                    </div>

                    <label>{{ trans('Select Questions for Completed Stage') }}: </label>
                    <div class="form-group">
                        <select name="completed" id="completed" class="form-control" multiple>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <input type="reset" class="btn btn-raised btn-warning" data-dismiss="modal"
                        value="{{ trans('labels.close') }}">
                    <button type="submit" class="btn btn-raised btn-primary submit">{{ trans('Update') }}</button>
                </div>
            </form>
        </div>
    </div>
</div>


<!-- Edit Images -->
<div class="modal fade" id="EditImages" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabeledit"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <form method="post" name="editimg" class="editimg" id="editimg" enctype="multipart/form-data">
            @csrf
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabeledit">{{ trans('labels.images') }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span>
                    </button>
                </div>
                <span id="emsg"></span>
                <div class="modal-body">
                    <div class="form-group">
                        <label>{{ trans('labels.images') }}</label>
                        <input type="hidden" id="idd" name="id">
                        <input type="hidden" class="form-control" id="old_img" name="old_img">
                        <input type="file" class="form-control" name="image" id="image" accept="image/*"><br />
                        <label>ALT Tag</label>
                        <input type="text" name="alt_tag" id="alt_tag" class="form-control" placeholder="ALT tag" required>
                        @error('alt_tag')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                        <label>Image Title</label>
                        <input type="text" name="image_title" id="image_title" class="form-control"
                            placeholder="Image Title" required>
                            @error('image_title')
                        <span class="text-danger">{{ $message }}</span>
                        @enderror
                        <input type="hidden" name="removeimg" id="removeimg">
                    </div>
                    <div class="galleryim"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btna-secondary"
                        data-dismiss="modal">{{ trans('labels.close') }}</button>
                    <button type="submit" class="btn btn-primary">{{ trans('labels.update') }}</button>
                </div>
            </div>
        </form>
    </div>
</div>