<table id="data_table_bootstrap" class="table table-striped table-bordered datatable">
    <thead>
        <tr>
            <th class="d-none"></th>
            <th>{{ trans('Inventory Id') }}</th>
            <th>{{ trans('Action') }}</th>
            <th>{{ trans('Category') }}</th>
            <th>{{ trans('Sub-Category') }}</th>
            <th>{{ trans('Quantity') }}</th>
            <th>{{ trans('Type') }}</th>
            <th>{{ trans('DateTime') }}</th>
        </tr>
    </thead>
    <tbody> 
        @php $i=1 @endphp
        @foreach($data as $row)
        <tr>
            <td class="d-none"></td>
            <td>{{$i++}}</td>
            <td>{{$row['action']}}</td>
            <td>{{$row['category']}}</td>
            <td>{{$row['subCategory']}}</td>
            <td>{{$row['quantity']}}</td>
            <td>{{$row['type']}}</td>
            <td>{{$row['created_at']}}</td>
        </tr>
        @endforeach
  </tbody>
</table>