<?php

use App\Http\Controllers\FollowersController;
use App\Http\Controllers\XusersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Route for user related activities
Route::apiResource("xusers", XusersController::class);

// Route for following related activites
Route::apiResource("follow", FollowersController::class);


Route::get("/", function() {
    return "API Created";
});
