@extends('layouts.admin')

@section('css')
<link rel="stylesheet" href="{{ asset('storage/app/public/Adminassets/css/dataTables.bootstrap4.css') }}">

@endsection

@section('script')
<script src="{{ asset('storage/app/public/Adminassets/js/dataTables.js') }}"></script>
<script src="{{ asset('storage/app/public/Adminassets/js/dataTables.bootstrap4.js') }}"></script>

@endsection

@section('content')
@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

@if (session('success'))
    <div class="alert alert-success">
        {{ session('success') }}
    </div>
@endif
<div class="container card">
    <h3 class="mt-4">Thoughtful Curations</h3>
    <hr>

    <div class="text-right mb-3">
        <a href="{{ route('admin.thoughtful-curations.add') }}" class="btn btn-primary">Add New Video</a>
    </div>

    <div class="row ml-5">
        @foreach($thoughtfulCurations as $curation)
            <div class="col-md-5 mb-4 ml-5">
                <div class="card">
 
                    <label class="m-3">Thumbnail</label><br>
                    <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                        <img src="{{ asset('/storage/app/public/thoughtfull-thumbnails/' . $curation->thumbnail) }}"
                            alt="Current Thumbnail" style="width:400px; height:250px;">
                    </div>

                    <span class="ml-4">Video URL :- <a href="{{$curation->video}}">Play Video</a></span>



                    <div class="card-body">
                        <a href="{{Route('admin.thoughtful-curations.edit', $curation->id)}}"
                            class="btn btn-warning">Edit</a>
                        <form action="{{ route('admin.thoughtful-curations.delete', $curation->id) }}" method="POST"
                            style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger"
                                onclick="return confirm('Are you sure you want to delete this?')">Delete</button>
                        </form>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>

<!-- 
<div class="modal fade" id="videoModal" tabindex="-1" role="dialog" aria-labelledby="videoModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="videoModalLabel">Video Player</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
               
                <video id="videoPlayer" width="100%" controls>
                <source id="videoSourceMp4" src="" type="video/mp4">
                  
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    </div>
</div> -->


@endsection