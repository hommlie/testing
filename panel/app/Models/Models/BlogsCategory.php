<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogsCategory extends Model
{


    protected $table = 'blogcategories';

    protected $fillable = [
        'title',
        'image',
    ];

}