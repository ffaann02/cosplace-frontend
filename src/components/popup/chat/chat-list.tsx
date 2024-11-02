import Search from "antd/es/input/Search";
import Image from "next/image";

interface ChatList {
  userId: string;
  name: string;
  profileImageUrl?: string;
  lastMessage: string;
}

const mockChatList: ChatList[] = [
  {
    userId: "1",
    name: "John Doe",
    lastMessage: "Hello",
    profileImageUrl: "https://randomuser",
  },
  {
    userId: "2",
    name: "Jane Doe",
    lastMessage: "Hi",
    profileImageUrl: "https://randomuser",
  },
  {
    userId: "3",
    name: "John Smith",
    lastMessage: "Hey",
    profileImageUrl: "https://randomuser",
  },
  {
    userId: "1",
    name: "John Doe",
    lastMessage: "Hello",
    profileImageUrl: "https://randomuser",
  },
  {
    userId: "2",
    name: "Jane Doe",
    lastMessage: "Hi",
    profileImageUrl: "https://randomuser",
  },
  {
    userId: "3",
    name: "John Smith",
    lastMessage: "Hey",
    profileImageUrl: "https://randomuser",
  },
  {
    userId: "1",
    name: "John Doe",
    lastMessage: "Hello",
    profileImageUrl: "https://randomuser",
  },
  {
    userId: "2",
    name: "Jane Doe",
    lastMessage: "Hi",
    profileImageUrl: "https://randomuser",
  },
  {
    userId: "3",
    name: "John Smith",
    lastMessage: "Hey",
    profileImageUrl: "https://randomuser",
  },
  {
    userId: "1",
    name: "John Doe",
    lastMessage: "Hello",
    profileImageUrl: "https://randomuser",
  },
  {
    userId: "2",
    name: "Jane Doe",
    lastMessage: "Hi",
    profileImageUrl: "https://randomuser",
  },
  {
    userId: "3",
    name: "John Smith",
    lastMessage: "Hey",
    profileImageUrl: "https://randomuser",
  },
  {
    userId: "1",
    name: "John Doe",
    lastMessage: "Hello",
    profileImageUrl: "https://randomuser",
  },
  {
    userId: "2",
    name: "Jane Doe",
    lastMessage: "Hi",
    profileImageUrl: "https://randomuser",
  },
  {
    userId: "3",
    name: "John Smith",
    lastMessage: "Hey",
    profileImageUrl: "https://randomuser",
  },
];

const ChatList = () => {
  return (
    <div className="col-span-2 border-r flex flex-col border-primary-200 h-full p-2 pr-0 max-h-[50vh]">
      <div className="pr-2">
        <Search placeholder="ค้นหาเพื่อน"/>
      </div>
      <div className="flex flex-col gap-y-2 mt-4 overflow-y-auto flex-grow custom-scrollbar">

        {mockChatList.map((chat) => (
          <div
            key={chat.userId}
            className="flex items-center border-primary-200"
          >
            <Image
              src={"/images/sad-cat.jpg"}
              alt="profile"
              width={24}
              height={24}
              className="rounded-full w-[24px] h-[24px] my-auto mr-3"
            />
            <div>
              <h6 className="text-primary-700 text-sm">{chat.name}</h6>
              <p className="text-primary-500 font-light text-xs">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ChatList;
