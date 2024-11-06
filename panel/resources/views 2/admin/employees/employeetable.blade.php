
<div class="card">
    <div class="card-header">
        {{ trans('global.product.title_singular') }} {{ trans('global.list') }}
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>

    <div class="card-body">
        <div class="table-responsive">
            <table class=" table table-bordered table-striped table-hover datatable ajaxtable">
                <thead>
                    <tr>
                      
                        <th>
                            {{ trans('Question') }}
                        </th>
                        <th>
                            {{ trans('Question Type') }}
                        </th>
                        <th>
                            {{ trans('Options') }}
                        </th>
                        <th>
                            {{ trans('Required?') }}
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>dwsfsdsdvf</td>
                        <td>dwsfsdsdvf</td>
                        <td>dwsfsdsdvf</td>
                        <td>dwsfsdsdvf</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script>
$(document).ready(function () {
    $('.ajaxTable').DataTable()
});
</script>
@section('scripts')
@parent

@endsection