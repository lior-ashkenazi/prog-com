import ScrollableFeed from "react-scrollable-feed";

import { User } from "../../types/userTypes";
import { Message } from "../../types/messageTypes";
import { Chat } from "../../types/chatTypes";

interface ChatBodyProps {
  user: User;
  messages: Message[];
  chat: Chat;
  sendMessageError: string;
}

// { user, messages, chat, sendMessageError }: ChatBodyProps

const ChatBody = () => {
  return (
    <div className="bg-[url('assets/random-shapes.svg')] bg-indigo-500 bg-[length:3.5rem_3.5rem] ">
      ChatBody
    </div>
  );
};

export default ChatBody;
