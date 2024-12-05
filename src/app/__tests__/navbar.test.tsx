import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '@/components/layout/navbar';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/',
  useSearchParams: () => null,
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, onClick }: any) => {
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          mockPush(href);
          if (onClick) onClick(e);
        }}
      >
        {children}
      </a>
    );
  };
});

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
}));

// Mock auth context
jest.mock('@/context/auth-context', () => ({
  useAuth: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
  }),
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  describe('Navigation Links', () => {
    it('แสดงลิงก์นำทางทั้งหมดบน desktop', () => {
      render(<Navbar />);
      
      expect(screen.getByText('หน้าหลัก')).toBeInTheDocument();
      expect(screen.getByText('Marketplace')).toBeInTheDocument();
      expect(screen.getByText('เพื่อนและสังคม')).toBeInTheDocument();
      expect(screen.getByText('กิจกรรมและงาน')).toBeInTheDocument();
    });

    it('Navigate to Marketplace', async () => {
      render(<Navbar />);
      
      const marketplaceLink = screen.getByText('Marketplace');
      await userEvent.click(marketplaceLink);
      
      expect(mockPush).toHaveBeenCalledWith('/select-service');
    });

    it('Navigate to เพื่อนและสังคม', async () => {
      render(<Navbar />);
      
      const friendsLink = screen.getByText('เพื่อนและสังคม');
      await userEvent.click(friendsLink);
      
      expect(mockPush).toHaveBeenCalledWith('/friends');
    });

    it('Navigate to กิจกรรมและงาน', async () => {
      render(<Navbar />);
      
      const eventsLink = screen.getByText('กิจกรรมและงาน');
      await userEvent.click(eventsLink);
      
      expect(mockPush).toHaveBeenCalledWith('/events');
    });


    it('Navigate to Home', async () => {
      render(<Navbar />);
      
      const homeLink = screen.getByText('หน้าหลัก');
      await userEvent.click(homeLink);
      
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  describe('Search Functionality', () => {
    it('สามารถค้นหาได้', async () => {
      render(<Navbar />);
      
      const searchInput = screen.getByPlaceholderText('ค้นหาชุด, ชื่อตัวละคร, ของตกแต่ง');
      await userEvent.type(searchInput, 'ชุดคอสเพลย์{enter}');
      
      expect(mockPush).toHaveBeenCalledWith('/marketplace?search=ชุดคอสเพลย์');
    });
    

    // it('แสดงตัวเลือกการค้นหาเมื่อพิมพ์', async () => {
    //   render(<Navbar />);
      
    //   const searchInput = screen.getByPlaceholderText('ค้นหาชุด, ชื่อตัวละคร, ของตกแต่ง');
    //   await userEvent.type(searchInput, 'ชุด');
      
    //   // รอให้ autocomplete options แสดง
    //   expect(await screen.findByText('ชุดคอสเพลย์')).toBeInTheDocument();
    // });
  });

  describe('Authentication', () => {
    it('แสดงปุ่มลงชื่อเข้าใช้เมื่อยังไม่ได้เข้าสู่ระบบ', () => {
      render(<Navbar />);
      expect(screen.getByText('ลงชื่อเข้าใช้')).toBeInTheDocument();
    });

    // ทดสอบกรณีเข้าสู่ระบบแล้ว
    it('แสดง User เมื่อเข้าสู่ระบบแล้ว', () => {
      jest.spyOn(require('@/context/auth-context'), 'useAuth').mockImplementation(() => ({
        user: { username: 'testuser' },
        isAuthenticated: true,
        loading: false,
      }));

      render(<Navbar />);
      expect(screen.getByText('testuser')).toBeInTheDocument();
    });
  });

//   describe('Responsive Behavior', () => {
//     it('แสดงปุ่ม menu บน mobile', () => {
//       render(<Navbar />);
//       expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
//     });

//     it('เปิด drawer เมื่อกดปุ่ม menu', async () => {
//       render(<Navbar />);
//       const menuButton = screen.getByRole('button', { name: /menu/i });
//       await userEvent.click(menuButton);
      
//       // เช็คว่า drawer เปิดขึ้นมา
//       expect(screen.getByRole('dialog')).toBeInTheDocument();
//     });
//   });
}); 