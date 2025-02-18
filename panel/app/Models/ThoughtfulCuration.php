<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ThoughtfulCuration extends Model
{
    protected $table = 'thoughtful_curations';
    protected $fillable = [

        'video',
        'thumbnail',
       
    ];
}
?>