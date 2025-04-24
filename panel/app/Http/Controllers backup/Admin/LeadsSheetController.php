<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Models\LeadsSheet;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

class LeadsSheetController extends Controller
{

    public function index()
    {
        $datas = LeadsSheet::all();
        return view('admin.leadssheet.index', compact('datas'));
    }


    public function create()
    {
        return view('admin.leadssheet.add');
    }

    public function store(Request $request)
    {
        // VALIDATION
        $request->validate([
            'form_name' => 'required|string|max:255',
            'platform' => 'required|string|max:255',
            'pest_problem' => 'required',
            'name' => 'required|string|max:255',
            'address' => 'required',
            'phone_number' => 'required',
            'email' => 'nullable',
            'lead_status' => 'required',
            'remarks ' => 'nullable',
        ]);


        // INSERT DATA INTO TO DATABASE
        LeadsSheet::create([
            'form_name' => $request->form_name,
            'platform' => $request->platform,
            'pest_problem' => $request->pest_problem,
            'name' => $request->name,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
            'lead_status' => $request->lead_status,
            'remarks' => $request->remarks,
        ]);
        // REDIRECT IN INDEX PAGE 
        return redirect()->route('admin.leadssheet')->with('success', 'Lead added successfully.');
    }


    public function edit($id)
    {
        $datas = LeadsSheet::findOrFail($id);
        return view('admin.leadssheet.edit', compact('datas'));
    }


    public function update(Request $request, $id)
    {
       
        // VALIDATION
        $request->validate([
            'form_name' => 'required|string|max:255',
            'platform' => 'required|string|max:255',
            'pest_problem' => 'required',
            'name' => 'required|string|max:255',
            'address' => 'required',
            'phone_number' => 'required',
            'email' => 'nullable',
            'lead_status' => 'required',
            'remarks' => 'nullable',
        ]);

        // FIND LEAD BY ID
        $lead = LeadsSheet::findOrFail($id);

        // UPDATE LEAD DATA
        $lead->update([
            'form_name' => $request->form_name,
            'platform' => $request->platform,
            'pest_problem' => $request->pest_problem,
            'name' => $request->name,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
            'lead_status' => $request->lead_status,
            'remarks' => $request->remarks,
        ]);

        // REDIRECT BACK WITH SUCCESS MESSAGE
        return redirect()->route('admin.leadssheet')->with('success', 'Lead updated successfully.');
    }


    public function destroy(Request $request){
        $this->validate($request,[
            'id' => 'required',
        ]);
        $data=LeadsSheet::where('id',$request->id)->delete();
        if($data) {
            return 1000;
        } else {
            return 2000;
        }
    }


}



?>