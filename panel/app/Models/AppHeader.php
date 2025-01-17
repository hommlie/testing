<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class AppHeader extends Model
{
    protected $table = 'app_header';
    protected $fillable = [

        'bg_color',
        'text_color',
        'image',
        'sub_text_color',  
        'status',
    ];
}

?>