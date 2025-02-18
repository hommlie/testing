<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;


class BlogsController extends Controller{
    public function index()
    {
        return view('admin.blogs.index'); // , compact('appHeaderData')
    }

    public function create(){
        return view('admin.blogs.add');
    }
   
    
    
}

?>