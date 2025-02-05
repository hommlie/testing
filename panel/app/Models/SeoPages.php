<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class SeoPages extends Model
{
    protected $table = 'seo_pages';  
    protected $fillable = [

        'title',
        'subcat_id',
        'sub_title',
        'banner',
        'description',
        'slug',
        'status',
        'alt_tag',
        'image_title',
        'meta_title',
        'meta_description',
    ];
}

?>