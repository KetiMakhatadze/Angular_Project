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
        try {
            $userData = $request->validated();

            $userData['password'] = bcrypt($userData['password']);
            $userData['role'] = 'user';

            $newUser = User::create($userData);

            $response = [
                'user' => $newUser,
                'message' => 'User registered successfully. Please log in.'
            ];

            return response()->json([
                'status' => '1',
                'user' => $response,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => '0',
                'message' => 'Registration failed: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $credentials = $request->validated();

            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'status' => '0',
                    'message' => 'Invalid credentials',
                ], 401);
            }

            $user = JWTAuth::user();

            return response()->json([
                'status' => '1',
                'user' => $user,
                'authorization' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ], 200);

        } catch (JWTException $e) {
            return response()->json([
                'status' => '0',
                'message' => 'Could not create token: ' . $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'status' => '0',
                'message' => 'Login failed: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function logout(): JsonResponse
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json([
                'status' => '1',
                'message' => 'User logged out successfully.'
            ], 200);

        } catch (JWTException $e) {
            return response()->json([
                'status' => '0',
                'message' => 'Failed to log out: ' . $e->getMessage(),
            ], 500);
        }
    }
}
