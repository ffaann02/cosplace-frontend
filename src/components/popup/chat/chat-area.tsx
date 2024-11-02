import TextArea from "antd/es/input/TextArea";
import Image from "next/image";
import { IoSend } from "react-icons/io5";
import { BsFileImage } from "react-icons/bs";
import Message from "./message";

const ChatArea = () => {
  return (
    <div className="col-span-4 flex flex-col flex-grow">
      <div className="border-b bg-primary-50 border-primary-200 px-1.5 py-1.5 drop-shadow-sm flex">
        <Image
          src={"/images/sad-cat.jpg"}
          alt="profile"
          width={32}
          height={32}
          className="rounded-full w-[32px] h-[32px] my-auto"
        />
        <p className="text-lg my-auto ml-2 text-primary-600">hello</p>
      </div>
      <div className="bg-white overflow-y-scroll max-h-[40vh] custom-scrollbar">
        <Message
          message="kuay i sus na hee yed me มึงมาดิไอเวร สักหน่อยมั้ยละ"
          side="receiver"
          type="text"
          profileImageUrl="/images/sad-cat.jpg"
        />
        <Message
          message="kuay i sus na hee yed me มึงมาดิไอเวร สักหน่อยมั้ยละ"
          side="sender"
          type="text"
          profileImageUrl="/images/sad-cat.jpg"
        />
        <Message
          message="kuay i sus na hee yed me มึงมาดิไอเวร สักหน่อยมั้ยละ"
          side="receiver"
          type="text"
          profileImageUrl="/images/sad-cat.jpg"
        />
         <Message
          message="kuay i sus na hee yed me มึงมาดิไอเวร สักหน่อยมั้ยละ"
          side="receiver"
          type="text"
          profileImageUrl="/images/sad-cat.jpg"
        />
        <Message
          message="kuay i sus na hee yed me มึงมาดิไอเวร สักหน่อยมั้ยละ"
          side="sender"
          type="text"
          profileImageUrl="/images/sad-cat.jpg"
        />
         <Message
          message="kuay i sus na hee yed me มึงมาดิไอเวร สักหน่อยมั้ยละ"
          side="sender"
          type="text"
          profileImageUrl="/images/sad-cat.jpg"
        />
         <Message
          message="kuay i sus na hee yed me มึงมาดิไอเวร สักหน่อยมั้ยละ"
          side="sender"
          type="text"
          profileImageUrl="/images/sad-cat.jpg"
        />
      </div>
      <div className="border-primary-200 bg-primary-50 p-2 h-[10%]">
        <div className="flex gap-x-1">
          <button className="text-primary-400 hover:text-primary-600 hover:bg-primary-100 rounded-lg p-2 h-fit">
            <BsFileImage className="text-xl" />
          </button>
          <TextArea
            placeholder="ส่งข้อความ"
            autoSize
            style={{ marginTop: 2 }}
          />
          <button className="text-primary-400 hover:text-primary-600 hover:bg-primary-100 rounded-full p-2 h-fit">
            <IoSend className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatArea;
