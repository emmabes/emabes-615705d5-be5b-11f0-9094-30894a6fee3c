import { Controller, Post, Body } from '@nestjs/common';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
  };
}

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() loginRequest: LoginRequest): LoginResponse {
    const { username, password } = loginRequest;
    
    // Simple hardcoded users
    const users = [
      { id: 1, username: 'admin', password: 'admin123' },
      { id: 2, username: 'owner', password: 'owner123' },
      { id: 3, username: 'user', password: 'user123' }
    ];
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Simple JWT-like token (base64 encoded user info)
    const token = Buffer.from(JSON.stringify({ id: user.id, username: user.username })).toString('base64');
    
    return {
      token,
      user: { id: user.id, username: user.username }
    };
  }
}
