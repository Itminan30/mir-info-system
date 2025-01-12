<?php

use App\Http\Controllers\CommentsController;
use App\Http\Controllers\FollowersController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\XusersController;
use Illuminate\Support\Facades\Route;

// Route for user related activities
Route::post("xusers/user", [XusersController::class, 'show']);
Route::delete("xusers/delete", [XusersController::class, 'destroy']);
Route::apiResource("xusers", XusersController::class)->except(['show', 'destroy']);

// Route for following related activities
Route::get("follow/{handle}", [FollowersController::class, 'index']);
Route::get("follow/{follower}/{following}", [FollowersController::class, 'show']);
Route::delete("follow/{follower_handle}/{following_handle}", [FollowersController::class, 'destroy']);
Route::apiResource("follow", FollowersController::class)->except(['index', 'show', 'destroy']);

// Route for post related activities
Route::get("post/user/{twitter_handle}", [PostsController::class, 'userPosts']);
Route::get("post/{search_term}", [PostsController::class, 'show']);
Route::delete("post/delete", [PostsController::class, 'destroy']);
Route::apiResource("post", PostsController::class)->except(['show', 'destroy']);

// Route for comment related activities
Route::get("comment/{post_id}", [CommentsController::class, 'show']);
Route::delete("comment/{comment_id}", [CommentsController::class, 'destroy']);
Route::apiResource("comment", CommentsController::class)->except(['show', 'destroy']);


Route::get("/", function () {
    return "API Created";
});
