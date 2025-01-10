<?php

namespace App\Http\Controllers;

use App\Models\Followers;
use App\Http\Controllers\Controller;
use App\Models\Xusers;
use Illuminate\Http\Request;

class FollowersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validating the fields
        $fields = $request->validate([
            'follower_handle' => 'required|string|max:255',
            'following_handle' => 'required|string|max:255'
        ]);

        // Checking if the user is trying to follow own account
        if ($request->following_handle === $request->follower_handle) {
            return response()->json([
                'status' => 'error',
                'message' => 'You cannot follow yourself'
            ], 400);
        }

        // Check if the followed account exists
        if (!(Xusers::where('twitter_handle', $request->following_handle)->exists())) {
            return response()->json([
                'status' => 'error',
                'message' => 'User doesn\'t exists'
            ], 404);
        }

        // Check if the user is trying to follow another user again
        $existingFollow = Followers::where('follower_handle', $request->follower_handle)
            ->where('following_handle', $request->following_handle)
            ->first();

        if ($existingFollow) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are already following ' . $request->following_handle
            ], 400);
        }


        // Adding following data to database
        Followers::create($fields);

        return response()->json([
            "message" => "Successfully Followed " . $request->following_handle
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Followers $followers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Followers $followers)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Followers $followers)
    {
        //
    }
}
