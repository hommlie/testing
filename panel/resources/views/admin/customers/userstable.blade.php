<table id="data_table_bootstrap" class="table table-striped table-bordered zero-configuration datatable">
    <thead>
        <tr>
            <th class="d-none"></th>
            <th>#</th>
            <th>{{ trans('Image') }}</th>
            <th>{{ trans('Name') }}</th>
            <th>{{ trans('Email') }}</th>
            <th>{{ trans('Mobile') }}</th>
            <th>{{ trans('Date') }}</th>
            <!-- <th>{{ trans('Status') }}</th> -->
        </tr>
    </thead>
    <tbody> 
        @php $n=0 @endphp
        @foreach($data as $row)      
        <tr>
            <th class="d-none"></th>
            <td>{{++$n}}</td>
            <td>
                <img src='{!! asset("/storage/app/public/images/profile/".$row->profile_pic) !!}' class='media-object round-media height-50' style="width: 100px;border-radius:50%">
            </td>
            <td>{{$row->name ? $row->name : "NA"}}</td>
            <td>{{$row->email ? $row->email : "NA" }}</td>
            <td>{{$row->mobile }}</td>
            <td>{{ \Carbon\Carbon::parse($row->created_at)->format('Y-m-d') }}</td>
            <!-- <td> 
                @if($row->is_available=='1') 
                    <span class="btn btn-raised btn-outline-success round btn-min-width mr-1 mb-1 changeStatus" data-status="2" data-id="{{$row->id}}">
                      <span class="green-text">{{ trans('Active') }}</span>
                    </span>
                @else 
                    <span class="btn btn-raised btn-outline-danger round btn-min-width mr-1 mb-1 changeStatus" data-status="1" data-id="{{$row->id}}">
                        <span class="red-text">{{ trans('Deactive') }}</span>
                    </span>
                @endif
            </td> -->
            
        </tr>

        @endforeach
  </tbody>
</table>


