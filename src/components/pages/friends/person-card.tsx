"use client";
import { apiClientWithAuth } from "@/api";
import { Button } from "antd";
import { set } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PersonCardProps {
  type: "request" | "suggest" | "waiting" | "friend";
  user_id: string;
  username: string;
  display_name: string;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  ignoreSuggestion?: () => void;
}

const PersonCard = ({
  type,
  user_id,
  username,
  display_name,
  first_name,
  last_name,
  profile_image_url,
  ignoreSuggestion,
}: PersonCardProps) => {
  const router = useRouter();

  const [alreadyAdded, setAlreadyAdded] = useState<boolean>(false);
  const [alreadyAccepted, setAlreadyAccepted] = useState<boolean>(false);
  const [alreadyRejected, setAlreadyRejected] = useState<boolean>(false);
  const [alreadyCanceled, setAlreadyCanceled] = useState<boolean>(false);
  const [alreadyDeletedFriend, setAlreadyDeletedFriend] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const navigateToProfile = (username: string) => {
    router.push(`/profile/${username}`);
  };

  const onAcceptRequest = async () => {
    try {
      setLoading(true);
      const response = await apiClientWithAuth.post("/friend/accept-request", {
        user_id: user_id,
        friend_username: username,
      });
      console.log(response.data);
      setAlreadyAccepted(true);
    } catch (e) {
      console.log(e)
      setLoading(false);
      setAlreadyAccepted(false);
    }
  };

  const onRejectRequest = async () => {
    try {
      setLoading(true);
      const response = await apiClientWithAuth.post("/friend/reject-request", {
        user_id: user_id,
        friend_username: username,
      });
      console.log(response.data);
      setAlreadyRejected(true);
    } catch (e) {
      console.log(e)
      setLoading(false);
      setAlreadyRejected(false);
    }
  };

  const onAddFriend = async () => {
    console.log("Add friend");
    try {
      setLoading(true);
      const response = await apiClientWithAuth.post("/friend/send-request", {
        user_id: user_id,
        friend_username: username,
      });
      console.log(response.data);
      setLoading(false);
      setAlreadyAdded(true);
    }
    catch (e) {
      console.log(e)
      setLoading(false);
      setAlreadyAdded(false);
    }
  };

  const onCancelAddFriend = async () => {
    try {
      setLoading(true);
      const response = await apiClientWithAuth.post("/friend/cancel-request", {
        user_id: user_id,
        friend_username: username,
      });
      setAlreadyCanceled(true);
    } catch (e) {
      console.log(e)
      setLoading(false);
      setAlreadyAdded(false);
    }
  };

  const onRemoveFriend = async () => {
    try {
      setLoading(true);
      const response = await apiClientWithAuth.post("/friend/delete", {
        user_id: user_id,
        friend_username: username,
      });
      console.log(response.data);
      setAlreadyDeletedFriend(true);
    } catch (e) {
      console.log(e)
      setLoading(false);
      setAlreadyDeletedFriend(false);
    }
  }

  const onIgnoreSuggestion = async () => {
    console.log("Ignore suggestion");
    if (ignoreSuggestion) {
      ignoreSuggestion();
    }
  };

  return (
    <div
      className="font-light rounded-lg border border-neutral-100 bg-neutral-50 hover:cursor-pointer
    hover:bg-primary-50 hover:border-primary-200"
    >
      <Image
        className="object-cover w-full h-[200px] rounded-t"
        src={profile_image_url || "/images/sad-cat.jpg"}
        alt="profile image"
        width={200}
        height={200}
        onClick={() => navigateToProfile(username)}
      />
      <div className="p-2 pt-1">
        <h4 className="text-primary-800 truncate">{display_name}</h4>
        <p className="-mt-1 text-sm text-primary-600 mb-4">@{username}</p>
        {type === "request" &&
          (alreadyAccepted ? (
            <div>
              <p className="text-primary-700 font-normal text-center p-2 bg-primary-100 rounded-lg">
                ยอมรับคำขอแล้ว
              </p>
              <p className="text-primary-500 font-normal text-center p-2 rounded-lg text-sm mt-2">
                คุณเป็นเพื่อนกันแล้ว
              </p>
            </div>
          ) : (alreadyRejected) ? (
            <div>
              <p className="text-primary-700 font-normal text-center p-2 bg-primary-100 rounded-lg">
                ปฏิเสธคำขอแล้ว
              </p>
            </div>
          ) : (
            <div>
              <Button
                style={{ width: "100%" }}
                type="primary"
                onClick={onAcceptRequest}
              >
                ยกเลิกคำขอ
              </Button>
              <Button
                style={{ width: "100%", marginTop: 8 }}
                type="default"
                onClick={onRejectRequest}
              >
                ปฏิเสธคำขอ
              </Button>
            </div>
          ))}
        {type === "waiting" &&
          (alreadyCanceled ? (
            <div>
              <p className="text-primary-500 font-normal text-center p-2 rounded-lg text-sm mt-2">
                ยกเลิกคำขอเพื่อนแล้ว
              </p>
            </div>
          ) : (
            <div>
              <Button
                style={{ width: "100%", marginTop: 8 }}
                type="default"
                onClick={onCancelAddFriend}
              >
                ยกเลิกคำขอเพิ่มเพื่อน
              </Button>
            </div>
          ))}
        {type === "suggest" &&
          (alreadyAdded ? (
            <div>
              <p className="text-primary-700 font-normal text-center p-2 bg-primary-100 rounded-lg">
                ส่งคำขอเพิ่มเพื่อนแล้ว
              </p>
              <Button
                style={{ width: "100%", marginTop: 8 }}
                type="default"
                onClick={onCancelAddFriend}
              >
                ยกเลิกคำขอ
              </Button>
            </div>
          ) : (
            <div>
              <Button
                style={{ width: "100%" }}
                type="primary"
                onClick={onAddFriend}
              >
                เพิ่มเพื่อน
              </Button>
              <Button
                style={{ width: "100%", marginTop: 8 }}
                type="default"
                onClick={onIgnoreSuggestion}
              >
                ไม่สนใจ
              </Button>
            </div>
          ))}
        {type === "friend" &&
          (alreadyDeletedFriend ? (
            <div>
              <p className="text-primary-700 font-normal text-center p-2 bg-primary-100 rounded-lg">
                ลบเพื่อนแล้ว
              </p>
            </div>
          ) : (
            <div>
              <Button
                style={{ width: "100%", marginTop: 8 }}
                type="default"
                onClick={onRemoveFriend}
              >
                ลบเพื่อน
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};
export default PersonCard;
