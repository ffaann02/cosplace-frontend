import { logout } from "@/api/auth";
import { useAuth } from "@/context/auth-context";
import { Avatar, Badge, Dropdown, MenuProps, Space } from "antd";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoChatboxOutline, IoSettingsOutline } from "react-icons/io5";
import { LuBellRing, LuUser2 } from "react-icons/lu";
import { SlLogout } from "react-icons/sl";

const UserBadgeNavbar = ({ username }: { username: string | null | undefined }) => {
  const router = useRouter();
  const {user} = useAuth();

  const navigateToProfile = () => {
    router.push("/profile?menu=account");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "จัดการบัญชีของฉัน",
      icon: <LuUser2 />,
      onClick: navigateToProfile,
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
      // onClick: () => signOut({callbackUrl: "/"}).then(()=>{
      //   logout();
      // }),
      onClick: logout,
    },
  ];

  return (
    <div className="flex">
      {/* <Badge
        size="default"
        color="red"
        count={5}
        style={{
          marginTop: 8,
          marginBottom: "auto",
        }}
      > */}
        {/* <Avatar
          shape="circle"
          size="default"
          style={{
            marginTop: 5,
            background: "#ecdcbc",
            border: "1px solid #e2c799",
          }}
        >
          <LuBellRing className="text-primary-600" />
        </Avatar> */}
      {/* </Badge> */}
      <div
        className="cursor-pointer bg-white hover:bg-primary-50 pl-1.5 pr-2 py-1 
        border border-primary-200 ml-4 rounded-lg transition-all ease-linear duration-100"
      >
        <Dropdown menu={{ items }} className="my-auto" placement="bottomRight">
          <a onClick={(e) => e.preventDefault()}>
            <Space className="">
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
              <p className="hidden lg:block my-auto text-[16px] text-primary-800 mb-1 tracking-wide">
                {username}
              </p>
              <FaChevronDown className="text-xs mt-0.5 mb-0.5 mr-0.5 text-primary-800" />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default UserBadgeNavbar;
