<?php

namespace App\Http\Controllers\Admin;

use Str;
use Auth;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Products;
use App\Models\Attribute;
use App\Models\Variation;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use App\Models\ProductImages;
use App\Models\Innersubcategory;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        abort_unless(\Gate::allows('product_access'), 403);

        $data = Products::with(['category', 'variation'])->with('subcategory')->orderBy('id', 'DESC')->get();
        return view('admin.products.index', compact('data'));
    }

    public function add()
    {
        $data = Category::select('id', 'category_name')->where('status', '1')->get();
        $attribute = Attribute::select('id', 'attribute')->where('status', '1')->get();
        $brands = Brand::select('id', 'brand_name')->where('status', '1')->get();
        return view('admin.products.add', compact('data', 'attribute', 'brands'));
    }

    public function list()
    {
        $data = Products::with('category')->with('subcategory')->with('innersubcategory')->where('vendor_id', Auth::user()->id)->get();
        return view('admin.products.productstable', compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $data = Products::where('product_name', 'LIKE', '%' . $request->search . '%')->orderBy('id', 'DESC')->paginate(10);
        return view('admin.products.index', compact('data'));

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       
        if ($request->is_variation == "on") {
            $this->validate($request, [
                'available_stock' => 'nullable',
                'sku' => 'nullable',
                'product_name' => 'nullable',
                'description' => 'nullable',
                'image.*' => 'nullable',
                'variation.*' => 'nullable',
                'price.*' => 'nullable',
                'discounted_variation_price.*' => 'nullable',
                'qty.*' => 'nullable',
                'specifications.*' => 'nullable',
                'pro_total_reviews.*' => 'nullable',
                'avg_rating.*' => 'nullable',
                'product_image.*' => 'nullable',
            ]);
            $is_variation = 1;
            $product_price = $request->price[0];
            $discounted_price = $request->discounted_variation_price[0];

        } else {
            $this->validate($request, [
                'available_stock' => 'nullable',
                'sku' => 'nullable',
                'cat_id' => 'nullable',
                'subcat_id' => 'nullable',
                // 'innersubcat_id' => 'required',
                'product_name' => 'nullable',
                'product_price' => 'nullable',
                'product_qty' => 'nullable',
                'image.*' => 'nullable',
                'description' => 'nullable',
                'specifications.*' => 'required',
            ]);
            $is_variation = 0;
            $product_price = $request->product_price;
            $discounted_price = $request->discounted_price;

        }

        if ($request->free_shipping == "on") {
            $free_shipping = 1;
        } else {
            $free_shipping = 2;
        }

        if ($request->is_hot == "on") {
            $is_hot = 1;
        } else {
            $is_hot = 2;
        }

        if ($request->flat_rate == "on") {
            $this->validate($request, [
                'shipping_cost' => 'nullable'
            ]);
            $shipping_cost = $request->shipping_cost;
            $flat_rate = 1;
        } else {
            $shipping_cost = 0;
            $flat_rate = 2;
        }

        if ($request->is_return == "on") {
            $this->validate($request, [
                'return_days' => 'nullable'
            ]);
            $return_days = $request->return_days;
            $is_return = 1;
        } else {
            $return_days = 0;
            $is_return = 2;
        }

        if ($request->is_featured == "on") {
            $is_featured = 1;
        } else {
            $is_featured = 2;
        }

        if ($request->product_qty == "on") {
            $product_qty = $request->product_qty;
        } else {
            $product_qty = 2;
        }

        $loca = isset($request->location)
            ? (is_array($request->location) ? implode(" | ", $request->location) : $request->location)
            : null;

        $pro_specifications = isset($request->pro_specifications)
        ? (is_array($request->pro_specifications) ? implode(" | ", $request->pro_specifications) : $request->pro_specifications)
         : null;

        // dd($loca);
        $dataval = array(
            'vendor_id' => Auth::user()->id,
            'cat_id' => $request->cat_id,
            'subcat_id' => $request->subcat_id,
            // 'innersubcat_id'=>$request->innersubcat_id,
            'product_name' => $request->product_name,
            'brand' => $request->brand,
            'description' => $request->description,
            'pro_specifications' => $pro_specifications,
            'product_price' => $product_price,
            'discounted_price' => $discounted_price,
            'slug' => \Str::slug($request->slug),
            'is_variation' => $is_variation,
            // 'attribute'=>$request->attribute,
            'product_qty' => $product_qty,
            'is_hot' => $is_hot,
            'free_shipping' => $free_shipping,
            'flat_rate' => $flat_rate,
            'shipping_cost' => $shipping_cost,
            'is_return' => $is_return,
            'return_days' => $return_days,
            'is_featured' => $is_featured,
            'is_recommended' => $request->has('is_recommended') ? 1 : 0, 
            'available_stock' => $request->available_stock,
            'sku' => $request->sku,
            'est_shipping_days' => $request->est_shipping_days,
            'tax' => $request->tax,
            'tax_type' => $request->tax_type,
            'tags' => $request->tags,
            'faqs' => $request->faqs,
            'faqs_for_mobile' => $request->faqs_for_mobile,
            'description_for_mobile' => $request->description_for_mobile,
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
            'rating' => $request->productRating ?? 0,
            'total_reviews' => $request->pro_total_reviews ?? 0,
            'location' => $loca,
            'video' => 'NA',
            'video_thumbnail' => 'NA',
        );

      
        $data = Products::create($dataval);

        if ($request->hasFile('image')) {
            $files = $request->file('image');
            $altTags = $request->input('alt_tag');
            $imageTitles = $request->input('image_title');
            foreach ($files as $index => $file) {
                $productimage = new ProductImages;
                $image = 'product-' . uniqid() . '.' . $file->getClientOriginalExtension();
                $file->move('storage/app/public/images/products', $image);
                $productimage->product_id = $data->id;
                $productimage->image = $image;
                $productimage->media = 'Image';
                $productimage->alt_tag = $altTags[$index];
                $productimage->image_title = $imageTitles[$index];
                // dd($productimage,$productimage);
                $productimage->save();
            }
        }


        // if ($request->hasFile('video') && $request->hasFile('video_thumbnail')) {
        //     $video = $request->file('video');
        //     $videoName = 'video-' . uniqid() . '.' . $video->getClientOriginalExtension();


        //     $video->move('storage/app/public/images/products', $videoName);

        //     $video_thumbnail = $request->file('video_thumbnail');
        //     $videoThumbnail = 'thumbnail-' . uniqid() . '.' . $video_thumbnail->getClientOriginalExtension();

        //     $video_thumbnail->move('storage/app/public/images/products', $videoThumbnail);

        //     $productimage = new ProductImages;
        //     $productimage->product_id = $data->id;
        //     $productimage->image = $videoName;
        //     $productimage->media = 'Video';
        //     $productimage->thumbnail = $videoThumbnail;
        //     $productimage->save();
        // }

        // Store Youtue URL
        if (!empty($request->video)) {


            $productimage = new ProductImages;
            $productimage->product_id = $data->id;
            $productimage->image = $request->video;
            $productimage->media = 'Video';
            $productimage->save();
        }




        if ($is_variation == 1) {
            $variation = $request->variation;
            $variation_interval = $request->variation_interval;
            $variation_times = $request->variation_times;
            $attribute_id = $request->attribute;
            $price = $request->price;
            $discounted_variation_price = $request->discounted_variation_price;
            $qty = $request->qty;
            $total_reviews = $request->total_reviews;
            $avg_rating = $request->avg_rating;

            $specification = isset($request->specifications) && is_array($request->specifications) 
            ? array_map(function ($innerArray) {
                return is_array($innerArray) ? implode('|', $innerArray) : $innerArray;
            }, $request->specifications)
            : [];
        

            foreach ($price as $i => $no) {
                $input['product_id'] = $data->id;
                $input['price'] = $price[$i];
                $input['discounted_variation_price'] = $discounted_variation_price[$i];
                $input['attribute_id'] = $attribute_id[$i];
                $input['variation'] = $variation[$i];
                $input['variation_interval'] = $variation_interval[$i];
                $input['variation_times'] = $variation_times[$i];
                $input['qty'] = $qty[$i];
                $input['total_reviews'] = $total_reviews[$i];
                $input['avg_rating'] = $avg_rating[$i];
                $input['description'] = $specification[$i + 1];

                if ($request->hasFile('product_image') && isset($request->product_image[$i])) {
                    $attributeImage = $request->file('product_image')[$i];
                    $attributeImageFileName = 'product_image_' . Str::uuid() . '.' . $attributeImage->getClientOriginalExtension();
                    $attributeImage->move(public_path('/storage/app/public/images/variation/'), $attributeImageFileName);
                    $input['image'] = $attributeImageFileName;
                }

                Variation::create($input);
            }
        }

        if ($data) {
            return redirect('admin/product')->with('success', trans('messages.success'));
        } else {
            return redirect('admin/product')->with('danger', trans('messages.fail'));
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
        $data = Products::where('id', $id)->find($id);
        $category = Category::select('id', 'category_name')->where('status', '1')->get();
        $subcategory = Subcategory::select('id', 'subcategory_name')->where('status', '1')->get();
        $innersubcategory = Innersubcategory::select('id', 'innersubcategory_name')->where('status', '1')->get();
        $attribute = Attribute::select('id', 'attribute')->where('status', '1')->get();
        $images = ProductImages::select('id', 'product_id', 'alt_tag', 'image_title', \DB::raw("CONCAT('" . url('/storage/app/public/images/products/') . "/', image) AS image_url"))
            ->where('product_id', $id)
            ->where('media', 'image')
            ->get();
        $video = ProductImages::select('id', 'product_id', 'image')
            ->where('product_id', $id)
            ->where('media', 'video') // Filter for videos only
            ->first(); // Retrieve only one record



        $brands = Brand::select('id', 'brand_name')->where('status', '1')->get();
        $variations = Variation::where('product_id', $id)->get();

        return view('admin.products.show', compact('data', 'category', 'subcategory', 'innersubcategory', 'attribute', 'images', 'brands', 'variations', 'video'));
    }

    public function showimage(Request $request)
    {
        $getitem = ProductImages::where('id', $request->id)->first();
        if ($getitem->image) {
            $getitem->img = url('storage/app/public/images/products/' . $getitem->image);
        }
        return response()->json(['ResponseCode' => 1, 'ResponseData' => $getitem], 200);
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
        // dd($request->all());
        if ($request->is_variation != null and $request->is_variation == "on") {

            $this->validate($request, [
                'cat_id' => 'required',
                'available_stock' => 'nullable',
                'sku' => 'nullable',
                'subcat_id' => 'required',
                'product_name' => 'required',
                'variation.*' => 'nullable',
                'price.*' => 'nullable',
                'discounted_variation_price.*' => 'nullable',
                'qty.*' => 'nullable',
                'specifications.*' => 'nullable',
                'total_reviews.*' => 'nullable',
                'avg_rating.*' => 'nullable',
                'product_image.*' => 'nullable',
            ]);

            $is_variation = 1;
            $product_price = $request->product_price;
            $product_qty = $request->product_qty;
            $discounted_price = $request->discounted_price;
            $variation = $request->variation;
            $attribute_id = $request->attribute;
            $variation_interval = $request->variation_interval;
            $variation_times = $request->variation_times;
            $price = $request->price;
            $discounted_variation_price = $request->discounted_variation_price;
            $qty = $request->qty;
            $total_reviews = $request->total_reviews;
            $avg_rating = $request->avg_rating;

            $specification = isset($request->specifications) && is_array($request->specifications) 
            ? array_map(function ($innerArray) {
                return is_array($innerArray) ? implode('|', $innerArray) : $innerArray;
            }, $request->specifications)
            : [];

            if (is_array($variation) || is_object($variation)) {
                foreach ($variation as $i => $no) {
                    if ($no != "") {
                        $input = [
                            'attribute_id' => $attribute_id[$i],
                            'variation_interval' => $variation_interval[$i],
                            'variation_times' => $variation_times[$i],
                            'price' => $price[$i],
                            'discounted_variation_price' => $discounted_variation_price[$i],
                            'variation' => $variation[$i],
                            'qty' => $qty[$i],
                            'product_id' => $request->product_id,
                            'total_reviews' => $total_reviews[$i],
                            'avg_rating' => $avg_rating[$i],
                            'description' => $specification[$i],
                        ];

                        if ($request->hasFile('product_image') && isset($request->product_image[$i])) {
                            $attributeImage = $request->file('product_image')[$i];
                            $attributeImageFileName = 'product_image_' . Str::uuid() . '.' . $attributeImage->getClientOriginalExtension();
                            $attributeImage->move(public_path('/storage/app/public/images/variation/'), $attributeImageFileName);
                            $input['image'] = $attributeImageFileName;  // Corrected line
                        }

                        if (isset($request->variation_id[$i])) {
                            // Update existing variation
                            Variation::where('id', $request->variation_id[$i])->update($input);
                        } else {
                            // Create a new variation
                            Variation::create($input);
                        }
                    }
                }
            }

        } else {

        

            $this->validate($request, [
                'cat_id' => 'required',
                'faqs' => 'required',
                'productRating' => 'required',
                'available_stock' => 'nullable',
                'sku' => 'nullable',
                'subcat_id' => 'required',
                'innersubcat_id' => 'nullable',
                'product_name' => 'nullable',
                'product_price' => 'required',
                'product_qty' => 'required',
                'discounted_price' => 'required',
                'specifications.*' => 'required',
            ]);

            $is_variation = 0;
            $product_price = $request->product_price;
            $product_qty = $request->product_qty;
            $discounted_price = $request->discounted_price;


            // Delete existing variations as product is now non-variant
            Variation::where('product_id', $request->product_id)->delete();
        }

        if (!empty($request->video)) {
            // Check if video_id is provided in the request for update
            if (!empty($request->video_id)) {
                // Update the existing video record
                $productimage = ProductImages::find($request->video_id);
                if ($productimage) {
                    $productimage->image = $request->video; // Update the video file name or path
                    $productimage->save(); // Save changes
                }
            } else {
                $productimage = new ProductImages;
                $productimage->product_id = $request->product_id;
                $productimage->image = $request->video;
                $productimage->media = 'Video';
                $productimage->save();
            }
        }



        $free_shipping = $request->free_shipping == "on" ? 1 : 2;
        $is_hot = $request->is_hot == "on" ? 1 : 2;
        $flat_rate = $request->flat_rate == "on" ? 1 : 2;
        $shipping_cost = $flat_rate == 1 ? $request->shipping_cost : 0;
        $is_return = $request->is_return == "on" ? 1 : 2;
        $return_days = $is_return == 1 ? $request->return_days : 0;
        $is_featured = $request->is_featured == "on" ? 1 : 2;
        // $tags = $request->tags ? implode(', ', $request->tags) : '';

        $tags = $request->tags;
        $loca = isset($request->location)
        ? (is_array($request->location) ? implode(" | ", $request->location) : $request->location)
        : null;

        $pro_specifications = isset($request->pro_specifications)
        ? (is_array($request->pro_specifications) ? implode(" | ", $request->pro_specifications) : $request->pro_specifications)
         : null;
        $data = [
            'vendor_id' => Auth::user()->id,
            'cat_id' => $request->cat_id,
            'subcat_id' => $request->subcat_id,
            'innersubcat_id' => $request->innersubcat_id,
            'product_name' => $request->product_name,
            'brand' => $request->brand,
            'description' => $request->description,
            'pro_specifications' => $pro_specifications,
            'product_price' => $product_price,
            'discounted_price' => $discounted_price,
            'product_qty' => $product_qty ? $product_qty : "NA",
            'slug' => \Str::slug($request->slug),
            'is_variation' => $is_variation,
            'attribute' => $request->attribute,
            'is_hot' => $is_hot,
            'free_shipping' => $free_shipping,
            'flat_rate' => $flat_rate,
            'shipping_cost' => $shipping_cost,
            'is_return' => $is_return,
            'return_days' => $return_days,
            'is_featured' => $is_featured,
            'is_recommended' => $request->has('is_recommended') ? 1 : 0, 
            'available_stock' => $request->available_stock,
            'sku' => $request->sku,
            'est_shipping_days' => $request->est_shipping_days,
            'tax' => $request->tax,
            'faqs' => $request->faqs,
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
            'faqs_for_mobile' => $request->faqs_for_mobile,
            'description_for_mobile' => $request->description_for_mobile,
            'rating' => $request->productRating ?? 0,
            'total_reviews' => $request->pro_total_reviews ?? 0,
            'location' => $loca,
            'tax_type' => $request->tax_type,
            'tags' => $tags,
        ];

        $product = Products::find($request->product_id)->update($data);

        if ($product) {
            return redirect('admin/product')->with('success', trans('messages.update'));
        } else {
            return redirect()->back()->with('danger', trans('messages.fail'));
        }
    }




    public function updateimage(Request $request)
    {
        $this->validate($request, [
            'image' => 'image|mimes:jpeg,png,jpg',
            'alt_tag' => 'required',
            'image_title' => 'required',
        ]);


        $itemimage = new ProductImages;
        $itemimage->exists = true;
        $itemimage->id = $request->id;


        if (isset($request->image)) {
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $image = 'product-' . uniqid() . '.' . $request->image->getClientOriginalExtension();
                $request->image->move('storage/app/public/images/products', $image);
                $itemimage->image = $image;
            }
        }
        $itemimage->alt_tag = $request->alt_tag;
        $itemimage->image_title = $request->image_title;
        $itemimage->save();

        if ($itemimage) {
            return response()->json(['ResponseCode' => 1], 200);
        } else {
            return response()->json(['ResponseCode' => 0], 200);
        }
    }

    public function storeimages(Request $request)
    {
        
        if ($request->hasFile('file')) {
            $files = $request->file('file');
            $altTags = $request->input('alt_tag');
            $imageTitles = $request->input('image_title');
            foreach ($files as $index => $file) {

                $productimage = new ProductImages;
                $image = 'item-' . uniqid() . '.' . $file->getClientOriginalExtension();

                $file->move('storage/app/public/images/products', $image);

                $productimage->product_id = $request->pro_id;
                $productimage->image = $image;
                $productimage->alt_tag = $altTags[$index];
                $productimage->image_title = $imageTitles[$index];
                $productimage->save();
            }
        }

        return redirect()->back()->with('success', trans('messages.update'));
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
        $data = Products::where('id', $request->id)->where('vendor_id', Auth::user()->id)->delete();
        if ($data) {
            return 1000;
        } else {
            return 2000;
        }
    }

    public function destroyimage(Request $request)
    {
        $getitemimages = ProductImages::where('product_id', $request->product_id)->count();

        if ($getitemimages > 1) {
            $itemimage = ProductImages::where('id', $request->id)->delete();
            if ($itemimage) {
                return 1;
            } else {
                return 0;
            }
        } else {
            return 2;
        }
    }

    public function changeStatus(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'status' => 'required',
        ]);

        $data['status'] = $request->status;
        Products::where('id', $request->id)->where('vendor_id', Auth::user()->id)->update($data);
        if ($data) {
            return 1000;
        } else {
            return 2000;
        }
    }

    public function subcat(Request $request)
    {
        $data = Subcategory::select('id', 'subcategory_name')->where('cat_id', $request->cat_id)->get();
        return json_encode($data);
    }

    public function innersubcat(Request $request)
    {
        $data = Innersubcategory::select('id', 'innersubcategory_name')->where('subcat_id', $request->subcat_id)->get();
        return json_encode($data);
    }
}
