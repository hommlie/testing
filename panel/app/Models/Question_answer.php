<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question_answer extends Model
{
    protected $fillable = [
        'order_id','stage', 'answers','emp_id'
    ];

    protected $table='question_answers';


}
