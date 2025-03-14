<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Models\Complaint;
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

    // COMPLAINTS SEND SMS
    public function sendSMS($mobileNumber, $message)
    {
        // Validate mobile number format
        if (empty($mobileNumber) || !preg_match('/^\d{10}$/', $mobileNumber)) {
            return json_encode(['status' => 'error', 'message' => 'Invalid mobile number format']);
        }

        $authKey = '403754ASWGpJz366b09ec2P1'; // Replace with your actual authKey
        $templateId = '66b09df3d6fc0561e241f922'; // Replace with your actual template ID
        $sender = 'TXTLCL'; // Replace with your actual sender ID
        $route = '4';
        $countryCode = '91';
        $mobileNumber = $countryCode . $mobileNumber; // Append country code

        // API URL
        $url = "https://control.msg91.com/api/v5/flow";

        // Prepare request payload
        $data = [
            'template_id' => $templateId,
            'short_url' => '1', // Enable short URL
            'realTimeResponse' => '1', // Optional real-time response
            'recipients' => [
                [
                    'mobiles' => $mobileNumber,
                    'VAR1' => $message, // Replace with your dynamic message variable
                ]
            ]
        ];

        // Initialize cURL
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'authkey: ' . $authKey,
            'Content-Type: application/json',
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

        // Execute API call
        $response = curl_exec($ch);

        // Handle cURL errors
        if (curl_errno($ch)) {
            $error_msg = curl_error($ch);
            curl_close($ch);
            dd(['status' => 'error', 'message' => 'cURL error: ' . $error_msg]);
        }


        // Close cURL
        curl_close($ch);

        // Decode API response
        $decodedResponse = json_decode($response, true);

    

        // Check response type for errors
        if (isset($decodedResponse['type']) && $decodedResponse['type'] === 'error') {
            return json_encode(['status' => 'error', 'message' => $decodedResponse['message']]);
        }

        return json_encode(['status' => 'success', 'message' => 'SMS sent successfully']);
    }

    // COMPLAINTS SEND SMS TEST
    public function testSMS()
    {
        $mobileNumber = '82633730XX'; 
        $message = 'Hello, your complaint has been registered successfully.';

        $response = $this->sendSMS($mobileNumber, $message);

        dd($response); 
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