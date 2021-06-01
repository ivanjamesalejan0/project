<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $users = User::where('id', '<>', Auth::id())->get();
        return view('home', compact('users'));
    }
    public function videocall()
    {
        $users = User::where('id', '<>', Auth::id())->get();
        return view('videocall', compact('users'));
    }
    public function dashboard()
    {
        return view('layouts.app-home');
    }
    public function home()
    {
        $users = User::where('id', '<>', Auth::id())->get();
        return view('home', compact('users'));
    }
    public function upload()
    {
        $users = User::where('id', '<>', Auth::id())->get();
        return view('upload', compact('users'));
    }
}   
