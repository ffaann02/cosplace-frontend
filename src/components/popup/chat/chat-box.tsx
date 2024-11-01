import { FaChevronDown } from "react-icons/fa";
import Chat from "./chat";

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
      className={`max-w-lg w-full h-[50vh] bg-white rounded-t-lg fixed bottom-[36px] right-4 z-[200]
      drop-shadow-md border border-primary-200 transition-opacity duration-500 
      ${open ? "block" : "hidden"} ${fade && open ? "opacity-100" : "opacity-0"} 
      ${fade && !open ? "opacity-0" : "opacity-100"}`}
    >
      <div className="bg-primary-100 py-1 border-b border-primary-200 rounded-t-lg drop-shadow-sm">
        <div className="px-3 flex justify-between">
          <p className="text-lg text-primary-600">แชท</p>
          <button onClick={handleOpenChatbox}>
            <FaChevronDown className="my-auto text-primary-400 hover:text-primary-600" />
          </button>
        </div>
      </div>
      <div className="w-full h-full bg-white grid grid-cols-6">
        <div className="col-span-2 border-r border-primary-200">
          hello
        </div>
        <Chat />
      </div>
    </div>
  );
};

export default ChatBox;
