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
                <div class="content-header">{{ trans('labels.add_attribute') }}</div>
            </div>
        </div>

        <div class="row justify-content-md-center">
            <div class="col-md-6">
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
                            <form class="form" method="post" action="{{ route('admin.attribute.store') }}"
                                enctype="multipart/form-data">
                                @csrf
                                <div class="form-body">

                                    <div class="form-group">
                                        <label for="attribute">{{ trans('labels.attribute') }}</label>
                                        <input type="text" class="form-control" name="attribute" id="attribute"
                                            placeholder="{{ trans('placeholder.attribute') }}" required>
                                        @if ($errors->has('attribute'))
                                            <span class="text-danger">{{ $errors->first('attribute') }}</span>
                                        @endif
                                    </div>
                                    <div class="form-group">
                                        <label for="Specifications">Specifications</label>
                                        <div id="input-container">
                                            <div class="d-flex mb-2">
                                                <input type="text" class="form-control" name="specifications[]"
                                                    id="specifications" placeholder="Enter Specifications" required>
                                                <span class="btn btn-outline-success ml-3" id="add-button"><i
                                                        class="fa fa-plus"></i></span>
                                            </div>
                                        </div>
                                        <small id="error-message" class="text-danger"></small>
                                        @if ($errors->has('specifications'))
                                            <span class="text-danger">{{ $errors->first('specifications') }}</span>
                                        @endif
                                    </div>
                                    <div class="form-group">
                                        <label for="Image">Image</label>
                                        <input type="file" class="form-control" name="attribute_image"
                                            id="attribute_image" required>
                                        @if ($errors->has('attribute_image'))
                                            <span class="text-danger">{{ $errors->first('attribute_image') }}</span>
                                        @endif
                                    </div>
                                    <div class="form-group">
                                        <label for="Total_reviews">Total reviews</label>
                                        <input type="number" class="form-control" name="total_reviews"
                                            id="total_reviews" placeholder="Enter Total reviews " required>
                                        @if ($errors->has('total_reviews'))
                                            <span class="text-danger">{{ $errors->first('total_reviews') }}</span>
                                        @endif
                                    </div>
                                    <div class="form-group">
                                        <label for="Avg_rating">Avg Rating</label>
                                        <input type="text" class="form-control" name="avg_rating"
                                            id="avg_rating"
                                            placeholder="Enter Avg Rating" required>
                                            <span id="avg_rating_error" class="text-danger" style="display: none;">Please enter a valid rating.</span>
                                        @if ($errors->has('avg_rating'))
                                            <span class="text-danger">{{ $errors->first('avg_rating') }}</span>
                                        @endif
                                    </div>

                                </div>

                                <div class="form-actions center">
                                    <a href="{{ route('admin.attribute') }}" class="btn btn-raised btn-warning mr-1">
                                        <i class="ft-x"></i> {{ trans('labels.cancel') }}
                                    </a>
                                    <button type="submit" class="btn btn-raised btn-primary">
                                        <i class="fa fa-check-square-o"></i> {{ trans('labels.save') }}
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
<script>
    document.getElementById('add-button').addEventListener('click', function () {
        const container = document.getElementById('input-container');
        const errorMessage = document.getElementById('error-message');
        const addButton = this;
        if (container.querySelectorAll('input[name="specifications[]"]').length >= 2) {
            errorMessage.textContent = 'Maximum 2 specifications allowed.';
            addButton.disabled = true;
            return;
        }
        const newInput = document.createElement('div');
        newInput.classList.add('d-flex', 'mb-2');
        newInput.innerHTML = `
        <input type="text" class="form-control" name="specifications[]" id="specifications" placeholder="Enter Specifications" required>
        <span class="btn btn-outline-danger ml-3 remove-button"><i class="fa fa-minus"></i></span>
    `;
        container.appendChild(newInput);
        newInput.querySelector('.remove-button').addEventListener('click', function () {
            newInput.remove();
            if (container.querySelectorAll('input[name="specifications[]"]').length < 2) {
                errorMessage.textContent = '';
                addButton.disabled = false;
            }
        });
    });


    document.getElementById('avg_rating').addEventListener('input', function () {
        var avgRating = this.value;
        var errorElement = document.getElementById('avg_rating_error');
        var isValid = /^\d*\.?\d*$/.test(avgRating); 
        if (!isValid) {
            this.value = this.value.replace(/[^0-9\.]/g, ''); 
            errorElement.style.display = 'block'; 
        } else {
            errorElement.style.display = 'none'; 
        }
    });


</script>
@endsection
@section('scripttop')
@section('scripts')
