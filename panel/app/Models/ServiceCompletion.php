<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceCompletion extends Model
{
    // Use guarded instead of fillable
    protected $guarded = [];

    protected $table = 'service_completion';
}

