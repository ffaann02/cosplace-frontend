import { render, screen, fireEvent } from '@testing-library/react';
import CreateShop from '@/components/pages/myshop/create-shop/create-shop'; // นำเข้า CreateShop
import CreateShopStep1Form from '@/components/pages/myshop/create-shop/create-shop-step1-formCopy';
import { apiClientWithAuth } from '@/api';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: null,
    status: 'unauthenticated'
  })),
}));

jest.mock('@/api', () => ({
  apiClientWithAuth: {
    post: jest.fn(),
  },
}));

jest.mock('@/context/auth-context', () => ({
  useAuth: jest.fn(() => ({
    user: null,
  })),
}));

jest.mock('@/components/pages/myshop/create-shop/create-shop-step1-form', () => {
  return jest.fn((props) => (
    <div data-testid="create-shop-step1-form">
      <input 
        data-testid="shop-name-input" 
        placeholder="ชื่อร้านค้า" 
        onChange={(e) => props.setFormData1({ shopName: e.target.value })}
      />
      <input 
        data-testid="shop-description-input" 
        placeholder="คำอธิบายร้านค้า"
        onChange={(e) => props.setFormData1({ description: e.target.value })}
      />
    </div>
  ))
})
const renderCreateShopStep1Form = () => {
  // Mock form ที่รวมฟังก์ชัน getFieldValue และ setFieldValue
  const values: { [key: string]: any } = {
    shop_name: '',
    shop_description: '',
    type: [],
    accept_credit_card: false,
    accept_qr_promptpay: false,
    link: '',
  };
  

  const form1 = {
    getFieldValue: jest.fn((fieldName: string) => {
      return values[fieldName];
    }),
    setFieldValue: jest.fn((fieldName: string, value: any) => {
      values[fieldName] = value; // อัปเดตค่าของ field ใน values
    }),
    getFieldsValue: jest.fn(() => ({ ...values })), // ส่งค่าทั้งหมดจาก values
  };

  // Render คอมโพเนนต์
  return render(
    <CreateShopStep1Form
      form={form1}
      currentStep={1} // กำหนดค่าเริ่มต้นให้กับ currentStep
      setCurrentStep={jest.fn()} // Mock function
      shopImageProfileUrl={null} // หรือค่าใด ๆ ที่คุณต้องการ
      productTypeOptions={[]} // ใช้ค่า empty array ถ้าต้องการทดสอบกรณีนี้
      setHoveringProfileImage={jest.fn()} // Mock function
      hoveringProfileImage={false} // ค่าเริ่มต้น
      setFormData1={jest.fn()} // Mock function
    />
  );
};

export { renderCreateShopStep1Form };


