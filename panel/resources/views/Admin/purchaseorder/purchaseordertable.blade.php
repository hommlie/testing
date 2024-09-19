<table id="data_table_bootstrap" class="table table-striped table-bordered zero-configuration datatable">
    <thead>
        <tr>
        <th class="d-none"></th>
            <th>#</th>
            <th>{{ trans('Vendor') }}</th>
            <th>{{ trans('Subject') }}</th>
            <th>{{ trans('Body') }}</th>
            <th>{{ trans('Attachment') }}</th>
            <th>{{ trans('Date') }}</th>
            <th>{{ trans('Status') }}</th>
            <th>{{ trans('labels.action') }}</th>
        </tr>
    </thead>
    <tbody> 
        @php $n=0 @endphp
        @foreach($data as $row)
        <tr>
        <th class="d-none"></th>
            <td>{{ ++$n }}</td>
            <td>{{$row->vendor_name}}</td>
            <td>{{$row['heading']}}</td>
            <td>
                {!! strlen($row->body) > 30 ? substr($row->body, 0, 30) . "..." : $row->body !!}
            </td>
            <td>
                @if (!empty($row['attachment']))
                <a href="{{ asset('storage/app/public/images/quotation/'.$row['attachment']) }}" target="_blank">{{$row['attachment']}}</a>
                @else
                NA
                
                @endif
            </td>
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
                <a href="{{ route('admin.purchaseorder.view', $row->id) }}" class="btn btn-sm btn-warning  edit" title="{{ trans('View') }}"  data-original-title="{{ trans('View') }}">
                    View
                </a>
                
            </td>

        </tr>
        @endforeach
  </tbody>
</table>