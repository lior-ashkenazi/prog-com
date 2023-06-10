import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState, setChat, useAccessChatMutation } from "../../store";
import { SocketContext } from "../../context/SocketContext";
import { LoadingContext } from "../../context/LoadingContext";

import { User } from "../../types/userTypes";
import { Message } from "../../types/messageTypes";
import { Chat } from "../../types/chatTypes";

import {
  getMessageDate,
  getOtherUserId,
  getChatName,
  getChatAvatar,
  getChatIsTyping,
} from "../../utils";
import { languagesLowercaseToUppercaseMap } from "../../types/messageTypes";

interface ChatsListItemProps {
  user: User;
  chat: Chat;
  isClicked?: boolean;
  handleClickedColor?: (id: string) => void;
  isSearch: boolean;
}

const ChatsListItem = ({
  user,
  chat,
  isClicked,
  handleClickedColor,
  isSearch,
}: ChatsListItemProps) => {
  const currentChat: Chat | null = useSelector((state) => (state as RootState).app.chat);
  const { socket } = useContext(SocketContext);
  const { setChatBoxIsLoading } = useContext(LoadingContext);
  const dispatch: AppDispatch = useDispatch();
  const [accessChat] = useAccessChatMutation();

  const [typingUser, setTypingUser] = useState<string>("");

  useEffect(() => {
    if (isSearch || !socket) return;

    socket.emit("access chat", chat);

    const typingHandler = (otherUser: User) => {
      // note that user._id is the app's user
      // when we use the item component as
      // search item then user === otherUser
      chat._id === currentChat?._id &&
        user._id !== otherUser._id &&
        setTypingUser(otherUser.userName);
    };

    const stopTypingHandler = () => {
      setTypingUser("");
    };

    socket.on("typing", typingHandler);
    socket.on("stop typing", stopTypingHandler);

    return () => {
      socket.off("typing", typingHandler);
      socket.off("stop typing", stopTypingHandler);
      socket.emit("leave chat", chat);
    };
  }, [chat, user, currentChat, isSearch, socket]);

  const handleClick = async () => {
    handleClickedColor && handleClickedColor(chat._id);
    setChatBoxIsLoading(true);

    if (isSearch && user) {
      const otherUserId = getOtherUserId(user, chat);

      await accessChat(otherUserId).unwrap();
    } else {
      dispatch(setChat(chat));
    }
  };

  const renderItemContent = () => {
    if (isSearch) return;
    if (typingUser) {
      return getChatIsTyping(typingUser, chat);
    } else {
      return chat?.lastMessageId && renderMessageContent(chat.lastMessageId);
    }
  };

  const renderMessageContent = (message: Message) => {
    if (message.mode === "math") return "Math message";
    if (message.mode === "code" && message.language) {
      return `Code message written in ${languagesLowercaseToUppercaseMap[message.language]}`;
    }
    return message.content;
  };

  const renderItemDate = () => {
    if (isSearch) return;
    return chat?.lastMessageId?.createdAt
      ? getMessageDate(chat.lastMessageId.createdAt)
      : "padding";
  };

  return (
    <button
      className={`inline-block px-6 h-20 flex items-center justify-between hover:bg-gray-200 active:bg-gray-300 transition-colors rounded-t-sm border-b last:border-b-0 ${
        isClicked && "bg-gray-300 hover:bg-gray-300"
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center gap-x-6">
        <img src={getChatAvatar(user, chat)} alt="Chat Avatar" className="w-11 h-11 rounded-full" />
        <span className="flex flex-col text-left">
          <span className="font-semibold text-lg">{getChatName(user, chat)}</span>
          <span className="text-sm text-opacity-60 text-black max-w-xs truncate ">
            {renderItemContent()}
          </span>
        </span>
      </div>
      <span className={`mb-4 text-sm ${!chat?.lastMessageId?.createdAt && "text-transparent"}`}>
        {renderItemDate()}
      </span>
    </button>
  );
};

export default ChatsListItem;
