<?php

namespace App\Http\Requests;

use App\Product;
use Illuminate\Foundation\Http\FormRequest;

class UpdateQuestionRequest extends FormRequest
{
    public function authorize()
    {
        return \Gate::allows('question_edit');
    }

    public function rules()
    {
        return [
            'label' => 'required',
            'type' => 'required',
        ];
    }
}
