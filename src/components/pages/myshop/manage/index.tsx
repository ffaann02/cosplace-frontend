import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  ShoppingOutlined,
  SyncOutlined,
  MessageOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Overview from "./overview";
import Products from "./product/products";
import Logs from "./logs";
import Chats from "./chats";
import Settings from "./settings";

const menuItems = [
  { key: "overview", label: "ภาพรวม", icon: <AppstoreOutlined /> },
  { key: "products", label: "สินค้า", icon: <ShoppingOutlined /> },
  { key: "log", label: "ติดตาม", icon: <SyncOutlined /> },
  { key: "chat", label: "แชท", icon: <MessageOutlined /> },
  { key: "setting", label: "การตั้งค่า", icon: <SettingOutlined /> },
];

const MyShopBoard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);
  const currentMenu = searchParams.get("menu") || "overview";

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleMenuClick = (e: any) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("menu", e.key);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const renderContent = () => {
    switch (currentMenu) {
      case "overview":
        return <Overview />;
      case "products":
        return <Products />;
      case "log":
        return <Logs />;
      case "chat":
        return <Chats />;
      case "setting":
        return <Settings />;
      default:
        return <div>Overview Content</div>;
    }
  };

  return (
    <div className="grid grid-cols-12 h-full gap-2">
      <div
        className={`bg-primary-50 p-2 ${
          openSidebar ? "col-span-2" : "col-span-1"
        } rounded-xl relative transition-all ease-linear duration-200`}
      >
        <button
          onClick={toggleSidebar}
          className="w-full text-right text-xl p-2 border-b border-primary-200 text-primary-600 pb-3"
        >
          {openSidebar ? (
            <div className="flex">
              <FaChevronLeft className="font-bold my-auto" />
              <p className="my-auto ml-2">ปิด</p>
            </div>
          ) : (
            <div className="flex">
              <p className="my-auto mr-2">เปิด</p>
              <FaChevronRight className="font-bold my-auto" />
            </div>
          )}
        </button>
        <Menu
          mode="vertical"
          items={menuItems}
          onClick={handleMenuClick}
          selectedKeys={[currentMenu]}
          style={{
            height: "100%",
            borderRight: 0,
            backgroundColor: "transparent",
          }}
        />
      </div>
      <div
        className={`bg-primary-50 ${
          openSidebar ? "col-span-10" : "col-span-11"
        } rounded-xl transition-all ease-linear duration-200 px-6 pt-4 pb-6`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default MyShopBoard;