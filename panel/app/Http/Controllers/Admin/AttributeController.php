<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attribute;
use Illuminate\Support\Str;

class AttributeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        abort_unless(\Gate::allows('attribute_access'), 403);
        $data = Attribute::orderBy('id', 'DESC')->paginate(10);
        return view('admin.attribute.index', compact('data'));
    }

    public function add()
    {
        return view('admin.attribute.add');
    }

    public function list()
    {
        $data = Attribute::all();
        return view('admin.attribute.attributetable', compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $data = Attribute::where('attribute', 'LIKE', '%' . $request->search . '%')->orderBy('id', 'DESC')->paginate(10);
        return view('admin.attribute.index', compact('data'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate the request
        $this->validate($request, [
            'attribute' => 'required',
            'specifications' => 'required',
            'total_reviews' => 'required|integer',
            'avg_rating' => 'required|numeric',
            'attribute_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('attribute_image')) {
            $attributeImage = $request->file('attribute_image');
            $attributeImageFileName = 'attribute_image_' . Str::uuid() . '.' . $attributeImage->getClientOriginalExtension();
            $attributeImage->move(public_path('/storage/app/public/images/attribute/'), $attributeImageFileName);
            $attributeImagePath = $attributeImageFileName;
        }

        $specification = implode(" | ", $request->specifications);
        $dataval = [
            'attribute' => $request->attribute,
            'specifications' => $specification,
            'total_reviews' => $request->total_reviews,
            'avg_rating' => $request->avg_rating,
            'image' => $attributeImagePath,
        ];
        $data = Attribute::create($dataval);
        if ($data) {
            return redirect('admin/attribute')->with('success', 'Attribute has been added');
        } else {
            return redirect()->back()->with('danger', 'Something went wrong');
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
        $data = Attribute::find($id);
        return view('admin.attribute.show', compact('data'));
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
    // Validate the request
    $this->validate($request, [
        'attribute' => 'required',
        'specifications' => 'required|array',
        'total_reviews' => 'required|integer',
        'avg_rating' => 'required|numeric',
        'attribute_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    // Initialize the variable
    $attributeImagePath = null;

    // Handle file upload if provided
    if ($request->hasFile('attribute_image')) {
        $attributeImage = $request->file('attribute_image');
        $attributeImageFileName = 'attribute_image_' . Str::uuid() . '.' . $attributeImage->getClientOriginalExtension();
        $attributeImage->move(public_path('/storage/app/public/images/attribute/'), $attributeImageFileName);
        $attributeImagePath = $attributeImageFileName;
    }

    // Prepare data for updating
    $data = [
        'attribute' => $request->attribute,
        'total_reviews' => $request->total_reviews,
        'avg_rating' => $request->avg_rating,
        'specifications' => implode(" | ", $request->specifications),
    ];

    // Add image to the data array only if it was uploaded
    if ($attributeImagePath) {
        $data['image'] = $attributeImagePath;
    }

    // Find the attribute and update
    $attribute = Attribute::find($request->attribute_id);

    if ($attribute) {
        $attribute->update($data);
        return redirect('admin/attribute')->with('success', 'Attribute has been updated');
    } else {
        return redirect()->back()->with('danger', 'Something went wrong');
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
        $this->validate($request, [
            'id' => 'required',
        ]);
        $data = Attribute::where('id', $request->id)->delete();
        if ($data) {
            return 1000;
        } else {
            return 2000;
        }
    }

    public function changeStatus(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'status' => 'required',
        ]);

        $data['status'] = $request->status;
        Attribute::where('id', $request->id)->update($data);
        if ($data) {
            return 1000;
        } else {
            return 2000;
        }
    }
}
