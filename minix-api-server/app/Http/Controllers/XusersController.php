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
            'status' => 'success',
            'message' => 'User Created Successfully',
            'user' => $newUser
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {

        // validating fields
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Get user data from db
        $userdata = Xusers::where('email', $request->email)->first();
        if (!$userdata) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email is not correct'
            ], 404);
        }

        // Check if the password is corrrect
        $hashresult = Hash::check($request->password, $userdata->password);
        if ($hashresult === false) {
            return response()->json([
                'status' => 'error',
                'message' => 'Incorrect Password'
            ], 401);
        }

        // Return user data through the api
        $user = [
            'id' => $userdata->id,
            'user_name' => $userdata->user_name,
            'twitter_handle' => $userdata->twitter_handle,
            'email' => $userdata->email
        ];
        return response()->json($user, 200);
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
