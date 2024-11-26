"use client";
import { useAuth } from "@/context/auth-context";
import usePreviewImage from "@/hooks/use-preview-image";
import { Button, Tabs, TabsProps } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { IoChatbubbleOutline, IoPersonOutline } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";

const items: TabsProps["items"] = [
  {
    key: "profile",
    label: "โปรไฟล์",
  },
  {
    key: "shop",
    label: "ร้านค้า",
  },
  {
    key: "activity",
    label: "กิจกรรมที่เข้าร่วม",
  },
];

interface ProfileHeaderProps {
  profileImageUrl?: string;
  coverImageUrl?: string;
  username: string;
  displayName: string;
  bio?: string;
  sellerId?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  displayName,
  bio,
  profileImageUrl,
  coverImageUrl,
  sellerId = "",
}) => {
  const { user } = useAuth();
  const { openPreview, PreviewImageModal } = usePreviewImage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "profile";

  const handleChangeTab = (key: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("tab", key);
    router.push(`?${newParams.toString()}`);
  };

  useEffect(() => {
    if (!searchParams.get("tab")) {
      handleChangeTab("profile");
    }
  }, []);

  // Filter items to exclude the "shop" tab if sellerId is not provided
  const filteredItems = items.filter((item) => item.key !== "shop" || sellerId);

  return (
    <div className="w-full relative bg-primary-50 border border-b-primary-100">
      <PreviewImageModal />
      <Image
        src={coverImageUrl || "/images/sad-cat.jpg"}
        alt="Profile Header"
        width={1920}
        height={196}
        className="w-full h-[128px] lg:h-[196px] object-cover z-[20] relative"
        unoptimized
      />
      <Image
        src={profileImageUrl || "/images/sad-cat.jpg"}
        alt="Profile Header"
        width={124}
        height={124}
        className="w-[124px] h-[124px] object-cover rounded-full border-2 border-white -mt-16 
        z-[21] relative ml-4 mr-auto md:mx-auto cursor-pointer hover:brightness-125 transition-all 
        ease-linear duration-300"
        unoptimized
        onClick={() => openPreview(profileImageUrl || "/images/sad-cat.jpg")}
      />
      <div className="text-left md:text-center tracking-wide px-6 mt-2">
        <p className="text-2xl text-primary-800">{displayName}</p>
        <p className="text-md text-primary-400">@{username}</p>
        <p className="text-lg text-primary-600 mt-2">{bio}</p>
        <div className="gap-x-2 mt-4 md:hidden flex -mb-2">
          {user?.username === username ? (
            <Link href="/profile?menu=account" className="">
              <div className="w-full text-right flex justify-end">
                <Button type="default" size="large" className="">
                  <IoPersonOutline className="text-lg" />
                  <p className="ml-1">จัดการโปรไฟล์</p>
                </Button>
              </div>
            </Link>
          ) : (
            <>
              <Button type="primary" size="large" className="">
                <IoMdPersonAdd className="text-lg" />
                <p className="ml-1">เพิ่มเพื่อน</p>
              </Button>
              <Button type="default" size="large" className="">
                <IoChatbubbleOutline className="text-lg" />
                <p className="ml-1">แชท</p>
              </Button>
            </>
          )}
        </div>
      </div>
      <div
        className="max-w-7xl mx-auto mt-6 -mb-4 flex justify-between border-t border-primary-200
      px-6 xl:px-0"
      >
        <Tabs
          size="large"
          activeKey={currentTab}
          items={filteredItems}
          onChange={handleChangeTab}
        />
        {user?.username === username ? (
          <Link href="/profile?menu=account" className="mt-2">
            <div className="gap-x-2 hidden md:flex">
              <Button type="default" size="large" className="">
                <IoPersonOutline className="text-lg" />
                <p className="ml-1">จัดการโปรไฟล์</p>
              </Button>
            </div>
          </Link>
        ) : (
          <div className="gap-x-2 mt-2 hidden md:flex">
            <Button type="primary" size="large" className="">
              <IoMdPersonAdd className="text-lg" />
              <p className="ml-1">เพิ่มเพื่อน</p>
            </Button>
            <Button type="default" size="large" className="">
              <IoChatbubbleOutline className="text-lg" />
              <p className="ml-1">แชท</p>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
