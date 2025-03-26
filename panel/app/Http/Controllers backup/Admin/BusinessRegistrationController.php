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


    public function edit($id)
    {
        $data = BusinessRegistration::find($id);

        if (!$data) {
            return redirect()->back()->with('error', 'Complaint not found.');
        }

        return view('admin.businessregistration.edit', compact('data'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'businessName' => 'required|string|max:255',
            'userName' => 'required|string|max:255',
            'phoneNumber' => 'required|string|max:15',
            'address' => 'required|string',
            'city' => 'required|string|max:100',
            'pincode' => 'required|string|max:10',
            'area' => 'required|string|max:255',
            'landmark' => 'required|string|max:255',
            'state' => 'required|string|max:100',
            'status' => 'nullable|string|in:active,pending,rejected'
        ]);

        $data = BusinessRegistration::find($id);
        if (!$data) {
            return redirect()->back()->with('error', 'Business not found.');
        }
        $data->update($request->all());

        return redirect()->route('admin.businessregistration')->with('success', 'Business updated successfully.');
    }


    
    public function destroy(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);
        $delete = BusinessRegistration::where('id', $request->id)->delete();
        if ($delete) {
            return 1000;
        } else {
            return 2000;
        }
    }


}


?>