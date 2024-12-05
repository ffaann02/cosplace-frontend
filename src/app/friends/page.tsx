"use client";
export const runtime = "edge";
import SearchPeople from "@/components/pages/friends/search-people";
import { apiClientWithAuth } from "@/api";
import { auth } from "@/libs/auth";
import { Button, Checkbox, Input } from "antd";
import Link from "next/link";
import SearchBox from "@/components/pages/friends/matching/search-box";
import Result from "@/components/pages/friends/matching/result";
import PersonCard from "@/components/pages/friends/person-card";
import { RefObject, useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import NoFriendList from "@/components/pages/friends/no-friend-list";
import FriendCard from "@/components/pages/friends/friend-card";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import FriendSearchHeader from "@/components/pages/friends/friend-search-header";

interface SearchParams {
  [key: string]: string | undefined;
}

export interface FriendStructure {
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
  const [suggestFriendList, setSuggestFriendList] = useState<FriendStructure[]>([]);
  const [incomingRequestFriendList, setIncomingRequestFriendList] = useState<FriendStructure[]>([]);
  const [waitingAcceptFriendList, setWaitingAcceptFriendList] = useState<FriendStructure[]>([]);

  const [cosplayerList, setCosplayerList] = useState<FriendStructure[]>([]);

  const { user } = useAuth();

  const scrollSuggestListRef = useRef<HTMLDivElement>(null);
  const scrollIncomingRequestListRef = useRef<HTMLDivElement>(null);
  const scrollWaitingAcceptListRef = useRef<HTMLDivElement>(null);

  const [isOverflowing, setIsOverflowing] = useState({
    suggest: false,
    incomingRequest: false,
    waitingAccept: false,
  });

  const scrollLeft = (scrollRef: RefObject<HTMLDivElement>) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = (scrollRef: RefObject<HTMLDivElement>) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const GetFriendList = async () => {
    try {
      const response = await apiClientWithAuth.get("/friend/list", {
        params: {
          user_id: user?.user_id
        }
      });
      setFriendList(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  const GetSuggestFriend = async () => {
    try {
      const response = await apiClientWithAuth.get("/friend/suggests", {
        params: {
          user_id: user?.user_id
        }
      });
      setSuggestFriendList(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  const GetIncomingRequestFriend = async () => {
    try {
      const response = await apiClientWithAuth.get("/friend/requests", {
        params: {
          user_id: user?.user_id
        }
      });
      setIncomingRequestFriendList(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  const GetWaitingAcceptFriend = async () => {
    try {
      const response = await apiClientWithAuth.get("/friend/waiting-accept", {
        params: {
          user_id: user?.user_id
        }
      });
      setWaitingAcceptFriendList(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  const GetCosplayerList = async () => {
    try {
      const response = await apiClientWithAuth.get("/match-cosplayer/list", {
        params: {
          user_id: user?.user_id
        }
      });
      setCosplayerList(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user) {
      GetFriendList();
      GetSuggestFriend();
      GetIncomingRequestFriend();
      GetWaitingAcceptFriend();
      GetCosplayerList();
    }
  }, [user, type])

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollSuggestListRef.current) {
        const { scrollWidth, clientWidth } = scrollSuggestListRef.current;
        setIsOverflowing({
          ...isOverflowing,
          suggest: scrollWidth > clientWidth,
        });
      }
      else if (scrollIncomingRequestListRef.current) {
        const { scrollWidth, clientWidth } = scrollIncomingRequestListRef.current;
        setIsOverflowing({
          ...isOverflowing,
          incomingRequest: scrollWidth > clientWidth,
        });
      }
      else if (scrollWaitingAcceptListRef.current) {
        const { scrollWidth, clientWidth } = scrollWaitingAcceptListRef.current;
        setIsOverflowing({
          ...isOverflowing,
          waitingAccept: scrollWidth > clientWidth,
        });
      }
    };

    // Check on mount and whenever the list changes
    checkOverflow();

    // Optional: Add resize listener to handle window resizing
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [incomingRequestFriendList, waitingAcceptFriendList, suggestFriendList]);

  return (
    <div className="w-full lg:max-w-[72rem] 2xl:max-w-[80rem] section-container pt-12 md:pt-16 px-4 flex flex-col gap-4">
      <div className="bg-primary-50 rounded-xl border border-primary-200 px-6 pt-4 pb-0 flex gap-x-8">
        <Link href="/friends?type=list">
          <button
            className={`${type === "list" ? "text-primary-600" : "text-neutral-400"
              } pb-3 border-b-2 ${type === "list" ? "border-b-primary-600" : " border-transparent"
              } px-4 text-lg transition-all ease-linear duration-200`}
          >
            เพื่อนของคุณ
          </button>
        </Link>
        <Link href="/friends?type=request">
          <button
            className={`${type === "request" ? "text-primary-600" : "text-neutral-400"
              } pb-3 border-b-2 ${type === "request" ? "border-b-primary-600" : " border-transparent"
              } px-4 text-lg transition-all ease-linear duration-200`}
          >
            คำขอและแนะนำ
          </button>
        </Link>
        <Link href="/friends?type=matching">
          <button
            className={`${type === "matching" ? "text-primary-600" : "text-neutral-400"
              } pb-3 border-b-2 ${type === "matching" ? "border-b-primary-600" : " border-transparent"
              } px-4 text-lg transition-all ease-linear duration-200`}
          >
            จับคู่คอสเพลย์
          </button>
        </Link>
      </div>
      {type === "list" && (
        <>
          <div className="bg-primary-50 border border-primary-200 px-4 py-2 rounded-xl text-primary-600 min-h-screen">
            <FriendSearchHeader />
            {friendList.length === 0 && (
              <NoFriendList category="friend mt-4" />
            )}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {friendList?.map((friend: any, index: number) => (
                <FriendCard
                  key={index}
                  user_id={user?.user_id || ""}
                  username={friend.username}
                  display_name={friend.display_name || friend.first_name}
                  first_name={friend.first_name}
                  last_name={friend.last_name}
                  profile_image_url={friend.profile_image_url}
                  getFriendList={GetFriendList}
                />
              ))}
            </div>
          </div>
        </>
      )}
      {type === "request" && (
        <>
          {/* Incoming friend requested */}
          <div className="relative">
            <h3 className="text-primary-800 mt-8 mb-2">คำขอเพิ่มเพื่อน</h3>
            {incomingRequestFriendList.length === 0 && (
              <NoFriendList category="request" />
            )}
            <div className="flex items-center h-full">
              {/* Card Container */}
              <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto scrollbar-hide" ref={scrollIncomingRequestListRef}>
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
              {/* Scroll button */}
              {isOverflowing.incomingRequest && (
                <>
                  <button
                    onClick={() => scrollLeft(scrollIncomingRequestListRef)}
                    className="absolute -left-16 z-10 h-full p-1"
                  >
                    <FaAngleLeft className="w-12 h-12 bg-primary-200 text-primary-700 rounded-full p-4" />
                  </button>
                  <button
                    onClick={() => scrollRight(scrollIncomingRequestListRef)}
                    className="absolute -right-16 z-10 h-full"
                  >
                    <FaAngleRight className="w-12 h-12 bg-primary-200 text-primary-700 rounded-full p-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Waiting accept friend request */}
          <div className="relative">
            <h3 className="text-primary-800 mt-8 mb-2">ส่งคำขอเพิ่มเพื่อนแล้ว</h3>
            {waitingAcceptFriendList.length === 0 && (
              <NoFriendList category="waiting" />
            )}
            <div className="flex items-center h-full">
              {/* Card Container */}
              <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto scrollbar-hide" ref={scrollWaitingAcceptListRef}>
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
              {/* Scroll button */}
              {isOverflowing.waitingAccept && (
                <>
                  <button
                    onClick={() => scrollLeft(scrollWaitingAcceptListRef)}
                    className="absolute -left-16 z-10 h-full p-1"
                  >
                    <FaAngleLeft className="w-12 h-12 bg-primary-200 text-primary-700 rounded-full p-4" />
                  </button>
                  <button
                    onClick={() => scrollRight(scrollWaitingAcceptListRef)}
                    className="absolute -right-16 z-10 h-full"
                  >
                    <FaAngleRight className="w-12 h-12 bg-primary-200 text-primary-700 rounded-full p-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Suggest friend */}
          <div className="relative">
            <h3 className="text-primary-800 mt-8 mb-2">คนที่คุณอาจรู้จัก</h3>
            {suggestFriendList.length === 0 && (
              <NoFriendList category="suggest" />
            )}
            <div className="flex items-center h-full">
              {/* Card Container */}
              <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto scrollbar-hide" ref={scrollSuggestListRef}>
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
                      setSuggestFriendList(suggestFriendList.filter((_, i) => i !== index))
                    }
                  />
                ))}
              </div>
              {/* Scroll button */}
              {isOverflowing.suggest && (
                <>
                  <button
                    onClick={() => scrollLeft(scrollSuggestListRef)}
                    className="absolute -left-16 z-10 h-full p-1"
                  >
                    <FaAngleLeft className="w-12 h-12 bg-primary-200 text-primary-700 rounded-full p-4" />
                  </button>
                  <button
                    onClick={() => scrollRight(scrollSuggestListRef)}
                    className="absolute -right-16 z-10 h-full"
                  >
                    <FaAngleRight className="w-12 h-12 bg-primary-200 text-primary-700 rounded-full p-4" />
                  </button>
                </>
              )}
            </div>
          </div>

        </>
      )}
      {type === "matching" && (
        <>
          <SearchBox />
          <Result cosplayerList={cosplayerList} />
        </>
      )}
    </div>
  );
};

export default Friends;
