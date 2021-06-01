<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();

Route::group(['middleware' => 'guest'],function(){ 

    Route::get('/', function () {return view('welcome'); })->name('welcome_page');
    Route::post('/register','UserController@store')->name('register');
    Route::post('/trylogin','UserController@tryLogin')->name('trylogin');

});


//Logged In User    
Route::group(['middleware' => 'auth'],function(){

    Route::get('/checkConvo/{recieverId}', 'Message_UsersController@check');
    Route::post('/sendMessage', 'MessagesController@store')->name('sendMessage');

    Route::get('/loadMessage/{reciever}/{sender}', 'MessagesController@load');
    Route::get('/videocall', 'HomeController@videocall');
    Route::get('/retrieveMessages/{reciever}/{sender}/{lastMsgId}','MessagesController@retrieveNew');
    
Route::get('views/home', 'HomeController@home');
Route::get('views/upload', 'HomeController@upload');

});


Route::get('/logout','UserController@logout');

Route::get('/chat', 'HomeController@index');

Route::get('/home', 'HomeController@dashboard')->name('home');
