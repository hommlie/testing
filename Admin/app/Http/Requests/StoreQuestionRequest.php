<?php

namespace App\Http\Requests;

use App\Product;
use Illuminate\Foundation\Http\FormRequest;

class StoreQuestionRequest extends FormRequest
{
    public function authorize()
    {
        return \Gate::allows('question_create');
    }

    public function rules()
    {
        return [
            'label' => 'required',
            'type' => 'required',
        ];
    }
}
