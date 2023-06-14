import { Message } from "../../../../types/messageTypes";
import { getMessageDate } from "../../../../utils";

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
      className="inline-block px-6 h-20 flex items-center justify-start rounded-t-sm border-b last:border-b-0"
      onClick={() => handleSearchClick(message._id)}
    >
      <div className="flex flex-col items-start">
        <span className="text-black text-opacity-70 text-sm">
          {getMessageDate(message.createdAt)}
        </span>
        <span dangerouslySetInnerHTML={{ __html: highlightedMessage }} />
      </div>
    </button>
  );
};

export default MessagesListItem;
