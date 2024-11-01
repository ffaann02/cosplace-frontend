import { Button, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import Image from "next/image";
import { IoSend } from "react-icons/io5";

const Chat = () => {
  return (
    <div className="col-span-4 flex flex-col">
      <div className="border-b bg-primary-50 border-primary-200 px-1.5 py-1.5 drop-shadow-sm flex">
        <Image src={"/images/sad-cat.jpg"} alt="profile" width={32} height={32} className="rounded-full"/>
        <p className="text-lg my-auto ml-2 text-primary-600">hello</p>
      </div>
      <div className="bg-white"></div>
      <div className="border-t border-primary-200 mt-auto mb-0 p-2">
        <div className="flex gap-x-2">
          <TextArea
            placeholder="ส่งข้อความ"
            autoSize
          />
          <button className="text-primary-400 hover:text-primary-600 hover:bg-primary-100 rounded-full p-2 h-fit">
            <IoSend className="text-xl"/>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Chat;
