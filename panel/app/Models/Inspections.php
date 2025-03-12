<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Inspections extends Model
{
    protected $table = 'inspections';
    protected $fillable = [

        'fullName',
        'address',
        'mobile',
        'email',
        'date',
        'time',
       
    ];
}

?>