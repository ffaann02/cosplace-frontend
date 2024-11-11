// app/profile/page.tsx

"use client";

import { useSearchParams } from "next/navigation";
import LeftSideBar from "@/components/pages/profile/manage-user-profile/left-sidebar";
import ManageProfileSection from "@/components/pages/profile/manage-user-profile/manage-profile-section";

const Profile = () => {
  const searchParams = useSearchParams();
  const currentMenu = searchParams.get("menu") || "account";
  return (
    <div className="flex-grow max-w-7xl mx-auto w-full h-full flex mt-12 px-4">
      <div className="w-full text-primary-800 rounded-2xl drop-shadow-sm">
        <div className="grid grid-cols-12 gap-x-4 h-full">
          <div className="col-span-4 xl:col-span-3 hidden md:block bg-neutral-50 py-4 rounded-xl h-fit border border-neutral-100">
            <LeftSideBar currentMenu={currentMenu} />
          </div>
          <div className="col-span-full md:col-span-8 xl:col-span-9 bg-neutral-50 rounded-xl h-fit border border-neutral-100">
            <ManageProfileSection currentMenu={currentMenu} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;