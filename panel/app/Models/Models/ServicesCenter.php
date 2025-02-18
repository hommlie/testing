<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class ServicesCenter extends Model
{


    protected $table = 'services_center';
    protected $fillable = [
        'region_id',
        'branch_name',
        'branch_code',
        'office_address',
        'gstn',
        'agri_licence',
        'shop_establishment',
        'contact_person_name',
        'contact_number',
        'email_id',
    ];
}
?>