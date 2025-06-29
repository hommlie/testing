<table class="table table-striped table-bordered zero-configuration">
    <thead>
        <tr>
            <th>#</th>
            <th>{{ trans('Image') }}</th>
            <th>{{ trans('labels.category') }}</th>
            
            <th>{{ trans('labels.subcategory') }}</th>
            <th>ALT tag</th>
            <th>Image title</th>
            <th>{{ trans('Assigned Questions') }}</th>
            <th>{{ trans('labels.status') }}</th>
            <th>{{ trans('labels.action') }}</th>
        </tr>
    </thead>
    <tbody> 
        @php $n=0 @endphp
        @if(!empty($data) && $data->count() > 0)

        @foreach($data as $row)      
        
        <tr id="del-{{$row->id}}">
            <td>{{++$n}}</td>
             <td><img src='{!! asset("storage/app/public/images/subcategory/".$row->icon) !!}' class='media-object round-media height-50' style="height:50px"></td>
            <td>{{$row['category']->category_name}}</td>
              
            <td>{{$row->subcategory_name}}</td>
            <td>{{$row->alt_tag}}</td>
            <td>{{$row->image_title}}</td>
            <td>
                <strong>Onsite:</strong>
               
                
                @if(!empty($row->onsiteQuestions) && $row->onsiteQuestions->count() > 0)
                    @foreach($row->onsiteQuestions as $question)
                        <p>{{ $question->label }} ({{ $question->type }})</p>
                    @endforeach
                @else
                    <p>No questions available.</p>
                @endif


                <strong>OnCompleted:</strong>
                @if(!empty($row->completedQuestions) && $row->completedQuestions->count() > 0)
                    @forelse($row->completedQuestions as $question)
                    <p>{{ $question->label }} ({{ $question->type }})</p>
                    @endforeach
                @else
                    <p>No questions assigned.</p>
                @endif
            </td>
            <td id="tdstatus{{$row->id}}"> 
                @if($row->status=='1') 
                    <span class="btn btn-raised btn-outline-success round btn-min-width mr-1 mb-1 changeStatus" data-status="2" data-id="{{$row->id}}">
                      <span class="green-text">{{ trans('labels.active') }}</span>
                    </span>
                @else 
                    <span class="btn btn-raised btn-outline-danger round btn-min-width mr-1 mb-1 changeStatus" data-status="1" data-id="{{$row->id}}">
                        <span class="red-text">{{ trans('labels.deactive') }}</span>
                    </span>
                @endif
            </td>
            <td>
                <a href="{{URL::to('admin/subcategory/show/'.$row->id)}}" class="success p-0 edit" title="{{ trans('labels.edit') }}" title="{{ trans('labels.edit') }}" data-original-title="{{ trans('labels.edit') }}">
                    <i class="ft-edit-2 font-medium-3 mr-2"></i>
                </a>
                <a href="javascript:void(0);" class="danger p-0" data-original-title="{{ trans('labels.delete') }}" title="{{ trans('labels.delete') }}" onclick="do_delete('{{$row->id}}','{{route('admin.subcategory.delete')}}','{{ trans('labels.delete_subcategory') }}','{{ trans('labels.delete') }}')">
                    <i class="ft-trash font-medium-3"></i>
                </a>

                <button value="{{ $row->id }}"  data-toggle="modal" class="btn btn-raised btn-outline-success round btn-min-width mr-1 mb-1 assignbtn">Assign</button>
            </td>
        </tr>

        @endforeach
       
        @endif
  </tbody>
</table>
<nav aria-label="Page navigation example">
    @if ($data->hasPages())
    <ul class="pagination justify-content-end" role="navigation">
        {{-- Previous Page Link --}}
        @if ($data->onFirstPage())
            <li class="page-item disabled" aria-disabled="true" aria-label="@lang('pagination.previous')">
                <span class="page-link" aria-hidden="true">&lsaquo;</span>
            </li>
        @else
            <li class="page-item">
                <a class="page-link" href="{{ $data->previousPageUrl() }}" rel="prev" aria-label="@lang('pagination.previous')">&lsaquo;</a>
            </li>
        @endif

        <?php
            $start = $data->currentPage() - 2; // show 3 pagination links before current
            $end = $data->currentPage() + 2; // show 3 pagination links after current
            if($start < 1) {
                $start = 1; // reset start to 1
                $end += 1;
            } 
            if($end >= $data->lastPage() ) $end = $data->lastPage(); // reset end to last page
        ?>

        @if($start > 1)
            <li class="page-item">
                <a class="page-link" href="{{ $data->url(1) }}">{{1}}</a>
            </li>
            @if($data->currentPage() != 4)
                {{-- "Three Dots" Separator --}}
                <li class="page-item disabled" aria-disabled="true"><span class="page-link">...</span></li>
            @endif
        @endif
            @for ($i = $start; $i <= $end; $i++)
                <li class="page-item {{ ($data->currentPage() == $i) ? ' active' : '' }}">
                    <a class="page-link" href="{{ $data->url($i) }}">{{$i}}</a>
                </li>
            @endfor
        @if($end < $data->lastPage())
            @if($data->currentPage() + 3 != $data->lastPage())
                {{-- "Three Dots" Separator --}}
                <li class="page-item disabled" aria-disabled="true"><span class="page-link">...</span></li>
            @endif
            <li class="page-item">
                <a class="page-link" href="{{ $data->url($data->lastPage()) }}">{{$data->lastPage()}}</a>
            </li>
        @endif

        {{-- Next Page Link --}}
        @if ($data->hasMorePages())
            <li class="page-item">
                <a class="page-link" href="{{ $data->nextPageUrl() }}" rel="next" aria-label="@lang('pagination.next')">&rsaquo;</a>
            </li>
        @else
            <li class="page-item disabled" aria-disabled="true" aria-label="@lang('pagination.next')">
                <span class="page-link" aria-hidden="true">&rsaquo;</span>
            </li>
        @endif
    </ul>
    @endif
</nav>

