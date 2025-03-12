<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Business_region extends Model
{


    protected $table = 'business_region';
    protected $fillable = [
        'zone',
        'state',
        'status',
    ];
}
?>