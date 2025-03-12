<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customers extends Model
{


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email','mobile','password','profile_pic','login_type','referral_code','referral_amount','firebase','wallet','token','type','otp','server_key','is_available','is_verified','facebook','instagram','google','youtube','twitter','google_id','store_address','facebook_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */

     protected $table = "customers";
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function rattings(){
        return $this->hasOne('App\Models\Ratting','vendor_id','id')->select('vendor_id',\DB::raw('ROUND(AVG(ratting),1) as avg_ratting'));
    }
}
