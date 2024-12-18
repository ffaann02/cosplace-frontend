import { divider } from "@/config/theme";
import { useAuth } from "@/context/auth-context";
import { Button, Divider } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { FaUser } from "react-icons/fa";
import { FaShop, FaShopLock } from "react-icons/fa6";

interface LeftSideBarProps {
  currentMenu: string;
}

export const userAccountButtons = [
  { label: "ข้อมูลบัญชีผู้ใช้", menu: "account" },
  { label: "โปรไฟล์โซเชียล", menu: "social" },
  { label: "รหัสผ่านและความปลอดภัย", menu: "password"},
  { label: "การแจ้งเตือน", menu: "notifications" },
];

const LeftSideBar: React.FC<LeftSideBarProps> = ({
  currentMenu,
}) => {

  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="px-4 w-full">
      <h3 className="text-primary-800 text-2xl hidden md:block">จัดการบัญชีของคุณ</h3>
      <h4 className="mt-6 text-primary-700 text-lg xl:text-xl">บัญชีผู้ใช้งาน</h4>
      <div className="flex flex-col gap-y-4 mt-2">
        {userAccountButtons.map((button) => (
          <button
            key={button.menu}
            className={`flex rounded-lg px-4 py-3 w-full transition-all ease-linear duration-200 ${
              currentMenu === button.menu
                ? "bg-primary-100 text-primary-700"
                : "bg-transparent text-primary-500 hover:text-primary-700"
            }`}
            onClick={() => {
              router.push(`/profile?menu=${button.menu}`)
            }}
          >
            <FaUser
              className={`my-auto`}
            />
            <span
              className={`ml-4 text-sm mt-0.5`}
            >
              {button.label}
            </span>
          </button>
        ))}
      </div>
      <Button
        icon={user?.role === "seller" ? <FaShop className="text-xl mr-2"/> : <FaShopLock className="text-xl mr-2"/>}
        type="default"
        className="mt-8 w-full"
        onClick={() => {
          router.push("/myshop");
        }}
        size="large"
      >
        {user?.role === "seller" ? "จัดการร้านค้า" : "เปิดร้านค้า"}
      </Button>
    </div>
  );
};

export default LeftSideBar;
