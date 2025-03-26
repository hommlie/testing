<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Complaint extends Model
{
    protected $table = 'helps';
    protected $fillable = [

        'first_name',
        'last_name',
        'mobile',
        'email',
        'subject',
        'message',
        'order_id',
        'c_status'
       
    ];
}

?>