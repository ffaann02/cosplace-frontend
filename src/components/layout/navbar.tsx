"use client";
import { Button, Flex, Input, AutoComplete, Skeleton } from "antd";
import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoCartOutline, IoMenu } from "react-icons/io5";
import DrawerSidebar from "./drawer-sidebar";
import { roundedButton } from "@/config/theme";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import UserBadgeNavbar from "./user-badge-navbar";
import { TbMessageFilled } from "react-icons/tb";
import { signIn, useSession } from "next-auth/react";
import { useAuth } from "@/context/auth-context";
import {
  CalendarOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const { user, isAuthenticated, loading } = useAuth();
  // const { data: session, status } = useSession();
  // console.log(session);
  const pathname = usePathname();
  const router = useRouter();
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

  const handleSearchSelect = (value: string) => {
    if (value.trim() === "") {
      router.push("/marketplace");
    } else {
      router.push(`/marketplace?search=${value}`);
    }
  };

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <nav className="h-16 bg-secondary-50 flex items-center justify-between z-50 fixed top-0 w-full py-[2.1rem] px-4 sm:px-6 xl:px-12 border-b border-neutral-200 drop-shadow-sm">
      <DrawerSidebar open={openDrawer} setOpen={setOpenDrawer} />
      <Flex className="w-full">
        <Link href="/" passHref className="my-auto">
          <h1 className="text-lg lg:text-xl font-semibold tracking-wider flex flex-col">
            <span className="text-secondary-600">CosBaan</span>
            <span className="-mt-2 text-secondary-700">DeawGun</span>
          </h1>
        </Link>
        <div className="w-full flex px-2 ml-8 xl:ml-12">
          <div className="hidden lg:flex justify-between w-2/5 min-w-[448px] px-6">
            <Link
              href="/"
              passHref
              className="my-auto flex flex-col text-primary-600 hover:text-primary-800"
            >
              <HomeOutlined className="text-lg mx-auto mb-2" />
              <span className="text-sm">หน้าหลัก</span>
            </Link>
            <Link
              href="/select-service"
              passHref
              className="my-auto flex flex-col text-primary-600 hover:text-primary-800"
            >
              <ShoppingCartOutlined className="text-lg mx-auto mb-2" />
              <span className="text-sm">Marketplace</span>
            </Link>
            <Link
              href="/friends"
              passHref
              className="my-auto flex flex-col text-primary-600 hover:text-primary-800"
            >
              <UserOutlined className="text-lg mx-auto mb-2" />
              <span className="text-sm text-center">เพื่อนและสังคม</span>
            </Link>
            <Link
              href="/events"
              passHref
              className="my-auto flex flex-col text-primary-600 hover:text-primary-800"
            >
              <CalendarOutlined className="text-lg mx-auto mb-2" />
              <span className="text-sm text-center">กิจกรรมและงาน</span>
            </Link>
          </div>

          <div className="w-full lg:w-3/5 my-auto ml-0 lg:ml-2 relative">
            <AutoComplete
              options={options}
              onSearch={handleSearch}
              onSelect={handleSearchSelect}
              style={{ width: "100%" }}
            >
              <Input
                size="middle"
                placeholder="ค้นหาชุด, ชื่อตัวละคร, ของตกแต่ง"
                style={{ borderRadius: 16 }}
                prefix={<FaSearch />}
                onPressEnter={(e) =>
                  handleSearchSelect((e.target as HTMLInputElement).value)
                }
              />
            </AutoComplete>
          </div>
        </div>
      </Flex>
      {loading ? (
        <div className="mx-2 scale-x-125 block">
          <Skeleton.Button active shape="default" size="default" />
        </div>
      ) : (
        <>
          {isAuthenticated ? (
            <UserBadgeNavbar username={user?.username} />
          ) : (
            <Link href="/login" passHref className="">
              <div className="my-auto">
                <Button
                  style={{ ...roundedButton }}
                  size="small"
                  type="primary"
                >
                  <span className="mt-0.5">ลงชื่อเข้าใช้</span>
                </Button>
              </div>
            </Link>
          )}
        </>
      )}
      {/* {!pathname.includes("marketplace") && (
        <div className="w-full block sm:hidden">
          <AutoComplete
            options={options}
            onSearch={handleSearch}
            onSelect={handleSearchSelect}
            style={{ width: "100%" }}
          >
            <Input
              size="middle"
              placeholder="ค้นหาชุด, ชื่อตัวละคร, ของตกแต่ง"
              style={{ borderRadius: 16 }}
              prefix={<FaSearch />}
              onPressEnter={(e) =>
                handleSearchSelect((e.target as HTMLInputElement).value)
              }
            />
          </AutoComplete>
        </div>
      )} */}
    </nav>
  );
};

export default Navbar;