describe('CreateShop Component - step1', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // ล้าง mock ก่อนการทดสอบแต่ละครั้ง
  });
  describe('C1 shop name validation', () => { // C1: Shop Name Validation - Empty shop name
    it('C1b1 ชื่อร้านค้า - Input field is empty', async () => {
      renderCreateShopStep1Form
      fireEvent.click(screen.getByRole('button', { name: /ถัดไป/i }));
      expect(await screen.findByText(/โปรดระบุชื่อร้านค้า/i)).toBeInTheDocument();
    });
    it('C1b2 ชื่อร้านค้า - Input <= 100', async () => {
      renderCreateShopStep1Form();
       fireEvent.change(screen.getByLabelText(/ชื่อร้านค้า/i), { target: { value: 'My Shop' } });
       fireEvent.click(screen.getByRole('button', { name: /ถัดไป/i }));
       expect(screen.queryByText(/โปรดระบุชื่อร้านค้า/i)).not.toBeInTheDocument();
    });
    it('C1b3 ชื่อร้านค้า - Input > 100', async () => {
      renderCreateShopStep1Form();
      fireEvent.change(screen.getByLabelText(/ชื่อร้านค้า/i), { target: { value: 'A'.repeat(101) } });
      const inputElement = screen.getByLabelText(/ชื่อร้านค้า/i) as HTMLInputElement;
      expect(inputElement.value.length).toBeGreaterThan(100);
    });
  } );
  describe('C2 description validation', () => { // C2: Description Validation - Empty description
    it('C2b1 คำอธิบายร้านค้า - Input field is empty', async () => { 
      renderCreateShopStep1Form();
      fireEvent.click(screen.getByRole('button', { name: /ถัดไป/i }));
      expect(await screen.findByText(/โปรดระบุคำอธิบายร้านค้า/i)).toBeInTheDocument();
    });
    it('C2b2 คำอธิบายร้านค้า - Input <= 100', async () => { 
      renderCreateShopStep1Form();
      fireEvent.change(screen.getByLabelText(/คำอธิบายร้านค้า/i), { target: { value: 'Description' } });
      fireEvent.click(screen.getByRole('button', { name: /ถัดไป/i }));
      expect(screen.queryByText(/โปรดระบุคำอธิบายร้านค้า/i)).not.toBeInTheDocument();
    } );
    it('C2b3 คำอธิบายร้านค้า - Input > 300', async () => { 
      renderCreateShopStep1Form();
      fireEvent.change(screen.getByLabelText(/คำอธิบายร้านค้า/i), { target: { value: 'A'.repeat(301) } });
      const inputElement = screen.getByLabelText(/คำอธิบายร้านค้า/i) as HTMLInputElement;
      expect(inputElement.value.length).toBeLessThanOrEqual(300);
    });
  });
  describe('C3 product type validation', () => { 
    it('C3b1 ประเภทของสินค้า - Input field is empty', async () => {
      renderCreateShopStep1Form();
       fireEvent.click(screen.getByRole('button', { name: /ถัดไป/i }));
       expect(await screen.findByText(/โปรดเลือกประเภทของสินค้า/i)).toBeInTheDocument();
    });
    it('C3b2 ประเภทของสินค้า - tag>=1', async () => {
      renderCreateShopStep1Form();
       fireEvent.change(screen.getByLabelText(/ประเภทของสินค้า/i), { target: { value: 'อื่นๆ' } });
       fireEvent.click(screen.getByRole('button', { name: /ถัดไป/i }));
       expect(screen.queryByText(/โปรดเลือกประเภทของสินค้า/i)).not.toBeInTheDocument();
    });
    it('C3b3 ประเภทของสินค้า - typing="costume"', async () => {
      renderCreateShopStep1Form();
       fireEvent.change(screen.getByLabelText(/ประเภทของสินค้า/i), { target: { value: 'costume' } });
       fireEvent.click(screen.getByRole('button', { name: /ถัดไป/i }));
       expect(screen.queryByText(/โปรดเลือกประเภทของสินค้า/i)).not.toBeInTheDocument();
    });
  });
  describe('C4 payment method validation', () => {
    it('C4b1 ช่องทางการชำระเงิน - empty', async () => {
            renderCreateShopStep1Form();
              fireEvent.click(screen.getByRole('button', { name: /ถัดไป/i }));
              expect(await screen.findByText(/โปรดเลือกอย่างน้อยหนึ่งช่องทางชำระเงิน/i)).toBeInTheDocument();
        });
        it('C4b2 ช่องทางการชำระเงิน - บัตรเครดิต/เดบิต', async () => {
            renderCreateShopStep1Form();
            fireEvent.change(screen.getByLabelText(/payment method/i), { target: { value: 'บัตรเครดิต/เดบิต' } });
            fireEvent.click(screen.getByRole('button', { name: /ถัดไป/i }));
            expect(screen.queryByText(/โปรดเลือกอย่างน้อยหนึ่งช่องทางชำระเงิน/i)).not.toBeInTheDocument();
        });
        it('C4b3 ช่องทางการชำระเงิน - QR พร้อมเพย์', async () => {
            renderCreateShopStep1Form();
            fireEvent.change(screen.getByLabelText(/payment method/i), { target: { value: 'QR พร้อมเพย์' } });
            fireEvent.click(screen.getByRole('button', { name: /ถัดไป/i }));
            expect(screen.queryByText(/โปรดเลือกอย่างน้อยหนึ่งช่องทางชำระเงิน/i)).not.toBeInTheDocument();
        });

  });
  describe('C5 external link validation', () => {
    it('C5b1 ลิงก์ร้านค้าภายนอก - Input field is empty', async () => {
      renderCreateShopStep1Form();
      fireEvent.click(screen.getByRole('button', { name: /ถัดไป/i }));
      expect(await screen.findByText(/โปรดระบุลิงก์ร้านค้าภายนอก/i)).toBeInTheDocument();
    });
    it('C5b2 ลิงก์ร้านค้าภายนอก - string="XXXX"', async () => {
      renderCreateShopStep1Form();
      fireEvent.change(screen.getByLabelText(/external link/i), { target: { value: 'XXXX' } });
      const externalLinkInput = screen.getByLabelText(/external link/i) as HTMLInputElement;
      expect(externalLinkInput.value).toBe('XXXX');
    });
  });
});


