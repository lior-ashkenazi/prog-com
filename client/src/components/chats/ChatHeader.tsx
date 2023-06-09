import { HiSearch } from "react-icons/hi";

import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";
import { getChatAvatar, getChatIsTyping, getChatName } from "../../utils/usersUtils";

interface ChatHeaderProps {
  user: User;
  chat: Chat;
  setSearchWindowVisible: React.Dispatch<React.SetStateAction<boolean>>;
  typingText: string;
}

const ChatHeader = ({ user, chat, setSearchWindowVisible, typingText }: ChatHeaderProps) => {
  return (
    <div className="p-4 flex justify-between">
      <div className="flex items-center justify-center gap-x-4">
        <img
          src={getChatAvatar(user, chat)}
          alt="Header Avatar"
          className="w-10 h-10 rounded-full"
        />
        <span className="flex flex-col text-left">
          <span className="font-medium">{getChatName(user, chat)}</span>
          <span className="text-xs text-opacity-60 text-gray-900">
            {typingText && getChatIsTyping(typingText, chat)}
          </span>
        </span>
      </div>
      <button onClick={() => setSearchWindowVisible(true)}>
        <HiSearch
          size={28}
          style={{
            color: "#1e1b4b",
          }}
        />
      </button>
    </div>
  );
};

export default ChatHeader;
