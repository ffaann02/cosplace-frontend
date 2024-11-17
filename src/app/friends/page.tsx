import PersonCard from "@/components/pages/friends/person-card";
import SearchPeople from "@/components/pages/friends/search-people";
import  getServerSession  from "next-auth";
import { useSession } from "next-auth/react";
import { apiClientWithAuth } from "@/api";
import { auth } from "@/libs/auth";

interface SearchParams {
  [key: string]: string | undefined;
}

const Friends = async ({ searchParams }: { searchParams: SearchParams }) => {
  const searchQuery = searchParams?.search || "";
  const session = await auth();
  console.log(session);
  try{
    const [requestsResponse, suggestionsResponse] = await Promise.all([
      apiClientWithAuth.get(`/friend/requests?user_id=${session?.user?.id}`),
      apiClientWithAuth.get(`/friend/suggestions?user_id=${session?.user?.id}`),
    ]);
    console.log("result:")
    console.log(requestsResponse.data);
    console.log(suggestionsResponse.data);
  }
  catch(e){
    console.log(e)
  }

  return (
    <div className="w-full lg:max-w-[80rem] 2xl:max-w-[86rem] section-container pt-12 md:pt-16 px-4">
      <SearchPeople search_query={searchQuery} />
      <h3 className="text-primary-800 mb-2">คำขอเพิ่มเพื่อน</h3>
      {/* <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 lg:gap-4">
        {requestFriends.map((friend: any, index: number) => (
          <PersonCard
            type="request"
            key={index}
            username={friend.username}
            display_name={friend.display_name}
            first_name={friend.first_name}
            last_name={friend.last_name}
            profile_image_url={friend.profile_image_url}
          />
        ))}
      </div> */}
      <h3 className="text-primary-800 mt-16 mb-2">คนที่คุณอาจรู้จัก</h3>
      {/* <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 lg:gap-4">
        {suggestFriends.map((suggestion: any, index: number) => (
          <PersonCard
            type="suggest"
            key={index}
            username={suggestion.username}
            display_name={suggestion.display_name}
            first_name={suggestion.first_name}
            last_name={suggestion.last_name}
            profile_image_url={suggestion.profile_image_url}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Friends;
