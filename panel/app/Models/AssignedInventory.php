<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssignedInventory extends Model
{
    protected $fillable = [
        'empId','empName','category','subCategory', 'quantity', 'type','price', 'status'
    ];

    protected $table='AssignedInventory';


}
