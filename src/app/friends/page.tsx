export const runtime = 'edge';
import PersonCard from "@/components/pages/friends/person-card";
import SearchPeople from "@/components/pages/friends/search-people";

interface SearchParams {
  [key: string]: string | undefined;
}

const Friends = ({ searchParams }: { searchParams: SearchParams}) => {
  const searchQuery = searchParams?.search || "";
  return (
    <div className="w-full lg:max-w-[80rem] 2xl:max-w-[86rem] section-container pt-12 md:pt-16 px-4">
      <SearchPeople search_query={searchQuery} />
      <h3 className="text-primary-800 mb-2">คำขอเพิ่มเพื่อน</h3>
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 lg:gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
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
      <h3 className="text-primary-800 mt-16 mb-2">คนที่คุณอาจรู้จัก</h3>
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 lg:gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
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
