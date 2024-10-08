<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Timeslot extends Model
{
    protected $fillable = [
        'name','starttime','endtime', 'status'
    ];

    protected $table='timeslots';


}
