<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Models\Complaint;
use App\Http\Controllers\Controller;


class ComplaintController extends   Controller{
    public function index()
    {
        $complaint = Complaint::orderBy('created_at', 'desc')->get();
        return view('admin.complaint.index', compact('complaint'));
    }
    public function create()
    {
        return view('admin.complaint.add'); 
    }
    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'mobile' => 'required|numeric|digits:10',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);
    
        // Create a new Complaint instance and assign values
        $complaint = new Complaint();
        $complaint->first_name = $validated['first_name'];
        $complaint->last_name = $validated['last_name'];
        $complaint->mobile = $validated['mobile'];
        $complaint->email = $validated['email'];
        $complaint->subject = $validated['subject'];
        $complaint->message = $validated['message'];
    
        // Save the complaint to the database
        $complaint->save();
    
        // Redirect or return a response
        return redirect()->back()->with('success', 'Complaint submitted successfully.');
    }
    
}

?>