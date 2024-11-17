"use client";
import { useAuth } from "@/context/auth-context";
import usePreviewImage from "@/hooks/use-preview-image";
import { Button, Tabs, TabsProps } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { IoChatbubbleOutline, IoPersonOutline } from "react-icons/io5";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "โปรไฟล์",
  },
  {
    key: "2",
    label: "ร้านค้า",
  },
  {
    key: "3",
    label: "กิจกรรมที่เข้าร่วม",
  },
];

interface ProfileHeaderProps {
  profileImageUrl?: string;
  coverImageUrl?: string;
  username: string;
  displayName: string;
  bio?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  displayName,
  bio,
  profileImageUrl,
  coverImageUrl,
}) => {
  const [currentTab, setCurrentTab] = useState<string>("1");
  const { user } = useAuth();
  const { openPreview, PreviewImageModal } = usePreviewImage();

  const handleChangeTab = (key: string) => {
    setCurrentTab(key);
  };

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
        {/* <p className="text-primary-600 text-sm md:text-md md:px-0 w-full md:max-w-[60%] 
        xl:max-w-[40%] mr-auto md:mx-auto mt-2 md:mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
          doloremque magni blanditiis commodi adipisci ipsam in eius id
          quibusdam temporibus.
        </p> */}
        <div className="gap-x-2 mt-4 md:hidden flex -mb-2">
          <Button type="primary" size="large" className="">
            <IoMdPersonAdd className="text-lg" />
            <p className="ml-1">เพิ่มเพื่อน</p>
          </Button>
          <Button type="default" size="large" className="">
            <IoChatbubbleOutline className="text-lg" />
            <p className="ml-1">แชท</p>
          </Button>
        </div>
      </div>
      <div
        className="max-w-7xl mx-auto mt-6 -mb-4 flex justify-between border-t border-primary-200
      px-6 xl:px-0"
      >
        <Tabs
          size="large"
          defaultActiveKey="1"
          items={items}
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
