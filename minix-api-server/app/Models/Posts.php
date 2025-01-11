<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    /** @use HasFactory<\Database\Factories\PostsFactory> */
    use HasFactory;

    protected $fillable = [
        'user_name',
        'twitter_handle',
        'tweet_title',
        'tweet_body'
    ];

    // Connect with the xusers table with posts table
    public function user()
    {
        return $this->belongsTo(XUsers::class, 'twitter_handle', 'twitter_handle');
    }

    public function comments()
    {
        return $this->hasMany(Comments::class, 'post_id', 'id');
    }
}
