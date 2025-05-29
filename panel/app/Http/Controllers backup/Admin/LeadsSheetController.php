<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Models\LeadsSheet;
use App\Models\Category;
use App\Models\Subcategory;
use App\Models\Employees;
use App\Models\Products;
use App\Models\Attribute;
use Illuminate\Support\Facades\DB;
use App\Models\Variation;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

class LeadsSheetController extends Controller
{

    public function index()
    {
       $datas = LeadsSheet::orderBy('id', 'desc')->get();
        $employees = Employees::where('status', 1)->orderBy('id', 'DESC')->get();
        return view('admin.leadssheet.index', compact('datas','employees'));
    }


    public function create()
    {
        $category = Category::orderBy('id', 'asc')->get();
        $employees = Employees::where('status', 1)->orderBy('id', 'DESC')->get();
        return view('admin.leadssheet.add', compact('category','employees'));
    }

    public function getSubcategories($categoryId)
    {
        $subcategories = Subcategory::where('cat_id', $categoryId)->get();
        return response()->json($subcategories);
    }

    public function getServiceDetails($id)
    {
        $service = DB::table('products')
            ->leftJoin('product_images', 'products.id', '=', 'product_images.product_id')
            ->where('products.id', $id)
            ->select(
                'products.discounted_price',
                'products.product_price',
                'products.tax',
                'products.tax_type',
                'products.product_name',
                'product_images.image'
            )
            ->first();
        $variations = DB::table('variations')
            ->where('variations.product_id', $id)
            ->select(
                'variations.attribute_id',
                'variations.discounted_variation_price',
                'variations.variation',
                'variations.qty'
            )
            ->get();

        return response()->json([
            'discounted_price' => optional($service)->discounted_price,
            'product_price' => optional($service)->product_price,
            'tax' => optional($service)->tax,
            'tax_type' => optional($service)->tax_type,
            'product_name' => optional($service)->product_name,
            'image' => optional($service)->image,
            'variations' => $variations
        ]);
    }

    public function getServiceVariationType($serviceId)
    {
        $attid = Variation::where('product_id', $serviceId)
            ->pluck('attribute_id');
        $services = Attribute::whereIn('id', $attid)->get();
        return response()->json([
            'product_id' => $serviceId,
            'services' => $services
        ]);
    }
    public function getServices($subcategoryId)
    {
        $services = Products::where('subcat_id', $subcategoryId)->get();
        return response()->json($services);
    }
    public function getServiceVariationArea($serviceId, $productId)
    {
        $services = Variation::where('product_id', $productId)
            ->where('attribute_id', $serviceId)
            ->get();

        return response()->json($services);
    }

    public function store(Request $request)
    {

        // VALIDATION
        $request->validate([
            'category' => 'required',
            'subcategory' => 'required',
            'service' => 'required',
            'attribute' => 'required',
            'variationsID' => 'required',
            'couponsprice' => 'nullable',
            'source' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:500',
            'lead_type' => 'nullable|string|max:500',
            'follow_up_datetime' => 'nullable',
            'spoken_by' => 'nullable|string|max:255',
            'lead_status' => 'nullable',
            'attempt_date_1' => 'nullable',
            'remark_1' => 'nullable|string',
            'attempt_date_2' => 'nullable',
            'remark_2' => 'nullable|string',
            'attempt_date_3' => 'nullable',
            'remark_3' => 'nullable|string',
            'call_recording_link_1' => 'nullable|url|max:500',
            'call_recording_link_2' => 'nullable|url|max:500',
        ]);

        if ($request->has('attribute')) {
            $attributes = $request->input('attribute');
            list($serviceId, $productId) = explode('|', $attributes);
        }
        $attribute = $serviceId;
        // INSERT DATA INTO THE DATABASE
        LeadsSheet::create([
            'category_id' => $request->category,
            'subcategory_id' => $request->subcategory,
            'product_id' => $request->service,
            'attribute_id' => $attribute,
            'variations_id' => $request->variationsID,
            'coupons' => $request->couponsprice,
            'source' => $request->source,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'lead_type' => $request->lead_type,
            'follow_up_dt' => $request->follow_up_datetime,
            'spoken_by' => $request->spoken_by,
            'lead_status' => $request->lead_status,
            'attempt_date_1' => $request->attempt_date_1,
            'remark_1' => $request->remark_1,
            'attempt_date_2' => $request->attempt_date_2,
            'remark_2' => $request->remark_2,
            'attempt_date_3' => $request->attempt_date_3,
            'remark_3' => $request->remark_3,
            'call_recording_link_1' => $request->call_recording_link_1,
            'call_recording_link_2' => $request->call_recording_link_2,
        ]);

        // REDIRECT TO INDEX PAGE
        return redirect()->route('admin.leadssheet')->with('success', 'Lead added successfully.');
    }


    public function edit($id)
    {
        $categories = Category::orderBy('id', 'asc')->get();
        $employees = Employees::where('status', 1)->orderBy('id', 'DESC')->get();
        $lead = LeadsSheet::findOrFail($id);
        return view('admin.leadssheet.edit', compact('lead', 'categories','employees'));
    }


    public function update(Request $request, $id)
    {
        // VALIDATION
        $request->validate([
            'category' => 'required',
            'subcategory' => 'required',
            'service' => 'required',
            'attribute' => 'required',
            'variationsID' => 'required',
            'couponsprice' => 'nullable',
            'source' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:500',
            'lead_type' => 'nullable|string|max:500',
            'follow_up_datetime' => 'nullable',
            'spoken_by' => 'nullable|string|max:255',
            'lead_status' => 'nullable',
            'attempt_date_1' => 'nullable',
            'remark_1' => 'nullable|string',
            'attempt_date_2' => 'nullable',
            'remark_2' => 'nullable|string',
            'attempt_date_3' => 'nullable',
            'remark_3' => 'nullable|string',
            'call_recording_link_1' => 'nullable|url|max:500',
            'call_recording_link_2' => 'nullable|url|max:500',
        ]);

        // Split "attribute" (e.g. "2|761") into the actual attribute_id
        if ($request->has('attribute')) {
            list($attributeId, $productId) = explode('|', $request->input('attribute'));
        } else {
            $attributeId = null;
        }

        // FIND THE EXISTING LEAD
        $lead = LeadsSheet::findOrFail($id);

        // UPDATE ITS FIELDS
        $lead->update([
            'category_id' => $request->category,
            'subcategory_id' => $request->subcategory,
            'product_id' => $request->service,
            'attribute_id' => $attributeId,
            'variations_id' => $request->variationsID,
            'coupons' => $request->couponsprice,
            'source' => $request->source,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'lead_type' => $request->lead_type,
            'follow_up_dt' => $request->follow_up_datetime,
            'spoken_by' => $request->spoken_by,
            'lead_status' => $request->lead_status,
            'attempt_date_1' => $request->attempt_date_1,
            'remark_1' => $request->remark_1,
            'attempt_date_2' => $request->attempt_date_2,
            'remark_2' => $request->remark_2,
            'attempt_date_3' => $request->attempt_date_3,
            'remark_3' => $request->remark_3,
            'call_recording_link_1' => $request->call_recording_link_1,
            'call_recording_link_2' => $request->call_recording_link_2,
        ]);

        // REDIRECT WITH SUCCESS MESSAGE
        return redirect()
            ->route('admin.leadssheet')
            ->with('success', 'Lead updated successfully.');
    }



    public function destroy(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);
        $data = LeadsSheet::where('id', $request->id)->delete();
        if ($data) {
            return 1000;
        } else {
            return 2000;
        }
    }


}



?>