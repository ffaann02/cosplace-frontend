import { divider } from "@/config/theme";
import { Divider } from "antd";
import React from "react";
import { FaUser } from "react-icons/fa";

interface LeftSideBarProps {
  currentMenu: string;
  selectMenu: (menu: string) => void;
}

export const userAccountButtons = [
  { label: "ข้อมูลบัญชีผู้ใช้", menu: "profile" },
  { label: "รหัสผ่านและการเข้าถึง", menu: "password" },
  { label: "การแจ้งเตือน", menu: "notifications" },
];

const LeftSideBar: React.FC<LeftSideBarProps> = ({
  currentMenu,
  selectMenu,
}) => {
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
            onClick={() => selectMenu(button.menu)}
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
    </div>
  );
};

export default LeftSideBar;
