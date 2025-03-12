<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
	protected $fillable = [
        'attribute', 'status','specifications','image','total_reviews','avg_rating'
    ];
}
