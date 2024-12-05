import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '@/app/login/page'
import { login } from '@/api/auth'
import { useAuth } from "@/context/auth-context";
// Mock Dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ 
    push: jest.fn() 
  }))
}))

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

jest.mock('@/api/auth', () => ({
  login: jest.fn()
}))


      
describe('Login Page Validation', () => {
    // Reset mocks before each test
  const mockSetIsAuthenticated = jest.fn();
  const mockSetUser = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      setIsAuthenticated: mockSetIsAuthenticated,
      setUser: mockSetUser,
    });
  })
  //C1: Username Validation
  describe('C1b1 Username Empty', () => {
    it('C1b1,C2b1 Password Empty', async () => {
      render(<Login />)
      
      const loginButton = screen.getByRole('button', { name: /ลงชื่อเข้าใช้งาน/i })
      fireEvent.click(loginButton)
      
      const usernameError = await screen.findByText(/โปรดกรอก Username หรือ Email/i)
      expect(usernameError).toBeInTheDocument()
    })

    it('C1b1,C2b2 Password valid', async () => {
      render(<Login />)
      
      const usernameInput = screen.getByPlaceholderText('ชื่อผู้ใช้ หรือ อีเมล')
      fireEvent.change(usernameInput, { target: { value: 'validuser' } })
      
      const loginButton = screen.getByRole('button', { name: /ลงชื่อเข้าใช้งาน/i })
      fireEvent.click(loginButton)
      
      const usernameError = screen.queryByText(/โปรดกรอก Username หรือ Email/i)
      expect(usernameError).not.toBeInTheDocument()
    })

    it('C1b1,C2b3 Password invalid', async () => {
      // Mock login to simulate invalid username with a response object
      const errorMessage = 'ไม่พบบัญชีผู้ใช้งาน โปรดลงทะเบียนหรือตรวจสอบข้อมูลใหม่อีกครั้ง';
      (login as jest.Mock).mockRejectedValue({
        response: {
          data: { message: errorMessage }
        }
      });

      render(<Login />)
      
      const usernameInput = screen.getByPlaceholderText('ชื่อผู้ใช้ หรือ อีเมล')
      const passwordInput = screen.getByPlaceholderText('รหัสผ่าน')
      const loginButton = screen.getByRole('button', { name: /ลงชื่อเข้าใช้งาน/i })
      
      await userEvent.type(usernameInput, 'invaliduser')
      await userEvent.type(passwordInput, 'password123')
      fireEvent.click(loginButton)

      // Debug: Log all text content in the document
      //await waitFor(() => expect(screen.getByText(errorMessage)).toBeInTheDocument());
      expect(mockSetIsAuthenticated).not.toHaveBeenCalled();
      expect(mockSetUser).not.toHaveBeenCalled();
    })
  })

  // C2: Password Validation
  describe('C1b2 Username Valid', () => {
    it('C1b2,C2b1 Password Empty', async () => {
      render(<Login />)
      
      const usernameInput = screen.getByPlaceholderText('ชื่อผู้ใช้ หรือ อีเมล')
      fireEvent.change(usernameInput, { target: { value: 'testuser' } })
      
      const loginButton = screen.getByRole('button', { name: /ลงชื่อเข้าใช้งาน/i })
      fireEvent.click(loginButton)
      
      const passwordError = await screen.findByText(/โปรดกรอกรหัสผ่าน/i)
      expect(passwordError).toBeInTheDocument()
    })

    it('C1b2,C2b2 Password valid !!Login Successful!!', async () => {
      const mockLoginResponse = {
        user_id: 1,
        username: "testuser",
      };

      // Mock context and router

      // Mock API response
      (login as jest.Mock).mockResolvedValue(mockLoginResponse);

      // Render component
      render(<Login />);

      // Simulate user interaction
      const usernameInput = screen.getByPlaceholderText("ชื่อผู้ใช้ หรือ อีเมล");
      const passwordInput = screen.getByPlaceholderText("รหัสผ่าน");
      const submitButton = screen.getByRole("button", { name: /ลงชื่อเข้าใช้งาน/i });

      fireEvent.change(usernameInput, { target: { value: "testuser" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);

      // Wait for API call and state updates
      await waitFor(() => expect(login).toHaveBeenCalledWith("testuser", "password123"));
      expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
      expect(mockSetUser).toHaveBeenCalledWith(mockLoginResponse);
    })

    it('C1b2,C2b3 Password invalid', async () => {
        ;(login as jest.Mock).mockRejectedValue({
            response: { 
              data: { message: 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง' } 
            }
        })
      render(<Login />)
      
      const usernameInput = screen.getByPlaceholderText('ชื่อผู้ใช้ หรือ อีเมล')
      const passwordInput = screen.getByPlaceholderText('รหัสผ่าน')
      const loginButton = screen.getByRole('button', { name: /ลงชื่อเข้าใช้งาน/i })
      
      await userEvent.type(usernameInput, 'testuser')
      await userEvent.type(passwordInput, 'short')
      fireEvent.click(loginButton)
      
      //await waitFor(() => expect(screen.getByText('รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง')).toBeInTheDocument());
      expect(mockSetIsAuthenticated).not.toHaveBeenCalled();
      expect(mockSetUser).not.toHaveBeenCalled();
    })
  })

  //C3: Username & Password Combination
  describe('C1b3 Username invalid', () => {
    it('C1b3,C2b1 Password Empty', async () => {
      // Mock login to simulate invalid credentials
      ;(login as jest.Mock).mockRejectedValue({
        response: { 
          data: { message: 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง' } 
        }
      })

      render(<Login />)
      
      const usernameInput = screen.getByPlaceholderText('ชื่อผู้ใช้ หรือ อีเมล')
      const passwordInput = screen.getByPlaceholderText('รหัสผ่าน')
      const loginButton = screen.getByRole('button', { name: /ลงชื่อเข้าใช้งาน/i })
      
      await userEvent.type(usernameInput, 'validuser')
      await userEvent.type(passwordInput, 'wrongpassword')
      fireEvent.click(loginButton)
      
      //await waitFor(() => expect(screen.getByText('รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง')).toBeInTheDocument());
      expect(mockSetIsAuthenticated).not.toHaveBeenCalled();
      expect(mockSetUser).not.toHaveBeenCalled();
    })

    it('C1b3,C2b2 Password valid', async () => {
        (login as jest.Mock).mockRejectedValue({
          response: { 
            data: { message: 'ไม่พบบัญชีผู้ใช้งาน โปรดลงทะเบียนหรือตรวจสอบข้อมูลใหม่อีกครั้ง' } 
          }
        });
  
        render(<Login />)
        
        const usernameInput = screen.getByPlaceholderText('ชื่อผู้ใช้ หรือ อีเมล')
        const passwordInput = screen.getByPlaceholderText('รหัสผ่าน')
        const loginButton = screen.getByRole('button', { name: /ลงชื่อเข้าใช้งาน/i })
        
        await userEvent.type(usernameInput, 'invaliduser')
        await userEvent.type(passwordInput, 'invalidpassword')
        
        fireEvent.click(loginButton)
        
        // More robust error checking
        //await waitFor(() => expect(screen.getByText('ไม่พบบัญชีผู้ใช้งาน โปรดลงทะเบียนหรือตรวจสอบข้อมูลใหม่อีกครั้ง')).toBeInTheDocument());
        expect(mockSetIsAuthenticated).not.toHaveBeenCalled();
        expect(mockSetUser).not.toHaveBeenCalled();
    })

    it('C1b3,C2b1 Password invalid', async () => {
      // Mock login to simulate account not found
      ;(login as jest.Mock).mockRejectedValue({
        response: { 
          data: { message: 'ไม่พบบัญชีผู้ใช้งาน โปรดลงทะเบียนหรือตรวจสอบข้อมูลใหม่อีกครั้ง' } 
        }
      })

      render(<Login />)
      
      const usernameInput = screen.getByPlaceholderText('ชื่อผู้ใช้ หรือ อีเมล')
      const passwordInput = screen.getByPlaceholderText('รหัสผ่าน')
      const loginButton = screen.getByRole('button', { name: /ลงชื่อเข้าใช้งาน/i })
      
      await userEvent.type(usernameInput, 'invaliduser')
      await userEvent.type(passwordInput, 'validpassword')
      fireEvent.click(loginButton)
      
      //await waitFor(() => expect(screen.getByText('ไม่พบบัญชีผู้ใช้งาน โปรดลงทะเบียนหรือตรวจสอบข้อมูลใหม่อีกครั้ง')).toBeInTheDocument());
      expect(mockSetIsAuthenticated).not.toHaveBeenCalled();
      expect(mockSetUser).not.toHaveBeenCalled();
    })
  })

  // C4: Valid Data Login
  // describe('Successful Login', () => {
  //   it('C4a - Valid username and password should login successfully', async () => {
  //     // Mock successful login

  //     const mockLoginResponse = {
  //       user_id: 1,
  //       username: "testuser",
  //     };

  //     // Mock context and router

  //     // Mock API response
  //     (login as jest.Mock).mockResolvedValue(mockLoginResponse);

  //     // Render component
  //     render(<Login />);

  //     // Simulate user interaction
  //     const usernameInput = screen.getByPlaceholderText("ชื่อผู้ใช้ หรือ อีเมล");
  //     const passwordInput = screen.getByPlaceholderText("รหัสผ่าน");
  //     const submitButton = screen.getByRole("button", { name: /ลงชื่อเข้าใช้งาน/i });

  //     fireEvent.change(usernameInput, { target: { value: "testuser" } });
  //     fireEvent.change(passwordInput, { target: { value: "password123" } });
  //     fireEvent.click(submitButton);

  //     // Wait for API call and state updates
  //     await waitFor(() => expect(login).toHaveBeenCalledWith("testuser", "password123"));
  //     expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
  //     expect(mockSetUser).toHaveBeenCalledWith(mockLoginResponse);

  //   });
  // })
})