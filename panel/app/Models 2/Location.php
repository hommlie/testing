<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = [
        'id','name', 'coordinates','status'
    ];

    protected $table='locations';

    public function employees()
{
    return $this->hasMany(Employees::class);
}


}
