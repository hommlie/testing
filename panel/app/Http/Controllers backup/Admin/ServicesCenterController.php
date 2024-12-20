<?php

namespace App\Http\Controllers;
use App\Models\ServicesCenter;
use Illuminate\Http\Request;

class ServicesCenterController extends Controller
{


    // Handle form submission
    public function Store(Request $request)
    {
        echo "NB";die;  
        // Validate the incoming data
        $validated = $request->validate([
            'region_name' => 'required|string',
            'branch_name' => 'required|string',
            'branch_code' => 'required|string|unique:services_center',
            'office_address' => 'required|string',
            'gstn' => 'nullable|string',
            'agri_licence' => 'nullable|string',
            'shop_establishment' => 'nullable|string',
            'contact_person_name' => 'required|string',
            'contact_number' => 'required|string',
            'email_id' => 'nullable|email',
        ]);

        
    }
}
