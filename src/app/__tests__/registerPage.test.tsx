import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../../app/register/page';
import { register } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AuthProvider } from '@/context/auth-context';
import { apiClient } from '@/api';

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

describe('Register Page - Equivalence Partitioning', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset mocks before each test
    (apiClient.get as jest.Mock).mockResolvedValue({
      status: 200,
      data: {
        user_id: '1',
        username: 'testuser'
      }
    });

    jest.mocked(useSession).mockReturnValue({
      status: "unauthenticated",
      data: null,
      update: jest.fn(),
    });
  });
  it('ไม่กรอกข้อมูลทั้งหมด', async () => {
    renderWithProviders(<Register />);
    const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
    await userEvent.click(submitButton);
  });

  // EP1: ชื่อ-นามสกุล
  describe('Name Validation', () => {
    // Valid Classes
    it('ยอมรับชื่อ-นามสกุลที่เป็นตัวอักษรภาษาไทย', async () => {
      renderWithProviders(<Register />);
      const firstNameInput = screen.getByPlaceholderText('ชื่อจริง');
      const lastNameInput = screen.getByPlaceholderText('นามสกุล');

      await userEvent.type(firstNameInput, 'สมชาย');
      await userEvent.type(lastNameInput, 'ใจดี');

      expect(firstNameInput).toHaveValue('สมชาย');
      expect(lastNameInput).toHaveValue('ใจดี');
    });

    it('ยอมรับชื่อ-นามสกุลที่เป็นตัวอักษรภาษาอังกฤษ', async () => {
      renderWithProviders(<Register />);
      const firstNameInput = screen.getByPlaceholderText('ชื่อจริง');
      const lastNameInput = screen.getByPlaceholderText('นามสกุล');

      await userEvent.type(firstNameInput, 'John');
      await userEvent.type(lastNameInput, 'Doe');

      expect(firstNameInput).toHaveValue('John');
      expect(lastNameInput).toHaveValue('Doe');
    });

    // Invalid Classes
    it('แสดง error เมื่อไม่กรอกชื่อ-นามสกุล', async () => {
      renderWithProviders(<Register />);
      const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
      const acceptCheckbox = screen.getByRole('checkbox', { name: 'ฉันยอมรับเงื่อนไขและข้อตกลง' });
      
      await userEvent.click(acceptCheckbox);
      await userEvent.click(submitButton);

      await waitFor(() => {
        const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
        const errorMessages = Array.from(errorElements).map(el => el.textContent);
        expect(errorMessages).toContain('โปรดกรอกชื่อจริง');
        expect(errorMessages).toContain('โปรดกรอกนามสกุล');
      });
    });

    
  });

  // EP2: เบอร์โทรศัพท์
  describe('Phone Number Validation', () => {
    // Valid Classes
    it('ยอมรับเบอร์โทรศัพท์ที่มี 10 หลักและขึ้นต้นด้วย 0', async () => {
      renderWithProviders(<Register />);
      const phoneInput = screen.getByPlaceholderText('เบอร์โทรศัพท์');
      await userEvent.type(phoneInput, '0812345678');
      expect(phoneInput).toHaveValue('0812345678');
    });

    // Invalid Classes
    it('แสดง error เมื่อไม่กรอกเบอร์โทรศัพท์', async () => {
      renderWithProviders(<Register />);
      const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
      const acceptCheckbox = screen.getByRole('checkbox', { name: 'ฉันยอมรับเงื่อนไขและข้อตกลง' });
      
      await userEvent.click(acceptCheckbox);
      await userEvent.click(submitButton);

      await waitFor(() => {
        const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
        const errorMessages = Array.from(errorElements).map(el => el.textContent);
        expect(errorMessages).toContain('โปรดกรอกเบอร์โทรศัพท์มือถือ');
      });
    });

    it('แสดง error เมื่อกรอกเบอร์โทรศัพท์น้อยกว่า 10 หลัก', async () => {
      renderWithProviders(<Register />);
      const phoneInput = screen.getByPlaceholderText('เบอร์โทรศัพท์');
      await userEvent.type(phoneInput, '081234567');
      const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
      await userEvent.click(submitButton);

      await waitFor(() => {
        const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
        const errorMessages = Array.from(errorElements).map(el => el.textContent);
        expect(errorMessages).toContain('เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก');
      });
    });

    it('แสดง error เมื่อกรอกเบอร์โทรศัพท์ากกว่า 10 หลัก', async () => {
      renderWithProviders(<Register />);
      const phoneInput = screen.getByPlaceholderText('เบอร์โทรศัพท์');
      await userEvent.type(phoneInput, '08123456789');
      const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
      await userEvent.click(submitButton);

      await waitFor(() => {
        const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
        const errorMessages = Array.from(errorElements).map(el => el.textContent);
        expect(errorMessages).toContain('เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก');
      });
    });

    it('แสดง error เมื่อกรอกเบอร์โทรศัพท์ที่มีตัวอักษรปน', async () => {
      renderWithProviders(<Register />);
      const phoneInput = screen.getByPlaceholderText('เบอร์โทรศัพท์');
      await userEvent.type(phoneInput, '081abc4567');
      const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
      await userEvent.click(submitButton);

      await waitFor(() => {
        const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
        const errorMessages = Array.from(errorElements).map(el => el.textContent);
        expect(errorMessages).toContain('เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก');
      });
    });
  });

  // EP3: อีเมล
  describe('Email Validation', () => {
    // Valid Class
    it('ยอมรับอีเมลที่ถูกต้อง', async () => {
      renderWithProviders(<Register />);
      const emailInput = screen.getByPlaceholderText('อีเมล');
      await userEvent.type(emailInput, 'test@example.com');
      expect(emailInput).toHaveValue('test@example.com');
    });

    // Invalid Classes
    it('ไม่ยอมรับอีเมลที่ไม่มี @', async () => {
      renderWithProviders(<Register />);
      const emailInput = screen.getByPlaceholderText('อีเมล');
      await userEvent.type(emailInput, 'testexample.com');
      const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
      await userEvent.click(submitButton);

      expect(await screen.findByText('รูปแบบอีเมลไม่ถูกต้อง')).toBeInTheDocument();
    });

    it('ไม่ยอมรับอีเมลที่ไม่มีโดเมน', async () => {
      renderWithProviders(<Register />);
      const emailInput = screen.getByPlaceholderText('อีเมล');
      await userEvent.type(emailInput, 'test@');
      const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
      await userEvent.click(submitButton);

      expect(await screen.findByText('รูปแบบอีเมลไม่ถูกต้อง')).toBeInTheDocument();
    });
  });

  // EP4: รหัสผ่าน
  describe('Password Validation', () => {
    // Valid Class
    it('ยอมรับรหัสผ่านที่มีตัวอักษรและตัวเลข 8-20 ตัว', async () => {
      renderWithProviders(<Register />);
      const passwordInput = screen.getByPlaceholderText('รหัสผ่าน');
      const confirmPasswordInput = screen.getByPlaceholderText('ยืนยันรหัสผ่าน');

      await userEvent.type(passwordInput, 'Password123');
      await userEvent.type(confirmPasswordInput, 'Password123');

      expect(passwordInput).toHaveValue('Password123');
      expect(confirmPasswordInput).toHaveValue('Password123');
    });

    // Invalid Classes
    it('แสดง error เมื่อไม่กรอกรหัสผ่าน', async () => {
      renderWithProviders(<Register />);
      const acceptCheckbox = screen.getByRole('checkbox', { name: 'ฉันยอมรับเงื่อนไขและข้อตกลง' });
      await userEvent.click(acceptCheckbox);
      const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
      await userEvent.click(submitButton);

      await waitFor(() => {
        const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
        const errorMessages = Array.from(errorElements).map(el => el.textContent);
        expect(errorMessages).toContain('โปรดกรอกรหัสผ่าน');
      });
    });

    it('แสดง error เมื่อกรอกรหัสผ่านน้อยกว่า 8 ตัวอักษร', async () => {
      renderWithProviders(<Register />);
      const passwordInput = screen.getByPlaceholderText('รหัสผ่าน');
      await userEvent.type(passwordInput, 'Pass123');
      const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
      await userEvent.click(submitButton);

      await waitFor(() => {
        const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
        const errorMessages = Array.from(errorElements).map(el => el.textContent);
        expect(errorMessages).toContain('รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร');
      });
    });

    it('แสดง error เมื่อกรอกรหัสผ่านมากกว่า 50 ตัวอักษร', async () => {
      renderWithProviders(<Register />);
      const passwordInput = screen.getByPlaceholderText('รหัสผ่าน');
      await userEvent.type(passwordInput, 'VeryLongPassword12345678901aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
      await userEvent.click(submitButton);

      await waitFor(() => {
        const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
        const errorMessages = Array.from(errorElements).map(el => el.textContent);
        expect(errorMessages).toContain('รหัสผ่านต้องมีความยาวไม่เกิน 50 ตัวอักษร');
      });
    });

    it('แสดง error เมื่อกรอกรหัสผ่านที่ไม่มีตัวอักษร', async () => {
      renderWithProviders(<Register />);
      const passwordInput = screen.getByPlaceholderText('รหัสผ่าน');
      await userEvent.type(passwordInput, '12345678');
      const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
      await userEvent.click(submitButton);

      await waitFor(() => {
        const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
        const errorMessages = Array.from(errorElements).map(el => el.textContent);
        expect(errorMessages).toContain('รหัสผ่านต้องมีตัวอักษรอย่างน้อย 1 ตัว');
      });
    });

    // it('แสดง error เมื่อกรอกรหัสผ่านที่ไม่มีตัวเลข', async () => {
    //   renderWithProviders(<Register />);
    //   const passwordInput = screen.getByPlaceholderText('รหัสผ่าน');
    //   await userEvent.type(passwordInput, 'Password');
    //   const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
    //   await userEvent.click(submitButton);

    //   await waitFor(() => {
    //     const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
    //     const errorMessages = Array.from(errorElements).map(el => el.textContent);
    //     expect(errorMessages).toContain('รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว');
    //   });
    // });
  });

  // EP5: ยืนยันรหัสผ่าน
  describe('Confirm Password Validation', () => {
    // Valid Class
    it('ยอมรับการยืนยันรหัสผ่านที่ตรงกัน', async () => {
      renderWithProviders(<Register />);
      const passwordInput = screen.getByPlaceholderText('รหัสผ่าน');
      const confirmPasswordInput = screen.getByPlaceholderText('ยืนยันรหัสผ่าน');

      await userEvent.type(passwordInput, 'Password123');
      await userEvent.type(confirmPasswordInput, 'Password123');

      const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
      await userEvent.click(submitButton);

      // ตรวจสอบว่าไม่มี error message เรื่องรหัสผ่านไม่ตรงกัน
      const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
      const errorMessages = Array.from(errorElements).map(el => el.textContent);
      expect(errorMessages).not.toContain('รหัสผ่านไม่ตรงกัน');
    });

    // Invalid Classes
    it('แสดง error เมื่อไม่กรอกการยืนยันรหัสผ่าน', async () => {
      renderWithProviders(<Register />);
      const acceptCheckbox = screen.getByRole('checkbox', { name: 'ฉันยอมรับเงื่อนไขและข้อตกลง' });
      await userEvent.click(acceptCheckbox);
      const passwordInput = screen.getByPlaceholderText('รหัสผ่าน');
      await userEvent.type(passwordInput, 'Password123');
      
      const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
      await userEvent.click(submitButton);

      await waitFor(() => {
        const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
        const errorMessages = Array.from(errorElements).map(el => el.textContent);
        expect(errorMessages).toContain('โปรดกรอกรหัสผ่าน');
      });
    });

    it('แสดง error เมื่อยืนยันรหัสผ่านไม่ตรงกัน', async () => {
      renderWithProviders(<Register />);
      const passwordInput = screen.getByPlaceholderText('รหัสผ่าน');
      const confirmPasswordInput = screen.getByPlaceholderText('ยืนยันรหัสผ่าน');

      await userEvent.type(passwordInput, 'Password123');
      await userEvent.type(confirmPasswordInput, 'Password456');
      
      const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
      await userEvent.click(submitButton);

      await waitFor(() => {
        const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
        const errorMessages = Array.from(errorElements).map(el => el.textContent);
        expect(errorMessages).toContain('รหัสผ่านไม่ตรงกัน');
      });
    });
  });

  // EP6: การยอมรับเงื่อนไข
  describe('Terms Acceptance', () => {
    // Valid Class
    it('ปุ่มสมัครทำงานเมื่อติ๊กยอมรับเงื่อนไข', async () => {
      renderWithProviders(<Register />);
      const acceptCheckbox = screen.getByRole('checkbox', { name: 'ฉันยอมรับเงื่อนไขและข้อตกลง' });
      await userEvent.click(acceptCheckbox);
      
      const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
      expect(submitButton).not.toBeDisabled();
    });

    // Invalid Class
    it('ปุ่มสมัครถูก disable เมื่อไม่ติ๊กยอมรับเงื่อนไข', () => {
      renderWithProviders(<Register />);
      const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
      expect(submitButton).toBeDisabled();
    });
  });

  // EP7: วันเกิด
  describe('Birthday Validation', () => {
    // Valid Classes
    it('ยอมรับวันเกิดที่ผ่านมาแล้วและอายุมากกว่า 18 ปี', async () => {
      renderWithProviders(<Register />);
      const birthdayPicker = screen.getByPlaceholderText('วันเกิด');
      
      // สมมติว่าใช้ Ant Design DatePicker
      await userEvent.click(birthdayPicker);
      // เลือกวันที่ (ต้องปรับตามวิธีการเลือกวันที่ของ component ที่ใช้)
      const validDate = new Date();
      validDate.setFullYear(validDate.getFullYear() - 20); // อายุ 20 ปี
      
      // ตรวจสอบว่าไม่มี error
      const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
      expect(errorElements.length).toBe(0);
    });

    // Invalid Classes
    it('แสดง error เมื่อไม่เลือกวันเกิด', async () => {
      renderWithProviders(<Register />);
      const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
      const acceptCheckbox = screen.getByRole('checkbox', { name: 'ฉันยอมรับเงื่อนไขและข้อตกลง' });
      
      await userEvent.click(acceptCheckbox);
      await userEvent.click(submitButton);

      await waitFor(() => {
        const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
        const errorMessages = Array.from(errorElements).map(el => el.textContent);
        expect(errorMessages).toContain('โปรดเลือกวันเกิด');
      });
    });

    it('แสดง error เมื่อเลือกวันเกิดในอนาคต', async () => {
      renderWithProviders(<Register />);
      const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
      const birthdayPicker = screen.getByPlaceholderText('วันเกิด');
      
      // เลือกวันที่ในอนาคต
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      
      await userEvent.click(submitButton);

      await waitFor(() => {
        const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
        const errorMessages = Array.from(errorElements).map(el => el.textContent);
        expect(errorMessages).toContain('วันเกิดต้องไม่เป็นวันที่ในอนาคต');
      });
    });

    // it('แสดง error เมื่ออายุน้อยกว่า 18 ปี', async () => {
    //   renderWithProviders(<Register />);
    //   const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
    //   const birthdayPicker = screen.getByPlaceholderText('เลือกวันเกิด');
      
    //   // เลือกวันที่ที่ทำให้อายุน้อยกว่า 18 ปี
    //   const underageDate = new Date();
    //   underageDate.setFullYear(underageDate.getFullYear() - 15);
      
    //   await userEvent.click(submitButton);

    //   await waitFor(() => {
    //     const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
    //     const errorMessages = Array.from(errorElements).map(el => el.textContent);
    //     expect(errorMessages).toContain('ต้องมีอายุ 18 ปีขึ้นไป');
    //   });
    // });
  });

  // EP8: เพศ
  describe('Gender Validation', () => {
    // Valid Class
    it('ยอมรับการเลือกเพศ (ชาย/หญิง/อื่นๆ)', async () => {
      renderWithProviders(<Register />);
      
      // หา select box จาก placeholder
      const genderSelect = screen.getByRole('combobox');
      await userEvent.click(genderSelect);
      
      // เลือกตัวเลือกจาก dropdown
      const maleOption = screen.getByTitle('ชาย');
      await userEvent.click(maleOption);
      
      expect(screen.getByText('male')).toBeInTheDocument();
    });

    // Invalid Class
    it('แสดง error เมื่อไม่เลือกเพศ', async () => {
      renderWithProviders(<Register />);
      const acceptCheckbox = screen.getByRole('checkbox', { name: 'ฉันยอมรับเงื่อนไขและข้อตกลง' });
      await userEvent.click(acceptCheckbox);
      const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
      await userEvent.click(submitButton);

      await waitFor(() => {
        const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
        const errorMessages = Array.from(errorElements).map(el => el.textContent);
        expect(errorMessages).toContain('โปรดเลือกเพศ');
      });
    });
  });

  // EP9: Username
  describe('Username Validation', () => {
    // Valid Classes
    it('ยอมรับ username ที่เป็นตัวอักษรภาษาอังกฤษและตัวเลข 6-20 ตัว', async () => {
      renderWithProviders(<Register />);
      const usernameInput = screen.getByPlaceholderText('ชื่อผู้ใช้');
      await userEvent.type(usernameInput, 'johndoe123');
      expect(usernameInput).toHaveValue('johndoe123');
    });

    // Invalid Classes
    it('แสดง error เมื่อไม่กรอก username', async () => {
      renderWithProviders(<Register />);
      const acceptCheckbox = screen.getByRole('checkbox', { name: 'ฉันยอมรับเงื่อนไขและข้อตกลง' });
      await userEvent.click(acceptCheckbox);
      const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
      await userEvent.click(submitButton);

      await waitFor(() => {
        const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
        const errorMessages = Array.from(errorElements).map(el => el.textContent);
        console.log('Error Messages:', errorMessages);
        expect(errorMessages).toContain('โปรดกรอก Username');
      });
    });

    // it('แสดง error เมื่อกรอก username น้อยกว่า 6 ตัวอักษร', async () => {
    //   renderWithProviders(<Register />);
    //   const usernameInput = screen.getByPlaceholderText('ชื่อผู้ใช้');
    //   await userEvent.type(usernameInput, 'john');
    //   const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
    //   await userEvent.click(submitButton);

    //   await waitFor(() => {
    //     const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
    //     const errorMessages = Array.from(errorElements).map(el => el.textContent);
    //     expect(errorMessages).toContain('Username ต้องมีความยาว 6-20 ตัวอักษร');
    //   });
    // });

    // it('แสดง error เมื่อกรอก username มากกว่า 20 ตัวอักษร', async () => {
    //   renderWithProviders(<Register />);
    //   const usernameInput = screen.getByPlaceholderText('ชื่อผู้ใช้');
    //   await userEvent.type(usernameInput, 'johndoeverylongusername123456');
    //   const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
    //   await userEvent.click(submitButton);

    //   await waitFor(() => {
    //     const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
    //     const errorMessages = Array.from(errorElements).map(el => el.textContent);
    //     expect(errorMessages).toContain('Username ต้องมีความยาว 6-20 ตัวอักษร');
    //   });
    // });

    // it('แสดง error เมื่อกรอก username ที่มีอักขระพิเศษ', async () => {
    //   renderWithProviders(<Register />);
    //   const usernameInput = screen.getByPlaceholderText('ชื่อผู้ใช้');
    //   await userEvent.type(usernameInput, 'john@doe#123');
    //   const submitButton = screen.getByRole('button', { name: 'สมัครบัญชี' });
    //   await userEvent.click(submitButton);

    //   await waitFor(() => {
    //     const errorElements = document.querySelectorAll('.ant-form-item-explain-error');
    //     const errorMessages = Array.from(errorElements).map(el => el.textContent);
    //     expect(errorMessages).toContain('Username ต้องเป็นตัวอักษรภาษาอังกฤษหรือตัวเลขเท่านั้น');
    //   });
    // });
  });

  
}); 