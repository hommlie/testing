@extends('layouts.admin')
@section('script')
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap4.min.js"></script>[;\]
@endsection

@section('content')
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <div class="card">
        <div class="card-header">
            <h4 class="card-title">Leads</h4>
        </div>
        <div class="card-body" style="overflow-x: auto; white-space: nowrap;">
            <table id="data_table_bootstrap" class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Lead ID</th>
                        <th>Source</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Lead Type</th>
                        <th>Spoken By</th>
                        <th>Status</th>
                        <th>Attempt 1</th>
                        <th>Remark 1</th>
                        <th>Attempt 2</th>
                        <th>Remark 2</th>
                        <th>Attempt 3</th>
                        <th>Remark 3</th>
                        <th>Total Attempts</th>
                        <th>Follow-Up Date & Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    @php $i = 0; @endphp
                    @foreach ($datas as $data)
                        <tr>
                            <td>{{ ++$i }}</td>
                            <td>{{ $data->id }}</td>
                            <td>{{ ucfirst($data->source) }}</td>
                            <td>{{ $data->name }}</td>
                            <td>{{ $data->phone }}</td>
                            <td>{{ $data->email }}</td>
                            <td>{{ $data->address }}</td>
                             @php
                              $type   = strtolower($data->lead_type);
                              $colors = [
                                'high'   => '#28a745',
                                'low'    => '#dc3545',
                                'medium' => '#ffc107',
                              ];
                              $bg    = $colors[$type] ?? '#6c757d';
                              $short = strtoupper(substr($type, 0, 1));
                              $full  = ucfirst($type);
                            @endphp
                            
                            <td>
                              <span class="badge rounded-circle  d-inline-flex align-items-center justify-content-center"
                                    style="background-color: {{ $bg }}; color: #fff; width:16px; height:16px;"
                                    title="{{ $full }}">
                                {{ $short }}
                              </span>
                            </td>

                            <td>{{ optional($employees->firstWhere('id', $data->spoken_by))->emp_name ?? 'N/A' }}</td>
                            <td>
                            @php($s = $data->lead_status)
                            <span style="
                                  display: inline-flex;
                                  align-items: center;
                                  justify-content: center;
                                  width: 16px;
                                  height: 16px;
                                  border-radius: 50%;
                                  background: {{ ['contacted' => '#28a745', 'follow_up' => '#ffc107', 'not_interested' => '#dc3545','junk_call' => '#007bff' ][$s]  ?? '#6c757d' }};
                                  color: #fff;
                                  font-size: 10px;
                                  margin-right: 6px;
                                ">{{ strtoupper(substr($s, 0, 1)) }}</span>
                            
                        </td>
                            <td>{{ $data->attempt_date_1 }}</td>
                            <td>{{ $data->remark_1 }}</td>
                            <td>{{ $data->attempt_date_2 }}</td>
                            <td>{{ $data->remark_2 }}</td>
                            <td>{{ $data->attempt_date_3 }}</td>
                            <td>{{ $data->remark_3 }}</td>
                            <td>{{ 
                                (!empty($data->attempt_date_1) ? 1 : 0) +
                                (!empty($data->attempt_date_2) ? 1 : 0) +
                                (!empty($data->attempt_date_3) ? 1 : 0)
                            }}</td>
                            <td>{{ $data->follow_up_dt}}</td>
                            <td>
                                <a href="{{ route('admin.leadssheet.edit', $data->id) }}"
                                    class="btn btn-sm btn-primary">Edit</a>
                                <!-- <button class="btn btn-sm btn-danger"
                                    onclick="do_delete('{{ $data->id }}', '{{ route('admin.leadssheet.delete') }}')">Delete</button> -->
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection

@section('scripts')
    <script>
        $(document).ready(function () {
            var table = $('#data_table_bootstrap').DataTable({
                "pageLength": 10,
                "columnDefs": [
                    {
                        "targets": 0,
                        "orderable": false,
                        "searchable": false

                    }
                ]
            });

            var dateColumnIndex = table.column(':contains(Date)').index();
            console.log("Date column index: " + dateColumnIndex);

            table.rows().every(function (rowIdx, tableLoop, rowLoop) {
                var data = this.data();
                var date = data[dateColumnIndex];
                console.log("Date in Row " + rowIdx + ": " + date);
            });

            $('#viewMessageModal').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget);

                var message = button.data('message');

                var modal = $(this);
                modal.find('#complaintMessage').text(message);
            });
        });


        function do_delete(id, page_name, name, titles) {
            Swal.fire({
                title: '{{ trans('labels.are_you_sure') }}',
                text: "{{ trans('labels.delete_text') }} " + name + "!",
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
                        url: page_name,
                        type: "POST",
                        data: { 'id': id },

                        success: function (data) {
                            $('#preloader').hide();
                            if (data == 1000) {
                                $('#del-' + id).remove();
                                Swal.fire({ type: 'success', title: '{{ trans('labels.success') }}', showConfirmButton: false, timer: 1500 });
                                location.reload();
                            }
                            else {
                                Swal.fire({ type: 'error', title: '{{ trans('labels.cancelled') }}', showConfirmButton: false, timer: 1500 });
                            }
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

        }

    </script>
@endsection