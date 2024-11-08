import PersonCard from "@/components/pages/friends/person-card";

const Friends = () => {
  return (
    <div className="w-full lg:max-w-[80rem] 2xl:max-w-[86rem] section-container pt-16">
      <h3 className="text-primary-800">คนที่คุณอาจรู้จัก</h3>
      <div className="grid grid-cols-6 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <PersonCard
            key={index}
            username="user_name"
            display_name="display_name"
            first_name="first_name"
            last_name="last_name"
            profile_image_url="profile_image_url"
          />
        ))}
      </div>
    </div>
  );
};
export default Friends;
