<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use App\Models\Subcategory;
use App\Models\Category;
use App\Models\Products;
use App\Models\Innersubcategory;
use App\Models\Question;

class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        abort_unless(\Gate::allows('subcategory_access'), 403);

        $data = Subcategory::with('category')->orderBy('id', 'DESC')->paginate(10);
    
        // Decode questions and fetch question details
        foreach ($data as $subcategory) {
            $questions = json_decode($subcategory->question, true);
            $subcategory->onsiteQuestions = $this->getQuestionDetails($questions, 'Onsite');
            $subcategory->completedQuestions = $this->getQuestionDetails($questions, 'OnCompleted');
        }
    
        return view('admin.subcategory.index', compact('data'));
    }
    
    private function getQuestionDetails($questions, $title)
    {
        if (!is_array($questions)) {
            return [];
        }
    
        foreach ($questions as $questionSet) {
            if ($questionSet['title'] == $title) {
                $questionIds = explode(',', $questionSet['question']);
                return Question::whereIn('id', $questionIds)->get();
            }
        }
    
        return [];
    }
    
    public function add()
    {
    	$data=Category::select('id','category_name')->get();
        return view('admin.subcategory.add',compact('data'));
    }

    public function list()
    {
        $data = Subcategory::all();
        return view('admin.subcategory.subcategorytable',compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $data=Subcategory::where('subcategory_name', 'LIKE', '%' . $request->search . '%')->orderBy('id', 'DESC')->paginate(10);
        return view('admin.subcategory.index',compact('data'));

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'subcategory_name' => 'required',
            'cat_id' => 'required',
            'icon' => 'required|mimes:png,jpg,jpeg',
            'thumbnail' => 'nullable',
            'video' => 'nullable',
        ]);
    
        // Generate unique file name and move the file
        $icon = 'sub_category-' . uniqid() . '.' . $request->icon->getClientOriginalExtension();
        $request->icon->move('storage/app/public/images/subcategory', $icon);
    
        // Generate unique file name and move the file
        if($request->hasFile('thumbnail')){
            $thumbnail = 'sub_category-' . uniqid() . '.' . $request->thumbnail->getClientOriginalExtension();
            $request->thumbnail->move('storage/app/public/images/subcategory', $thumbnail);
        }else{
            $thumbnail = "NA";
        }
    
        // Generate unique file name and move the file
        if($request->hasFile('video')){
            $video = 'sub_category-' . uniqid() . '.' . $request->video->getClientOriginalExtension();
            $request->video->move('storage/app/public/images/subcategory', $video);
        }else{
            $video ="NA";
        }
    
        // Check if a subcategory with the same slug already exists
        $checkslug = Subcategory::where('slug', \Str::slug($request->subcategory_name))->first();
    
        if (@$checkslug->slug) {
            // If slug exists, create a new slug combining category slug and subcategory name
            $cat_slug = Category::select('slug')->where('id', $request->cat_id)->first();
            $dataval = [
                'cat_id' => $request->cat_id,
                'icon' => $icon, // Ensure icon is included here
                'thumbnail' => $thumbnail, // Ensure icon is included here
                'video' => $video, // Ensure icon is included here
                'subcategory_name' => $request->subcategory_name,
                'slug' => \Str::slug($cat_slug->slug . '-' . $request->subcategory_name),
            ];
        } else {
            // Default case where the slug does not exist
            $dataval = [
                'cat_id' => $request->cat_id,
                'subcategory_name' => $request->subcategory_name,
                'slug' => \Str::slug($request->subcategory_name),
                'icon' => $icon, // Ensure icon is included here as well
                'thumbnail' => $thumbnail, // Ensure icon is included here as well
                'video' => $video, // Ensure icon is included here as well
            ];
        }
    
        // Create the new subcategory record
        $data = Subcategory::create($dataval);
        if ($data) {
            return redirect('admin/subcategory')->with('success', trans('messages.success'));
        } else {
            return redirect()->back()->with('danger', trans('messages.fail'));
        }
    }
    

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data=Subcategory::find($id);
        $category = Category::select('id','category_name')->get();
        return view('admin.subcategory.show',compact('data','category'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $this->validate($request, [
            'subcategory_name' => 'required',
            'cat_id' => 'required',
            'icon' => 'mimes:jpeg,png,jpg',
        ]);
    
        $icon = $request->old_img; 
    
        if (isset($request->icon)) {
            File::delete('storage/app/public/images/subcategory/' . $request->old_img);
    
            if ($request->hasFile('icon')) {
                $iconFile = $request->file('icon');
                $icon = 'subcategory-' . uniqid() . '.' . $iconFile->getClientOriginalExtension();
                $iconFile->move('storage/app/public/images/subcategory', $icon);
            }
        }
    
        $checkslug = Subcategory::where('slug', \Str::slug($request->subcategory_name))->first();
    
        if (@$checkslug->slug) {
            $cat_slug = Category::select('slug')->where('id', $request->cat_id)->first();
            $data = [
                'cat_id' => $request->cat_id,
                'icon' => $icon,
                'subcategory_name' => $request->subcategory_name,
                'slug' => \Str::slug($cat_slug->slug . '-' . $request->subcategory_name),
            ];
        } else {
            $data = [
                'cat_id' => $request->cat_id,
                'subcategory_name' => $request->subcategory_name,
                'slug' => \Str::slug($request->subcategory_name),
                'icon' => $icon, 
            ];
        }
    
        $subcategory = Subcategory::find($request->subcat_id)->update($data);
    
        if ($subcategory) {
            return redirect('admin/subcategory')->with('success', trans('messages.update'));
        } else {
            return redirect()->back()->with('danger', trans('messages.fail'));
        }
    }
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $this->validate($request,[
            'id' => 'required',
        ]);
        $data=Subcategory::where('id',$request->id)->delete();
        Products::where('subcat_id',$request->id)->delete();
        Innersubcategory::where('subcat_id',$request->id)->delete();
        if($data) {
            return 1000;
        } else {
            return 2000;
        }
    }
    
    public function changeStatus(Request $request)
    {
        $this->validate($request,[
            'id' => 'required',
            'status' => 'required',
        ]);

        $data['status']=$request->status;
        Subcategory::where('id',$request->id)->update($data);
        if ($data) {
            return 1000;
        } else {
            return 2000;
        }      
    }

    // Get Questions 

    public function getQuestions() {

        $questions = Question::orderBy('id','desc')->get();
    
        return response()->json([
            'status' => 200,
            'questions' => $questions,
        ]);
    
    }


    public function submitQuestions(Request $request, $id)
{
    $this->validate($request, [
        'question' => 'required',
    ]);

    $record = Subcategory::find($id);


    if (!$record) {
        return response()->json([
            'status' => 404,
            'message' => 'Record not found',
        ], 404);
    }

    $record->question = $request->input('question');
    $record->save();

    // Return a success response
    return response()->json([
        'status' => 200,
        'message' => 'Question updated successfully',
        'question' => $record,
    ]);
    }

}
