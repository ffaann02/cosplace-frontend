export const dynamic = 'force-dynamic'
import { apiClient } from "@/api";
import NotFound from "@/app/not-found";
import Feed from "@/components/pages/profile/feed";
import ProfileHeader from "@/components/pages/profile/profile-header";

const UserProfile = async ({ params }: { params: { username: string } }) => {
  const { username } = params;

  try {
    const response = await apiClient.get(`/profile/feed/${username}`);
    console.log(response.data);
    const user = response.data;

    return (
      <div className="w-full">
        <ProfileHeader
          username={username}
          displayName={user.display_name}
          bio={user.bio}
          profileImageUrl={user.profile_image_url}
          coverImageUrl={user.cover_image_url}
          // sellerId={user.seller_id}
          sellerId=""
        />
        <Feed profileData={user} />
      </div>
    );
  } catch (error) {
    return <NotFound />;
  }
};

export default UserProfile;
