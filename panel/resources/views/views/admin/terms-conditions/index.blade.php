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
                                    <div class="form-body">
                                        <input type="hidden" name="id" class="form-control" value="{{$data->id}}">
                                        <div class="form-row">
                                            <div class="form-group col-md-12">
                                                <label>
                                                    Terms Conditions
                                                </label>
                                                <textarea class="form-control d-none" name="terms_conditions" id="terms_conditions" rows="5" placeholder="{{ trans('placeholder.terms_conditions') }}"></textarea>
                                                <div id="editor">{!! $data->terms_conditions !!}</div>
                                                @if ($errors->has('terms_conditions'))
                                                    <span class="text-danger">{{ $errors->first('terms_conditions') }}</span>
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
    document.addEventListener("DOMContentLoaded", function() {
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
    });
</script>

@endsection