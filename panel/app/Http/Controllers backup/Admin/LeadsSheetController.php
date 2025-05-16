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
            'customer_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'address_location' => 'required|string',
            'lead_source' => 'required|string|max:255',
            'lead_status' => 'required|string|max:100',
            'date_of_first_contact' => 'nullable|date',
            'last_contact_date' => 'nullable|date',
            'next_follow_up_date' => 'nullable|date',
            'product_service_interested_in' => 'nullable|string|max:255',
            'lead_value' => 'nullable|numeric',
            'bhk_sq_ft' => 'nullable|string|max:50',
            'b2b_b2c' => 'nullable|in:B2B,B2C',
            'priority_level' => 'required|string|max:255',
            'disposition' => 'nullable|string|max:100',
            'conversion_date' => 'nullable|date',
            'remarks_notes' => 'nullable|string',
        ]);

        // INSERT DATA INTO THE DATABASE
        LeadsSheet::create([
            'customer_name' => $request->customer_name,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
            'address_location' => $request->address_location,
            'lead_source' => $request->lead_source,
            'lead_status' => $request->lead_status,
            'date_of_first_contact' => $request->date_of_first_contact,
            'last_contact_date' => $request->last_contact_date,
            'next_follow_up_date' => $request->next_follow_up_date,
            'product_service_interested_in' => $request->product_service_interested_in,
            'lead_value' => $request->lead_value,
            'bhk_sq_ft' => $request->bhk_sq_ft,
            'b2b_b2c' => $request->b2b_b2c,
            'priority_level' => $request->priority_level,
            'disposition' => $request->disposition,
            'conversion_date' => $request->conversion_date,
            'remarks_notes' => $request->remarks_notes,
        ]);

        // REDIRECT TO INDEX PAGE
        return redirect()->route('admin.leadssheet')->with('success', 'Lead added successfully.');
    }


    public function edit($id)
    {
        $lead = LeadsSheet::findOrFail($id);
        return view('admin.leadssheet.edit', compact('lead'));
    }


    public function update(Request $request, $id)
    {
        // VALIDATION
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'address_location' => 'required|string',
            'lead_source' => 'required|string|max:255',
            'lead_status' => 'required|string|max:100',
            'date_of_first_contact' => 'nullable|date',
            'last_contact_date' => 'nullable|date',
            'next_follow_up_date' => 'nullable|date',
            'product_service_interested_in' => 'nullable|string|max:255',
            'lead_value' => 'nullable|numeric',
            'bhk_sq_ft' => 'nullable|string|max:50',
            'b2b_b2c' => 'nullable|in:B2B,B2C',
            'priority_level' => 'required|string|max:255',
            'disposition' => 'nullable|string|max:100',
            'conversion_date' => 'nullable|date',
            'remarks_notes' => 'nullable|string',
        ]);

        // FIND LEAD BY ID
        $lead = LeadsSheet::findOrFail($id);

        // UPDATE LEAD DATA
        $lead->update([
            'customer_name' => $request->customer_name,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
            'address_location' => $request->address_location,
            'lead_source' => $request->lead_source,
            'lead_status' => $request->lead_status,
            'date_of_first_contact' => $request->date_of_first_contact,
            'last_contact_date' => $request->last_contact_date,
            'next_follow_up_date' => $request->next_follow_up_date,
            'product_service_interested_in' => $request->product_service_interested_in,
            'lead_value' => $request->lead_value,
            'bhk_sq_ft' => $request->bhk_sq_ft,
            'b2b_b2c' => $request->b2b_b2c,
            'priority_level' => $request->priority_level,
            'disposition' => $request->disposition,
            'conversion_date' => $request->conversion_date,
            'remarks_notes' => $request->remarks_notes,
        ]);

        // REDIRECT BACK WITH SUCCESS MESSAGE
        return redirect()->route('admin.leadssheet')->with('success', 'Lead updated successfully.');
    }


    public function destroy(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);
        $data = LeadsSheet::where('id', $request->id)->delete();
        if ($data) {
            return 1000;
        } else {
            return 2000;
        }
    }


}



?>