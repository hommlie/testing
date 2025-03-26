<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Models\Blogs;
use App\Models\BlogsCategory;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
class BlogsController extends Controller{

    // INDEX FUNATION(index.blade.php)
    public function index()
    {
        $blogs = Blogs::all(); 
        $blogCategory = BlogsCategory::all(); 
        return view('admin.blogs.index', compact('blogs','blogCategory')); // 
    }

    // CREATE FUNCTION(add.blade.php)
    public function create(){
        $blogCategory = BlogsCategory::all(); 
        return view('admin.blogs.add',compact('blogCategory'));
    }

    // EDIT FUNCTION (edit.blade.php)
    public function edit($id)
    {
        $blog = Blogs::findOrFail($id);
        $blogCategory = BlogsCategory::pluck('title', 'id');
        return view('admin.blogs.edit', compact('blog', 'blogCategory'));
    }

    // STORE FUNCTION 
    public function store(Request $request)
    {
        // VALIDATION
        $request->validate([
            'title'            => 'required|string|max:255',
            'category_id'      => 'required',
            'slug'             => 'required|unique:blogs,slug|string|max:255',
            'featured_image'   => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status'           => 'required|in:draft,published',
            'author_name'      => 'required|string|max:255',
            'meta_title'       => 'nullable|string|max:255',
            'content'          => 'required|string',
            'meta_description' => 'nullable|string|max:500',
        ]);

        //  HANDLE IMAGES UPLOAD 
        if ($request->hasFile('featured_image')) {
            $featuredImage = $request->file('featured_image');
            $featuredImageFileName = 'featured_image' . Str::uuid() . '.' . $featuredImage->getClientOriginalExtension();
            $featuredImage->move(public_path('/storage/app/public/images/blogs/'), $featuredImageFileName);
            $imagePath = $featuredImageFileName;
        }
        // INSERT DATA INTO TO DATABASE
        Blogs::create([
            'title'            => $request->title,
            'category_id'      => $request->category_id,
            'slug'             => $request->slug,
            'featured_image'   => $imagePath,
            'status'           => $request->status,
            'author_name'      => $request->author_name,
            'meta_title'       => $request->meta_title,
            'content'          => $request->content,
            'meta_description' => $request->meta_description,
        ]);
        // REDIRECT IN INDEX PAGE 
        return redirect()->route('admin.blogs')->with('success', 'Blog added successfully.');
    }

    
    public function update(Request $request, $id)
    {
        $blog = Blogs::findOrFail($id);
    
        // Validate the request
        $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|integer',
            'content' => 'nullable|string',
            'slug' => 'required|string|max:255',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'status' => 'required|in:draft,published',
            'author_name' => 'nullable|string|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
        ]);
    
        if ($request->hasFile('featured_image')) {
            $featuredImage = $request->file('featured_image');
            $featuredImageFileName = 'featured_image_' . Str::uuid() . '.' . $featuredImage->getClientOriginalExtension();
            $featuredImage->move(public_path('/storage/app/public/images/blogs/'), $featuredImageFileName);
    
            if ($blog->featured_image && file_exists(public_path('/storage/app/public/images/blogs/' . $blog->featured_image))) {
                unlink(public_path('/storage/app/public/images/blogs/' . $blog->featured_image));
            }
            $blog->featured_image = $featuredImageFileName;
        }
    
        $blog->update([
            'title' => $request->title,
            'category_id' => $request->category_id,
            'content' => $request->content,
            'slug' => $request->slug,
            'status' => $request->status,
            'author_name' => $request->author_name,
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
        ]);
    
        return redirect()->route('admin.blogs')->with('success', 'Blog updated successfully!');
    }
    
    public function destroy(Request $request)
    {
        $this->validate($request,[
            'id' => 'required',
        ]);
        
        $data=Blogs::where('id',$request->id)->delete();
        if($data) {
            return 1000;
        } else {
            return 2000;
        }
    }



    // ======================================== BLOGS CATEGORY SECTION ===================================================
    public function blogCategoryIndex(){
        $blogCategory = BlogsCategory::all();
        return view('admin.blogs.blogcategoryindex', compact( 'blogCategory'));
    }

    public function blogCategoryCreate(){
        return view('admin.blogs.blogcategoryadd');
    }

    public function blogCategoryEdit($id){
        $blogCategory = BlogsCategory::findOrFail($id);
        return view('admin.blogs.blogcategoryedit', compact( 'blogCategory'));
    }

    public function blogCategoryStore(Request $request){
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);
    
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageFileName = 'blodCategoryImage' . Str::uuid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('/storage/app/public/images/blogs/'), $imageFileName);
        }
    
        BlogsCategory::create([
            'title' => $request->title,
            'image'=> $imageFileName
        ]);
    
        return redirect()->route('admin.blogs.blogcategoryindex')->with('success', 'Blog updated successfully!');
    }


    public function blogCategoryUpdate(Request $request, $id){
        $blog = BlogsCategory::findOrFail($id);
    
        // Validate the request
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);
    
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageFileName = 'blodCategoryImage' . Str::uuid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('/storage/app/public/images/blogs/'), $imageFileName);
    
            if ($blog->featured_image && file_exists(public_path('/storage/app/public/images/blogs/' . $blog->image))) {
                unlink(public_path('/storage/app/public/images/blogs/' . $blog->image));
            }
            $blog->image = $imageFileName;
        }
    
        $blog->update([
            'title' => $request->title,
        ]);
    
        return redirect()->route('admin.blogs.blogcategoryindex')->with('success', 'Blog updated successfully!');
    }


    public function blogCategoryDestroy(Request $request){
        $this->validate($request,[
            'id' => 'required',
        ]);
        $data=BlogsCategory::where('id',$request->id)->delete();
        if($data) {
            return 1000;
        } else {
            return 2000;
        }
    }
    
}

?>