<?php
namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Hash;
use Session;
use App\Models\User;
use App\Models\Timeslot;
use App\Models\Employees;
use App\Models\Inventory;
use App\Models\Permissions;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Inventory_type;
use App\Models\AssignedInventory;
use App\Models\Inventory_history;
use App\Models\Inventory_category;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class InventoryController extends Controller
{
    public function index()
    {
        abort_unless(\Gate::allows('inventory_access'), 403);
        
            $data = Inventory::orderBy('id', 'desc')->get();
            return view('admin.inventory.index',compact('data'));
        
    }

    public function inventory_history()
    {
        
            $data = Inventory_history::orderBy('id', 'desc')->get();
            return view('admin.inventory.history',compact('data'));
        
    }
    public function assigned_inventory_history()
    {
        
            $data = DB::table('AssignedInventory')
                ->join('employees', 'AssignedInventory.empId', '=', 'employees.id')
                ->select('AssignedInventory.*', 'employees.emp_name')
                ->orderBy('AssignedInventory.id', 'desc')
                ->get();
            
            return view('admin.inventory.assignedInventory', compact('data'));
        
    }
    
    

    public function addinventory()
    {
        
            $category = Inventory_category::orderBy('id', 'desc')->get();
            $type = Inventory_type::orderBy('id', 'desc')->get();
            return view('admin.inventory.add',compact('category','type'));
        
    }

    public function storeinventory(Request $request)
    {
        // dd($request);
        $this->validate($request, [
            'category' => 'required',
            'subCategory' => 'required',
            'quantity' => 'required',
            'type' => 'required',
            'price' => 'required',
            'total' => 'required',
            'vendor' => 'required',
        ]);
        
    
        $dataval = [
            'category' => $request->category,
            'subCategory' => $request->subCategory,
            'quantity' => $request->quantity,
            'type' => $request->type,
            'price' => $request->price,
            'total' => $request->total,
            'vendor' => $request->vendor,
        ];

        $dataval_history = [
            'action' => 'New Inventory',
            'category' => $request->category,
            'subCategory' => $request->subCategory,
            'quantity' => $request->quantity,
            'type' => $request->type,
            'price' => $request->price,
            'total' => $request->total,
            'vendor' => $request->vendor,
        ];
    
        
        $data = Inventory::create($dataval);
    
        if ($data) {
            $data = Inventory_history::create($dataval_history);
            return redirect('admin/inventory')->with('success', trans('messages.success'));
        } else {
            return redirect()->back()->with('danger', trans('messages.fail'));
        }
    }

    public function addinventory_category()
    {
        
            return view('admin.inventory.addCategory');
        
    }

    public function storeinventory_category(Request $request)
    {
        // dd($request);
        $this->validate($request, [
            'category' => 'required',
        ]);
        
    
        $dataval = [
            'name' => $request->category,

        ];
    
        
        $data = Inventory_category::create($dataval);
    
        if ($data) {
            ?><script>
                alert('Category Successfully Added');
                </script> <?php
                return view('admin.inventory.addCategory');
        } else {
            return redirect()->back()->with('danger', trans('messages.fail'));
        }
    }


    public function addinventory_type()
    {
        
            return view('admin.inventory.addType');
        
    }

    public function storeinventory_type(Request $request)
    {
        // dd($request);
        $this->validate($request, [
            'type' => 'required',
            'shortcut' => 'required',
        ]);
        
    
        $dataval = [
            'name' => $request->type,
            'shortcut' => $request->shortcut,

        ];
    
        
        $data = Inventory_type::create($dataval);
    
        if ($data) {
            ?><script>
                alert('Quantity Type Successfully Added');
                </script> <?php
                return view('admin.inventory.addType');
        } else {
            return redirect()->back()->with('danger', trans('messages.fail'));
        }
    }


    public function outward($id)
    {
        $data=Inventory::findOrFail($id);
        $category = Inventory_category::orderBy('id', 'desc')->get();
        $type = Inventory_type::orderBy('id', 'desc')->get();
        return view('admin.inventory.outward',compact('data','category','type'));
    }
    public function inward($id)
    {
        $data=Inventory::findOrFail($id);
        $category = Inventory_category::orderBy('id', 'desc')->get();
        $type = Inventory_type::orderBy('id', 'desc')->get();
        return view('admin.inventory.inward',compact('data','category','type'));
    }
    public function show($id)
    {
        $data=Inventory::findOrFail($id);
        $category = Inventory_category::orderBy('id', 'desc')->get();
        $type = Inventory_type::orderBy('id', 'desc')->get();
        return view('admin.inventory.show',compact('data','category','type'));
    }
    public function view($id)
    {
        $data=Inventory::findOrFail($id);
        return view('admin.inventory.view',compact('data'));
    }

    public function update(Request $request, int $id){
        $this->validate($request, [
            'category' => 'required',
            'subCategory' => 'required',
            'quantity' => 'required',
            'type' => 'required',
            'price' => 'required',
            'total' => 'required',
            'vendor' => 'required',
        ]);

        $data = Inventory::findOrFail($id);
    
        $dataval = [
            'category' => $request->category,
            'subCategory' => $request->subCategory,
            'quantity' => $request->quantity,
            'type' => $request->type,
            'price' => $request->price,
            'total' => $request->total,
            'vendor' => $request->vendor,
        ];
        $dataval_history = [
            'action' => 'Inventory_update',
            'category' => $request->category,
            'subCategory' => $request->subCategory,
            'quantity' => $request->quantity,
            'type' => $request->type,
            'price' => $request->price,
            'total' => $request->total,
            'vendor' => $request->vendor,
        ];
    
        $data->update($dataval);
    
        if ($data) {
            $data=Inventory_history::create($dataval_history);
            return redirect()->route('admin.inventory.show',$id)->with('success', 'Inventory Successfully Updated');
        } else {
            return redirect()->route('admin.inventory.show',$id)->with('danger', 'Failed to Update Inventory');
        }
    

    }


    public function OutwardUpdate(Request $request, int $id){
        $this->validate($request, [
            'category' => 'required',
            'subCategory' => 'required',
            'quantity' => 'required|numeric|min:0',
            'outward' => 'required|numeric|min:0',
            'type' => 'required',
            'price' => 'required',
            'total' => 'required',
            'vendor' => 'required',
        ]);
    
        $data = Inventory::findOrFail($id);
    
        if ($request->outward > $data->quantity) {
            return redirect()->route('admin.inventory.outward', $id)->with('danger', 'Outward quantity cannot be greater than the current quantity');
        }
    
        $newQuantity = $data->quantity - $request->outward;
    
        $dataval = [
            'quantity' => $newQuantity,
            
        ];
        $dataval_history = [
            'action' => 'Outward',
            'category' => $request->category,
            'subCategory' => $request->subCategory,
            'quantity' => $newQuantity,
            'type' => $request->type,
            'price' => $request->price,
            'total' => $request->total,
            'vendor' => $request->vendor,
        ];
    
        // Update the inventory item
        $data->update($dataval);
    
        
        if ($data) {
            $data=Inventory_history::create($dataval_history);
            return redirect()->route('admin.inventory.outward', $id)->with('success', 'Inventory Successfully Updated');
        } else {
            return redirect()->route('admin.inventory.outward', $id)->with('danger', 'Failed to Update Inventory');
        }
    }

    public function InwardUpdate(Request $request, int $id){
        $this->validate($request, [
            'category' => 'required',
            'subCategory' => 'required',
            'quantity' => 'required|numeric|min:0',
            'inward' => 'required|numeric|min:0',
            'type' => 'required',
            'price' => 'required',
            'total' => 'required',
            'vendor' => 'required',
            
        ]);
    
        $data = Inventory::findOrFail($id);
    
    
        $newQuantity = $data->quantity + $request->inward;
    
        $dataval = [
            'category' => $request->category,
            'subCategory' => $request->subCategory,
            'quantity' => $newQuantity,
            'type' => $request->type,
            'price' => $request->price,
            'total' => $request->total,
            'vendor' => $request->vendor,
        ];
        $dataval_history = [
            'action' => 'Inward',
            'category' => $request->category,
            'subCategory' => $request->subCategory,
            'quantity' => $newQuantity,
            'type' => $request->type,
            'price' => $request->price,
            'total' => $request->total,
            'vendor' => $request->vendor,
        ];
    
        // Update the inventory item
        $data->update($dataval);
    
        if ($data) {
            $data=Inventory_history::create($dataval_history);
            return redirect()->route('admin.inventory.inward', $id)->with('success', 'Inventory Successfully Updated');
        } else {
            return redirect()->route('admin.inventory.inward', $id)->with('danger', 'Failed to Update Inventory');
        }
    }
    

    public function delete(Request $request)
        {
            $id = $request->id;
            $timeslot = Inventory::findOrFail($id);
            $timeslot->status = 0;
            $timeslot->save();

            return response()->json(['success' => true]);
        }

    public function deactive(Request $request)
        {
            $id = $request->id;
            $timeslot = Inventory::findOrFail($id);
            $timeslot->status = 1;
            $timeslot->save();

            return response()->json(['success' => true]);
        }


        public function StoreAssignedInventory(Request $request)
        {
            // dd($request);
            $this->validate($request, [
                'emp' => 'required',
                'employee_name' => 'required',
                'quantity' => 'required',
                'category' => 'required',
                'subCategory' => 'required',
                'type' => 'required',
                'price' => 'required',
                'inventory_id' => 'required',
            ]);

            $price = (int)$request->price * (int)$request->quantity;

            
    
            $dataval = [
                'empId' => $request->emp,
                'empName' => $request->employee_name,
                'category' => $request->category,
                'subCategory' => $request->subCategory,
                'quantity' => $request->quantity,
                'type' => $request->type,
                'price' => $price,
            ];

            $dataval_history = [
                'action' => 'Assigned to '.$request->employee_name,
                'category' => $request->category,
                'subCategory' => $request->subCategory,
                'quantity' => $request->quantity,
                'type' => $request->type,
                'price' => $price,
                'total' => 'NA',
                'vendor' => 'NA',
            ];
    
            // Deduct the assigned quantity from the current quantity in the inventory
            $inventory = Inventory::find($request->inventory_id);
    
            if ($inventory && $inventory->quantity >= $request->quantity) {
                $inventory->quantity -= $request->quantity;
                $inventory->save();
    
                // Store the assigned inventory data
                $data = AssignedInventory::create($dataval);
    
                if ($data) {
                    Inventory_history::create($dataval_history);
                    return redirect()->back()->with('success', 'Inventory Assigned Successfully');
                } else {
                    // Set failure flash message
                    return redirect()->back()->with('danger', 'Failed to Assign Inventory');
                }
            } else {
                return redirect()->back()->with('danger', 'Not Enough Quantity Available in inventory');
            }
        
            
        }
    

}