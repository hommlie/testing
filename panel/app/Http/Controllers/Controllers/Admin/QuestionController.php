<?php
namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Hash;
use Session;
use App\Models\User;
use App\Models\Employees;
use App\Http\Controllers\StorePermissionRequest;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Permissions;
use App\Models\Question;
use App\Models\Timeslot;
use Illuminate\Support\Facades\Storage;

use Illuminate\Support\Facades\Redirect;

class QuestionController extends Controller
{
    public function index()
    {
        abort_unless(\Gate::allows('question_access'), 403);
        
            $data = Question::orderBy('id', 'desc')->get();
            return view('admin.question.index',compact('data'));
        
    }

    public function addquestion()
    {
        
            $data = Category::orderBy('id', 'desc')->get();
            return view('admin.question.add',compact('data'));
        
    }

    public function storequestion(Request $request)
{
    // dd($request);
    $this->validate($request, [
        'label' => 'required',
        'type' => 'required',
    ]);

    $required = $request->has('required_field') ? 1 : 0;

    $dataval = [
        'label' => $request->label,
        'type' => $request->type,
        'options' => $request->options,
        'required' => $required,
    ];

    $data = Question::create($dataval);

    if ($data) {
        return redirect('admin/question')->with('success', trans('messages.success'));
    } else {
        return redirect()->back()->with('danger', trans('messages.fail'));
    }
}



    public function show($id)
    {
        $data=Question::findOrFail($id);
        return view('admin.question.show',compact('data'));
    }
    public function view($id)
    {
        $data=Permissions::findOrFail($id);
        return view('admin.permission.view',compact('data'));
    }

    public function update(Request $request, int $id){
         // dd($request);
        $this->validate($request, [
            'label' => 'required',
            'type' => 'required',
        ]);

        $required = $request->has('required_field') ? 1 : 0;

        $data = Question::findOrFail($id);
    
        $dataval = [
            'label' => $request->label,
            'type' => $request->type,
            'options' => $request->options,
            'required' => $required,
        ];
    
        $data->update($dataval);
    
        if ($data) {
            return redirect()->route('admin.question.show',$id)->with('success', 'Question Successfully Updated');
        } else {
            return redirect()->route('admin.question.show',$id)->with('danger', 'Failed to Update Question');
        }
    

    }

    public function delete(Request $request)
        {
            $id = $request->id;
            $timeslot = Question::findOrFail($id);
            $timeslot->status = 0;
            $timeslot->save();

            return response()->json(['success' => true]);
        }

    public function deactive(Request $request)
        {
            $id = $request->id;
            $timeslot = Question::findOrFail($id);
            $timeslot->status = 1;
            $timeslot->save();

            return response()->json(['success' => true]);
        }
    

}

