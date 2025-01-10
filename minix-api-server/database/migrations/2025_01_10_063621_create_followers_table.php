<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('followers', function (Blueprint $table) {
            $table->id();
            $table->string('follower_handle');
            $table->string('following_handle');
            $table->timestamps();

            // Foreign keys
            $table->foreign('follower_handle')
                ->references('twitter_handle')
                ->on('xusers')
                ->onDelete('cascade');

            $table->foreign('following_handle')
                ->references('twitter_handle')
                ->on('xusers')
                ->onDelete('cascade');

            // Unique constraint to prevent duplicate follows
            $table->unique(['follower_handle', 'following_handle']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('followers');
    }
};
