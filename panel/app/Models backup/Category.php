<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'category_name','icon','web_icon','alt_tag','image_title','video','thumbnail','slug','status','is_form'
    ];
}
