import ChatArea from "@/components/popup/chat/chat-area";
import ChatBox from "@/components/popup/chat/chat-box";
import ChatList from "@/components/popup/chat/chat-list";
import { useAuth } from "@/context/auth-context";
import { Button, Typography } from "antd";
import Link from "next/link";
import React, { useState, useCallback, use } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoChatboxOutline } from "react-icons/io5";

const { Title, Text } = Typography;

const Chats = () => {
  const [open, setOpen] = useState<boolean>(true);

  const { isAuthenticated } = useAuth();

  return (
    <div className="p-6">
      <div className="flex text-2xl text-primary-700 mb-4">
        <IoChatboxOutline className="mr-2 my-auto" />
        <p className="my-auto font-semibold">ติดตามออเดอร์ และประกาศจ้างงาน</p>
      </div>
      <div className={`max-w-3xl w-full bottom-0 bg-white`}>
        <div className="bg-primary-100 py-1 border-b border-primary-200 rounded-t-lg drop-shadow-sm">
          <div className="px-3 flex justify-between">
            <p className="text-lg text-primary-600">แชท</p>
            {/* <button onClick={handleOpenChatbox}>
              <FaChevronDown className="my-auto text-primary-400 hover:text-primary-600" />
            </button> */}
          </div>
        </div>
        <div className="w-full grid grid-cols-6">
          {isAuthenticated ? (
            <>
              <ChatList isOpen={open} />
              <ChatArea isOpen={open} />
            </>
          ) : (
            <div className="col-span-full flex bg-gradient-to-br from-primary-100 to-primary-200">
              <div className="m-auto justify-items-center">
                <h4 className="text-primary-800 mb-2">
                  โปรดเข้าสู่ระบบเพื่อใช้งานแชท
                </h4>
                <Link href="/login">
                  <Button size="large">เข้าสู่ระบบ</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
