<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class AddPincode extends Model
{
    protected $table = 'add_pincode';  
    protected $fillable = [

        'pincode',
        'days',
        'location',
        'status',
        'trans_status',
    ];
}

?>