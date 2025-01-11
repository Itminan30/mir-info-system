<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use App\Http\Controllers\Controller;
use App\Models\Xusers;
use Illuminate\Http\Request;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Posts::orderBy('created_at', 'desc')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validating the fields
        $request->validate([
            'user_name' => 'required|string|max:255',
            'twitter_handle' => 'required|string|max:255',
            'tweet_title' => 'required|string',
            'tweet_body' => 'required|string'
        ]);

        // Check if the twitter_handle is incorrect
        if (!(Xusers::where('twitter_handle', $request->twitter_handle)->exists())) {
            return response()->json([
                'status' => 'error',
                'message' => 'User doesn\'t exists'
            ], 404);
        }

        // Creating post
        $newPost = Posts::create([
            'user_name' => $request->user_name,
            'twitter_handle' => $request->twitter_handle,
            'tweet_title' => $request->tweet_title,
            'tweet_body' => $request->tweet_body
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Post Created Successfully',
            'post' => $newPost
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($search_term)
    {
        // Using the search term to find matches in title or body
        $posts = Posts::where('tweet_title', 'LIKE', '%' . $search_term . '%')
            ->orWhere('tweet_body', 'LIKE', '%' . $search_term . '%')
            ->with(['user']) // Include user information
            ->orderBy('created_at', 'desc')
            ->get();

        // Checking if no post matches with the searched terms
        if ($posts->isEmpty()) {
            return response()->json([
                'status' => 'success',
                'message' => 'No posts found matching your search',
                'data' => []
            ]);
        }

        // Return the search results
        return response()->json([
            'status' => 'success',
            'message' => 'Posts found',
            'count' => $posts->count(),
            'data' => $posts
        ]);
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
