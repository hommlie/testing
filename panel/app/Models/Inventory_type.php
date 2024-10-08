<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventory_type extends Model
{
    protected $fillable = [
        'name','shortcut'
    ];

    protected $table='inventory_quantity_type';


}
