<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $userData = $request->validated();

        $userData['password'] = bcrypt($userData['password']);

        $newUser = User::create($userData);

        $response = [
            'user' => $newUser
        ];

        return response()->json($response, 201);
    }
}
