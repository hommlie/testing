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
                    <div class="card">                       
                        <div class="card-header bg-light">
                            <h4 class="card-title">{{ trans('Add Time Slots') }}</h4>
                            <a href="{{route('admin.timeslot')}}" class="btn btn-raised btn-primary btn-min-width mr-1 mb-1 float-right" style="margin-top: -30px;">
                                {{ trans('View Timeslots') }}
                            </a>
                        </div>
                        
                        <div class="card-body p-3">
                            <form action="{{ route('admin.timeslot.store') }}" method="post" enctype="multipart/form-data">
                                @csrf
                                <div class="row mb-3">
                                    <div class="col-lg-12">
                                        <label for="title">TimeSlot Title</label>
                                        <div class="col-lg-12">
                                            <input type="text" name="name" placeholder="Day Schedule" id="title" value="{{ old('name') }}" class="form-control" />
                                            @if ($errors->has('name'))
                                            <span class="text-danger">{{ $errors->first('name') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <label for="timeslot">Select Start Time</label>
                                        <div class="col-lg-12">
                                            <input type="time" name="starttime" placeholder="e.g., 9AM-10AM" id="StartTime" value="{{ old('starttime') }}" class="form-control" onchange="StartFunction()"/>
                                            @if ($errors->has('starttime'))
                                            <span class="text-danger">{{ $errors->first('starttime') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <label for="timeslot">Select End Time</label>
                                        <div class="col-lg-12">
                                            <input type="time" name="endtime" placeholder="e.g., 9AM-10AM" id="EndTime" value="{{ old('endtime') }}" class="form-control" onchange="StartFunction()"/>
                                            @if ($errors->has('endtime'))
                                            <span class="text-danger">{{ $errors->first('endtime') }}</span>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                                <p id="result"></p>
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
<script>
    function StartFunction() {
        var StartTime = document.getElementById('StartTime').value;
        var EndTime = document.getElementById('EndTime').value;
        var submitButton = document.getElementById('submit');
        var resultElement = document.getElementById('result');

        if (StartTime && EndTime) {
            var minutesDiff = calculateMinutesDiff(StartTime, EndTime);
            if (minutesDiff > 0) {
                var resultText = formatTimeDiff(minutesDiff);
                resultElement.innerHTML = "<p style='color:green'>"+ resultText + " Between " + StartTime + " - " + EndTime+"</p>";
                submitButton.disabled = false;
            } else {
                resultElement.innerHTML = "<p style='color:red'>End time should be greater than start time.</p>";
                submitButton.disabled = true;
            }
        } else {
            resultElement.innerHTML = "<p style='color:red'>Please select both start and end times.</p>";
            submitButton.disabled = true;
        }
    }

    function calculateMinutesDiff(start, end) {
        // Convert start and end times to Date objects
        var startTime = new Date("1970-01-01T" + start + "Z");
        var endTime = new Date("1970-01-01T" + end + "Z");

        // Calculate the difference in milliseconds
        var diffMs = endTime - startTime;

        // Convert milliseconds to minutes
        var diffMins = diffMs / 1000 / 60;

        return diffMins;
    }

    function formatTimeDiff(minutes) {
        var hours = Math.floor(minutes / 60);
        var mins = minutes % 60;
        var resultText = "";

        if (hours > 0) {
            resultText += hours + " Hour" + (hours > 1 ? "s " : " ");
        }

        resultText += mins + " Min" + (mins !== 1 ? "s" : "");

        return resultText;
    }
</script>
@endsection
