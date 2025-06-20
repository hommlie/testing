<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    protected $fillable = [
        'image','link','alt_tag','image_title', 'type', 'cat_id', 'product_id','vendor_id','positions','status'
    ];

    public function category(){
        return $this->hasOne('App\Models\Category','id','cat_id');
    }
    public function product(){
        return $this->hasOne('App\Models\Products','id','product_id');
    }
}
