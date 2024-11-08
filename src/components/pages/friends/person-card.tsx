import { Button } from "antd";
import Image from "next/image";

interface PersonCardProps {
  username: string;
  display_name: string;
  first_name: string;
  last_name: string;
  profile_image_url: string;
}

const PersonCard = ({
  username,
  display_name,
  first_name,
  last_name,
  profile_image_url,
}: PersonCardProps) => {
  return (
    <div className="font-light rounded-lg border border-neutral-100 bg-neutral-50">
      <Image
        className="object-cover w-full h-[200px] rounded-t"
        src={"/images/sad-cat.jpg"}
        alt="profile image"
        width={200}
        height={200}
      />
      <div className="p-2 pt-1">
        <h4 className="text-primary-800">{display_name}</h4>
        <p className="-mt-1 text-sm text-primary-600 mb-4">@{username}</p>
        <Button style={{ width: "100%" }} type="primary">
          เพิ่มเพื่อน
        </Button>
        <Button style={{ width: "100%",marginTop: 8 }} type="default">
          ไม่สนใจ
        </Button>
      </div>
    </div>
  );
};
export default PersonCard;
