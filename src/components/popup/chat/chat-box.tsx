import { FaChevronDown } from "react-icons/fa";
import ChatList from "./chat-list";
import ChatArea from "./chat-area";

interface ChatBoxProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  fade: boolean;
  handleOpenChatbox: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  open,
  setOpen,
  fade,
  handleOpenChatbox,
}) => {
  return (
    <div
      className={`max-w-lg w-full bottom-0 bg-white rounded-t-lg fixed right-4 
        z-[200] drop-shadow-md border border-primary-200 transition-opacity 
        duration-500 ${open ? "block" : "hidden"}`}
    >
      <div className="bg-primary-100 py-1 border-b border-primary-200 rounded-t-lg drop-shadow-sm">
        <div className="px-3 flex justify-between">
          <p className="text-lg text-primary-600">แชท</p>
          <button onClick={handleOpenChatbox}>
            <FaChevronDown className="my-auto text-primary-400 hover:text-primary-600" />
          </button>
        </div>
      </div>
      <div className="w-full grid grid-cols-6">
        <ChatList />
        <ChatArea />
      </div>
    </div>
  );
};

export default ChatBox;
