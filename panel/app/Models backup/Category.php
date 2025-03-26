<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'category_name',
        'category_title',
        'icon',
        'web_icon',
        'alt_tag',
        'image_title',
        'video',
        'thumbnail',
        'slug',
        'status',
        'is_form',
        'meta_title',
        'meta_description',
        'motion_graphics',
        'location',
        'total_reviews',
        'avg_rating',
        'faqs',
        'specifications',
        'about',
        'banner',
    ];
}
