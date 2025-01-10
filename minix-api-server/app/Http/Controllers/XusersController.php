<?php

namespace App\Http\Controllers;

use App\Models\Xusers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class XusersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Xusers::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_name' => 'required|string|max:255',
            'twitter_handle' => 'required|string|max:255|unique:xusers',
            'email' => 'required|email|unique:xusers',
            'password' => 'required|string|min:8'
        ]);

        $hashed_password = Hash::make($request->password);

        $newUser = Xusers::create([
            'user_name' => $request->user_name,
            'twitter_handle' => $request->twitter_handle,
            'email' => $request->email,
            'password' => $hashed_password
        ]);

        return response()->json([
            'message' => 'User Created Successfully',
            'user' => $newUser
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Xusers $xusers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Xusers $xusers)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Xusers $xusers)
    {
        //
    }
}
