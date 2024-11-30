<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Models\Inspections;
use App\Http\Controllers\Controller;


class InspectionsController extends  Controller{
    public function index()
    {
        $inspections = Inspections::orderBy('created_at', 'desc')->get();
        return view('admin.inspections.index', compact('inspections'));
    }
}

?>