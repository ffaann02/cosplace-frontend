import { Profile } from "@/types/profile";
import { eventCardDateFormat, formatDate } from "@/utils/dateformat";
import Image from "next/image";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const NoFeedContent = ({
  display_name = "ผู้ใช้",
}: {
  display_name: string | undefined;
}) => {
  return (
    <div className="w-full p-8 bg-primary-50 border-primary-100 border rounded-lg flex flex-col items-center">
      <Image
        priority
        unoptimized={true}
        src={"/images/tanuki-commission.png"}
        alt="hero-mascot"
        width={240}
        height={240}
        className="opacity-60"
      />
      <h3 className="text-2xl text-primary-600 mt-6">
        <span className="text-xl mr-2">ไม่มีข้อมูลในหน้าฟีดของ</span>{" "}
        {display_name}
      </h3>
    </div>
  );
};

const FeedProfile = ({ profileData }: { profileData: Profile }) => {
  return (
    <div className="w-full grid grid-cols-8 mt-4 text-primary-800 gap-4 px-4 xl:px-0">
      <div className="col-span-full md:col-span-3 space-y-4">
        <div className="bg-primary-50 pt-2 p-4 drop-shadow-sm border-primary-100 border rounded-lg space-y-3 h-fit">
          <h4 className="font-medium">ข้อมูลผู้ใช้</h4>
          <div className="bg-white/80 text-center px-2 py-1 border border-primary-100 rounded-lg">
            <p>{profileData.bio}</p>
          </div>
          <div className="flex flex-wrap just gap-x-8">
            <div className="flex text-xl">
              <FaInstagram className="inline-block my-auto" />:
              <span className="ml-2 my-auto">
                {profileData.instagram_url ? profileData.instagram_url : "-"}
              </span>
            </div>
            <div className="flex text-xl">
              <FaTwitter className="inline-block my-auto" />:
              <span className="ml-2 my-auto">
                {profileData.twitter_url ? profileData.twitter_url : "-"}
              </span>
            </div>
            <div className="flex text-xl">
              <FaFacebook className="inline-block my-auto" />:
              <span className="ml-2 my-auto">
                {profileData.facebook_url ? profileData.facebook_url : "-"}
              </span>
            </div>
          </div>
          <p>
            วันเกิด:{" "}
            <span className="ml-1">
              {/* {eventCardDateFormat(profileData.date_of_birth)} */}
            </span>
          </p>
          <p>
            เข้าร่วมเมื่อ:{" "}
            <span className="ml-1">
              {eventCardDateFormat(profileData.created_at)}
            </span>
          </p>
        </div>
        <div className="bg-primary-50 pt-2 p-4 drop-shadow-sm border-primary-100 border rounded-lg space-y-3 h-fit">
          <h4 className="font-medium">พอร์ตโฟลิโอและผลงาน</h4>
            -
        </div>
      </div>
      <div className="col-span-full md:col-span-5">
        <NoFeedContent display_name={profileData.display_name} />
      </div>
    </div>
  );
};

export default FeedProfile;
