<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Models\AppHeader;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;


class AppHeaderController extends   Controller{
    public function index()
    {
        $appHeaderData = AppHeader::all();
        return view('admin.appheader.index', compact('appHeaderData'));
    }
    public function update(Request $request, $id)
    {

        $request->validate([
            'bg_color' => 'required|string|max:255',
            'text_color' => 'required|string|max:255',
            'sub_text_color' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:1000',
        ]);
    
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageFileName = 'image' . Str::uuid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('/storage/app/public/appHeaderImgae/'), $imageFileName);
            $imagepath = $imageFileName;
        } else {
            $imagepath = null; 
        }
        $appHeader = AppHeader::find($id); 
        $appHeader->bg_color = $request->bg_color;
        $appHeader->text_color = $request->text_color;
        $appHeader->sub_text_color = $request->sub_text_color;
        if ($imagepath) {
            $appHeader->image = $imagepath;
        }
        $appHeader->save();
        return redirect()->route('admin.appheader')->with('success', 'App Header Data updated successfully!');
    }

    public function changeStatus(Request $request)

    {
        // dd($request->all());
        $this->validate($request, [
            'id' => 'required',
        ]);

        $currentStatus = AppHeader::where('id', $request->id)->value('status');
        $newStatus = ($currentStatus == 1) ? 0 : 1;
    
        $data['status'] = $newStatus;
        $updateStatus = AppHeader::where('id', $request->id)->update($data);
        if ($updateStatus) {
            return 1000; 
        } else {
            return 2000;
        }
    }
    
    
}

?>