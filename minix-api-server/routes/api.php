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
Route::apiResource("follow", FollowersController::class);

// Route for post related activities
Route::apiResource("post", PostsController::class);

// Route for comment related activities
Route::apiResource("comment", CommentsController::class);


Route::get("/", function() {
    return "API Created";
});
