<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class Order extends Model
{
    // protected $fillable = [
    //     'user_id', 
    //     'product_name', 
    //     'landmark', 
    //     'street_address', 
    //     'pincode', 
    //     'order_number', 
    //     'order_status', 
    //     'desired_time', 
    //     'desired_date', 
    //     'assigned_to'
    // ];

    protected $guarded = [];


    

    public function orders()
{
    return $this->hasMany(Order::class);
}

}

