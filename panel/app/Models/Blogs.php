<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blogs extends Model
{
   

    protected $table = 'blogs';

    protected $fillable = [
        'title',
        'category_id',
        'content',
        'slug',
        'featured_image',
        'status',
        'author_name',
        'meta_title',
        'meta_description'
    ];

}