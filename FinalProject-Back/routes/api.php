<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//PUBLIC ROUTES
Route::post('register', 'App\Http\Controllers\AuthController@register');
Route::post('login', 'App\Http\Controllers\AuthController@login');


//AUTH ROUTES
Route::group(['middleware' => 'jwt.auth'], function() {
    Route::get('posts', 'App\Http\Controllers\PostController@index');
    Route::post('posts/create', 'App\Http\Controllers\PostController@store');
    Route::put('posts/{post}', 'App\Http\Controllers\PostController@update');
    Route::post('/logout', 'App\Http\Controllers\PostController@logout');
});
