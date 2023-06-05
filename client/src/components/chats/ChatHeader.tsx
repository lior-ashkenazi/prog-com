import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";
import { getChatAvatar, getChatName } from "../../utils";

interface ChatHeaderProps {
  user: User;
  chat: Chat;
}

const ChatHeader = ({ user, chat }: ChatHeaderProps) => {
  return (
    <div className="col-span-2 px-4 flex">
      <div className="flex items-center justify-center gap-x-4">
        <img
          src={getChatAvatar(user, chat)}
          alt="Header Avatar"
          className="w-10 h-10 rounded-full"
        />
        <span className="flex flex-col text-left">
          <span className="font-medium">{getChatName(user, chat)}</span>
          <span className="text-xs text-opacity-60 text-gray-900">Maybe is typing</span>
        </span>
      </div>
    </div>
  );
};

export default ChatHeader;
