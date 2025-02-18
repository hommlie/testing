<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class BusinessRegistration extends Model
{
    protected $table = 'listing_forms';
    protected $fillable = [

        'businessName',
        'userName',
        'phoneNumber',
        'address',
        'city',
        'pincode',
        'area',
        'landmark',
        'state',
        'status',
        'subject',
        'message',
       
    ];
}

?>