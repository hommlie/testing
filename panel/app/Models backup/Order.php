<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Variation;
use App\Models\Attribute;
use App\Models\ServicesCenter;
use App\Models\Business_region;


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

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function variationDetails()
    {
        return $this->belongsTo(Variation::class, 'variation');
    }

    public function attributeDetails()
    {
        return $this->belongsTo(Attribute::class, 'attribute');
    }


    public function businessRegion()
    {
        return $this->belongsTo(Business_region::class, 'business_region', 'id');
    }



    public function serviceCenter()
    {
        return $this->belongsTo(ServicesCenter::class, 'business_sub_region', 'id');
    }


}

