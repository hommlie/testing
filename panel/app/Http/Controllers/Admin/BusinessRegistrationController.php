<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Models\BusinessRegistration;
use App\Http\Controllers\Controller;

class BusinessRegistrationController extends Controller
{
    public function index()
    {
        $Data = BusinessRegistration::orderBy('id', 'desc')->get();
        return view('admin.businessregistration.index', compact('Data')); 
    }

    public function create()
    {
        return view('admin.businessregistration.add');
    }

   




    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'mobile' => 'required|numeric|digits:10',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $complaint = new Complaint();
        $complaint->first_name = $validated['first_name'];
        $complaint->last_name = $validated['last_name'];
        $complaint->mobile = $validated['mobile'];
        $complaint->email = $validated['email'];
        $complaint->subject = $validated['subject'];
        $complaint->message = $validated['message'];


            $complaint->save();
            return redirect()->back()->with('success', 'Complaint submitted successfully.');
    }
}


?>