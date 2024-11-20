export const runtime = "edge";
import SearchPeople from "@/components/pages/friends/search-people";
import { apiClientWithAuth } from "@/api";
import { auth } from "@/libs/auth";
import { Button } from "antd";
import Link from "next/link";
import SearchBox from "@/components/pages/friends/matching/search-box";
import Result from "@/components/pages/friends/matching/result";
import PersonCard from "@/components/pages/friends/person-card";

interface SearchParams {
  [key: string]: string | undefined;
}

const requestFriends = [
  {
    username: "johndoe",
    display_name: "John Doe",
    first_name: "John",
    last_name: "Doe",
    profile_image_url: "/images/sad-cat.jpg",
  },
  {
    username: "janedoe",
    display_name: "Jane Doe",
    first_name: "Jane",
    last_name: "Doe",
    profile_image_url: "/images/sad-cat.jpg",
  },
  {
    username: "johndoe",
    display_name: "John Doe",
    first_name: "John",
    last_name: "Doe",
    profile_image_url: "/images/sad-cat.jpg",
  },
  {
    username: "janedoe",
    display_name: "Jane Doe",
    first_name: "Jane",
    last_name: "Doe",
    profile_image_url: "/images/sad-cat.jpg",
  },
  {
    username: "johndoe",
    display_name: "John Doe",
    first_name: "John",
    last_name: "Doe",
    profile_image_url: "/images/sad-cat.jpg",
  },
  {
    username: "janedoe",
    display_name: "Jane Doe",
    first_name: "Jane",
    last_name: "Doe",
    profile_image_url: "/images/sad-cat.jpg",
  },
];

const suggestFriends = [
  {
    username: "johndoe",
    display_name: "John Doe",
    first_name: "John",
    last_name: "Doe",
    profile_image_url: "/images/sad-cat.jpg",
  },
  {
    username: "janedoe",
    display_name: "Jane Doe",
    first_name: "Jane",
    last_name: "Doe",
    profile_image_url: "/images/sad-cat.jpg",
  },
  {
    username: "johndoe",
    display_name: "John Doe",
    first_name: "John",
    last_name: "Doe",
    profile_image_url: "/images/sad-cat.jpg",
  },
  {
    username: "janedoe",
    display_name: "Jane Doe",
    first_name: "Jane",
    last_name: "Doe",
    profile_image_url: "/images/sad-cat.jpg",
  },
  {
    username: "johndoe",
    display_name: "John Doe",
    first_name: "John",
    last_name: "Doe",
    profile_image_url: "/images/sad-cat.jpg",
  },
  {
    username: "janedoe",
    display_name: "Jane Doe",
    first_name: "Jane",
    last_name: "Doe",
    profile_image_url: "/images/sad-cat.jpg",
  },
];

const Friends = async ({ searchParams }: { searchParams: SearchParams }) => {
  const searchQuery = searchParams?.search || "";
  const type = searchParams?.type || "list"; // Default to "list"
  // const session = await auth();

  return (
    <div className="w-full lg:max-w-[72rem] 2xl:max-w-[80rem] section-container pt-12 md:pt-16 px-4 flex flex-col gap-4">
      <div className="bg-primary-50 rounded-xl border border-primary-200 px-6 pt-4 pb-0 flex gap-x-8">
        <Link href="/friends?type=list">
          <button
            className={`${
              type === "list" ? "text-primary-600" : "text-neutral-400"
            } pb-3 border-b-2 ${
              type === "list" ? "border-b-primary-600" : " border-transparent"
            } px-4 text-lg transition-all ease-linear duration-200`}
          >
            คำขอและแนะนำ
          </button>
        </Link>
        <Link href="/friends?type=matching">
          <button
            className={`${
              type === "matching" ? "text-primary-600" : "text-neutral-400"
            } pb-3 border-b-2 ${
              type === "matching" ? "border-b-primary-600" : " border-transparent"
            } px-4 text-lg transition-all ease-linear duration-200`}
          >
            จับคู่คอสเพลย์
          </button>
        </Link>
      </div>
      {type === "list" && (
        <>
          <h3 className="text-primary-800 mb-2">คำขอเพิ่มเพื่อน</h3>
          {/* Request Friends List */}
          
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 lg:gap-4">
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
          </div> 
         
          <h3 className="text-primary-800 mt-16 mb-2">คนที่คุณอาจรู้จัก</h3>
          {/* Suggested Friends List */}
          
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 lg:gap-4">
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
          </div> 
         
        </>
      )}
      {type === "matching" && (
        <>
          <SearchBox />
          <Result/>
        </>
      )}
    </div>
  );
};

export default Friends;
