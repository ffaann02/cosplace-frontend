import { logout } from "@/api/auth";
import { User } from "@/context/auth-context";
import { Avatar, Dropdown, MenuProps, Space } from "antd";
import { FaChevronDown } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoChatboxOutline, IoSettingsOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { SlLogout } from "react-icons/sl";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "บัญชีของฉัน",
    icon: <LuUser2 />,
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: "แจ้งเตือน",
    icon: <IoIosNotificationsOutline />,
  },
  {
    key: "3",
    label: "แชท",
    icon: <IoChatboxOutline />,
  },
  {
    key: "4",
    label: "ตั้งค่า",
    icon: <IoSettingsOutline />,
  },
  {
    type: "divider",
  },
  {
    key: "5",
    label: "ออกจากระบบ",
    icon: <SlLogout />,
    onClick: logout
  },
];

const UserBadgeNavbar = ({user}:{
    user: User | null;
}) => {
  return (
    <div
      className="flex cursor-pointer bg-white hover:bg-primary-50 pl-1.5 pr-2 py-1 
        border border-primary-200 rounded-lg transition-all ease-linear duration-100"
    >
      <Avatar
        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
        style={{
          background: "white",
          border: "1px solid #bb763b",
          padding: 1,
          marginTop: "auto",
          marginBottom: "auto",
        }}
      />
      <Dropdown
        menu={{ items }}
        className="my-auto pt-0.5"
        placement="bottomRight"
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space className="ml-2">
            <p className="my-auto text-[16px] text-primary-800 mb-1 tracking-wide">
              {user?.username}
            </p>
            <FaChevronDown className="text-xs mb-0.5 text-primary-800" />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default UserBadgeNavbar;
