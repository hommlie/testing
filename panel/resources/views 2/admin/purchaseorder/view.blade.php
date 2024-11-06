@extends('layouts.admin')
@section('title')
    
@endsection
@section('css')

@endsection
@section('content')
    <div class="">
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
                        <div class="card-header justify-content-between">
                            View Quotation
                            <a href="{{route('admin.quotation')}}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right">
                                {{ trans('View Quotations') }}
                            </a>
                        </div>
                        <div class="card-body">
                            <div class="container">
                            <h1>{{ $data->heading }}</h1>
                            <p>{{ $data->body }}</p>
                            <br>
                            @if (!empty($data->attachment))
                                <b>Attachment:</b>
                                <a href="{{ asset('storage/app/public/images/quotation/'.$data->attachment) }}" target="_blank">{{ $data->attachment }}</a>
                            @endif
                            
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
