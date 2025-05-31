@extends('layouts.admin')
@section('title')
    Bulk Upload
@endsection

@section('content')
    <div class="">
        <section id="configuration">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Bulk Upload of Users</h4>
                        </div>

                        <div class="card-body collapse show">
                            <div class="card-block card-dashboard" id="table-display">
                                <div class="d-flex justify-content-center align-items-center" style="height: 90vh;">
                                    <div class="col-lg-4 rounded border p-5 text-center">

                                    {{-- Single error from session --}}
                                    @if(Session::has('error'))
                                    <div class="alert alert-danger">
                                        {{ Session::get('error') }}
                                        @php
                                            Session::forget('error');
                                        @endphp
                                    </div>
                                    @endif

                                    @if ($errors && count($errors) > 0)
                                        <div class="alert alert-danger">
                                            <ul>
                                                @foreach ($errors->all() as $error)
                                                    <li>{{ $error }}</li>
                                                @endforeach
                                            </ul>
                                        </div>
                                    @endif


                                    {{-- File upload form --}}
                                    <form action="{{ route('admin.store_bulkupload') }}" method="post" enctype="multipart/form-data">
                                        @csrf
                                        <i class="fa fa-upload text-success" style="font-size:70px"></i>
                                        <br>
                                        <input type="file" name="bulk_file" class="form-control text-center my-2">
                                        <input type="submit" class="btn btn-success rounded-pill">
                                    </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
@endsection

@section('scripts')
@endsection
