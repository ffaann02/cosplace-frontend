import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../register/page';
import { register } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AuthProvider } from '@/context/auth-context';
import { apiClient } from '@/api';
import { useAuth } from '@/context/auth-context';
import '@testing-library/jest-dom';

// Mock apiClient
jest.mock('@/api', () => ({
  apiClient: {
    get: jest.fn().mockResolvedValue({
      status: 200,
      data: {
        user_id: '1',
        username: 'testuser'
      }
    }),
    post: jest.fn()
  }
}));
jest.mock('@/context/auth-context', () => {
    const originalModule = jest.requireActual('@/context/auth-context')
    return {
      ...originalModule,
      useAuth: jest.fn(() => ({
        setIsAuthenticated: jest.fn(),
        setUser: jest.fn(),
        user: null
      }))
    }
})
// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock other dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    status: "unauthenticated",
    data: null,
    update: jest.fn(),
  })),
}));

jest.mock('@/api/auth', () => ({
  register: jest.fn(),
}));

// สร้าง wrapper component
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <AuthProvider>
      {ui}
    </AuthProvider>
  );
};
  
  test('ตรวจสอบ checkbox การยอมรับเงื่อนไข', async () => {
    // Render the component
    render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );
  
    // Find form elements
    const firstNameInput = screen.getByPlaceholderText('ชื่อจริง');
    const lastNameInput = screen.getByPlaceholderText('นามสกุล');
    const phoneInput = screen.getByPlaceholderText('เบอร์โทรศัพท์');
    const dateOfBirthInput = screen.getByPlaceholderText('วันเกิด');
    const genderSelect = screen.getByText('เพศ');
    const usernameInput = screen.getByPlaceholderText('ชื่อผู้ใช้');
    const emailInput = screen.getByPlaceholderText('อีเมล');
    const passwordInput = screen.getByPlaceholderText('รหัสผ่าน');
    const confirmPasswordInput = screen.getByPlaceholderText('ยืนยันรหัสผ่าน');
    
    const checkbox = screen.getByText(/ฉันยอมรับเงื่อนไขและข้อตกลง/i);
    const submitButton = screen.getByText('สมัครบัญชี');
  
    // Fill out form
    fireEvent.change(firstNameInput, { target: { value: 'Test'}});
    fireEvent.change(lastNameInput, { target: { value: 'User'}});
    fireEvent.change(phoneInput, { target: { value: '0812345678'}});
    
    // Handle date picker
    fireEvent.change(dateOfBirthInput, '2000-01-01{enter}');
    fireEvent.click(genderSelect);
    const maleOption = screen.getByText('ชาย', {
        selector: '.ant-select-item-option-content'
      });
    fireEvent.click(maleOption);
    // Select gender with custom function
  
    fireEvent.change(usernameInput, { target: { value: 'testuser'}});
    fireEvent.change(emailInput, { target: { value: 'test@example.com'}});
    fireEvent.change(passwordInput, { target: { value: 'Password123!'}});
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123!'}});
  
    // Check terms checkbox
    fireEvent.click(checkbox);
  
    // Submit form
    fireEvent.click(submitButton);
  
    // Optional: Add assertions
    screen.debug(undefined,10000000); // Uncomment to see full DOM
  });
  
  // Add global mocks
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });