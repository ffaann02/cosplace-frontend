"use client";
import LeftSideBar from "@/components/pages/profile/manage-user-profile/left-sidebar"
import ManageProfileSection from "@/components/pages/profile/manage-user-profile/manage-profile-section"
import { useState } from "react";

const Profile = () => {
    const [currentMenu, setCurrentMenu] = useState<string>("profile");
    const selectMenu = (menu: string) => {
        setCurrentMenu(menu);
    };

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full h-full flex mt-12 bg-primary-50 rounded-2xl
    border border-primary-100 drop-shadow-sm px-4">
      <div className="grid grid-cols-10 gap-x-4 w-full py-6">
        <div className="col-span-2 border-r border-primary-200">
          <LeftSideBar currentMenu={currentMenu} selectMenu={selectMenu} />
        </div>
        <div className="col-span-8">
          <ManageProfileSection currentMenu={currentMenu} />
        </div>
      </div>
    </div>
  )
}
export default Profile