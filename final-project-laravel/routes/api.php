<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\TaskController;
use App\Models\Task;

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

Route::post('register', [AuthController::class, 'register']);
Route::post('login',[AuthController::class, 'login']);

//Web Display
Route::get('display/{id}', [TaskController::class, 'details']);


//Task
Route::post('createtask/{id}',[TaskController::class, 'create']);
Route::get('viewtask/{id}', [TaskController::class, 'index']);
Route::put('updateTask/{id}',[TaskController::class, 'edit']);
Route::put('deleteTask/{id}', [TaskController::class, 'delete']);
Route::get('countTask/{id}', [TaskController::class, 'count']);
Route::get('date',[TaskController::class, 'dateFormat']);



Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('logout',[AuthController::class, 'logout']);

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
