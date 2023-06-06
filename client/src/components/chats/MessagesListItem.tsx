import { Message } from "../../types/messageTypes";
import { getShortFormatDate } from "../../utils";

interface MessagesListItemProps {
  message: Message;
  handleSearchClick: (messageId: string) => void;
  searchQuery: string;
}

const MessagesListItem = ({ message, handleSearchClick, searchQuery }: MessagesListItemProps) => {
  const words = message.content.split(" ");

  const highlightedMessage = words
    .map((word) => {
      if (word.toLowerCase().includes(searchQuery.toLowerCase())) {
        return `<span class="font-bold text-indigo-600">${word}</span>`;
      } else {
        return word;
      }
    })
    .join(" ");

  return (
    <button
      className="inline-block px-6 py-1 h-20 flex items-center justify-start rounded-t-sm border-b border-gray-400 border-opacity-50 last:border-b-0"
      onClick={() => handleSearchClick(message._id)}
    >
      <div className="flex flex-col items-start">
        <span className="text-black text-opacity-70 text-sm">
          {getShortFormatDate(message.createdAt)}
        </span>
        <span dangerouslySetInnerHTML={{ __html: highlightedMessage }} />
      </div>
    </button>
  );
};

export default MessagesListItem;
