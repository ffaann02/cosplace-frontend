import React from 'react'
import { Button } from "antd";
import { IoMdPersonAdd } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import { FiUserCheck } from "react-icons/fi";

interface Props {
    loading: boolean
    isFriend: boolean
    isWaitingAccept: boolean
    isIncomingRequest: boolean
    onAddFriend: () => void
    onCancelRequest: () => void
    onAcceptRequest: () => void
    onRejectRequest: () => void
}

const FriendButton: React.FC<Props> = ({
    loading,
    isFriend,
    isWaitingAccept,
    isIncomingRequest,
    onAddFriend,
    onCancelRequest,
    onAcceptRequest,
    onRejectRequest,
}) => {
    return (
        <>
            {isFriend && (
                <Button type="primary" size="large" className="">
                    <FiUserCheck className="text-lg" />
                    <p className="ml-1">เพื่อน</p>
                </Button>
            )}
            {!isFriend && !isWaitingAccept && !isIncomingRequest && (
                <Button type="primary" size="large" className="" onClick={onAddFriend} loading={loading}>
                    <IoMdPersonAdd className="text-lg" />
                    <p className="ml-1">เพิ่มเพื่อน</p>
                </Button>
            )}
            {!isFriend && isWaitingAccept && !isIncomingRequest && (
                <Button type="primary" size="large" className="" onClick={onCancelRequest} loading={loading}>
                    <IoMdPersonAdd className="text-lg" />
                    <p className="ml-1">ยกเลิกคำขอเพิ่มเพื่อน</p>
                </Button>
            )}
            {!isFriend && !isWaitingAccept && isIncomingRequest && (
                <Button type="primary" size="large" className="" onClick={onAcceptRequest} loading={loading}>
                    <IoMdPersonAdd className="text-lg" />
                    <p className="ml-1">ตอบรับคำขอเพิ่มเพื่อน</p>
                </Button>
            )}
        </>
    )
}

export default FriendButton