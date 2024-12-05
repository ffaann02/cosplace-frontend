import { login, register, logout } from '@/api/auth';
import { apiClient, apiClientWithAuth } from '@/api';

jest.mock('@/api', () => ({
  apiClient: {
    post: jest.fn(),
  },
  apiClientWithAuth: {
    post: jest.fn(),
  },
}));

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case for login
  it('ควรเข้าสู่ระบบได้สำเร็จ', async () => {
    (apiClient.post as jest.Mock).mockResolvedValue({
      status: 200,
      data: {
        user_id: '1',
        username: 'testuser',
        role: 'user',
        seller_id: '123',
      },
    });

    const user = await login('testuser', 'password');
    expect(user).toEqual({
      user_id: '1',
      username: 'testuser',
    });
  });

  it('ควรโยนข้อผิดพลาดเมื่อเข้าสู่ระบบล้มเหลว', async () => {
    (apiClient.post as jest.Mock).mockResolvedValue({
      status: 400,
    });

    await expect(login('testuser', 'wrongpassword')).rejects.toThrow('Login failed');
  });

  // Test case for register
  it('ควรลงทะเบียนผู้ใช้ได้สำเร็จ', async () => {
    const mockUser = {
      first_name: 'John',
      last_name: 'Doe',
      phone_number: '0812345678',
      date_of_birth: '2000-01-01',
      gender: 'male',
      username: 'johndoe',
      email: 'john@example.com',
      password: 'Password123',
    };

    (apiClient.post as jest.Mock).mockResolvedValue({
      status: 201,
      data: {
        token: 'mockToken',
        user: mockUser,
      },
    });

    const response = await register(mockUser);
    expect(response).toEqual({
      token: 'mockToken',
      user: mockUser,
    });
  });

  it('ควรโยนข้อผิดพลาดเมื่อการลงทะเบียนล้มเหลว', async () => {
    const mockUser = {
      first_name: 'John',
      last_name: 'Doe',
      phone_number: '0812345678',
      date_of_birth: '2000-01-01',
      gender: 'male',
      username: 'johndoe',
      email: 'john@example.com',
      password: 'Password123',
    };

    (apiClient.post as jest.Mock).mockResolvedValue({
      status: 400,
    });

    await expect(register(mockUser)).rejects.toThrow('Register failed');
  });

  // Test case for logout
  it('ควรออกจากระบบได้สำเร็จ', async () => {
    (apiClientWithAuth.post as jest.Mock).mockResolvedValue({
      status: 200,
    });

    await expect(logout()).resolves.toBeUndefined();
  });

  it('ควรโยนข้อผิดพลาดเมื่อการออกจากระบบล้มเหลว', async () => {
    (apiClientWithAuth.post as jest.Mock).mockResolvedValue({
      status: 400,
    });

    await expect(logout()).rejects.toThrow('Logout failed');
  });
});
