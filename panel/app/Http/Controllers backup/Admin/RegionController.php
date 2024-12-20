<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Business_region;

class RegionController extends Controller
{
    public function getStates(Request $request)
    {
        dd($request->query('zone'));
        
        $zone = $request->query('zone'); 

        if (!$zone) {
            return response()->json(['error' => 'Zone parameter is required'], 400);
        }
        $states = Business_region::where('zone', $zone)
                    ->where('status', 1) 
                    ->pluck('sate');

        return response()->json($states);
    }
}



?>