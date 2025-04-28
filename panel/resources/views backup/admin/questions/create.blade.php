@extends('layouts.admin')
@section('content')

<div class="card col-lg-6 mx-auto">
    <div class="card-header">
        {{ trans('global.create') }} {{ trans('Question') }}
    </div>

    <div class="card-body">
        <form action="{{ route("admin.questions.store") }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="form-group {{ $errors->has('label') ? 'has-error' : '' }}">
                <label for="label">{{ trans('Question Label') }}*</label>
                <input type="text" id="label" name="label" placeholder="Enter Question" class="form-control" value="{{ old('label', isset($product) ? $product->label : '') }}">
                @if($errors->has('label'))
                    <p class="help-block">
                        {{ $errors->first('label') }}
                    </p>
                @endif
                
            </div>
            <div class="form-group {{ $errors->has('type') ? 'has-error' : '' }}">
                <label for="type">{{ trans('Question Type') }}*</label>
                <select name="type" id="type" class="form-control" onchange="showOptionsInput()">
                    <option value="">-select Type-</option>
                    <option value="text">Text</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio</option>
                    <option value="file">File</option>
                </select>
                @if($errors->has('type'))
                    <p class="help-block">
                        {{ $errors->first('type') }}
                    </p>
                @endif
            </div>

            <div class="form-group {{ $errors->has('options') ? 'has-error' : '' }}"  id="options-container"> <!-- style="display: none;" -->
                <label for="options">{{ trans('Enter Options (Comma Separated)') }}*</label>
                <input type="text"  name="options" placeholder="e.g., Option1, Option2" id="options"  class="form-control">
                @if($errors->has('options'))
                    <p class="help-block">
                        {{ $errors->first('options') }}
                    </p>
                @endif
                
            </div>

            <div class="form-check form-switch">
                <input class="form-check-input" name="required_field" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
                <label class="form-check-label" for="flexSwitchCheckChecked">Required Field?</label>
            </div>
            <br>

            
            <div>
                <input class="btn btn-danger" type="submit" value="{{ trans('global.save') }}">
            </div>
        </form>
    </div>
</div>

<script>
    function showOptionsInput() {
        var type = document.getElementById('type').value;
        var optionsContainer = document.getElementById('options-container');
        if (type === 'checkbox' || type === 'radio') {
            optionsContainer.style.display = 'block';
        } else {
            optionsContainer.style.display = 'none';
        }
    }
</script>
@endsection
