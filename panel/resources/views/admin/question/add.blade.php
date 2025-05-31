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
                    <div class="card ">
                        <div class="card-header bg-light">
                            <h4 class="card-title">{{ trans('Add Questions') }}</h4>
                            <a href="{{route('admin.question')}}"
                                class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right"
                                style="margin-top: -30px;">
                                {{ trans('View Questions') }}
                            </a>
                        </div>

                        <div class="card-body p-3 col-lg-6 mx-auto">
                            <form action="{{ route('admin.question.store') }}" method="post" enctype="multipart/form-data">
                                @csrf
                                <div class="row mb-3">


                                    <div class="col-lg-12">
                                        <label for="label" class="form-label">Enter Question Label</label>
                                        <div class="col-lg-12">
                                            <input type="text" name="label" placeholder="e.g., Question Label" id="label"
                                                value="{{ old('label') }}" class="form-control" />
                                            @if ($errors->has('label'))
                                                <span class="text-danger">{{ $errors->first('label') }}</span>
                                            @endif
                                        </div>
                                    </div>

                                    <div class="col-lg-12">
                                        <label for="type" class="form-label">Select Question Type</label>
                                        <div class="col-lg-12">
                                            <select name="type" id="type" class="form-control"
                                                onchange="showOptionsInput()">
                                                <option value="">-select Type-</option>
                                                <option value="text">Text</option>
                                                <option value="checkbox"  {{ old('type') == 'checkbox' ? 'selected' : '' }}>Checkbox</option>
                                                <option value="radio" {{ old('type') == 'radio' ? 'selected' : '' }}>Radio</option>
                                                <option value="file">File</option>
                                            </select>
                                            @if ($errors->has('type'))
                                                <span class="text-danger">{{ $errors->first('type') }}</span>
                                            @endif
                                        </div>
                                    </div>

                                    <div class="col-lg-12" id="options-container" style="display: none;">
                                        <label for="options">Enter Options (Comma Separated)</label>
                                        <div class="col-lg-12">
                                            <input type="text" name="options" placeholder="e.g., Option1, Option2"
                                                id="options" class="form-control" />
                                            @if ($errors->has('options'))
                                                <span class="text-danger">{{ $errors->first('options') }}</span>
                                            @endif
                                        </div>
                                    </div>

                                </div>

                                <div class="form-check form-switch">
                                    <input class="form-check-input" name="required_field" type="checkbox" role="switch"
                                        id="flexSwitchCheckChecked" checked>
                                    <label class="form-check-label" for="flexSwitchCheckChecked">Required Field?</label>
                                </div>
                                <br>

                                <input type="submit" name="submit" class="btn btn-primary" id="submit">
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <script>
        function showOptionsInput() {
            var type = document.getElementById('type').value;
            var optionsContainer = document.getElementById('options-container');
            if (type === 'checkbox' || type === 'radio') {
                console.log("suraj");
                optionsContainer.style.display = 'block';
            } else {
                optionsContainer.style.display = 'none';
            }
        }
    </script>
@endsection