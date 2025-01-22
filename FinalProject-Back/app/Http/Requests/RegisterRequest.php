<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'min:3', 'max:15', 'regex:/^[a-z0-9]*$/'],
            'email' => ['required', 'email:strict', 'unique:users,email', 'max:255'],
            'password' => ['required', 'min:8', 'max:20', 'regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/'],
            'role' => ['required', 'max:10'], // Fixed the spacing in 'max:10'
        ];
    }
}
