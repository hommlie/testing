<?php

namespace App\Http\Controllers\Admin;
use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Coupons;
use Stripe\Coupon;

class CouponsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        abort_unless(\Gate::allows('coupon_access'), 403);

        $data=Coupons::orderBy('id', 'DESC')->paginate(10);
        return view('admin.coupons.index',compact('data'));
    }

    public function add()
    {
        $data = Category::select('id', 'category_name')->get();
        return view('admin.coupons.add',compact('data'));
    }
    

    public function list()
    {
        $data = Coupons::all();
        return view('admin.coupons.couponstable',compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $data=Coupons::where('coupon_name', 'LIKE', '%' . $request->search . '%')->orderBy('id', 'DESC')->paginate(10);
        return view('admin.coupons.index',compact('data'));

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validation rules
        $this->validate($request, [
            'coupon_name' => 'required',
            'cat_id' => 'nullable', 
            'type' => 'required',
            'quantity' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);
    
        // Handle 'cat_id' to store null if "Common" is selected
        $categoryId = $request->cat_id === 'null' ? null : $request->cat_id;
    
        // Data array with conditional cat_id
        $dataval = [
            'cat_id' => $categoryId,
            'coupon_name' => $request->coupon_name,
            'type' => $request->type,
            'quantity' => $request->quantity,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'percentage' => $request->percentage,
            'amount' => $request->amount,
            'times' => $request->times
        ];
    
        // Save data
        $data = Coupons::create($dataval);
    
        // Redirect with success or error message
        if ($data) {
            return redirect('admin/coupons')->with('success', trans('messages.success'));
        } else {
            return redirect()->back()->with('danger', trans('messages.fail'));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Coupons::find($id); // Fetch coupon details
        $category = Category::select('id', 'category_name')->get(); // Fetch active categories
    
        return view('admin.coupons.show', compact('data', 'category'));
        
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        // Validation rules


   
        $this->validate($request, [
            'coupon_name' => 'required',
            'cat_id' => 'nullable', // Allow 'cat_id' to be null if 'Common' is selected
            'type' => 'required',
            'quantity' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);
        // dd($request);

    
        // Set cat_id to null if "Common" is selected
        $categoryId = $request->cat_id === 'null' ? null : $request->cat_id;
    
        // Data array with conditional cat_id
        $data = [
            'cat_id' => $categoryId,
            'coupon_name' => $request->coupon_name,
            'type' => $request->type,
            'quantity' => $request->quantity,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'percentage' => $request->percentage,
            'amount' => $request->amount,
            'times' => $request->times
        ];
    
        // Find and update the coupon
        $coupons = Coupons::find($request->coupon_id)->update($data);
    
        // Redirect with success or error message
        if ($coupons) {
            return redirect('admin/coupons')->with('success', trans('messages.update'));
        } else {
            return redirect()->back()->with('danger', trans('messages.fail'));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $this->validate($request,[
            'id' => 'required',
        ]);
        $data=Coupons::where('id',$request->id)->delete();
        if($data) {
            return 1000;
        } else {
            return 2000;
        }
    }
    
    public function changeStatus(Request $request)
    {
        $this->validate($request,[
            'id' => 'required',
            'status' => 'required',
        ]);

        $data['status']=$request->status;
        Coupons::where('id',$request->id)->update($data);
        if ($data) {
            return 1000;
        } else {
            return 2000;
        }      
    }

    public function getCoupons(){
        return Coupons::all();
    }
}
