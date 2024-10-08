<table id="data_table_bootstrap" class="table table-striped table-responsive-sm datatable">
    <thead>
        <tr>
            <th class="d-none"></th>
            <!-- <th>#</th> -->
            <th class="text-center">{{ trans('labels.order_number') }}</th>
            <th class="text-center">{{ trans('labels.no_of_products') }}</th>
            <th class="text-center">{{ trans('labels.customer') }}</th>
            <th class="text-center">{{ trans('mobile') }}</th>
            <th class="text-center">{{ trans('labels.order_total') }}</th>
            <th class="text-center">{{ trans('Ordered At') }}</th>
            <th class="text-center">{{ trans('labels.date') }}</th>
            <th class="text-center">{{ trans('labels.action') }}</th>
        </tr>
    </thead>
    <tbody>
        @php $n=0 @endphp
        @forelse($data as $row)
        <tr id="del-{{$row->id}}">
            <th class="d-none"></th>
            <!-- <td class="text-center">{{++$n}}</td> -->
            <td class="text-center">{{$row->order_number}}</td>
            <td class="text-center">{{$row->no_products}}</td>
            <td class="text-center">{{$row->full_name}}</td>
            <td class="text-center">{{$row->mobile}}</td>
            <td class="text-center">{{$row->grand_total}}</td>
            <td class="text-center">{{$row->date}}</td>
            <td class="text-center">{{ \Carbon\Carbon::parse($row->created_at)->format('Y-m-d') }}</td>
            <td class="text-center d-flex">
                <!-- View Button -->
                <a href="{{ URL::to('admin/orders/order-details/'.$row->order_number) }}" class="success p-0 mx-1" data-original-title="{{ trans('labels.view') }}" title="{{ trans('labels.view') }}">
                    <span class="badge badge-success">View</span>
                </a>

                <!-- Dropdown for Edit Options using JavaScript -->
                @if($row->no_products > 1)
                    <div class="custom-dropdown">
                        <button class="badge badge-warning border-0 dropdown-toggle" type="button" onclick="toggleDropdown('{{ $row->id }}')">
                            Edit
                        </button>
                        <div id="dropdown-{{ $row->id }}" class="dropdown-menu" style="display: none;">
                            @php
                            $n=1
                            @endphp
                            @foreach(explode(',', $row->order_ids) as $id)
                                <a class="dropdown-item" href="{{ URL::to('admin/orders/editorder/'.$id) }}">Service ID: {{ $n++ }}</a>
                            @endforeach
                        </div>
                    </div>
                @else
                    <!-- Single Edit Button -->
                    <a href="{{ URL::to('admin/orders/editorder/'.$row->id) }}" class="success p-0" data-original-title="{{ trans('labels.view') }}" title="{{ trans('labels.view') }}">
                        <span class="badge badge-warning">Edit</span>
                    </a>
                @endif
            </td>
        </tr>
        @empty
        <!-- Handle empty data -->
        @endforelse
    </tbody>
</table>

<script>
    function toggleDropdown(id) {
        const dropdownMenu = document.getElementById(`dropdown-${id}`);
        dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(event.target) && !event.target.classList.contains('dropdown-toggle')) {
                dropdown.style.display = 'none';
            }
        });
    });
</script>

<style>
.custom-dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: block;
    min-width: 160px;
    padding: 5px 0;
    margin: 0;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
}
</style>
