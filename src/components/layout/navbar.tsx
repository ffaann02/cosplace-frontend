"use client";
import { Button, Flex, Input, AutoComplete, Skeleton } from "antd";
import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import DrawerSidebar from "./drawer-sidebar";
import { roundedButton } from "@/config/theme";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import UserBadgeNavbar from "./user-badge-navbar";
import { TbMessageFilled } from "react-icons/tb";
import { signIn, useSession } from "next-auth/react";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const { data: session, status } = useSession();
  console.log(session);
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
          <div className="gap-x-4 xl:gap-x-5 2xl:gap-x-6 lg:flex hidden text-md xl:text-lg w-2/5 min-w-[448px]">
            <Link href="/" passHref className="my-auto">
              <span className="text-primary-600 hover:text-primary-800">
                หน้าหลัก
              </span>
            </Link>
            <Link href="/select-service" passHref className="my-auto">
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
                กิจกรรมและงาน
              </span>
            </Link>
          </div>
          <div className="w-full lg:w-3/5 my-auto ml-2 relative">
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
          <div
            className="lg:hidden flex z-[500] right-8 border-primary-400 bottom-6 bg-primary-200 w-8 h-8 rounded-full
    text-primary-500 my-auto ml-3 border cursor-pointer"
          >
            <TbMessageFilled className="text-lg m-auto" />
          </div>
        </div>
        <div className="my-auto mt-2">
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
      {status==="loading" ? (
        <div className="mx-2 scale-x-125 hidden lg:block">
          <Skeleton.Button active shape="default" size="default" />
        </div>
      ) : (
        <>
          {status === "authenticated" ? (
            <UserBadgeNavbar username={session.user?.name} />
          ) : (
            <Link href="/login" passHref className="hidden lg:block">
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
    </nav>
  );
};

export default Navbar;