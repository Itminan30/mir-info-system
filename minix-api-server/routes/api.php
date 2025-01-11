<?php

use App\Http\Controllers\CommentsController;
use App\Http\Controllers\FollowersController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\XusersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Route for user related activities
Route::post("xusers/user", [XusersController::class, 'show']);
Route::delete("xusers/delete", [XusersController::class, 'destroy']);
Route::apiResource("xusers", XusersController::class)->except(['show', 'destroy']);

// Route for following related activities
Route::get("follow/{handle}", [FollowersController::class, 'show']);
Route::delete("follow/{follower_handle}/{following_handle}", [FollowersController::class, 'destroy']);
Route::apiResource("follow", FollowersController::class)->except(['show', 'destroy']);

// Route for post related activities
Route::get("post/{search_term}", [PostsController::class, 'show']);
Route::delete("post/delete", [PostsController::class, 'destroy']);
Route::apiResource("post", PostsController::class)->except(['show', 'destroy']);

// Route for comment related activities
Route::apiResource("comment", CommentsController::class);


Route::get("/", function () {
    return "API Created";
});
