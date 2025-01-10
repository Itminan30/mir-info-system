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
        Schema::create('xusers', function (Blueprint $table) {
            $table->id();
            $table->string('user_name');
            $table->string('twitter_handle')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->primary(['id', 'twitter_handle', 'email']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('xusers');
    }
};
