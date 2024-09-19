<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    protected $fillable = [
        'category','subCategory', 'quantity', 'type','price','total','vendor', 'status'
    ];

    protected $table='inventory';


}
