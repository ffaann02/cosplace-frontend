"use client";

import React, { useEffect, useState } from "react";
import { apiClient } from "@/api";
import NotFound from "@/app/not-found";
import Feed from "@/components/pages/profile/feed";
import ProfileHeader from "@/components/pages/profile/profile-header";
import { Spin } from "antd"; // Optional: Loading spinner

const UserProfile = ({ params }: { params: { username: string } }) => {
  const { username } = params;

  const [user, setUser] = useState<any>(null);
  const [sellerId, setSellerId] = useState<string>({} as string);
  const [interests, setInterests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/profile/feed/${username}`);
        const data = response.data;
        setUser(data.profile);
        setSellerId(data.seller_id);
        setInterests(data.interests);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !user) {
    return <NotFound />;
  }

  return (
    <div className="w-full">
      <ProfileHeader
        username={username}
        displayName={user.display_name}
        bio={user.bio}
        profileImageUrl={user.profile_image_url}
        coverImageUrl={user.cover_image_url}
        sellerId={sellerId}
      />
      <Feed profileData={user} sellerId={sellerId} interests={interests} />
    </div>
  );
};

export default UserProfile;
