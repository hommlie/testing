<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Permissions extends Model
{
    protected $fillable = [
        'name','label', 'guard_name'
    ];

    protected $table='permissions';


}
