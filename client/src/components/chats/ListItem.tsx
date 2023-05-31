import { useSelector } from "react-redux";

import { Chat } from "../../types/chatTypes";
import { getShortFormatDate } from "../../utils/formatDate";
import { RootState, useAccessChatMutation } from "../../store";

interface ListItemProps {
  chat: Chat;
  itemIndex: number;
  isClicked: boolean;
  handleClickedColor: (index: number) => void;
}

const ListItem = ({ chat, itemIndex, isClicked, handleClickedColor }: ListItemProps) => {
  const user = useSelector((state) => (state as RootState).app.user);

  const userId = user ? user._id : "";
  const otherUserId =
    userId === chat.participants[0]._id
      ? chat.participants[1].userName
      : chat.participants[0].userName;

  const [accessChat] = useAccessChatMutation();

  const handleClick = async () => {
    handleClickedColor(itemIndex);

    // try {
    //   await accessChat(otherUserId).unwrap();
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const renderChatName = (chat: Chat) => {
    if (chat.isGroupChat) return chat.chatName;

    return otherUserId;
  };

  return (
    <button
      className={`inline-block px-4 py-1 h-20 flex items-center justify-between hover:bg-gray-200 active:bg-gray-300 transition-colors rounded-t-sm border-b border-gray-400 border-opacity-50 last:border-b-0 ${
        isClicked && "bg-gray-300 hover:bg-gray-300"
      }`}
      onClick={handleClick}
    >
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

export default ListItem;
