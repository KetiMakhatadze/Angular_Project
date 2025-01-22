<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $userData = $request->validated();

        $userData['password'] = bcrypt($userData['password']);
        $userData['role'] = 'user';

        $newUser = User::create($userData);

        $response = [
            'user' => $newUser,
            'message' => 'User registered successfully. Please log in.'
        ];

        return response()->json([
            'status' => '200',
            'user' => $response,
        ]);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid credentials',
                ], 401);
            }
        } catch (JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Could not create token',
            ], 500);
        }

        $user = JWTAuth::user();

        return response()->json([
            'status' => '200',
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }
}
