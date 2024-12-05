import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
//import CreateCustomPostForm from '@/components/pages/custom/formdup';
import CreateCustomPostForm from '@/components/pages/custom/formdup';
// Mock dependencies
// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ 
    push: jest.fn() 
  }))
}))
  jest.mock('@/api', () => ({
      apiClientWithAuth: {
        post: jest.fn(),
      },
  }));
    
  jest.mock('@/context/auth-context', () => ({
      useAuth: jest.fn(() => ({ user: { user_id: '123' } })),
  }));
    
  jest.mock('next/navigation', () => ({
      useRouter: jest.fn(() => ({ push: jest.fn() })),
  }));
  
  jest.mock('@ant-design/icons', () => ({
      ShopOutlined: jest.fn(() => null),
  }));

describe('CreateCustomPostForm Component - ISP Testing', () => {
  // C1: ชื่องาน (Title)
  describe('Title Input', () => {
    it('Empty title should disable post button', () => {
      render(<CreateCustomPostForm />);
      const submitButton = screen.getByRole('button', { name: /โพสต์/i });
      expect(submitButton).toBeDisabled();
    });

    it('Title <= 50 characters should be accepted', async () => {
      render(<CreateCustomPostForm />);
      const titleInput = screen.getByPlaceholderText('ชื่อ');
      await userEvent.type(titleInput, 'Valid Title Within 50 Characters');
      expect(titleInput).toHaveValue('Valid Title Within 50 Characters');
    });

    it('Title > 50 characters should be truncated', async () => {
        render(<CreateCustomPostForm />);
        const titleInput = screen.getByPlaceholderText('ชื่อ') as HTMLInputElement;
        const longTitle = 'A'.repeat(60);
        await userEvent.type(titleInput, longTitle);
        expect(titleInput.value.length).toBeLessThanOrEqual(50);
      });
  });

  // C2: รายละเอียดของงาน (Description)
  describe('Description Input', () => {
    it('Empty description should disable post button', () => {
      render(<CreateCustomPostForm />);
      const submitButton = screen.getByRole('button', { name: /โพสต์/i });
      expect(submitButton).toBeDisabled();
    });

    it('Description <= 200 characters should be accepted', async () => {
      render(<CreateCustomPostForm />);
      const descInput = screen.getByPlaceholderText('รายละเอียด');
      await userEvent.type(descInput, 'Valid description within 200 characters');
      expect(descInput).toHaveValue('Valid description within 200 characters');
      render(<CreateCustomPostForm />);
    });

    it('Description > 200 characters should be truncated', async () => {
      render(<CreateCustomPostForm />);
      const descInput = screen.getByPlaceholderText('รายละเอียด') as HTMLInputElement;
      const longDesc = 'A'.repeat(201);
      await userEvent.type(descInput, longDesc);
      expect(descInput.value.length).toBeLessThanOrEqual(200);
    });
  });

  // C3: อัปโหลดรูปภาพประกอบ (Image Upload)
  // describe('Image Upload', () => {
  //   it('Should reject files larger than 5MB', async () => {
  //       // สร้าง mock file ขนาดใหญ่
  //       const largefile = new File(
  //         [new ArrayBuffer(500 * 1024 * 1024 + 1)], // มากกว่า 500MB
  //         'large-file.png', 
  //         { type: 'image/png' }
  //       );
    
  //       // Mock function สำหรับการตรวจสอบขนาดไฟล์
  //       const mockFileSizeCheck = jest.fn((file) => {
  //         const maxSize = 5 * 1024 * 1024; // 5MB
  //         return file.size <= maxSize;
  //       });
    
  //       render(<CreateCustomPostForm />);
  //       const uploadInput = screen.getByLabelText(/อัปโหลด/i) as HTMLInputElement;
        
  //       // Simulate file upload
  //       await userEvent.upload(uploadInput, largefile);
        
  //       // ตรวจสอบว่าไฟล์ถูก reject
  //       expect(uploadInput.files?.[0]).toBe(largefile);
  //       expect(uploadInput.files?.length).toBe(1);
  //   });

  //   it('Should upload jpg image files', async () => {
  //       // สร้างไฟล์ JPG
  //       const jpgFile = new File(
  //         [new ArrayBuffer(1024)], 
  //         'it-image.jpg', 
  //         { type: 'image/jpeg' }
  //       );
    
  //       render(<CreateCustomPostForm />);
  //       const uploadInput = screen.getByLabelText(/อัปโหลด/i) as HTMLInputElement;
        
  //       // อัปโหลดไฟล์
  //       await userEvent.upload(uploadInput, jpgFile);
        
  //       // ตรวจสอบว่าไฟล์ถูกอัปโหลด
  //       expect(uploadInput.files?.[0]).toBe(jpgFile);
  //       expect(uploadInput.files?.length).toBe(1);
  //     });
  //   });

  // C4: ราคาต่ำสุด (Minimum Price)
  describe('Minimum Price', () => {
    it('Negative price should be set to 0', async () => {
      render(<CreateCustomPostForm />);
      const minPriceInput = screen.getByPlaceholderText('ราคาขั้นต่ำ');
      await userEvent.type(minPriceInput, '-100');
      expect(minPriceInput).toHaveValue(0);
    });
  });

  // C5: ราคาสูงสุด vs ต่ำสุด (Price Range)
  describe('Price Range', () => {
    it('Max price greater than min price should be allowed', async () => {
      render(<CreateCustomPostForm />);
      const minPriceInput = screen.getByPlaceholderText('ราคาขั้นต่ำ');
      const maxPriceInput = screen.getByPlaceholderText('ราคาสูงสุด');
      
      await userEvent.type(minPriceInput, '100');
      await userEvent.type(maxPriceInput, '200');
      
      expect(minPriceInput).toHaveValue(100);
      expect(maxPriceInput).toHaveValue(200);
    });

    it('Max price less than min price should not be allowed', async () => {
      render(<CreateCustomPostForm />);
      const minPriceInput = screen.getByPlaceholderText('ราคาขั้นต่ำ');
      const maxPriceInput = screen.getByPlaceholderText('ราคาสูงสุด');
      
      await userEvent.type(minPriceInput, '200');
      await userEvent.type(maxPriceInput, '100');
      
      // ตรวจสอบว่าmax price ถูกปรับให้เท่ากับ min price
      expect(maxPriceInput).toHaveValue(200);
    });
  });

  // C6: ชื่ออนิเมะ (Anime Name)
  describe('Anime Name', () => {
    it('Empty anime name should disable post button', () => {
      render(<CreateCustomPostForm />);
      const submitButton = screen.getByRole('button', { name: /โพสต์/i });
      expect(submitButton).toBeDisabled();
    });

    it('Anime name <= 50 characters should be accepted', async () => {
      render(<CreateCustomPostForm />);
      const animeNameInput = screen.getByPlaceholderText('ชื่ออนิเมะ ภาพยนตร์ หรือซีรีย์');
      await userEvent.type(animeNameInput, 'Valid Anime Name');
      expect(animeNameInput).toHaveValue('Valid Anime Name');
    });

    it('Anime name > 50 characters should be truncated', async () => {
      render(<CreateCustomPostForm />);
      const animeNameInput = screen.getByPlaceholderText('ชื่ออนิเมะ ภาพยนตร์ หรือซีรีย์') as HTMLInputElement;
      const longName = 'A'.repeat(60);
      await userEvent.type(animeNameInput, longName);
      expect(animeNameInput.value.length).toBeLessThanOrEqual(50);
    });
  });

  // C7: แท็ก (Tags)
  // describe('Tags', () => {
  //   it('No tags selected should disable post button', () => {
  //     render(<CreateCustomPostForm />);
  //     const submitButton = screen.getByRole('button', { name: /โพสต์/i }) as HTMLInputElement;
  //     expect(submitButton).toBeDisabled();
  //   });

  //   it('Selecting tags should enable post button', async () => {
  //     render(<CreateCustomPostForm />);
  //     const tagsSelect = screen.getByPlaceholderText('เลือกแท็ก');
  //     await userEvent.click(tagsSelect);
  //     const goldOption = screen.getByTitle('gold');
  //     await userEvent.click(goldOption);
      
  //     const submitButton = screen.getByRole('button', { name: /โพสต์/i })
  //     expect(submitButton).toBeEnabled();
  //   });
  // });

  // C8: แนบลิงก์ประกอบ (Additional Links)
  // describe('Additional Links', () => {
  //   it('Not attaching links should be allowed', () => {
  //     render(<CreateCustomPostForm />);
  //     // ตรวจสอบว่าสามารถโพสต์ได้โดยไม่ต้องแนบลิงก์
  //     const submitButton = screen.getByRole('button', { name: /โพสต์/i });
  //     expect(submitButton).toBeDisabled(); // เนื่องจากข้อมูลอื่นยังไม่ครบ
  //   });

  //   it('Attaching invalid link should not be allowed', async () => {
  //     render(<CreateCustomPostForm />);
  //     const linkInput = screen.getByPlaceholderText('ลิงก์เพิ่มเติม');
  //     const addLinkButton = screen.getByRole('button', { name: /เพิ่มลิงก์/i });
      
  //     await userEvent.type(linkInput, 'invalid-link');
  //     await userEvent.click(addLinkButton);
      
  //     // ตรวจสอบว่าลิงก์ไม่ถูกเพิ่ม
  //     expect(screen.queryByText('invalid-link')).not.toBeInTheDocument();
  //   });

  //   it('Attaching valid link should be allowed', async () => {
  //     render(<CreateCustomPostForm />);
  //     const linkInput = screen.getByPlaceholderText('ลิงก์เพิ่มเติม');
  //     const addLinkButton = screen.getByRole('button', { name: /เพิ่มลิงก์/i });
      
  //     await userEvent.type(linkInput, 'https://example.com');
  //     await userEvent.click(addLinkButton);
      
  //     // ตรวจสอบว่าลิงก์ถูกเพิ่ม
  //     expect(screen.getByText('https://example.com')).toBeInTheDocument();
  //   });
  // });
});