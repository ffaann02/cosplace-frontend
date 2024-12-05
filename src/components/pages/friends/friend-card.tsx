import { apiClientWithAuth } from '@/api';
import { FriendStructure } from '@/app/friends/page';
import { useAuth } from '@/context/auth-context';
import { Button, Dropdown, Image, MenuProps, Popconfirm } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoIosMore } from 'react-icons/io';

interface FriendCardProps {
    user_id: string;
    username: string;
    display_name: string;
    first_name: string;
    last_name: string;
    profile_image_url: string;
    getFriendList: () => void;
}

const FriendCard = ({
    user_id,
    username,
    display_name,
    first_name,
    last_name,
    profile_image_url,
    getFriendList,
}: FriendCardProps) => {

    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [hoverSort, setHoverSort] = useState(false);
    const [selectedSort, setSelectedSort] = useState("");

    const handleDeleteFriend = () => {
        console.log("Deleting friend with ID:", user_id);
    };

    const handleBlockFriend = () => {
        console.log("Blocking friend with ID:", user_id);
    };

    const handleReportFriend = () => {
        console.log("Reporting friend with ID:", user_id);
    };

    const handleMenuClick = ({ key }: { key: string }) => {
        if (key === "1") {
            setSelectedSort("ลบเพื่อน");
        } else if (key === "2") {
            handleBlockFriend();
        } else if (key === "3") {
            handleReportFriend();
        }
    };

    const onRemoveFriend = async () => {
        try {
            setLoading(true);
            const response = await apiClientWithAuth.post("/friend/delete", {
                user_id: user?.user_id,
                friend_username: username,
            });
            console.log(response.data);
            getFriendList();
        } catch (e) {
            console.log(e)
            setLoading(false);
        }
    }

    const menuItems: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <Popconfirm
                    title="คุณต้องการลบเพื่อนใช่หรือไม่?"
                    onConfirm={onRemoveFriend}
                    okText="ใช่"
                    cancelText="ไม่"
                >
                    ลบเพื่อน
                </Popconfirm>
            ),
        },
        { key: "2", label: "บล็อก" },
        { key: "3", label: "รายงาน" },
    ];

    return (
        <div
            className="grid-cols-1 border bg-white border-primary-200 rounded-md p-4
            hover:bg-[#f9f7f7] hover:border-primary-200"
        >
            <div className="w-full h-full grid grid-cols-4">
                <div className="col-span-1 h-full flex items-center">
                    <Image
                        className="object-cover w-full h-full rounded-lg my-auto"
                        src={profile_image_url || "/images/sad-cat.jpg"}
                        alt="profile image"
                        onClick={() => console.log("click")}
                    />
                </div>
                <div className="col-span-2 w-full h-full flex items-center">
                    <Link href={`/profile/${username}`}>
                        <div className="my-auto mx-4">
                            <h4 className="text-primary-800 truncate">{display_name}</h4>
                            <p className="-mt-1 text-sm text-primary-600">@{username}</p>
                        </div>
                    </Link>
                </div>
                <div className="col-span-1 w-full h-full flex items-center justify-end">
                    <Dropdown
                        onOpenChange={(open) => setHoverSort(open)}
                        menu={{
                            items: menuItems,
                            onClick: handleMenuClick,
                        }}
                        placement="bottomRight"
                        arrow
                    >
                        <Button type="text">
                            <IoIosMore className="text-2xl transition-transform duration-200" />
                        </Button>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default FriendCard;
