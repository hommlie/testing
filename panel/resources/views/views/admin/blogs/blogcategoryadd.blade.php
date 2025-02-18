@extends('layouts.admin')
@section('script')
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.5/js/dataTables.bootstrap4.min.js"></script>[;\]
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

    <div class="card">
        <div class="card-header">
            <h4 class="card-title">Edit Blogs</h4>
        </div>
        {{-- BLOGS FORM --}}
        <div class="card-body">
            <form action="{{ route('admin.blogs.blogcategorystore') }}" method="POST"
                enctype="multipart/form-data">
                @csrf
                <div class="d-flex ">
                    {{-- TITLE --}}
                    <div class="mb-3 col-md-6">
                        <label class="form-label">Title</label>
                        <input type="text" name="title" class="form-control"
                            placeholder="Enter Title" required>
                    </div>
                    {{-- TITLE --}}
                    <div class="mb-3 col-md-6">
                        <label class="form-label">Image</label>
                        <input type="file" name="image" class="form-control">
                    </div>
                </div>
              
                {{-- UPDATE BUTTON --}}
                <button type="submit" class="btn btn-success">Add </button>
                <a href="{{ route('admin.blogs.blogcategoryindex') }}" class="btn btn-secondary">Cancel</a>
            </form>
        </div>
    </div>
@endsection
@section('scripts')
@endsection