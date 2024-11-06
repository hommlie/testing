<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Models\Customers;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        abort_unless(\Gate::allows('customer_access'), 403);

        $data=Customers::where('type','2')->orderBy('id', 'DESC')->get();
        return view('admin.customers.index',compact('data'));
    }

    public function bulkupload()
    {

        abort_unless(\Gate::allows('customer_bulk_upload_access'), 403);
        return view('admin.customers.bulkupload');
    }


    public function store_bulkupload(Request $request)
    {
        // Validate the uploaded file
        $request->validate([
            'bulk_file' => 'required|file|mimes:csv'
        ]);
    
        // Store the file and get its absolute path
        $file = $request->file('bulk_file');
        $filePath = $file->storeAs('uploads', $file->getClientOriginalName(), 'public');
        $absoluteFilePath = storage_path('app/public/uploads/' . $file->getClientOriginalName());
    
        // Parse the CSV file into an array
        $data = array_map('str_getcsv', file($absoluteFilePath));
    
        if (empty($data)) {
            return redirect()->back()->withErrors(['error' => 'The file is empty or invalid.']);
        }
    
        // Extract the header row
        $header = array_map('trim', array_shift($data)); // Trimming extra spaces from the header
    
        // Define the required columns
        $requiredColumns = [
            'id', 'name', 'email', 'mobile', 'password', 'profile_pic', 'store_address', 'status',
            'notification_status', 'type', 'google_id', 'facebook_id', 'login_type', 'referral_code', 
            'referred_id', 'referral_amount', 'wallet', 'token', 'otp', 'is_verified', 'is_available', 
            'return_policies', 'facebook', 'instagram', 'twitter', 'google', 'youtube', 'remember_token', 
            'created_at', 'updated_at'
        ];
    
        // Check if required columns are missing
        $missingColumns = array_diff($requiredColumns, $header);
        if (!empty($missingColumns)) {
            return redirect()->back()->withErrors(['error' => 'Missing required columns: ' . implode(', ', $missingColumns)]);
        }
    
        // Check for extra columns
        $extraColumns = array_diff($header, $requiredColumns);
        if (!empty($extraColumns)) {
            return redirect()->back()->withErrors(['error' => 'The CSV file contains extra columns: ' . implode(', ', $extraColumns)]);
        }
    
        // Process each row in the CSV file
        $errors = [];
        foreach ($data as $index => $row) {
            $customerData = array_combine($header, $row); // Combine header and row into an associative array
    
            // Handle mobile number
            if (isset($customerData['mobile'])) {
                // Check if mobile number is in scientific notation and correct it
                if (preg_match('/^\d+\.?\d*E[\+\-]?\d+$/i', $customerData['mobile'])) {
                    $customerData['mobile'] = number_format($customerData['mobile'], 0, '', '');
                } else {
                    $customerData['mobile'] = (string) $customerData['mobile'];
                }
    
                // Check if the mobile number already exists in the database
                $duplicateMobile = Customers::where('mobile', $customerData['mobile'])->first();
                if ($duplicateMobile) {
                    // If a duplicate is found, log the error and skip to the next record
                    $errors[] = 'Duplicate entry for Mobile number at row ' . ($index + 2) . ': ' . $customerData['mobile'];
                    continue; // Skip this record and move to the next
                }
            }
    
            try {
                $customer = new Customers($customerData); // Create a new Customer model instance
                $customer->save(); // Save the customer to the database
            } catch (\PDOException $e) {
                // If the error is a duplicate entry, handle it gracefully
                if ($e->getCode() == 23000) { // 23000 is the SQLSTATE code for integrity constraint violation
                    $errors[] = 'Duplicate entry for Mobile number at row ' . ($index + 2) . ': ' . $customerData['mobile'];
                } else {
                    // For any other SQL exception, log the error and show a generic message
                    $errors[] = 'Failed to store customer at row ' . ($index + 2) . ': ' . $e->getMessage();
                }
            } catch (\Exception $e) {
                // Handle general exceptions
                $errors[] = 'Failed to store customer at row ' . ($index + 2) . ': ' . $e->getMessage();
            }
        }
    
        // If there are no errors, redirect to the success page
        if (empty($errors)) {
            return redirect('admin/customers')->with('success', 'Customers bulk uploaded successfully!');
        }
    
        // If there are errors, pass them to the view
        return redirect()->back()->withErrors($errors)->with('bulk_errors', $errors);
    }
    
    

    public function changeStatus(Request $request)
    {
        $this->validate($request,[
            'id' => 'required',
            'status' => 'required',
        ]);

        $data['is_available']=$request->status;
        User::where('id',$request->id)->update($data);
        if ($data) {
            return 1000;
        } else {
            return 2000;
        }      
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $data=Customers::where('name', 'LIKE', '%' . $request->search . '%')->where('type','2')->orderBy('id', 'DESC');
        return view('admin.customers.index',compact('data'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function view(Request $request)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        abort_unless(\Gate::allows('user_edit'), 403);

        $user->update($request->all());
        $user->roles()->sync($request->input('roles', []));

        return redirect()->route('admin.users.index');
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        
    }
}
