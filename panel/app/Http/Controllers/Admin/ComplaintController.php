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
}

?>