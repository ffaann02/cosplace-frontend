"use client";
import { Button, Tabs, TabsProps } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { IoChatbubbleOutline } from "react-icons/io5";
import { TbFriends } from "react-icons/tb";

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
}) => {
  const [currentTab, setCurrentTab] = useState<string>("1");

  const handleChangeTab = (key: string) => {
    setCurrentTab(key);
  };

  return (
    <div className="w-full relative bg-primary-50 border border-b-primary-100">
      <Image
        src="https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress&fm=pjpg"
        alt="Profile Header"
        width={1920}
        height={196}
        className="w-full h-[128px] lg:h-[196px] object-cover z-[20] relative"
      />
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXFajwhtgDi6dBSYXf110K6408BstkJ2Xe23N453vJncFSchmXXqUHuFQpgSGlBEd4_BA&usqp=CAU"
        alt="Profile Header"
        width={124}
        height={124}
        className="w-[124px] h-[124px] object-cover rounded-full border-2 border-white -mt-16 
        z-[21] relative ml-4 mr-auto md:mx-auto cursor-pointer hover:brightness-125 transition-all 
        ease-linear duration-300"
      />
      <div className="text-left md:text-center tracking-wide px-6 mt-2">
        <p className="text-2xl text-primary-800">{displayName}</p>
        <p className="text-lg text-primary-400">@{username}</p>
        {/* <p className="text-lg text-primary-400">{bio}</p> */}
        <p className="text-primary-600 text-sm md:text-md md:px-0 w-full md:max-w-[60%] 
        xl:max-w-[40%] mr-auto md:mx-auto mt-2 md:mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
          doloremque magni blanditiis commodi adipisci ipsam in eius id
          quibusdam temporibus.
        </p>
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
      <div className="max-w-7xl mx-auto mt-6 -mb-4 flex justify-between border-t border-primary-200
      px-6 xl:px-0">
        <Tabs
          size="large"
          defaultActiveKey="1"
          items={items}
          onChange={handleChangeTab}
        />
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
      </div>
    </div>
  );
};
export default ProfileHeader;
