<?php

namespace App\Http\Controllers;

use App\Models\Followers;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFollowersRequest;
use App\Http\Requests\UpdateFollowersRequest;

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
    public function store(StoreFollowersRequest $request)
    {
        //
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
    public function update(UpdateFollowersRequest $request, Followers $followers)
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
