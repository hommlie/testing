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
                    <div class="content-header">About us</div>
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
                                <form class="form" method="post" action="{{ route('admin.about.update') }}">
                                @csrf
                                    <div class="form-body">
                                        <input type="hidden" name="id" class="form-control" value="{{$data->id}}">
                                        <div class="form-row">
                                            <div class="form-group col-md-12">
                                                <label>
                                                        About us
                                                </label>
                                                <textarea class="form-control d-none" name="about_content" id="about_content" rows="5" placeholder="About us"></textarea>
                                                <div id="editor">{!! $data->about_content !!}</div>
                                                @if ($errors->has('about_content'))
                                                    <span class="text-danger">{{ $errors->first('about_content') }}</span>
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
                    document.querySelector('#about_content').value = editor.getData();
                });
            })
            .catch(error => {
                console.error(error);
            });
    });
</script>

@endsection