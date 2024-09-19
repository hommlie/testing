<table id="data_table_bootstrap" class="table table-striped table-responsive-sm table-striped datatable">
    <thead>
        <tr>
        <th class="d-none"></th>
            <th>#</th>
            <th class="text-center">{{ trans('labels.order_number') }}</th>
            <th class="text-center">{{ trans('labels.customer') }}</th>
            <th class="text-center">{{ trans('Mobile') }}</th>
            <th class="text-center">{{ trans('Email') }}</th>
            <th class="text-center">{{ trans('labels.order_total') }}</th>
            <th class="text-center">{{ trans('Date') }}</th>
            <th class="text-center">{{ trans('Assign') }}</th>
        </tr>
    </thead>
    <tbody>
        @php $i = 1 @endphp
        @foreach ($data as $row)
        <tr>
        <th class="d-none"></th>
            <td>{{ $i++ }}</td>
            <td>{{ $row->order_number }}</td>
            <td>{{ $row->full_name }}</td>
            <td>{{ $row->mobile }}</td>
            <td>{{ $row->email }}</td>
            <td>{{ $row->order_total }}</td>
            <td>{{ \Carbon\Carbon::parse($row->created_at)->format('Y-m-d') }}</td>
            <td>
                <form method="POST" action="{{ route('admin.addmanualorderassignUpdate', $row->id) }}">
                    @csrf
                    @method('POST')
                    <select name="employee" class="form-control p-0">
                        <option value="">-Assign Employee-</option>
                        @foreach ($employees as $employee)
                            @if(!empty($employee->emp_name))
                                <option value="{{ $employee->id }}" {{ $employee->id == $row->assigned_to ? 'selected' : '' }}>
                                    {{ $employee->emp_name }}
                                </option>
                            @endif
                        @endforeach
                    </select>
                    <input type="hidden" name="order_id" value="{{ $row->id }}">
                    <button type="submit" class="btn btn-sm btn-primary mt-2">Assign</button>
                </form>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
