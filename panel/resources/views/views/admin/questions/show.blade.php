@extends('layouts.admin')
@section('content')

<div class="card">
    <div class="card-header">
        {{ trans('global.show') }} {{ trans('Question') }}
    </div>

    <div class="card-body">
        <table class="table table-bordered table-striped">
            <tbody>
                <tr>
                    <th>
                        {{ trans('Question Label') }}
                    </th>
                    <td>
                        {{ $question->label }}
                    </td>
                </tr>
                <tr>
                    <th>
                        {{ trans('Question Type') }}
                    </th>
                    <td>
                        {!! $question->type !!}
                    </td>
                </tr>
                <tr>
                    <th>
                        {{ trans('Options') }}
                    </th>
                    <td>
                        {{ $question->options }}
                    </td>
                </tr>
                <tr>
                    <th>
                        {{ trans('Required') }}
                    </th>
                    <td>
                        {{ $question->required }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

@endsection