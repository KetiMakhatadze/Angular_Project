<?php

use Illuminate\Support\Facades\Route;

//PUBLIC ROUTES
Route::post('register', 'App\Http\Controllers\AuthController@register');
Route::post('login', 'App\Http\Controllers\AuthController@login');


//AUTH ROUTES
Route::group(['middleware' => 'jwt.auth'], function() {
    Route::get('info', 'App\Http\Controllers\PostController@index');
    Route::post('posts/create', 'App\Http\Controllers\PostController@store');
    Route::put('posts/{post}', 'App\Http\Controllers\PostController@update');
    Route::post('/logout', 'App\Http\Controllers\PostController@logout');
});
