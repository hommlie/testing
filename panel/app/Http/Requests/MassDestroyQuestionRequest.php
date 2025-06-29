<?php

namespace App\Http\Requests;

use App\Questions;
use Gate;
use Illuminate\Foundation\Http\FormRequest;

class MassDestroyQuestionRequest extends FormRequest
{
    public function authorize()
    {
        return abort_if(Gate::denies('question_delete'), 403, '403 Forbidden') ?? true;
    }

    public function rules()
    {
        return [
            'ids'   => 'required|array',
            'ids.*' => 'exists:questions,id',
        ];
    }
}
