import { useContext } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch, setChat, useAccessChatMutation } from "../../store";
import { LoadingContext } from "../../context/LoadingContext";
import { User } from "../../types/userTypes";
import { Message } from "../../types/messageTypes";
import { Chat } from "../../types/chatTypes";
import { getShortFormatDate, getOtherUserId, getChatName, getChatAvatar } from "../../utils";
import { languagesLowercaseToUppercaseMap } from "../../types/messageTypes";

interface ChatsListItemProps {
  user: User;
  chat: Chat;
  isClicked: boolean;
  handleClickedColor: (id: string) => void;
  isSearch: boolean;
}

const ChatsListItem = ({
  user,
  chat,
  isClicked,
  handleClickedColor,
  isSearch,
}: ChatsListItemProps) => {
  const { setChatBoxIsLoading } = useContext(LoadingContext);
  const dispatch: AppDispatch = useDispatch();
  const [accessChat] = useAccessChatMutation();

  const handleClick = async () => {
    handleClickedColor(chat._id);
    setChatBoxIsLoading(true);

    if (isSearch && user) {
      const otherUserId = getOtherUserId(user, chat);

      await accessChat(otherUserId).unwrap();
    } else {
      dispatch(setChat(chat));
    }
  };

  const renderMessageContent = (message: Message) => {
    if (message.mode === "math") return "Math message";
    if (message.mode === "code" && message.language) {
      return `Code message written in ${languagesLowercaseToUppercaseMap[message.language]}`;
    }
    return message.content;
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
            {chat?.lastMessageId && renderMessageContent(chat.lastMessageId)}
          </span>
        </span>
      </div>
      <span className={`mb-4 text-sm ${!chat?.lastMessageId?.createdAt && "text-transparent"}`}>
        {chat?.lastMessageId?.createdAt
          ? getShortFormatDate(chat.lastMessageId.createdAt)
          : "padding"}
      </span>
    </button>
  );
};

export default ChatsListItem;
