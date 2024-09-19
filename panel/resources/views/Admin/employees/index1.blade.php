@extends('layouts.admin')
@section('content')
<head>
 <link rel="stylesheet" href="https://cdn.datatables.net/2.1.3/css/dataTables.dataTables.css">
</head>

@if(Session::has('success'))
<div class="alert alert-success">
    {{ Session::get('success') }}
    @php
        Session::forget('success');
    @endphp
</div>
@endif

@if(Session::has('danger'))
<div class="alert alert-danger">
    {{ Session::get('danger') }}
    @php
        Session::forget('danger');
    @endphp
</div>
@endif



<div class="card">
    <div class="card-header ">
        <h4 class="card-title">{{ trans('Employees List') }}</h4>
        @can('question_create')
        <a href="{{route('admin.employees.add')}}" class="btn btn-success mr-1 mb-1 float-right" style="margin-top: -30px;">
            {{ trans('Add Employees') }}
        </a>
        @endcan
    </div>

    <div class="card-body">
        <table id="example111" class="text-center table table-striped table-bordered datatable">
            <thead>
                <tr>
                    <th class="text-center">#</th>
                    <th class="text-center">{{ trans('Profile') }}</th>
                    <th class="text-center">{{ trans('Employee ID') }}</th>
                    <th class="text-center">{{ trans('Name') }}</th>
                    <th class="text-center">{{ trans('Phone') }}</th>
                    <th class="text-center">{{ trans('Email') }}</th>
                    <th class="text-center">{{ trans('status') }}</th>
                    <th class="text-center">{{ trans('Action') }}</th>
                </tr>
            </thead>
            <tbody>
                @php $n=0 @endphp
                @foreach($data as $row)
                <tr>
                    <td class="text-center">{{ ++$n }}</td>
                    <td class="text-center"><img src="{{ asset('storage/app/public/assets/images/employees/'.$row['emp_photo']) ?: asset('storage/app/public/assets/images/profile.png') }}" width="50px" height="50px" class="rounded-circle"  alt=""></td>
                    <td class="text-center">{{$row->emp_id}}</td>
                    <td class="text-center">{{$row->emp_name}}</td>
                    <td class="text-center">{{$row->emp_phone}}</td>
                    <td class="text-center">{{$row->emp_email}}</td>
                    <td class="text-center">
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
                        <a href="{{ route('admin.employees.view', $row->id) }}" class="btn btn-sm btn-warning  edit" title="{{ trans('labels.edit') }}" data-original-title="{{ trans('labels.edit') }}">
                            View
                        </a>
                        <a href="{{ route('admin.employees.show', $row->id) }}" class="btn btn-sm btn-success edit" title="{{ trans('labels.edit') }}" data-original-title="{{ trans('labels.edit') }}">
                            Edit
                        </a>
                        <button type="button" value="{{ $row->id }}"  data-toggle="modal"  class="btn editbtn btn-sm btn-outline-success edit" title="{{ trans('Assign') }}" data-original-title="{{ trans('Assign') }}">
                            Assign
                        </button>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection

@section('script')

<script src="https://code.jquery.com/jquery-3.7.1.js"></script>
<script src="https://cdn.datatables.net/2.1.3/js/dataTables.js"></script>

<script type="text/javascript">
    $(document).ready(function() {

        alert();
      $('#example111').DataTable();

    });
</script>
@endsection
