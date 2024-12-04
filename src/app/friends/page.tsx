"use client";
export const runtime = "edge";
import SearchPeople from "@/components/pages/friends/search-people";
import { apiClientWithAuth } from "@/api";
import { auth } from "@/libs/auth";
import { Button } from "antd";
import Link from "next/link";
import SearchBox from "@/components/pages/friends/matching/search-box";
import Result from "@/components/pages/friends/matching/result";
import PersonCard from "@/components/pages/friends/person-card";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Cosplayer } from "@/types/profile";

interface SearchParams {
  [key: string]: string | undefined;
}

interface FriendStructure {
  user_id: string;
  username: string;
  display_name: string;
  first_name: string;
  last_name: string;
  profile_image_url: string;
}

const Friends = ({ searchParams }: { searchParams: SearchParams }) => {
  const searchQuery = searchParams?.search || "";
  const type = searchParams?.type || "list"; // Default to "list"
  // const session = await auth();

  const [friendList, setFriendList] = useState<FriendStructure[]>([]);
  const [suggestFriendList, setSuggestFriendList] = useState<FriendStructure[]>(
    []
  );
  const [incomingRequestFriendList, setIncomingRequestFriendList] = useState<
    FriendStructure[]
  >([]);
  const [waitingAcceptFriendList, setWaitingAcceptFriendList] = useState<
    FriendStructure[]
  >([]);
  const [matchedCosplayerList, setMatchedCosplayerList] = useState<
    FriendStructure[]
  >([]);
  const [openSearchBox, setOpenSearchBox] = useState<boolean>(true);

  const [cosplayerList, setCosplayerList] = useState<Cosplayer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuth();

  const GetFriendList = async () => {
    try {
      const response = await apiClientWithAuth.get("/friend/list", {
        params: {
          user_id: user?.user_id,
        },
      });
      setFriendList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetSuggestFriend = async () => {
    try {
      const response = await apiClientWithAuth.get("/friend/suggests", {
        params: {
          user_id: user?.user_id,
        },
      });
      setSuggestFriendList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetIncomingRequestFriend = async () => {
    try {
      const response = await apiClientWithAuth.get("/friend/requests", {
        params: {
          user_id: user?.user_id,
        },
      });
      setIncomingRequestFriendList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetWaitingAcceptFriend = async () => {
    try {
      const response = await apiClientWithAuth.get("/friend/waiting-accept", {
        params: {
          user_id: user?.user_id,
        },
      });
      setWaitingAcceptFriendList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetCosplayerList = async () => {
    setLoading(true);
    setCosplayerList([]);
    try {
      const response = await apiClientWithAuth.get("/match-cosplayer/list", {
        params: {
          user_id: user?.user_id,
        },
      });
      console.log(response.data);
      setTimeout(() => {
        setOpenSearchBox(false);
        setCosplayerList(response.data);
        setLoading(false);
      }, 3000); // Delay for 3 seconds
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setOpenSearchBox(false);
        setLoading(false);
      }, 3000); // Delay for 3 seconds
    }
  };

  useEffect(() => {
    if (user) {
      GetFriendList();
      GetSuggestFriend();
      GetIncomingRequestFriend();
      GetWaitingAcceptFriend();
      // GetCosplayerList();
    }
  }, [user]);

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
              type === "matching"
                ? "border-b-primary-600"
                : " border-transparent"
            } px-4 text-lg transition-all ease-linear duration-200`}
          >
            จับคู่คอสเพลย์
          </button>
        </Link>
      </div>
      {type === "list" && (
        <>
          <h3 className="text-primary-800 mb-2">เพื่อนของคุณ</h3>
          {friendList.length === 0 && (
            <p className="text-primary-800 text-left -mt-4">ไม่มี</p>
          )}
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 lg:gap-4">
            {friendList?.map((friend: any, index: number) => (
              <PersonCard
                type="friend"
                key={index}
                user_id={user?.user_id || ""}
                username={friend.username}
                display_name={friend.display_name || friend.first_name}
                first_name={friend.first_name}
                last_name={friend.last_name}
                profile_image_url={friend.profile_image_url}
              />
            ))}
          </div>

          {/* Incoming friend requested */}
          <h3 className="text-primary-800 mb-2">คำขอเพิ่มเพื่อน</h3>
          {incomingRequestFriendList.length === 0 && (
            <p className="text-primary-800 text-left -mt-4">ไม่มี</p>
          )}
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 lg:gap-4">
            {incomingRequestFriendList?.map((friend: any, index: number) => (
              <PersonCard
                type="request"
                key={index}
                user_id={user?.user_id || ""}
                username={friend.username}
                display_name={friend.display_name || friend.first_name}
                first_name={friend.first_name}
                last_name={friend.last_name}
                profile_image_url={friend.profile_image_url}
              />
            ))}
          </div>

          {/* Waiting accept friend request */}
          <h3 className="text-primary-800 mb-2">ส่งคำขอเพิ่มเพื่อนแล้ว</h3>
          {waitingAcceptFriendList.length === 0 && (
            <p className="text-primary-800 text-left -mt-4">ไม่มี</p>
          )}
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 lg:gap-4">
            {waitingAcceptFriendList?.map((friend: any, index: number) => (
              <PersonCard
                type="waiting"
                key={index}
                user_id={user?.user_id || ""}
                username={friend.username}
                display_name={friend.display_name || friend.first_name}
                first_name={friend.first_name}
                last_name={friend.last_name}
                profile_image_url={friend.profile_image_url}
              />
            ))}
          </div>

          {/* Suggest friend */}
          <h3 className="text-primary-800 mt-16 mb-2">คนที่คุณอาจรู้จัก</h3>
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 lg:gap-4">
            {suggestFriendList?.map((suggestion: any, index: number) => (
              <PersonCard
                type="suggest"
                key={index}
                user_id={user?.user_id || ""}
                username={suggestion.username}
                display_name={suggestion.display_name || suggestion.first_name}
                first_name={suggestion.first_name}
                last_name={suggestion.last_name}
                profile_image_url={suggestion.profile_image_url}
                ignoreSuggestion={() =>
                  setSuggestFriendList(
                    suggestFriendList.filter((_, i) => i !== index)
                  )
                }
              />
            ))}
          </div>
        </>
      )}
      {type === "matching" && (
        <>
          <SearchBox
            loading={loading}
            setLoading={setLoading}
            openSearchBox={openSearchBox}
            setOpenSearchBox={setOpenSearchBox}
            GetCosplayerList={GetCosplayerList}
          />
          {!loading && cosplayerList.length > 0 && (
            <Result cosplayerList={cosplayerList} />
          )}
        </>
      )}
    </div>
  );
};

export default Friends;
