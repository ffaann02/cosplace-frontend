import { divider } from "@/config/theme";
import { Divider } from "antd";

const SocialProfile = () => {
  return (
    <div className="w-full">
      <div className="hidden md:block">
        <Divider style={{ ...divider, marginBottom: 16 }} />
      </div>
    </div>
  );
};
export default SocialProfile;
