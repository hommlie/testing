<table id="data_table_bootstrap" class="table table-striped table-bordered zero-configuration">
    <thead>
        <tr>
            <th>#</th>
            <th>{{ trans('Vendor Name') }}</th>
            <th>{{ trans('Email') }}</th>
            <th>{{ trans('Mobile') }}</th>
            <th>{{ trans('GST ') }}</th>
            <th>{{ trans('PAN ') }}</th>
            <th>{{ trans('Status') }}</th>
            <!-- <th>{{ trans('labels.action') }}</th> -->
        </tr>
    </thead>
    <tbody> 
        @php $n=0 @endphp
        @foreach($data as $row)
        <tr>
            <td>{{ ++$n }}</td>
            <td>{{$row['name']}}</td>
            <td>{{$row['email']}}</td>
            <td>{{$row['mobile']}}</td>
            <td>{{$row['gst']}}</td>
            <td>{{$row['pan']}}</td>
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


        </tr>
        @endforeach
  </tbody>
</table>