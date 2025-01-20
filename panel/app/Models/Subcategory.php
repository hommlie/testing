<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    protected $fillable = [
        'cat_id', 'subcategory_name','status','slug','video','thumbnail','icon','alt_tag','image_title','meta_title','meta_description','subcategory_title','subcategory_sub_title','sub_cat_banner','location'
    ];

    public function category(){
        return $this->hasOne('App\Models\Category','id','cat_id');
    }
    
}
