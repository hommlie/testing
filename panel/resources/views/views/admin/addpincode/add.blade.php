@extends('layouts.admin')
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
<style>
    .btn-primary.text-light {
        color: #fff !important;
    }

    #map {
        height: 400px;
        width: 100%;
    }

    #pac-input {
        z-index: 9999 !important;
    }

    .gm-style-iw {
        z-index: 9999 !important;
    }

    .modal-content {
        position: relative;
        z-index: 9998;
    }

    #customerModal .modal-content {
        font-size: 8px !important;
        z-index: 9999 !important;
    }

    .pac-container {
        z-index: 1051;
    }
</style>
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
        <h4 class="card-title">Add Pincode</h4>
    </div>
    <div class="card-body">
        <form action="{{ route('admin.addpincode.store') }}" method="POST">
            @csrf
            <div class="d-flex">
                <div class="form-group col-md-6">
                    <label for="pincode">Pincode</label>
                    <input type="text" name="pincode" class="form-control" placeholder="Pincode" required>
                </div>


                <div class="form-group col-md-6">
                    <label for="days">Days</label>
                    <input type="text" name="days" class="form-control" placeholder="Days" required>
                </div>
            </div>

            <div class="form-group ">
                <label for="location">Location</label>
                <div class="d-flex">
                    <input type="text" name="location" class="form-control" placeholder="Location" required>
                   {{-- <span  id="latlong" class="btn btn-outline-secondary ml-2" data-bs-toggle="modal" data-bs-target="#mapModal">Select</span> --}}
                </div>

            </div>

            <button type="submit" class="btn btn-primary">Add Pincode</button>
            <a href="{{ route('admin.addpincode') }}" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
</div>


<div class="modal fade" id="mapModal" tabindex="-1" role="dialog" aria-labelledby="mapModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4>Search Location</h4>

                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input id="pac-input" class="controls form-control rounded-0" type="text" placeholder="Search Box">
                <div class="col-lg-12">

                    <div id="map-canvas" style="height: 500px; width:100%;"></div>
                    <div id="info"></div>
                </div>
            </div>
            <div class="modal-footer">

                <div id="latlong" class="mr-auto"></div>

                <button type="button" class="btn btn-primary rounded-0" id="save-location">Save</button>
            </div>
        </div>
    </div>
</div>



<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.2/js/bootstrap.bundle.min.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCwqf4NpjMnz8J-LuEwgJAdVrn_1_5Zt6g&libraries=drawing,places"></script>
<script>
    // MAP AND SEARCH BOX IN MODEL
    var map, marker, searchBox;

    function InitMap() {

        var location;
        if (latLon) {
            var latLng = latLon.split(',');
            var lat = parseFloat(latLng[0]);
            var lng = parseFloat(latLng[1]);

            if (!isNaN(lat) && !isNaN(lng)) {

                location = new google.maps.LatLng(lat, lng);
            } else {

                location = new google.maps.LatLng(12.9715987, 77.5945627);
            }
        } else {

            location = new google.maps.LatLng(12.9715987, 77.5945627);
        }
        var mapOptions = {
            zoom: 12,
            center: location,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        marker = new google.maps.Marker({
            map: map,
            position: location,
            draggable: true
        });

        searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('pac-input'));

        google.maps.event.addListener(searchBox, 'places_changed', function () {
            var places = searchBox.getPlaces();
            if (places.length == 0) return;

            var bounds = new google.maps.LatLngBounds();

            places.forEach(function (place) {
                if (!place.geometry || !place.geometry.location) return;

                marker.setPosition(place.geometry.location);
                bounds.extend(place.geometry.location);
            });

            map.fitBounds(bounds);
            map.setZoom(Math.min(map.getZoom(), 12));
        });
    }


    $('#mapModal').on('shown.bs.modal', function () {
        if (!map) {
            InitMap();
        }
        const input = document.getElementById('pac-input');
        if (input) {
            const autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.setFields(['place_id', 'geometry', 'name']);
            autocomplete.addListener('place_changed', function () {
                const place = autocomplete.getPlace();
                if (place.geometry) {
                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();
                    map.setCenter(place.geometry.location);
                    map.setZoom(13);
                    marker.setPosition(place.geometry.location);
                    document.getElementById('coordinates').value = `${lat}, ${lng}`;
                    document.getElementById('info').innerHTML = `Selected: ${place.name}`;
                }
            });
        }
    });
</script>   

@endsection