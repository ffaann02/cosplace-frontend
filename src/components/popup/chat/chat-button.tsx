"use client";
import { Popover } from "antd";
import { useEffect, useState } from "react";
import { FaRegMessage } from "react-icons/fa6";
import ChatBox from "./chat-box";
import AOS from "aos";

const content = (
  <div>
    <p>แชทของคุณ</p>
  </div>
);

const ChatButton = () => {
  const [openChatbox, setOpenChatbox] = useState<boolean>(false);
  const [fade, setFade] = useState<boolean>(false);

  const handleOpenChatbox = () => {
    const duration = 500;
    if (!openChatbox) {
      setFade(true);
      setTimeout(() => {
        setFade(false);
        setOpenChatbox(true);
      }, duration);
    } else {
      setFade(true);
      setTimeout(() => {
        setFade(false);
        setOpenChatbox(false);
      }, duration);
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Popover placement="topRight" content={content}>
        <div
          onClick={handleOpenChatbox}
          className={`hidden lg:flex fixed z-[500] right-8 border-primary-400 bottom-6 bg-primary-200 w-16 h-16 rounded-full 
    drop-shadow-md hover:scale-105 hover:border-2 transition-all ease-linear duration-200 cursor-pointer
    text-primary-300 hover:text-primary-500 ${
      openChatbox ? "lg:hidden" : "block"
    }`}
        >
          <FaRegMessage className="text-2xl m-auto" />
        </div>
      </Popover>
      <ChatBox
        open={openChatbox}
        setOpen={setOpenChatbox}
        fade={fade}
        handleOpenChatbox={handleOpenChatbox}
      />
    </>
  );
};

export default ChatButton;
