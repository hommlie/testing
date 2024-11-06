<table id="data_table_bootstrap" class="table table-striped table-bordered datatable ">
    <thead>
        <tr>
            <th class="d-none"></th>
            <th>#</th>
            <th>{{ trans('Time Slot') }}</th>
            <th>{{ trans('Date') }}</th>
            <th>{{ trans('status') }}</th>
            <th>{{ trans('labels.action') }}</th>
        </tr>
    </thead>
    <tbody> 
        @php $n=0 @endphp
        @foreach($data as $row)
        <tr>
            <th class="d-none"></th>
            <td>{{ ++$n }}</td>
            <td> {{$row['name']}}({{$row['starttime']}} - {{$row['endtime']}})</td>
            <td>{{ \Carbon\Carbon::parse($row->created_at)->format('Y-m-d') }}</td>
            <td>
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
                <!-- <a href="{{ route('admin.timeslot.view', $row->id) }}" class="btn btn-sm btn-warning  edit" title="{{ trans('View') }}"  data-original-title="{{ trans('View') }}">
                    View
                </a> -->
                <a href="{{ route('admin.timeslot.show', $row->id) }}" class="btn btn-sm btn-success edit" title="{{ trans('labels.edit') }}" title="{{ trans('labels.edit') }}" data-original-title="{{ trans('labels.edit') }}">
                    Edit
                </a>
            </td>

        </tr>
        @endforeach
  </tbody>
</table>