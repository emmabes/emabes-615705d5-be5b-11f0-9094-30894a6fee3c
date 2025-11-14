import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/controller/auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const mockConfigService = {
      get: jest.fn((key: string) => {
        const config = {
          'DEFAULT_ADMIN_USERNAME': 'admin',
          'DEFAULT_ADMIN_PASSWORD': 'admin123',
          'DEFAULT_OWNER_USERNAME': 'owner', 
          'DEFAULT_OWNER_PASSWORD': 'owner123',
          'DEFAULT_USER_USERNAME': 'user',
          'DEFAULT_USER_PASSWORD': 'user123'
        };
        return config[key];
      }),
    };

    controller = new AuthController(mockConfigService as any);
  });

  describe('login', () => {
    it('should return token and user for valid admin credentials', () => {
      const loginRequest = { username: 'admin', password: 'admin123' };

      const result = controller.login(loginRequest);

      expect(result.user.id).toBe(1);
      expect(result.user.username).toBe('admin');
      expect(result.token).toBeDefined();
    });

    it('should return token and user for valid owner credentials', () => {
      const loginRequest = { username: 'owner', password: 'owner123' };

      const result = controller.login(loginRequest);

      expect(result.user.id).toBe(2);
      expect(result.user.username).toBe('owner');
      expect(result.token).toBeDefined();
    });

    it('should throw error for invalid credentials', () => {
      const loginRequest = { username: 'admin', password: 'wrongpassword' };

      expect(() => controller.login(loginRequest)).toThrow('Invalid credentials');
    });

    it('should throw error for non-existent user', () => {
      const loginRequest = { username: 'nonexistent', password: 'password' };

      expect(() => controller.login(loginRequest)).toThrow('Invalid credentials');
    });

    it('should use constant-time comparison for security', () => {
      const loginRequest1 = { username: 'admin', password: 'a' };
      const loginRequest2 = { username: 'admin', password: 'admin12' };

      expect(() => controller.login(loginRequest1)).toThrow('Invalid credentials');
      expect(() => controller.login(loginRequest2)).toThrow('Invalid credentials');
    });
  });
});