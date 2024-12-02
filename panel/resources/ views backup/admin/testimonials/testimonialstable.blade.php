<table id="data_table_bootstrap" class="table table-striped table-bordered zero-configuration datatable">
    <thead>
        <tr>
        <th class="d-none"></th>
            <th>#</th>
            <th>{{ trans('Image') }}</th>
            <th>{{ trans('name') }}</th>
            <th>{{ trans('Feedback') }}</th>
            <th>{{ trans('Location') }}</th>
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
            <td><img src="{{ asset('storage/app/public/images/testimonials/'.$row->image) }}" style="width: 100px;height:100px" alt=""></td>
            <td> {{$row->name}}</td>
            <td> {{$row->feedback}}</td>
            <td> {{$row->location}}</td>
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
                <a href="{{ route('admin.testimonials.show', $row->id) }}" class="btn btn-sm btn-success edit" title="{{ trans('labels.edit') }}" title="{{ trans('labels.edit') }}" data-original-title="{{ trans('labels.edit') }}">
                    Edit
                </a>
            </td>

        </tr>
        @endforeach
  </tbody>
</table>