<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\AddPincode;
use Illuminate\Support\Str;


class AddPincodeController extends Controller{
    public function index()
    {
        $pincode = AddPincode::where('trans_status', 1)
        ->orderBy('id', 'desc')
        ->get();
        return view('admin.addpincode.index', compact('pincode'));
    }
    
    

    public function create(){
        return view('admin.addpincode.add');
    }

    public function store(Request $request){
        $request->validate([
            'pincode' => 'required',
            'days' => 'required',
            'location' => 'required',
        ]);
        $pincode = new AddPincode();
        $pincode->pincode = $request->pincode;
        $pincode->days = $request->days;
        $pincode->location = $request->location;
        $pincode->save();
        return redirect()->route('admin.addpincode')->with('success', 'Pincode Add successfully!');
       
    }

    public function edit($id){
        $pincode = AddPincode::find($id);
        return view('admin.addpincode.edit', compact('pincode'));
    }

    public function update(Request $request, $id){
        $request->validate([
            'pincode' => 'required',
            'days' => 'required',
            'location' => 'required',
        ]);
        $pincode = AddPincode::find($id);
        $pincode->pincode = $request->pincode;
        $pincode->days = $request->days;
        $pincode->location = $request->location;
        $pincode->save();
        return redirect()->route('admin.addpincode')->with('success', 'Pincode updated successfully!');
    }

    public function destroy($id)
    {
        $pincode = AddPincode::find($id);
        
        if ($pincode) {
            $pincode->trans_status = 0;  
            $pincode->save();           
        }
    
        return redirect()->route('admin.addpincode')->with('success', 'Pincode deleted successfully!');
    }
    
    public function changeStatus(Request $request)

    {
        // dd($request->all());
        $this->validate($request, [
            'id' => 'required',
        ]);

        $currentStatus = AddPincode::where('id', $request->id)->value('status');
        $newStatus = ($currentStatus == 1) ? 0 : 1;
    
        $data['status'] = $newStatus;
        $updateStatus = AddPincode::where('id', $request->id)->update($data);
        if ($updateStatus) {
            return 1000; 
        } else {
            return 2000;
        }
    }



   
    
    
}

?>