@extends('layouts.admin')

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
<style>
    .btn-primary.text-light {
        color: #fff !important;
    }

    .bounce {
        animation: bounce 9.1s infinite;
    }

    @keyframes bounce {

        0%,
        100% {
            transform: translateY(0);
        }

        50% {
            transform: translateY(-10px);
        }
    }
</style>
@section('title')

@endsection
@section('css')
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.css"> -->
    <link rel="stylesheet" href="{{asset('storage/app/public/Adminassets/css/dataTables.bootstrap4.css')}}">



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
                    <!-- @if(Session::has('success'))
                            <div class="alert alert-success">
                                {{ Session::get('success') }}
                                @php
                                    Session::forget('success');
                                @endphp
                            </div>
                        @endif -->
                    <!-- @if(session('success'))
                            <div class="alert alert-success">
                                {{ session('success') }}
                            </div>
                        @endif -->

                    @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                    <div class="container mt-4">
                        <div class="card p-3 shadow-sm">
                            <div class="card-header bg-light d-flex justify-content-between align-items-center">
                                <h2 class="card-title mb-0">Import Order Data</h2>
                                <div class="d-flex justify-content-end">
                                    <!-- <a href="{{ asset('/panel/storage/app/public/images/excelFile/OrderFormattedData.csv') }}"
                                        class="btn btn-primary text-light" download style="margin-left:850px">
                                        <i class="fas fa-download text-light"></i>
                                    </a> -->
                                </div>
                            </div>
                            <div class="card-body">
                                <form action="{{route('admin.orders.storeOrderDataExcel')}}" method="POST"
                                    enctype="multipart/form-data">
                                    @csrf
                                    <label for="ImportOrder" class="form-label">Upload File</label>
                                    <input type="file" class="form-control mb-3" name="orderData" id="orderData" required>
                                    @if ($errors->has('orderData'))
                                        <div class="text-danger">{{ $errors->first('orderData') }}</div>
                                    @endif
                                    <div class="d-flex justify-content-end">
                                        <button type="submit" class="btn btn-primary w-25">Upload</button>
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