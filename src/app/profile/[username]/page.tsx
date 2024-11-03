import ProfileHeader from "@/components/pages/profile/profile-header";

const UserProfile = ({ params }: { params: { username: string } }) => {
  return (
    <div className="w-full">
      <ProfileHeader username={params.username} displayName="Kuay" />
      {/* <div>page {params.username}</div> */}
      <div className="max-w-7xl mx-auto">hello</div>
    </div>
  );
}; 

export default UserProfile;
