import { useSelector } from "react-redux";

import { Chat } from "../../types/chatTypes";
import { getShortFormatDate } from "../../utils/formatDate";
import { RootState } from "../../store";

interface ChatsListItemProps {
  chat: Chat;
}

const ChatsListItem = ({ chat }: ChatsListItemProps) => {
  const user = useSelector((state) => (state as RootState).app.user);

  const renderChatName = (chat: Chat) => {
    if (chat.isGroupChat) return chat.chatName;

    const userId = user ? user._id : "";

    return userId === chat.participants[0]._id
      ? chat.participants[1].userName
      : chat.participants[0].userName;
  };

  return (
    <button className="inline-block px-4 py-1 h-20 flex items-center justify-between hover:bg-gray-200 active:bg-gray-300 transition-colors rounded-t-sm border-b border-gray-400 border-opacity-50 last:border-b-0">
      <span className="flex flex-col text-left">
        <span className="font-semibold text-lg">{renderChatName(chat)}</span>
        <span className="text-sm text-opacity-60 text-gray-900">Maybe last message</span>
      </span>
      <span
        className={`inline-block h-full mt-3 text-sm ${!chat?.updatedAt && "text-transparent"}`}
      >
        {chat?.updatedAt ? getShortFormatDate(chat?.updatedAt) : "padding"}
      </span>
    </button>
  );
};

export default ChatsListItem;
