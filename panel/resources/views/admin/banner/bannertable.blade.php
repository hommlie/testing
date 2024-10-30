<table class="table table-striped table-bordered zero-configuration">
    <thead>
        <tr>
            <th>#</th>
            <th>{{ trans('labels.image') }}</th>
            <th>{{ trans('labels.link') }}</th>
            <th>{{ trans('labels.type') }}</th>
            <th>{{ trans('labels.category') }}</th>
            <th>{{ trans('labels.product') }}</th>  
            <th>{{ trans('labels.action') }}</th>
        </tr>
    </thead>
    <tbody> 
        @php $n=0 @endphp
        @forelse($data as $row)      
        <tr id="del-{{$row->id}}">
            <td>{{++$n}}</td>
            <td><img src='{!! asset("storage/app/public/images/banner/".$row->image) !!}' class='media-object round-media height-50' style="height:70px"></td>
            <td>{{$row->link}}</td>
            <td>{{$row->type}}</td>
            <td>
                @if ($row->type == "category")
                    {{@$row['category']->category_name}}
                @else
                    --
                @endif
            </td>
            <td>
                @if ($row->type == "product")
                    {{@$row['product']->product_name}}
                @else
                    --
                @endif
            </td>
            <td>
                <a href="{{URL::to('admin/banner/show/'.$row->id)}}" class="success p-0 edit" title="{{ trans('labels.edit') }}" title="{{ trans('labels.edit') }}" data-original-title="{{ trans('labels.edit') }}">
                    <i class="ft-edit-2 font-medium-3 mr-2"></i>
                </a>
                <a href="javascript:void(0);" class="danger p-0" data-original-title="{{ trans('labels.delete') }}" title="{{ trans('labels.delete') }}" onclick="do_delete('{{$row->id}}','{{route('admin.banner.delete')}}','{{ trans('labels.delete_banner') }}','{{ trans('labels.delete') }}')">
                    <i class="ft-trash font-medium-3"></i>
                </a>
            </td>
        </tr>
        @empty

        @endforelse
  </tbody>
</table>