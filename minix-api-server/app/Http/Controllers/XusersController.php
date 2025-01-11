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
    public function update(Request $request, $handle)
    {
        // Validating fields - user can either change username or password
        $request->validate([
            'user_name' => 'sometimes|string|max:255',
            'password' => 'required|string|min:8',
            'new_password' => 'sometimes|string|min:8'
        ]);

        // Check if the account exists
        $olduser = Xusers::where('twitter_handle', $handle)->first();
        if (!($olduser)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Account Not Found'
            ], 404);
        }

        // Check if the password is correct
        $hashresult = Hash::check($request->password, $olduser->password);
        if ($hashresult === false) {
            return response()->json([
                'status' => 'error',
                'message' => 'Incorrect password'
            ], 401);
        }

        // update the user data
        $olduser->update([
            'user_name' => $request->user_name ?? $olduser->user_name,
            'password' => $request->new_password ? Hash::make($request->new_password) : $olduser->password
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Account updated successfully'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        // Validate the fields
        $request->validate([
            'twitter_handle' => 'required|string|max:255',
            'password' => 'required|string'
        ]);

        // Check if the user exists
        $user = Xusers::where('twitter_handle', $request->twitter_handle)->first();
        if (!($user)) {
            return response()->json([
                'status' => 'error',
                'message' => 'User account not found'
            ], 404);
        }

        // Check if the password is correct
        $hashresult = Hash::check($request->password, $user->password);
        if ($hashresult === false) {
            return response()->json([
                'status' => 'error',
                'message' => 'Incorrect password'
            ], 401);
        }

        // delete the user
        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'User deleted successfully'
        ], 200);
    }
}
