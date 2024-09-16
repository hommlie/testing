<?php
namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Hash;
use Session;
use App\Models\User;
use App\Models\Timeslot;
use App\Models\Employees;
use App\Models\Quotation;
use App\Models\Permissions;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\PO_vendors;
use App\Models\PurchaseOrder;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class PurchaseOrderController extends Controller
{
    public function index()
    {
        abort_unless(\Gate::allows('purchaseorder_access'), 403);
        
            $data = PurchaseOrder::join('po_vendors', 'purchaseorder.vendor', '=', 'po_vendors.id')
                                 ->select('purchaseorder.*', 'po_vendors.name as vendor_name')
                                 ->orderBy('purchaseorder.id', 'desc')
                                 ->get();
    
            return view('admin.purchaseorder.index', compact('data'));
        
    }
    

    public function vendor()
    {
        
            $data = PO_vendors::orderBy('id', 'desc')->get();
            return view('admin.purchaseorder.vendor',compact('data'));
        
    }

    public function addpurchaseorder()
    {
        
            $vendors = PO_vendors::orderBy('id', 'desc')->get();
            return view('admin.purchaseorder.add',compact('vendors'));
        
    }

    public function addvendor()
    {
        
            return view('admin.purchaseorder.addvendor');
        
    }


    public function storepurchaseorder(Request $request)
    {
        $this->validate($request, [
            'vendor' => 'required',
            'email' => 'required',
            'subject' => 'required',
            'body' => 'required',
            'attachment' => 'nullable',
        ]);
    
        $email = $request->email;
        $subject = $request->subject;
        $body = $request->body;

        // Recipient email address
        $to = $email;

        // Subject of the email
        $subject = "Test Email";

        // Message body
        $message = "This is a test email sent from the PHP script without SMTP.";

        // Headers
        $headers = "From: krishnavenkat153@gmail.com\r\n";
        $headers .= "Reply-To: replyto@example.com\r\n";
        $headers .= "CC: cc@example.com\r\n";
        $headers .= "BCC: bcc@example.com\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        // Sending the email
        if (mail($to, $subject, $message, $headers)) {
            echo "Email sent successfully!";
        } else {
            echo "Failed to send the email.";
        }


    
        // try {
        //     Mail::send([], [], function ($message) use ($email, $subject, $body) {
        //         $message->to($email)
        //                 ->subject($subject)
        //                 ->setBody($body, 'text/html'); 
        //     });
        // } catch (\Exception $e) {
        //     // Log the error message
        //     Log::error('Mail sending failed: '.$e->getMessage());
        //     return redirect()->back()->with('danger', 'Failed to send email: '.$e->getMessage());
        // }
    
        if ($request->hasFile('attachment')) {
            $attachment = 'purchaseorder'.uniqid().'.'.$request->attachment->getClientOriginalExtension();
            $request->attachment->move('storage/app/public/images/quotation', $attachment);
        } else {
            $attachment = '';
        }
    
        $dataval = [
            'vendor' => $request->vendor,
            'email' => $request->email,
            'heading' => $request->subject,
            'body' => $request->body,
            'attachment' => $attachment,
        ];
    
        $data = PurchaseOrder::create($dataval);
    
        if ($data) {
            return redirect('admin/purchaseorder')->with('success', trans('messages.success'));
        } else {
            return redirect()->back()->with('danger', trans('messages.fail'));
        }
    }

    public function storevendor(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required',
            'mobile' => 'required',
            'pan' => 'required',
            'gst' => 'required',
        ]);

        $dataval = [
            'name' => $request->name,
            'email' => $request->email,
            'mobile' => $request->mobile,
            'pan' => $request->pan,
            'gst' => $request->gst,
        ];
    
        $data = PO_vendors::create($dataval);
    
        if ($data) {
            return redirect('admin/purchaseorder/vendor')->with('success', trans('messages.success'));
        } else {
            return redirect()->back()->with('danger', trans('messages.fail'));
        }
    }
    

    public function show($id)
    {
        $data=PurchaseOrder::findOrFail($id);
        return view('admin.purchaseorder.show',compact('data'));
    }
    public function view($id)
    {
        $data=PurchaseOrder::findOrFail($id);
        return view('admin.purchaseorder.view',compact('data'));
    }

    public function update(Request $request, int $id){

        $this->validate($request, [
            'heading' => 'required',
            'body' => 'required',
            'attachment' => 'required',
        ]);
        
    
        $dataval = [
            'heading' => $request->heading,
            'body' => $request->body,
            'attachment' => $request->attachment,
        ];
    
        
        $data = PurchaseOrder::create($dataval);
    
        if ($data) {
            return redirect()->route('admin.purchaseorder.show',$id)->with('success', 'purchaseorder Successfully Updated');
        } else {
            return redirect()->route('admin.purchaseorder.show',$id)->with('danger', 'Failed to Update purchaseorder');
        }
    

    }

    public function delete(Request $request)
        {
            $id = $request->id;
            $timeslot = PurchaseOrder::findOrFail($id);
            $timeslot->status = 0;
            $timeslot->save();

            return response()->json(['success' => true]);
        }

    public function deactive(Request $request)
        {
            $id = $request->id;
            $timeslot = PurchaseOrder::findOrFail($id);
            $timeslot->status = 1;
            $timeslot->save();

            return response()->json(['success' => true]);
        }
    

}

