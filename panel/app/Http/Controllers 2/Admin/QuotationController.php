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
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class QuotationController extends Controller
{
    public function index()
    {
        abort_unless(\Gate::allows('quotation_access'), 403);
        
            $data = Quotation::orderBy('id', 'desc')->get();
            return view('admin.quotation.index',compact('data'));
        
    }

    public function addquotation()
    {
        
            return view('admin.quotation.add');
        
    }


    public function storequotation(Request $request)
    {
        $this->validate($request, [
            'email' => 'email',
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
            $attachment = 'quotation'.uniqid().'.'.$request->attachment->getClientOriginalExtension();
            $request->attachment->move('storage/app/public/images/quotation', $attachment);
        } else {
            $attachment = '';
        }
    
        $dataval = [
            'email' => $request->email,
            'heading' => $request->subject,
            'body' => $request->body,
            'attachment' => $attachment,
        ];
    
        $data = Quotation::create($dataval);
    
        if ($data) {
            return redirect('admin/quotation')->with('success', trans('messages.success'));
        } else {
            return redirect()->back()->with('danger', trans('messages.fail'));
        }
    }
    

    public function show($id)
    {
        $data=Quotation::findOrFail($id);
        return view('admin.quotation.show',compact('data'));
    }
    public function view($id)
    {
        $data=Quotation::findOrFail($id);
        return view('admin.quotation.view',compact('data'));
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
    
        
        $data = Quotation::create($dataval);
    
        if ($data) {
            return redirect()->route('admin.quotation.show',$id)->with('success', 'quotation Successfully Updated');
        } else {
            return redirect()->route('admin.quotation.show',$id)->with('danger', 'Failed to Update quotation');
        }
    

    }

    public function delete(Request $request)
        {
            $id = $request->id;
            $timeslot = Quotation::findOrFail($id);
            $timeslot->status = 0;
            $timeslot->save();

            return response()->json(['success' => true]);
        }

    public function deactive(Request $request)
        {
            $id = $request->id;
            $timeslot = Quotation::findOrFail($id);
            $timeslot->status = 1;
            $timeslot->save();

            return response()->json(['success' => true]);
        }
    

}

