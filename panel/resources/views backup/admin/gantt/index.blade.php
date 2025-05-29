@extends('layouts.admin')

@section('content')
    <link rel="stylesheet" href="{{ asset('storage/app/public/Adminassets/css/dataTables.bootstrap4.css') }}">
    <style>
        .table-wrapper {
            display: flex;
        }
        
        .fixed-column {
            width: 320px; /* Adjusted for extra columns */
        }
        .scrollable-table {
            overflow-x: auto;
            width: calc(100% - 320px); /* Subtract the width of the fixed column */
        }
        .table-fixed {
            position: relative;
            display: flex;
            flex-direction: column;
            min-width: 100%;
        }
        .table-fixed thead, .table-fixed tbody, .table-fixed tfoot {
            display: block;
        }
        .table-fixed tbody {
            overflow-y: scroll;
        }
        .table-fixed th, .table-fixed td {
            min-width: 100px;
            white-space: nowrap;
        }
        .table-fixed thead th {
            position: sticky;
            top: 0;
            z-index: 1;
            background: #f8f9fa;
        }
        .emp-id-column {
            display: none; 
        }

        .dispatched-bg{ background-color: #8E44AD; }
        .onsite-bg   { background-color: #3498DB; }
        .completed-bg{ background-color: #28A745; }
        .scheduled-bg{ background-color: #F39C12; }
        .incomplete-bg{ background-color: #FF5733; }

        /* width */
        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-track { box-shadow: inset 0 0 5px grey; border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: white; border-radius: 10px; border:2px solid #5ced73 }
        ::-webkit-scrollbar-thumb:hover { background: green; }

        .active-row {
            background-color: white !important;
        }

        .inactive-cell {
            background-color: #afbdb3 !important; 
            color: white;
        }
          .tooltip-inner {
            max-width: 1000px;  
            white-space: normal;
        }
    </style>

    @php
      $displayDate = request('from_date', \Carbon\Carbon::today()->toDateString());
      $displayDateFormatted = \Carbon\Carbon::createFromFormat('Y-m-d', $displayDate)->format('d-m-Y');
    @endphp

    <div class="">
        @if(Session::has('success'))
            <div class="alert alert-success">
                {{ Session::get('success') }}
                @php Session::forget('success'); @endphp
            </div>
        @endif

        @if(Session::has('danger'))
            <div class="alert alert-danger">
                {{ Session::get('danger') }}
                @php Session::forget('danger'); @endphp
            </div>
        @endif

        <section id="configuration">
            <div class="row">
                <div class="col-12 m-0 p-0">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ trans('Gantt') }}</h4>
                        </div>
                        <div class="card-body collapse show px-1">
                            <div class="d-flex bg-navy p-1">
                                <form class="d-flex" method="get">
                                    <label for="" class="text-dark">Date</label>
                                    <input type="date" name="from_date" class="form-control-xs" id="from_date"
                                           value="{{ $displayDate }}" />
                                    <input type="date" name="to_date" class="form-control-xs" id="to_date"
                                           value="{{ $displayDate }}" />
                                    <input type="submit" class="btn btn-xs btn-warning" value="view" id="view_date_btn">
                                </form> &emsp;
                                <form action="" method="get">
                                    <div class="d-flex">
                                        <label for="" class="text-dark">Show</label>
                                        <select name="job" id="job_filter" class="form-control-xs">
                                            <option value="">All Jobs</option>
                                            <option value="4" {{ request('job')=='4'?'selected':'' }}>Completed Jobs</option>
                                            <option value="5" {{ request('job')=='5'?'selected':'' }}>InComplete Jobs</option>
                                            <option value="3" {{ request('job')=='3'?'selected':'' }}>OnSite Jobs</option>
                                            <option value="2" {{ request('job')=='2'?'selected':'' }}>Dispatched Jobs</option>
                                            <option value="1" {{ request('job')=='1'?'selected':'' }}>Scheduled Jobs</option>
                                        </select>
                                        <input type="submit" class="btn btn-xs btn-warning" value="view" id="view_technician_btn">
                                    </div>
                                </form> &emsp;
                            </div>

                            <div class="d-flex mt-2">
                                <div style="width: 15px;height:15px;" class="scheduled-bg rounded-circle m-1"></div><span>Scheduled</span>&emsp;
                                <div style="width: 15px;height:15px;" class="dispatched-bg rounded-circle m-1"></div><span>Dispatched</span>&emsp;
                                <div style="width: 15px;height:15px;" class="onsite-bg rounded-circle m-1"></div><span>On-Site</span>&emsp;
                                <div style="width: 15px;height:15px;" class="completed-bg rounded-circle m-1"></div><span>Completed</span>&emsp;
                                <div style="width: 15px;height:15px;" class="incomplete-bg rounded-circle m-1"></div><span>Incomplete</span>
                            </div>

                            <div class="text-center bg-secondary p-1 mt-2">
                                <b class="text-light">
                                    {{ $displayDateFormatted }}
                                    @if(request('job') != '')
                                        – {{ ['','Scheduled','Dispatched','On-Site','Completed','Incomplete'][request('job')] }} Jobs
                                    @endif
                                </b>
                            </div>

                            <div class="table-wrapper mt-2">
                                <div class="fixed-column">
                                    <table class="table table-bordered table-striped width-100" id="employees_table">
                                        <thead>
                                            <tr>
                                                <th class="p-1">
                                                    Resource
                                                    <small id="toggle-sbc" style="cursor:pointer;text-decoration:underline;">(Show SC)</small>
                                                </th>
                                                <th class="p-1 emp-id-column">SC</th>
                                                <th class="p-1">T</th>
                                                <th class="p-1">M</th>
                                                <th class="p-1">Y</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach ($data as $employee)
                                            <tr>
                                                <td class="p-1 d-flex">
                                                    <div style="width: 10px;height:10px;" class="bg-success rounded-circle m-1"></div>
                                                    <a data-toggle="modal"  data-target="#GanttModal">{{ $employee->emp_name }}</a>
                                                </td>
                                                <td class="p-1 emp-id-column">
                                                    {{ $employee->location ?? 'N/A' }}
                                                </td>
                                                <td class="p-1">
                                                    {{ $employee->km_today }}
                                                </td>
                                                <td class="p-1">
                                                    {{ $employee->km_month }}
                                                </td>
                                                <td class="p-1">
                                                    {{ $employee->km_year }}
                                                </td>
                                                
                                            </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>

                                <div class="scrollable-table">
                                    <div class="table-fixed">
                                        <table class="table table-bordered table-striped" id="jobs_table">
                                            <thead>
                                                <tr>
                                                    @for ($i = 0; $i < 24; $i++)
                                                        <th class="p-1 text-center" style="width: 100px;">
                                                        {{ sprintf('%02d:00', $i) }}</th>
                                                    @endfor
                                                </tr>
                                            </thead>
                                            <tbody>
                                                @php
                                                  $nowHour = \Carbon\Carbon::now('Asia/Kolkata')->hour;
                                                @endphp

                                                @foreach ($data as $employee)
                                                  <tr>
                                                    @for ($hour = 0; $hour < 24; $hour++)
                                                      @php
                                                        $ordersInThisHour = $employee->orders->filter(function($order) use ($hour, $displayDate) {
                                                          return $order->desired_date === $displayDate
                                                             && \Carbon\Carbon::createFromFormat('H:i', $order->desired_time)
                                                                  ->hour == $hour;
                                                        });
                                                      @endphp

                                                      <td class="p-1 {{ $ordersInThisHour->isEmpty() && $employee->is_active == 0 ? 'inactive-cell' : '' }}">
                                                        @if ($employee->is_active == 1
                                                             && \Carbon\Carbon::parse($employee->is_active_at)
                                                                   ->setTimezone('Asia/Kolkata')
                                                                   ->hour == $hour)
                                                          <a class="btn btn-sm btn-danger p-0 m-0"
                                                             data-toggle="tooltip"
                                                             data-placement="top"
                                                             data-html="true"
                                                             title="
                                                               <div style='
                                                                 font-size:10px;
                                                                 text-align:left;
                                                                 width:500px;
                                                               '>
                                                                 In-Time: <b>{{ $employee->is_active_at }}</b><br>
                                                                 Phone: <b>{{ $employee->device }}</b><br>
                                                                 Battery: <b>{{ $employee->battery }}</b>
                                                               </div>
                                                             ">
                                                            <i class="fa fa-user"></i> Present
                                                          </a>
                                                        @endif

                                                        @foreach ($ordersInThisHour as $order)
                                                          @php
                                                            switch ($order->order_status) {
                                                              case 1: $cls = 'scheduled-bg'; break;
                                                              case 2: $cls = 'dispatched-bg'; break;
                                                              case 3: $cls = 'onsite-bg'; break;
                                                              case 4: $cls = 'completed-bg'; break;
                                                              case 5: $cls = 'incomplete-bg'; break;
                                                              default: $cls = 'scheduled-bg';
                                                            }
                                                          @endphp

                                                         <a class="btn btn-sm {{ $cls }} rounded-0 text-light p-0 m-1"
                                                               data-toggle="tooltip"
                                                               data-placement="top"
                                                               data-html="true"
                                                               title='
                                                                 <table style="font-size:13px; text-align:left; width:1000px; border-collapse:collapse;">
                                                                   <tr>
                                                                     <!-- Left: Task Details -->
                                                                     <td style="vertical-align:top; width:50%; padding-right:8px; border-right:1px solid #ddd;">
                                                                       <table style="width:100%; border-collapse:collapse;">
                                                                         <tr>
                                                                           <th style="padding:4px; border-bottom:1px solid #ddd;">Order ID</th>
                                                                           <td style="padding:4px; border-bottom:1px solid #ddd;"><b>{{ $order->order_number }}</b></td>
                                                                         </tr>
                                                                          <tr>
                                                                           <th style="padding:4px; border-bottom:1px solid #ddd;">SR-ID</th>
                                                                           <td style="padding:4px; border-bottom:1px solid #ddd;"><b>{{ $order->id }}</b></td>
                                                                         </tr>
                                                                          <tr>
                                                                           <th style="padding:4px; border-bottom:1px solid #ddd;">Business Region</th>
                                                                           <td style="padding:4px; border-bottom:1px solid #ddd;"><b>{{ $order->businessRegion->zone }},{{ $order->businessRegion->state }}</b></td>
                                                                         </tr>
                                                                         <tr>
                                                                           <th style="padding:4px; border-bottom:1px solid #ddd;">Service Center</th>
                                                                           <td style="padding:4px; border-bottom:1px solid #ddd;"><b>{{ $order->serviceCenter->branch_name }}</b></td>
                                                                         </tr>
                                                                        
                                                                         <tr>
                                                                           <th style="padding:4px; border-bottom:1px solid #ddd;">SR Plan Date & Time</th>
                                                                           <td style="padding:4px; border-bottom:1px solid #ddd;"><b>{{ $order->desired_date }} - {{ $order->desired_time }}</b></td>
                                                                         </tr>
                                                                         <tr>
                                                                           <th style="padding:4px; border-bottom:1px solid #ddd;">Service Plan</th>
                                                                           <td style="padding:4px; border-bottom:1px solid #ddd;"><b>{{ $order->product_name }}</b></td>
                                                                         </tr>
                                                                         <tr>
                                                                           <th style="padding:4px; border-bottom:1px solid #ddd;">Service Plan</th>
                                                                           <td style="padding:4px; border-bottom:1px solid #ddd;"><b>{{ $order->attributeDetails->attribute }}</b></td>
                                                                         </tr>
                                                                         
                                                                        <tr>
                                                                           <th style="padding:4px; border-bottom:1px solid #ddd;">Service Type</th>
                                                                           <td style="padding:4px; border-bottom:1px solid #ddd;"><b>{{ $order->variationDetails->variation  }}</b></td>
                                                                         </tr>
                                                                         <tr>
                                                                           <th style="padding:4px; border-bottom:1px solid #ddd;">Duration</th>
                                                                           <td style="padding:4px; border-bottom:1px solid #ddd;"><b>{{ $order->variationDetails->variation_interval  }}</b></td>
                                                                         </tr>
                                                                       </table>
                                                                     </td>

                                                                     <!-- Right: Account Details -->
                                                                     <td style="vertical-align:top; width:50%; padding-left:8px;">
                                                                       <table style="width:100%; border-collapse:collapse;">
                                                                         <tr>
                                                                           <th style="padding:4px; border-bottom:1px solid #ddd;">Account Type</th>
                                                                           <td style="padding:4px; border-bottom:1px solid #ddd;"><b>{{ $order->account_type }}</b></td>
                                                                         </tr>
                                                                          <tr>
                                                                           <th style="padding:4px;">Contact Name</th>
                                                                           <td style="padding:4px;"><b>{{ $order->full_name }}</b></td>
                                                                         </tr>
                                                                        
                                                                         <tr>
                                                                           <th style="padding:4px; border-bottom:1px solid #ddd;">Address</th>
                                                                           <td style="padding:4px; border-bottom:1px solid #ddd;">
                                                                             <b>
                                                                               {{ $order->landmark }},<br>
                                                                               {{ $order->street_address }},<br>
                                                                               {{ $order->pincode }}
                                                                             </b>
                                                                           </td>
                                                                         </tr>
                                                                         <tr>
                                                                           <th style="padding:4px; border-bottom:1px solid #ddd;">Latlong</th>
                                                                           <td style="padding:4px; border-bottom:1px solid #ddd;"><b>{{ $order->latitude }} , {{$order->longitude  }}</b></td>
                                                                         </tr>
                                                                         <tr>
                                                                           <th style="padding:4px; border-bottom:1px solid #ddd;">Email</th>
                                                                           <td style="padding:4px; border-bottom:1px solid #ddd;"><b>{{ $order->email }}</b></td>
                                                                         </tr>
                                                                          <tr>
                                                                           <th style="padding:4px; border-bottom:1px solid #ddd;">Account Name</th>
                                                                           <td style="padding:4px; border-bottom:1px solid #ddd;"><b>{{ $order->employee_name }}</b></td>
                                                                         </tr>
                                                                        
                                                                       </table>
                                                                     </td>
                                                                     
                                                                   </tr>
                                                                     <tr>
                                                                      <td colspan="2" style="padding-top:13px;">
                                                                        <table style="width:100%; border-collapse:collapse; font-size:14px;">
                                                                          
                                                                          <tr>
                                                                           
                                                                           <th style="padding:4px;">Order Status</th>
                                                                           <td style="padding:4px;"> <b>{{ ['','Scheduled','Dispatched','On-Site','Completed','Incomplete'][$order->order_status] }}</b></td>
                                                                         </tr>
                                                                        
                                                                        </table>
                                                                      </td>
                                                                    </tr>
                                                                 </table>
                                                               '>
                                                              @php
                                                                  $shortName = strtoupper(strtok($order->user->name ?? $order->full_name, ' '));
                                                                @endphp
                                                                <i class="fas fa-star text-info"></i> {{ $shortName }} <i class="fas fa-star text-info"></i>
                                                             </a>
                                                        @endforeach
                                                      </td>
                                                    @endfor
                                                  </tr>
                                                @endforeach
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

@endsection

@section('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
    <script src="{{ asset('storage/app/public/Adminassets/js/dataTables.js') }}"></script>
    <script src="{{ asset('storage/app/public/Adminassets/js/dataTables.bootstrap4.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            $('[data-toggle="tooltip"]').each(function(){
                let $el = $(this), inT, outT;
                $el.tooltip({ html: true, container: 'body', trigger: 'manual' })
                   .on('mouseenter', () => { clearTimeout(outT); inT = setTimeout(() => $el.tooltip('show'), 200); })
                   .on('mouseleave', () => { clearTimeout(inT); outT = setTimeout(() => $el.tooltip('hide'), 100); })
                   .on('shown.bs.tooltip', function(){
                       let $tip = $('.tooltip').last();
                       $tip.on('mouseenter', () => clearTimeout(outT))
                           .on('mouseleave', () => { outT = setTimeout(() => $el.tooltip('hide'), 100); });
                   });
            });

            $('#toggle-sbc').click(function() {
                $('.emp-id-column').toggle();
                $(this).text(function(i, text) {
                    return text === "(Show SC)" ? "(Hide SC)" : "(Show SC)";
                });
            });

            var today = new Date().toISOString().slice(0, 10);
            $('input[name="from_date"]').val(today);
            $('input[name="to_date"]').val(today);
            $('input[name="from_date"]').on('change', function() {
                $('input[name="to_date"]').val(this.value);
            });

            // mark leading empty cells as inactive
            document.querySelectorAll('#jobs_table tbody tr').forEach(row => {
                let foundActive = false;
                row.querySelectorAll('td').forEach(cell => {
                    if (cell.querySelector('a.btn')) {
                        foundActive = true;
                    }
                    if (!foundActive) {
                        cell.classList.add('inactive-cell');
                    }
                });
            });
        });
    </script>
@endsection
