<table id="data_table_bootstrap" class="table table-striped table-bordered zero-configuration datatable">
    <thead>
        <tr>
            <th class="d-none"></th>
            <th>{{ trans('Id') }}</th>
            <th>{{ trans('Category') }}</th>
            <th>{{ trans('Sub-Category') }}</th>
            <th>{{ trans('Quantity') }}</th>
            <th>{{ trans('Type') }}</th>
            <th>{{ trans('Price') }}</th>
            <th>{{ trans('Total Price') }}</th>
            <th>{{ trans('Vendor') }}</th>
            <th>{{ trans('Date') }}</th>
            <th>{{ trans('status') }}</th>
            <th>{{ trans('labels.action') }}</th>
            <th>{{ trans('assign') }}</th>
        </tr>
    </thead>
    <tbody> 
        @php $i=1 @endphp
        @foreach($data as $row)
        <tr>
            <td class="d-none"></td>
            <td>{{ $i }}</td>
            <td>{{$row['category']}}</td>
            <td>{{$row['subCategory']}}</td>
            <td>{{$row['quantity']}}</td>
            <td>{{$row['type']}}</td>
            <td>{{$row['price']}}</td>
            <td>{{$row['total']}}</td>
            <td>{{$row['vendor']}}</td>
            <td>{{$row['created_at']}}</td>
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
                
                <a href="{{ route('admin.inventory.show', $row->id) }}" class="badge badge-success edit" title="{{ trans('labels.edit') }}" title="{{ trans('labels.edit') }}" data-original-title="{{ trans('labels.edit') }}">
                    Edit
                </a>
                
                <a href="{{ route('admin.inventory.outward', $row->id) }}" class="badge  badge-danger Outward" title="{{ trans('Outward') }}" title="{{ trans('Outward') }}" data-original-title="{{ trans('Outward') }}">
                    Outward
                </a>
                <a href="{{ route('admin.inventory.inward', $row->id) }}" class="badge badge-success inward" title="{{ trans('inward') }}" title="{{ trans('inward') }}" data-original-title="{{ trans('inward') }}">
                    Inward
                </a>

                
            </td>
            <td>
                <button type="button" value="{{ $row->id }}"  data-toggle="modal"  class="btn editbtn btn-sm btn-outline-success edit" title="{{ trans('Assign') }}" title="{{ trans('Assign') }}" data-original-title="{{ trans('Assign') }}">
                    Assign
                </button>
            </td>

        </tr>
        @php $i++ @endphp
        @endforeach
  </tbody>
</table>