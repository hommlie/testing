<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Models\Complaint;
use App\Models\Order;
use App\Http\Controllers\Controller;

class ComplaintController extends Controller
{
    // COMPLAINTS
    public function index()
    {
        $complaint = Complaint::orderBy('created_at', 'desc')->get();
        return view('admin.complaint.index', compact('complaint'));
    }

    // COMPLAINTS CREATE
    public function create()
    {
        return view('admin.complaint.add');
    }




    // COMPLAINTS STORE
    public function store(Request $request)
    {

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'mobile' => 'required|numeric|digits:10',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
            'status' => 'required|in:pending,unsolved,solved',
        ]);

        $complaint = new Complaint();
        $complaint->first_name = $validated['first_name'];
        $complaint->last_name = $validated['last_name'];
        $complaint->mobile = $validated['mobile'];
        $complaint->email = $validated['email'];
        $complaint->subject = $validated['subject'];
        $complaint->message = $validated['message'];
        $complaint->c_status = $validated['status'];
        if (!empty($request->ID)) {
            $decodedArray = json_decode($request->ID[0], true);
            if (is_array($decodedArray)) {
                $complaint->order_id = implode(',', array_map('intval', $decodedArray));
            }
        }
        $complaint->save();
        return redirect()->back()->with('success', 'Complaint submitted successfully.');
    }

    
    public function edit($id)
    {
        $complaint = Complaint::findOrFail($id);
        $orderIds = explode(',', $complaint->order_id);
        $orders = Order::whereIn('id', $orderIds)->get();
        return view('admin.complaint.edit', compact('complaint', 'orders'));
    } 

    public function view($id)
    {
        $complaint = Complaint::findOrFail($id);
        $orderIds = explode(',', $complaint->order_id);
        $orders = Order::whereIn('id', $orderIds)->get();
        return view('admin.complaint.view', compact('complaint', 'orders'));
    } 


    
    public function update(Request $request, $id)
    {
        // Validate the request data
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'mobile' => 'required|digits:10',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
            'status' => 'required|in:pending,unsolved,solved',
        ]);

        // Find the complaint by ID
        $complaint = Complaint::findOrFail($id);

        // Update the complaint data
        $complaint->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'mobile' => $request->mobile,
            'email' => $request->email,
            'subject' => $request->subject,
            'message' => $request->message,
            'c_status' => $request->status,
        ]);
        return redirect()->route('admin.complaint')->with('success', 'Complaint updated successfully.');
    }


    // SERACH ORDER DATA USING ORDER-ID 
    public function getOrderData($orderID)
    {
        $orderData = Order::where('order_number', 'LIKE', "%$orderID%")
            ->orWhere('id', 'LIKE', "%$orderID%")
            ->orWhere('mobile', 'LIKE', "%$orderID%")
            ->get();
        return response()->json($orderData);
    }
    public function destroy(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);
        $delete = Complaint::where('id', $request->id)->delete();
        if ($delete) {
            return 1000;
        } else {
            return 2000;
        }
    }
}


?>