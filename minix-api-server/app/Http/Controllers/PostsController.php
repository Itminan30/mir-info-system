<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return "ALL posts";
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_name' => 'required|string|max:255',
            'twitter_handle' => 'required|string|max:255',
            'tweet_title' => 'required|string',
            'tweet_body' => 'required|string'
        ]);

        $newPost = Posts::create([
            'user_name' => $request->user_name,
            'twitter_handle' => $request->twitter_handle,
            'tweet_title' => $request->tweet_title,
            'tweet_body' => $request->tweet_body
        ]);

        return response()->json([
            'message' => 'Post Created Successfully',
            'post' => $newPost
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Posts $posts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Posts $posts)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Posts $posts)
    {
        //
    }
}
