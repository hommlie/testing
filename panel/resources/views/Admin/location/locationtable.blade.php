<table id="data_table_bootstrap" class="table table-striped table-bordered zero-configuration datatable">
    <thead>
        <tr>
            <th class="d-none"></th>
            <th>#</th>
            <th>{{ trans('Location Name') }}</th>
            <th>{{ trans('Date') }}</th>
            <th>{{ trans('Status') }}</th>
            <!-- <th>{{ trans('labels.action') }}</th> -->
        </tr>
    </thead>
    <tbody> 
        @php $n=0 @endphp
        @foreach($data as $row)
        <tr>
        <th class="d-none"></th>
            <td>{{ ++$n }}</td>
            <td>{{$row['name']}}</td>
            <td>{{ \Carbon\Carbon::parse($row->created_at)->format('Y-m-d') }}</td>
            <td>
                @if($row['status']=='Active')
                <button class="active-btn edit btn btn-sm btn-outline-success" data-id="{{ $row->id }}" title="{{ trans('active') }}" >
                    Active
                </button>
                @else
                <button class="deactive-btn edit btn btn-sm btn-outline-danger" data-id="{{ $row->id }}" title="{{ trans('Inactive') }}" >
                    Deactive
                </button>
                @endif
            </td>


        </tr>
        @endforeach
  </tbody>
</table>