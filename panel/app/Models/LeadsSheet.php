<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadsSheet extends Model
{
   

    protected $table = 'leads_sheet';

    protected $fillable = [
        'customer_name',
        'phone_number',
        'email',
        'address_location',
        'lead_source',
        'lead_status',
        'date_of_first_contact',
        'last_contact_date',
        'next_follow_up_date',
        'product_service_interested_in',
        'lead_value',
        'bhk_sq_ft',
        'b2b_b2c',
        'priority_level',
        'disposition',
        'conversion_date',
        'remarks_notes',
    ];

}