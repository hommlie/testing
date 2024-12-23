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
                    <div class="card" onload="InitMap()">                       
                        <div class="card-header bg-light">
                            <h4 class="card-title">{{ trans('Add Location') }}</h4>
                            <a href="{{route('admin.location')}}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
                                {{ trans('View Added Locations') }}
                            </a>
                        </div>
                        
                        <div class="card-body p-3">
                            <form action="{{ route('admin.location.store') }}" method="post" enctype="multipart/form-data">
                                @csrf
                                <div class="row mb-3">
                                    <div class="col-lg-6">
                                        <label for="name">name</label>
                                        <div class="col-lg-12">
                                            <input type="text" name="name" placeholder="e.g., Mangalore" id="name" value="{{ old('name') }}" class="form-control" />
                                            @if ($errors->has('name'))
                                            <span class="text-danger">{{ $errors->first('name') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <label for="status">Status</label>
                                        <div class="col-lg-12">
                                            <select name="status" id="status" required class="form-control">
                                                <option value="">-select-</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                            @if ($errors->has('status'))
                                            <span class="text-danger">{{ $errors->first('status') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <label for="location">Location</label>
                                        <div class="col-lg-12">
                                            @if ($errors->has('coordinates'))
                                            <span class="text-danger">{{ $errors->first('coordinates') }}</span>
                                            @endif
                                            <input type="hidden" name="coordinates" id="coordinates">
                                            <input id="pac-input" class="controls" type="text" placeholder="Search Box">
                                            <div id="map-canvas" style="height: 500px;width:100%"></div>

                                            <div id="info"></div>
                                            
                                        </div>
                                    </div> 
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

@endsection

@section('scripttop')
@endsection

@section('scripts')
<!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCwqf4NpjMnz8J-LuEwgJAdVrn_1_5Zt6g&libraries=drawing"></script> -->

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCwqf4NpjMnz8J-LuEwgJAdVrn_1_5Zt6g&libraries=drawing,places"></script>

<script>
var map;
var drawingManager;
var all_overlays = [];
let coordinates = [];

function InitMap() {
    var location = new google.maps.LatLng( 12.9715987,77.59456269999998);
    var mapOptions = {
        zoom: 12,
        center: location,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

   


    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.POLYGON]
        },
        polygonOptions: {
            editable: true
        }
    });
    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, "overlaycomplete", function(event) {
        if (event.type == google.maps.drawing.OverlayType.POLYGON) {
            var newShape = event.overlay;
            newShape.type = event.type;
            all_overlays.push(newShape);

            google.maps.event.addListener(newShape.getPath(), 'set_at', function() {
                updateCoordinates(newShape);
            });
            google.maps.event.addListener(newShape.getPath(), 'insert_at', function() {
                updateCoordinates(newShape);
            });
            google.maps.event.addListener(newShape.getPath(), 'remove_at', function() {
                updateCoordinates(newShape);
            });
            updateCoordinates(newShape);
        }
    });

   var searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));
   map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('pac-input'));
   google.maps.event.addListener(searchBox, 'places_changed', function() {
     searchBox.set('map', null);


     var places = searchBox.getPlaces();

     var bounds = new google.maps.LatLngBounds();
     var i, place;
     for (i = 0; place = places[i]; i++) {
       (function(place) {
         var marker = new google.maps.Marker({

           position: place.geometry.location
         });
         marker.bindTo('map', searchBox, 'map');
         google.maps.event.addListener(marker, 'map_changed', function() {
           if (!this.getMap()) {
             this.unbindAll();
           }
         });
         bounds.extend(place.geometry.location);


       }(place));

     }
     map.fitBounds(bounds);
     searchBox.set('map', map);
     map.setZoom(Math.min(map.getZoom(),12));

   });
}



function updateCoordinates(shape) {
    coordinates = [];
    shape.getPath().forEach(function(latlng) {
        coordinates.push({
            lat: latlng.lat(),
            lng: latlng.lng()
        });
    });

    let formattedCoordinates = coordinates.map(coord => `${coord.lat} ${coord.lng}`).join(', ');
    // formattedCoordinates = `(${formattedCoordinates})`;

    document.getElementById('coordinates').value = formattedCoordinates;
}


InitMap();


</script>
@endsection

