<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use App\Http\Controllers\Controller;
use App\Models\Xusers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
    public function update(Request $request, $handle)
    {
        // Validate fields
        $request->validate([
            'post_id' => 'required|int',
            'password' => 'required|string',
            'tweet_title' => 'required|string',
            'tweet_body' => 'required|string'
        ]);

        // Check if the account exists
        $user = Xusers::where('twitter_handle', $handle)->first();
        if (!($user)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Account Not Found'
            ], 404);
        }

        // find the post
        $post = Posts::where('id', $request->post_id)->first();
        if (!($post)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Post not found'
            ], 404);
        }

        // Check if the owner of the post is trying to edit the post
        if ($post->twitter_handle !== $handle) {
            return response()->json([
                'status' => 'error',
                'message' => 'Don\'t have access to edit the post'
            ], 401);
        }

        // Check if the password is correct
        $hashresult = Hash::check($request->password, $user->password);
        if ($hashresult === false) {
            return response()->json([
                'status' => 'error',
                'message' => 'Incorrect password'
            ], 401);
        }

        // update the post
        $post->update([
            'tweet_title' => $request->tweet_title,
            'tweet_body' => $request->tweet_body
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Post updated successfully',
            'post' => $post
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        // Validate the fields
        $request->validate([
            'post_id' => 'required|int',
            'twitter_handle' => 'required|string',
            'password' => 'required|string',
        ]);

        // Find the user by twitter_handle
        $user = XUsers::where('twitter_handle', $request->twitter_handle)->first();

        // Check if user exists
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found',
            ], 404);
        }

        // Verify the password
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Password incorrect',
            ], 401);
        }

        // Find the post by ID and ensure it belongs to the user
        $post = Posts::where('id', $request->post_id)->where('twitter_handle', $request->twitter_handle)->first();

        if (!$post) {
            return response()->json([
                'status' => 'error',
                'message' => 'Post not found or does not belong to the user',
            ], 404);
        }

        // Delete the post
        $post->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Post deleted successfully',
        ], 200);
    }
}
