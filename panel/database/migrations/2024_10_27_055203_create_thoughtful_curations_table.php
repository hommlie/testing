<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateThoughtfulCurationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('thoughtful_curations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('video')->nullable(); // Path to the video file
            $table->string('thumbnail')->nullable();// Path to the thumbnail image
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('thoughtful_curations');
    }
}
