<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Xusers extends Model
{
    /** @use HasFactory<\Database\Factories\XusersFactory> */
    use HasFactory;

    protected $fillable = [
        'user_name',
        'twitter_handle',
        'email',
        'password'
    ];
}
