<?php

namespace App\Http\Controllers\Admin;

use App\Questions;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuestionRequest;
use App\Http\Requests\UpdateQuestionRequest;
use App\Http\Requests\MassDestroyQuestionRequest;

class QuestionsController extends Controller
{
    public function index()
    {
        abort_unless(\Gate::allows('question_access'), 403);

        $questions = Questions::all();

        return view('admin.questions.index', compact('questions'));
    }

    public function create()
    {
        abort_unless(\Gate::allows('question_create'), 403);

        return view('admin.questions.create');
    }

    public function store(StoreQuestionRequest $request)
    {
        abort_unless(\Gate::allows('question_create'), 403);

        $question = Questions::create($request->all());

        return redirect()->route('admin.questions.index');
    }

    public function edit(Questions $question)
    {
        abort_unless(\Gate::allows('question_edit'), 403);

        return view('admin.questions.edit', compact('question'));
    }

    public function update(UpdateQuestionRequest $request, Questions $question)
    {
        abort_unless(\Gate::allows('question_edit'), 403);

        $question->update($request->all());

        return redirect()->route('admin.questions.index');
    }

    public function show(Questions $question)
    {
        abort_unless(\Gate::allows('question_show'), 403);

        return view('admin.questions.show', compact('question'));
    }

    public function destroy(Questions $question)
    {
        abort_unless(\Gate::allows('question_delete'), 403);

        $question->delete();

        return back();
    }

    public function massDestroy(MassDestroyQuestionRequest $request)
    {
        Questions::whereIn('id', request('ids'))->delete();

        return response(null, 204);
    }
}
