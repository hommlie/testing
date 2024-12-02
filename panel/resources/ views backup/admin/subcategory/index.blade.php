@extends('layouts.admin')
@section('title')
    
@endsection
@section('css')

@endsection
@section('content')
    <div class="">
        <section id="configuration">
            <div class="row">
                <div class="col-12">
                    @if(Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                        @php
                            Session::forget('success');
                        @endphp
                    </div>
                    @endif
                    <div class="card">                       
                        <div class="card-header">
                            <h4 class="card-title">{{ trans('labels.subcategory') }}</h4>
                            <a href="{{route('admin.subcategory.add')}}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
                                {{ trans('labels.add_subcategory') }}
                            </a>
                        </div>

                        <div class="col-md-4">
                            <form method="GET" action="{{route('admin.subcategory.search')}}">
                                <div class="input-group">
                                    <input type="text" id="search" name="search" placeholder="Type & Enter" value="{{ request()->get('search') }}" class="form-control round">
                                    <div class="input-group-append">
                                        <button class="input-group-text" id="basic-addon4"><i class="ft-search"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                        <div class="card-body collapse show">
                            <div class="card-block card-dashboard" id="table-display">
                                @include('admin.subcategory.subcategorytable')
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </div>


@endsection
@section('scripttop')
@endsection
@section('scripts')
<script type="text/javascript">
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    function CategoryTable() {
        $('#preloader').show();
        $.ajax({
            url:"{{ route('admin.subcategory.list') }}",
            method:'get',
            success:function(data){
                $('#preloader').hide();
                $('#table-display').html(data);
                $(".zero-configuration").DataTable({
                  aaSorting: [[0, 'DESC']]
                })
            }
        });
    }

    function do_delete(id,page_name,name,titles)
    {
        Swal.fire({
            title: '{{ trans('labels.are_you_sure') }}',
            text: "{{ trans('labels.delete_text') }} "+name+"!",
            type: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '{{ trans('labels.yes') }}',
            cancelButtonText: '{{ trans('labels.no') }}'
        }).then((t) => {
            if(t.value==true){  
                $('#preloader').show();
                $.ajax({
                     headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: page_name,
                    type: "POST",
                    data : {'id':id},

                    success:function(data)
                    { 
                        $('#preloader').hide();
                        if(data == 1000)
                        {
                            $('#del-'+id).remove();
                            Swal.fire({type: 'success',title: '{{ trans('labels.success') }}',showConfirmButton: false,timer: 1500});    
                        }
                        else
                        {
                            Swal.fire({type: 'error',title: '{{ trans('labels.cancelled') }}',showConfirmButton: false,timer: 1500});
                        }    
                    },error:function(data){
                        $('#preloader').hide();
                        console.log("AJAX error in request: " + JSON.stringify(data, null, 2));
                    }
                });
            }
            else
            {
                Swal.fire({type: 'error',title: '{{ trans('labels.cancelled') }}',showConfirmButton: false,timer: 1500});

            }
        });

    }
    
    //Change Status
    $('body').on('click','.changeStatus',function() {
        let status=$(this).attr('data-status');
        let id=$(this).attr('data-id');
        Swal.fire({
            title: '{{ trans('labels.are_you_sure') }}',
            text: "{{ trans('labels.change_status') }}",
            type: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '{{ trans('labels.yes') }}',
            cancelButtonText: '{{ trans('labels.no') }}'
        }).then((t) => {
            if(t.value==true){
                $('#preloader').show();
                $.ajax({
                    headers: {
                      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: '{{route("admin.subcategory.changeStatus")}}',
                    type: "POST",
                    data : {'id':id,'status':status},
                    success:function(data)
                    { 
                        $('#preloader').hide();
                        if(data == 1000)
                        {
                            Swal.fire({type: 'success',title: '{{ trans('labels.success') }}',showConfirmButton: false,timer: 1500});    
                            if(status=='1'){
                                $('#tdstatus'+id).html('<span class="btn btn-raised btn-outline-success round btn-min-width mr-1 mb-1 changeStatus" data-status="2"  data-id="'+id+'">{{ trans('labels.active') }}</span>');
                            }else{
                                $('#tdstatus'+id).html('<span class="btn btn-raised btn-outline-danger round btn-min-width mr-1 mb-1 changeStatus" data-status="1"  data-id="'+id+'">{{ trans('labels.deactive') }}</span>');
                            }
                        }
                        else
                        {
                            Swal.fire({type: 'error',title: '{{ trans('labels.cancelled') }}', showConfirmButton: false,timer: 1500});
                        }
                            
                    },error:function(data){
                        $('#preloader').hide();
                        console.log("AJAX error in request: " + JSON.stringify(data, null, 2));
                    }
                });
            }
            else
            {
                Swal.fire({type: 'error',title: '{{ trans('labels.cancelled') }}',showConfirmButton: false,timer: 1500});

            }
        });
    });
</script>

<script>
    $(document).ready(function() {
    $(document).on('click', '.assignbtn', function() {
        var subcat_id = $(this).val();
        $('#subcat_id_emp').val(subcat_id); 

        $('#QuestionAssignModal').modal('show');

        $.ajax({
            type: 'GET',
            url: 'subcategory/getQuestions',
            success: function(response) {
                if (response.status === 200) {
                    var onsite = $('#onsite');
                    var completed = $('#completed');

                    onsite.empty();
                    completed.empty();

                    $.each(response.questions, function(index, question) {
                        var optionText = question.label + ' (' + question.type + ')';
                        onsite.append($('<option>', { value: question.id, text: optionText }));
                    });

                    $.each(response.questions, function(index, question) {
                        var optionText = question.label + ' (' + question.type + ')';
                        completed.append($('<option>', { value: question.id, text: optionText }));
                    });
                } else {
                    console.log("Error retrieving questions");
                }
            }
        });
    });

    $('#QuestionAssignForm').on('submit', function(event) {
        event.preventDefault();

        var subcat_id = $('#subcat_id_emp').val();
        console.log(subcat_id);
        var selectedOnsite = $('#onsite').val();
        var selectedCompleted = $('#completed').val();

        var data = [
            {
                "title": "Onsite",
                "question": selectedOnsite ? selectedOnsite.join(',') : ''
            },
            {
                "title": "OnCompleted",
                "question": selectedCompleted ? selectedCompleted.join(',') : ''
            }
        ];

        console.log(data);

        $.ajax({
            type: 'POST',
            url: 'subcategory/submitQuestions/' + subcat_id,
            data: {
                _token: $('meta[name="csrf-token"]').attr('content'),
                question: JSON.stringify(data)
            },
            success: function(response) {
                if (response.status === 200) {
                    console.log(response.message);
                    console.log(response.question);
                    $('#QuestionAssignModal').modal('hide');
                    location.reload();
                } else {
                    console.log("Error updating question");
                }
            },
            error: function(xhr, status, error) {
                console.log("An error occurred: " + error);
            }
        });
    });
});

</script>
@endsection