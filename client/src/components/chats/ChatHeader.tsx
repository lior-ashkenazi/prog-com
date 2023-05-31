import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";
import { getChatName } from "../../utils";

interface ChatHeaderProps {
  user: User;
  chat: Chat;
}

const ChatHeader = ({ user, chat }: ChatHeaderProps) => {
  return <div className="col-span-2">{getChatName(user, chat)}</div>;
};

export default ChatHeader;
