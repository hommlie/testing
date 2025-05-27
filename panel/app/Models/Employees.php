<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Order;
use App\Models\Location;
use App\Models\EmpVerifiedAttendance;


class Employees extends Model
{
    protected $fillable = [
        'emp_id', 'emp_name', 'emp_phone', 'emp_email', 'emp_address', 'emp_dob', 'emp_photo','skills', 'bank_name', 'bank_branch', 'bank_ifsc', 'bank_acc_no', 'name_as_per_bank', 'bank_book_image','upi', 'pan_no', 'pan_image', 'aadhar_no', 'aadhar_image','otp','role','location','timeslot','token', 'is_active', 'is_verified', 'status'
    ];

    protected $table='employees';

    public function employee()
{
    return $this->belongsTo(Employees::class);
}

public function orders()
{
    return $this->hasMany(Order::class, 'assigned_to');
}

public function location()
{
    return $this->belongsTo(Location::class, 'name');
}

public function verifiedAttendances()
{
    return $this->hasMany(EmpVerifiedAttendance::class, 'emp_id');
}





}
