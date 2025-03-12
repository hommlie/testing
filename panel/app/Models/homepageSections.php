<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class homepageSections extends Model
{
    protected $table = 'homepage_sections';  
    protected $fillable = [

        'title',
        'sub_title',
        'image',
        'type',
        'btn_text',
        'btn_link',
        'status',
        'alt_tag',
        'image_title',
    ];
}

?>