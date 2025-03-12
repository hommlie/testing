<table id="data_table_bootstrap" class="text-center table table-striped table-bordered zero-configuration datatable">
    <thead>
        <tr >
            <th class="d-none"></th>
            <th class="text-center">#</th>
            <th class="text-center">{{ trans('Profile1') }}</th>
            <th class="text-center">{{ trans('Employee ID') }}</th>
            <th class="text-center">{{ trans('Phone') }}</th>
            <th class="text-center">{{ trans('Email') }}</th>
            <th class="text-center">{{ trans('Date') }}</th>
            <th class="text-center">{{ trans('Status') }}</th>
            <th class="text-center">{{ trans('labels.action') }}</th>
        </tr>
    </thead>
    <tbody> 
        @php $n=0 @endphp
        @foreach($data as $row)
        <tr >
            <th class="d-none"></th>
            <td class="text-center">{{ ++$n }}</td>
            <td class="text-center"><img src="{{ asset('storage/app/public/images/employee/profiles/'.$row['emp_photo']) ?: asset('storage/app/public/images/employee/profiles/profile.png') }}" width="50px" height="50px" class="rounded-circle"  alt=""></td>
            <td class="text-center">{{$row->emp_id}}</td>
            <td class="text-center">{{$row->emp_phone}}</td>
            <td class="text-center">{{$row->emp_email ? $row->emp_email : "NA"}}</td>
            <td>{{ \Carbon\Carbon::parse($row->created_at)->format('Y-m-d') }}</td>
            <td class="text-center">
                @if($row['status']==1)
                <button class="active-btn edit btn btn-sm btn-outline-success" data-id="{{ $row->id }}" title="{{ trans('active') }}" >
                    Active
                </button>
                @else
                <button class="deactive-btn edit btn btn-sm btn-outline-danger" data-id="{{ $row->id }}" title="{{ trans('Inactive') }}" >
                    Deactive
                </button>
                @endif
            </td>
            <td>
                <a href="{{ route('admin.employees.view', $row->id) }}" class="btn btn-sm btn-warning  edit" title="{{ trans('labels.edit') }}" title="{{ trans('labels.edit') }}" data-original-title="{{ trans('labels.edit') }}">
                    View
                </a>
                <a href="{{ route('admin.employees.show', $row->id) }}" class="btn btn-sm btn-success edit" title="{{ trans('labels.edit') }}" title="{{ trans('labels.edit') }}" data-original-title="{{ trans('labels.edit') }}">
                    Edit
                </a>
                <!-- <a class="btn btn-sm btn-outline-success edit editbtn" title="{{ trans('labels.assign') }}" title="{{ trans('labels.assign') }}" data-original-title="{{ trans('labels.assign') }}">
                    Assign
                </a> -->

                <button type="button" value="{{ $row->id }}" data-toggle="modal" class="btn editbtn btn-sm btn-outline-success edit" title="{{ trans('Assign') }}">
                    Assign
                </button>

                
                <!-- <button type="button" value="{{ $row->id }}"  data-toggle="modal"  class="btn editbtn btn-sm btn-outline-success edit" title="{{ trans('Assign') }}" title="{{ trans('Assign') }}" data-original-title="{{ trans('Assign') }}">
                    Assign
                </button>
                 -->
            </td>

        </tr>
        @endforeach
  </tbody>
</table>