<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'category','stage','label','type', 'options','required'
    ];

    protected $table='questions';


}
