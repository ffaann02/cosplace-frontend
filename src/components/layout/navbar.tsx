"use client";
import { Button, Flex, Input, AutoComplete } from "antd";
import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import DrawerSidebar from "./drawer-sidebar";
import { roundedButton } from "@/config/theme";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const pathname = usePathname(); // Get the current path

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const handleSearch = (value: string) => {
    const mockData = [
      { value: "ชุดคอสเพลย์" },
      { value: "ชื่อตัวละคร" },
      { value: "ของตกแต่ง" },
    ];
    setOptions(
      value ? mockData.filter((item) => item.value.includes(value)) : []
    );
  };

  // Check if the current route is either /login or /register
  if (pathname === "/login" || pathname === "/register") {
    return null; // Return null to hide the Navbar
  }

  return (
    <nav className="h-16 bg-secondary-50 flex items-center justify-between z-50 fixed top-0 w-full px-4 sm:px-6 xl:px-12 border-b border-neutral-200 drop-shadow-sm">
      <DrawerSidebar open={openDrawer} setOpen={setOpenDrawer} />
      <Flex className="gap-x-4 xl:gap-x-12 w-full lg:w-fit">
        <Link href="/" passHref className="my-auto">
          <h1 className="text-lg xl:text-xl font-semibold text-primary-600 tracking-wider">
            CosBaanDeawGun
          </h1>
        </Link>
        <div className="w-full lg:w-72 xl:w-[480px] my-auto">
          <AutoComplete
            options={options}
            onSearch={handleSearch}
            style={{ width: "100%" }}
          >
            <Input
              size="middle"
              placeholder="ค้นหาชุด, ชื่อตัวละคร, ของตกแต่ง"
              style={{ borderRadius: 16 }}
              prefix={<FaSearch />}
            />
          </AutoComplete>
        </div>
        <div className="my-auto mt-1">
          <Button
            type="text"
            style={{
              fontSize: 28,
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 2,
              paddingRight: 2,
            }}
            onClick={showDrawer}
          >
            <IoMenu className="block lg:hidden my-auto text-primary-800 py-0.5" />
          </Button>
        </div>
      </Flex>
      <div className="gap-x-4 xl:gap-x-5 lg:flex hidden text-sm 2xl:text-lg">
        <Link href="/" passHref className="my-auto">
          <span className="text-primary-600 hover:text-primary-800">
            หน้าหลัก
          </span>
        </Link>
        <Link href="/marketplace" passHref className="my-auto">
          <span className="text-primary-600 hover:text-primary-800">
            Marketplace
          </span>
        </Link>
        <Link href="/friends" passHref className="my-auto">
          <span className="text-primary-600 hover:text-primary-800">
            เพื่อนและสังคม
          </span>
        </Link>
        <Link href="/events" passHref className="my-auto">
          <span className="text-primary-600 hover:text-primary-800">
            กิจกรรมและงานคอสเพลย์
          </span>
        </Link>
        <Link href="/login" passHref >
        <div className="my-auto">
          <Button style={{ ...roundedButton }} size="small" type="primary">
            <span className="mt-0.5">ลงชื่อเข้าใช้</span>
          </Button>
        </div></Link>
      </div>
    </nav>
  );
};

export default Navbar;
