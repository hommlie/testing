<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;

class UsersController extends Controller
{
    public function logout()
    {
        // Clear all session data
        Session::flush();

        // Log out the user
        Auth::logout();

        // Redirect to the homepage or login page
        return Redirect::to('/');
    }
}
