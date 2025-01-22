<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PostController extends Controller
{
    public function index(): JsonResponse
    {
        $posts = Post::with('user:id,name,email')->get();

        return response()->json([
            'status' => '1',
            'posts' => $posts,
        ], 200);
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'title' => 'required|string',
                'description' => 'required|string',
            ]);

            $post = Post::create([
                'user_id' => auth()->user()->id,
                'title' => $request->title,
                'description' => $request->description,
            ]);

            return response()->json([
                'status' => '1',
                'message' => 'Post created successfully.',
                'post' => $post
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => '0',
                'message' => 'Failed to create post: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, Post $post): JsonResponse
    {
        try {
            if (auth()->user()->role !== 'admin') {
                return response()->json([
                    'status' => '0',
                    'message' => 'Only admins can edit posts.'
                ], 403);
            }

            $request->validate([
                'title' => 'required|string',
                'description' => 'required|string',
            ]);

            $post->update([
                'title' => $request->title,
                'description' => $request->description,
            ]);

            return response()->json([
                'status' => '1',
                'message' => 'Post updated successfully.',
                'post' => $post
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => '0',
                'message' => 'Failed to update post: ' . $e->getMessage(),
            ], 500);
        }
    }
}
