<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TermsConditions extends Model
{
    protected $fillable = [
        'terms_conditions',
        'invoice_terms_conditions',
        'invoice_do_dont'
    ];
}
