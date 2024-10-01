"use client";
import { Button, Flex, Input } from "antd";
import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import DrawerSidebar from "./drawer-sidebar";
import { roundedButton } from "@/config/theme";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  return (
    <nav className="h-16 bg-secondary-50 flex items-center justify-between z-50 fixed top-0 w-full px-4 sm:px-6 xl:px-12 border-b border-neutral-200  drop-shadow-sm">
      <DrawerSidebar open={openDrawer} setOpen={setOpenDrawer} />
      <Flex className="gap-x-4 xl:gap-x-12 w-full lg:w-fit">
        <Link href="/" passHref className="my-auto">
          <h1 className="text-lg xl:text-xl font-semibold text-primary-600 tracking-wider">
            CosBaanDeawGun
          </h1>
        </Link>
        <div className="w-full lg:w-72 xl:w-[480px] my-auto">
          <Input
            size="middle"
            placeholder="ค้นหาชุด, ชื่อตัวละคร, ของตกแต่ง"
            style={{ borderRadius: 16 }}
            prefix={<FaSearch />}
          />
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
      <div className="gap-x-4 xl:gap-x-5 lg:flex hidden">
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
        <div className="my-auto">
          <Button style={{ ...roundedButton }} size="small" type="primary">
            <span className="mt-0.5">ลงชื่อเข้าใช้</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
