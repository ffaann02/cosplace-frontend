import { Popover } from "antd";
import { FaRegMessage } from "react-icons/fa6";

const content = (
    <div>
      <p>แชทของคุณ</p>
    </div>
  );

const ChatButton = () => {
  return (
    <Popover placement="topRight" content={content}>
      <div
        className="hidden lg:flex fixed z-[500] right-8 border-primary-400 bottom-6 bg-primary-200 w-16 h-16 rounded-full 
    drop-shadow-md hover:scale-105 hover:border-2 transition-all ease-linear duration-200 cursor-pointer
    text-primary-300 hover:text-primary-500"
      >
        <FaRegMessage className="text-2xl m-auto" />
      </div>
    </Popover>
  );
};
export default ChatButton;
