
@extends('layouts.admin')
@section('title')
    
@endsection
@section('css')
<style>
    .ck-editor__editable[role="textbox"] {
        min-height: 300px;
    }
</style>
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
                        <div class="card-header bg-light">
                            <h4 class="card-title">{{ trans('Add Vendor') }}</h4>
                            <a href="{{route('admin.purchaseorder.vendor')}}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
                                {{ trans('View Vendors') }}
                            </a>
                            <a href="{{route('admin.purchaseorder')}}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
                                {{ trans('View Purchase Orders') }}
                            </a>
                        </div>
                        
                        <div class="card-body p-3">
                            <form action="{{ route('admin.purchaseorder.storevendor') }}" method="post" enctype="multipart/form-data">
                                @csrf
                                <div class="row mb-3">
                                    <div class="col-lg-12">
                                        
                                        <div class="col-lg-12">
                                             <label for="name">Enter Vendor Name</label>
                                            <input type="text" name="name" placeholder="Vendor Name" id="name" value="{{ old('name') }}" class="form-control" />
                                            @if ($errors->has('name'))
                                            <span class="text-danger">{{ $errors->first('name') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <br>
                                    <div class="col-lg-12">
                                        
                                        <div class="col-lg-12">
                                             <label for="email">Enter Vendor Email</label>
                                            <input type="email" name="email" placeholder="e.g., Vendor Email Address" id="email" value="{{ old('email') }}" class="form-control" />
                                            @if ($errors->has('email'))
                                            <span class="text-danger">{{ $errors->first('email') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <br>

                                    <div class="col-lg-12">
                                        
                                        <div class="col-lg-12">
                                             <label for="mobile">Enter Vendor Mobile</label>
                                            <input type="text" name="mobile" placeholder="Mobile Number" id="mobile" value="{{ old('mobile') }}" class="form-control" />
                                            @if ($errors->has('mobile'))
                                            <span class="text-danger">{{ $errors->first('mobile') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <br>

                                    <div class="col-lg-12">
                                        
                                        <div class="col-lg-12">
                                             <label for="gst">Enter Vendor's GST Number</label>
                                            <input type="text" name="gst" placeholder="Vendor Company GST Number" id="gst" value="{{ old('gst') }}" class="form-control" />
                                            @if ($errors->has('gst'))
                                            <span class="text-danger">{{ $errors->first('gst') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <br>

                                    <div class="col-lg-12">
                                        
                                        <div class="col-lg-12">
                                             <label for="pan">Enter Vendor's PAN Number</label>
                                            <input type="text" name="pan" placeholder="Vendor Company PAN Number" id="pan" value="{{ old('pan') }}" class="form-control" />
                                            @if ($errors->has('pan'))
                                            <span class="text-danger">{{ $errors->first('pan') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <br>

                                </div>
                                <br>
                                <input type="submit" name="submit" class="btn btn-primary" id="submit" value="Add Vendor">
                            </form>
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
<script src="https://cdn.ckeditor.com/ckeditor5/41.3.1/classic/ckeditor.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        ClassicEditor
            .create(document.querySelector('#editor_body'))
            .then(editor => {
                editor.model.document.on('change:data', () => {
                    document.querySelector('#body').value = editor.getData();
                });
            })
            .catch(error => {
                console.error(error);
            });
    });
</script>
@endsection




