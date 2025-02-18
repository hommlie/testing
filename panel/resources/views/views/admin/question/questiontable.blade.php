<table id="data_table_bootstrap" class="table table-striped table-bordered zero-configuration datatable">
    <thead>
        <tr>
        <th class="d-none"></th>
            <th>#</th>
            <th>{{ trans('Question Label') }}</th>
            <th>{{ trans('Question Type') }}</th>
            <th>{{ trans('Options') }}</th>
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
            <td>{{$row['label']}}</td>
            <td>{{$row['type']}}</td>
            <td>{{$row['options'] ? $row['options'] : "NA" }}</td>
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
                
                <a href="{{ route('admin.question.show', $row->id) }}" class="btn btn-sm btn-success edit" title="{{ trans('labels.edit') }}" title="{{ trans('labels.edit') }}" data-original-title="{{ trans('labels.edit') }}">
                    Edit
                </a>
            </td>

        </tr>
        @endforeach
  </tbody>
</table>