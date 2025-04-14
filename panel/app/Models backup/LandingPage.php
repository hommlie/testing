<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class LandingPage extends Model
{
    protected $table = 'landing_pages';  
    protected $fillable = [

        'title',
        'sub_title',
        'hero_image',
        'banner',
        'why_choose_title',
        'why_choose_subtitle',
        'why_choose_banner',
        'why_choose_content',
        'cat_id',
        'slug',
        'status',
        'alt_tag',
        'image_title',
        'meta_title',
        'meta_description',
    ];
}

?>