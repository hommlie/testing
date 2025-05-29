@extends('layouts.admin')
@section('title')

@endsection
@section('css')

@endsection
@section('content')
    <div class="">
        <section id="basic-form-layouts">
            <div class="row">
                <div class="col-sm-12">

                </div>
            </div>

            <div class="row justify-content-md-center">
                <div class="col-md-12">
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
                        <div class="card-header">
                            <div class="content-header">Terms Conditions</div>
                        </div>
                        <div class="card-body">
                            @if(Session::has('danger'))
                                <div class="alert alert-danger">
                                    {{ Session::get('danger') }}
                                    @php
                                        Session::forget('danger');
                                    @endphp
                                </div>
                            @endif
                            <div class="px-3">
                                <form class="form" method="post" action="{{ route('admin.terms-conditions.update') }}">
                                    @csrf
                                    <input type="hidden" name="id" value="{{ $data->id }}">
                                    <h4 class="mt-3">Terms Conditions</h4>
                                    <hr>
                                    <div class="form-body">
                                        <div class="form-row">
                                            <div class="form-group col-md-12">
                                                <label>Terms Conditions</label>
                                                <textarea class="form-control d-none" name="terms_conditions"
                                                    id="terms_conditions"
                                                    rows="5">{{ old('terms_conditions', $data->terms_conditions) }}</textarea>

                                                <div id="editor">{!! old('terms_conditions', $data->terms_conditions) !!}
                                                </div>

                                                @if ($errors->has('terms_conditions'))
                                                    <span class="text-danger">{{ $errors->first('terms_conditions') }}</span>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <h4 class="mt-3">Invoice Terms Conditions</h4>
                                    <hr>
                                    <div class="form-body">
                                        
                                       
                                        <div class="form-row">
                                            <div class="form-group col-md-12">
                                                <label>Invoice Terms Conditions</label>

                                                {{-- **PRE-POPULATE** this one too --}}
                                                <textarea class="form-control d-none" name="invoice_terms_conditions"
                                                    id="invoice_terms_conditions"
                                                    rows="5">{{ old('invoice_terms_conditions', $data->invoice_terms_conditions) }}</textarea>

                                                <div id="editor1">
                                                    {!! old('invoice_terms_conditions', $data->invoice_terms_conditions) !!}
                                                </div>

                                                @if ($errors->has('invoice_terms_conditions'))
                                                    <span
                                                        class="text-danger">{{ $errors->first('invoice_terms_conditions') }}</span>
                                                @endif
                                            </div>
                                        </div>
                                    </div>


                                      <h4 class="mt-3">Invoice  Do's and don'ts</h4>
                                    <hr>
                                    <div class="form-body">
                                        

                                        <div class="form-row">
                                            <div class="form-group col-md-12">
                                                <label>Invoice  Do's and don'ts</label>

                                                {{-- **PRE-POPULATE** this one too --}}
                                                <textarea class="form-control d-none" name="invoice_do_dont"
                                                    id="invoice_do_dont"
                                                    rows="5">{{ old('invoice_do_dont', $data->invoice_do_dont) }}</textarea>

                                                <div id="editor2">
                                                    {!! old('invoice_do_dont', $data->invoice_do_dont) !!}
                                                </div>

                                                @if ($errors->has('invoice_do_dont'))
                                                    <span
                                                        class="text-danger">{{ $errors->first('invoice_do_dont') }}</span>
                                                @endif
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-actions right">
                                        <button type="submit" class="btn btn-raised btn-primary">
                                            <i class="fa fa-check-square-o"></i> {{ trans('labels.update') }}
                                        </button>
                                    </div>
                                </form>
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
    @parent
    <script src="https://cdn.ckeditor.com/ckeditor5/41.3.1/classic/ckeditor.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            ClassicEditor
                .create(document.querySelector('#editor'))
                .then(editor => {
                    editor.model.document.on('change:data', () => {
                        document.querySelector('#terms_conditions').value = editor.getData();
                    });
                })
                .catch(error => {
                    console.error(error);
                }); 

            ClassicEditor
                .create(document.querySelector('#editor1'))
                .then(editor => {
                    editor.model.document.on('change:data', () => {
                        document.querySelector('#invoice_terms_conditions').value = editor.getData();
                    });
                })
                .catch(error => {
                    console.error(error);
                });

                  ClassicEditor
                .create(document.querySelector('#editor2'))
                .then(editor => {
                    editor.model.document.on('change:data', () => {
                        document.querySelector('#invoice_do_dont').value = editor.getData();
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        });
    </script>
@endsection