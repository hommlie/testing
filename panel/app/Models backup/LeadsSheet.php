<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadsSheet extends Model
{
   

    protected $table = 'leads_sheet';

   protected $fillable = [
        'category_id',
        'subcategory_id',
        'product_id',
        'attribute_id',
        'variations_id',
        'coupons',
        'source',
        'name',
        'email',
        'lead_type',
        'phone',
        'address',
        'follow_up_dt',
        'spoken_by',
        'lead_status',
        'attempt_date_1',
        'remark_1',
        'attempt_date_2',
        'remark_2',
        'attempt_date_3',
        'remark_3',
        'call_recording_link_1',
        'call_recording_link_2',
    ];


}