"use client";
import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PersonCardProps {
  type: "request" | "suggest";
  username: string;
  display_name: string;
  first_name: string;
  last_name: string;
  profile_image_url: string;
}

const PersonCard = ({
  type,
  username,
  display_name,
  first_name,
  last_name,
  profile_image_url,
}: PersonCardProps) => {
  const router = useRouter();
  const [alreadyAdded, setAlreadyAdded] = useState<boolean>(false);
  const [alreadyAccepted, setAlreadyAccepted] = useState<boolean>(false);
  const navigateToProfile = (username: string) => {
    router.push(`/profile/${username}`);
  };

  const onAcceptRequest = async () => {
    console.log("Accept request");
    setAlreadyAccepted(true);
  };

  const onRejectRequest = async () => {
    console.log("Reject request");
  };

  const onAddFriend = async () => {
    console.log("Add friend");
    setAlreadyAdded(true);
  };

  const onIgnoreSuggestion = async () => {
    console.log("Ignore suggestion");
  };

  return (
    <div className="font-light rounded-lg border border-neutral-100 bg-neutral-50 hover:cursor-pointer
    hover:bg-primary-50 hover:border-primary-200">
      <Image
        className="object-cover w-full h-[200px] rounded-t"
        src={"/images/sad-cat.jpg"}
        alt="profile image"
        width={200}
        height={200}
        onClick={() => navigateToProfile(username)}
      />
      <div className="p-2 pt-1">
        <h4 className="text-primary-800">{display_name}</h4>
        <p className="-mt-1 text-sm text-primary-600 mb-4">@{username}</p>
        {type === "request" && (
          alreadyAccepted ? (
            <div>
              <p className="text-primary-700 font-normal text-center p-2 bg-primary-100 rounded-lg">ยอมรับคำขอแล้ว</p>
              <p className="text-primary-500 font-normal text-center p-2 rounded-lg text-sm mt-2">คุณเป็นเพื่อนกันแล้ว</p>
              {/* <Button style={{ width: "100%", marginTop: 8 }} type="default">
                ยกเลิกคำขอ
              </Button> */}
            </div>
          ) : (
            <div>
              <Button style={{ width: "100%" }} type="primary" onClick={onAcceptRequest}>
                ยอมรับคำขอเพิ่มเพื่อน
              </Button>
              <Button style={{ width: "100%", marginTop: 8 }} type="default" onClick={onRejectRequest}>
                ปฏิเสธคำขอ
              </Button>
            </div>
          )
        )}
        {type === "suggest" && (
          alreadyAdded ? (
            <div>
              <p className="text-primary-700 font-normal text-center p-2 bg-primary-100 rounded-lg">ส่งคำขอเพิ่มเพื่อนแล้ว</p>
              <Button style={{ width: "100%", marginTop: 8 }} type="default">
                ยกเลิกคำขอ
              </Button>
            </div>
          ) : (
            <div>
              <Button style={{ width: "100%" }} type="primary" onClick={onAddFriend}>
                เพิ่มเพื่อน
              </Button>
              <Button style={{ width: "100%", marginTop: 8 }} type="default" onClick={onIgnoreSuggestion}>
                ไม่สนใจ
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
export default PersonCard;
