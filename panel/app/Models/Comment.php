<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $table = 'blogcategories';

    protected $fillable = [
        'content',
        'blog_id',
        'author_id',
        'parent_id',
        'status',
    ];

}