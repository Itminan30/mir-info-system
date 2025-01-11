<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use App\Http\Controllers\Controller;
use App\Models\Posts;
use App\Models\Xusers;
use Illuminate\Http\Request;

class CommentsController extends Controller
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
            'post_id' => 'required|int',
            'user_name' => 'required|string',
            'twitter_handle' => 'required|string',
            'comment_body' => 'required|string'
        ]);

        // Check if the post exists
        if (!(Posts::where('id', $request->post_id)->exists())) {
            return response()->json([
                'status' => 'error',
                'message' => 'Post not found'
            ], 404);
        }

        // Check if the twitter_handle exists
        if (!(Xusers::where('twitter_handle', $request->twitter_handle)->exists())) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }

        // Create the comment
        Comments::create($fields);

        return response()->json([
            'status' => 'success',
            'message' => 'Comment added successfully'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $post_id = (int) $request->post_id;

        // Find the post by ID
        $post = Posts::find($post_id);

        // Check if the post exists
        if (!$post) {
            return response()->json([
                'status' => 'error',
                'message' => 'Post not found',
            ], 404);
        }

        // Fetch all comments for the post
        $comments = $post->comments;

        return response()->json([
            'status' => 'success',
            'post_id' => $post_id,
            'comments' => $comments,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comments $comments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $comment_id)
    {
        // Validate the fields
        $request->validate([
            'twitter_handle' => 'required|string',
            'post_id' => 'required|integer',
        ]);

        // Find the comment by ID, post_id, and twitter_handle
        $comment = Comments::where('id', $comment_id)
            ->where('post_id', $request->post_id)
            ->where('twitter_handle', $request->twitter_handle)
            ->first();

        // Check if the comment exists
        if (!$comment) {
            return response()->json([
                'status' => 'error',
                'message' => 'Comment not found or does not belong to the user',
            ], 404);
        }

        // Delete the comment
        $comment->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Comment deleted successfully',
        ], 200);
    }
}
