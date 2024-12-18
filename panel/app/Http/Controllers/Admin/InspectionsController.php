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
    public function create()
    {
        return view('admin.inspections.add'); 
    }

    public function store(Request $request)
    {
        $request->validate([
            'fullName' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'mobile' => 'required|digits:10',
            'email' => 'required|email|max:255',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
        ]);
   
        $inspection = new Inspections(); 
        $inspection->fullName = $request->input('fullName');
        $inspection->address = $request->input('address');
        $inspection->mobile = $request->input('mobile');
        $inspection->email = $request->input('email');
        $inspection->date = $request->input('date');
        $inspection->time = $request->input('time');
        $inspection->save();
    
        return redirect()->back()->with('success', 'Complaint submitted successfully.');
    }
    
}

?>