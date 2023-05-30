import { Chat } from "../../types/chatTypes";
import { getShortFormatDate } from "../../utils/formatDate";

interface ChatsListItemProps {
  chat: Chat;
}

const ChatsListItem = ({ chat }: ChatsListItemProps) => {
  return (
    <button className="inline-block px-4 py-1 h-20 flex items-center justify-between border-2 border-red-900 cursor-default">
      <span className="flex flex-col text-left">
        <span className="font-semibold text-lg">{chat.users[0].userName}</span>
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
