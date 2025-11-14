import { Controller, Post, Body } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

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
  constructor(private configService: ConfigService) {}

  @Post('login')
  login(@Body() loginRequest: LoginRequest): LoginResponse {
    const { username, password } = loginRequest;
    
    const users = [
      { 
        id: 1, 
        username: this.configService.get('DEFAULT_ADMIN_USERNAME'), 
        password: this.configService.get('DEFAULT_ADMIN_PASSWORD') 
      },
      { 
        id: 2, 
        username: this.configService.get('DEFAULT_OWNER_USERNAME'), 
        password: this.configService.get('DEFAULT_OWNER_PASSWORD') 
      },
      { 
        id: 3, 
        username: this.configService.get('DEFAULT_USER_USERNAME'), 
        password: this.configService.get('DEFAULT_USER_PASSWORD') 
      }
    ];
    
    let foundUser = null;
    
    // Always check ALL users to prevent timing attacks
    for (const user of users) {
      const usernameMatch = this.safeCompare(user.username, username);
      const passwordMatch = this.safeCompare(user.password, password);
      
      if (usernameMatch && passwordMatch) {
        foundUser = user;
      }
    }
    
    if (!foundUser) {
      throw new Error('Invalid credentials');
    }
    
    // Simple JWT-like token (base64 encoded user info)
    const token = Buffer.from(JSON.stringify({ id: foundUser.id, username: foundUser.username })).toString('base64');
    
    return {
      token,
      user: { id: foundUser.id, username: foundUser.username }
    };
  }

  private safeCompare(a: string, b: string): boolean {
    if (!a || !b || a.length !== b.length) {
      return false;
    }
    return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
  }
}
