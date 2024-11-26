"use client";
import { Profile } from "@/types/profile";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import FeedProfile from "./profile";
import FeedShop from "./shop";
import FeedActivities from "./activities";

const Feed = ({
  profileData,
  sellerId,
  interests,
}: {
  profileData: Profile;
  sellerId?: string;
  interests?: string[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "profile";

  const renderContent = () => {
    switch (currentTab) {
      case "profile":
        return <FeedProfile profileData={profileData} interests={interests} />;
      case "shop":
        return <FeedShop sellerId={sellerId} />;
      case "activity":
        return <FeedActivities />;
      default:
        return <div>Not Found</div>;
    }
  };

  return <div className="max-w-7xl mx-auto">{renderContent()}</div>;
};

export default Feed;
