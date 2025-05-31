<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TermsConditions;
use Auth;

class TermsConditionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        abort_unless(\Gate::allows('termsconditions_access'), 403);

        $data = TermsConditions::firstOrFail();

        return view('admin.terms-conditions.index',compact('data'));
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
        $this->validate($request,[
            'terms_conditions' => 'required',
             'invoice_terms_conditions' => 'required',
             'invoice_do_dont' => 'required',
        ]);

        $data=array(
            'terms_conditions'=>$request->terms_conditions,
            'invoice_terms_conditions'=>$request->invoice_terms_conditions,
            'invoice_do_dont'=>$request->invoice_do_dont
        );
        $termsConditions=TermsConditions::where('id',$request->id)->update($data);

        if ($termsConditions) {
             return redirect()->back()->with('success', trans('messages.update'));
        } else {
            return redirect()->back()->with('danger', trans('messages.fail'));
        }
    }
}
