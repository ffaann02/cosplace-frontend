export const runtime = "edge";

import { apiClient } from "@/api";
import NotFound from "@/app/not-found";
import ProfileHeader from "@/components/pages/profile/profile-header";

const UserProfile = async ({ params }: { params: { username: string } }) => {
  const { username } = params;

  try {
    const response = await apiClient.get(`/profile/feed/${username}`);
    const user = response.data;

    return (
      <div className="w-full">
        <ProfileHeader
          username={username}
          displayName={user.display_name}
          bio={user.bio}
          profileImageUrl={user.profile_image_url}
          coverImageUrl={user.cover_image_url}
        />
        <div className="max-w-7xl mx-auto">hello</div>
      </div>
    );
  } catch (error) {
    return <NotFound />;
  }
};

export default UserProfile;
