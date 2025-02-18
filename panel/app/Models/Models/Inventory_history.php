<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventory_history extends Model
{
    protected $fillable = [
        'action','category','subCategory', 'quantity', 'type', 'status'
    ];

    protected $table='inventory_history';


}
