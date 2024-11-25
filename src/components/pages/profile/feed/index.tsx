"use client";
import { Profile } from "@/types/profile";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import FeedProfile from "./profile";
import FeedShop from "./shop";
import FeedActivities from "./activities";

const Feed = ({ profileData }: { profileData: Profile }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "profile";

  const renderContent = () => {
    switch (currentTab) {
      case "profile":
        return <FeedProfile profileData={profileData} />;
      case "shop":
        return <FeedShop />;
      case "activity":
        return <FeedActivities />;
      default:
        return <div>Not Found</div>;
    }
  };

  return <div className="max-w-7xl mx-auto">{renderContent()}</div>;
};

export default Feed;