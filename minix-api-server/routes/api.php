<?php

use App\Http\Controllers\XusersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::apiResource("xusers", XusersController::class);

Route::get("/", function() {
    return "API Created";
});
