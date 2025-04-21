<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadsSheet extends Model
{
   

    protected $table = 'leads_sheet';

    protected $fillable = [
        'form_name',
        'platform',
        'pest_problem',
        'name',
        'address',
        'phone_number',
        'email',
        'lead_status',
        'remarks'
    ];

}