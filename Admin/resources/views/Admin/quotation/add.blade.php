use Illuminate\Support\Facades\Mail;
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
    <div class=">
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
                            <h4 class="card-title">{{ trans('Add Quotation') }}</h4>
                            <a href="{{route('admin.quotation')}}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
                                {{ trans('View Quotations') }}
                            </a>
                        </div>
                        
                        <div class="card-body p-3">
                            <form action="{{ route('admin.quotation.store') }}" method="post" enctype="multipart/form-data">
                                @csrf
                                <div class="row mb-3">
                                    <div class="col-lg-12">
                                        
                                        <div class="col-lg-12">
                                             <label for="email">Enter Recipent Email</label>
                                            <input type="email" name="email" placeholder="e.g., Recipent Email Address" id="email" value="{{ old('email') }}" class="form-control" />
                                            @if ($errors->has('email'))
                                            <span class="text-danger">{{ $errors->first('email') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <br>

                                    <div class="col-lg-12">
                                        
                                        <div class="col-lg-12">
                                             <label for="subject">Enter Quotation Subject</label>
                                            <input type="text" name="subject" placeholder="e.g., Add Quotation Subject" id="subject" value="{{ old('subject') }}" class="form-control" />
                                            @if ($errors->has('subject'))
                                            <span class="text-danger">{{ $errors->first('subject') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <br>


                                    <div class="col-lg-12">
                                        
                                        <div class="col-lg-12">
                                            <label for="body">Quotation Body</label>
                                            <input type="text" name="body" placeholder="e.g., Quotation Body" id="body" value="{{ old('body') }}" class="form-control" style="display: none;" />
                                            <div id="editor_body"></div>
                                            @if ($errors->has('body'))
                                            <span class="text-danger">{{ $errors->first('body') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <br>

                                    <div class="col-lg-12">
                                        
                                        <div class="col-lg-12">
                                            <label for="attachment">Attachments (If Any)</label>
                                            <input type="file" name="attachment" placeholder="e.g., attachment" id="attachment" value="{{ old('body') }}" class="form-control" />
                                            @if ($errors->has('attachment'))
                                            <span class="text-danger">{{ $errors->first('attachment') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <br>

                                    
                                    
                                   
                                </div>
                                <br>
                                <input type="submit" name="submit" class="btn btn-primary" id="submit" value="Send Quotation">
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




