import { Message } from "../../types/messageTypes";
import { getShortFormatDate } from "../../utils";

interface MessagesListItemProps {
  message: Message;
  handleSearchClick: (messageId: string) => void;
  searchQuery: string;
}

const MessagesListItem = ({ message, handleSearchClick, searchQuery }: MessagesListItemProps) => {
  const queryRegex = new RegExp(`${searchQuery}`, "gi");

  const messageSegments = message.content.split(queryRegex);

  // use JSX.Element[] instead of any[]
  const highlightedMessage: JSX.Element[] = [];

  messageSegments.forEach((segment, i) => {
    highlightedMessage.push(<span key={i}>{segment}</span>);

    if (i !== messageSegments.length - 1) {
      highlightedMessage.push(
        <span key={`highlight-${i}`} className="font-bold text-indigo-600">
          {searchQuery}
        </span>
      );
    }
  });

  return (
    <button
      className="inline-block px-6 py-1 h-20 flex items-center justify-start rounded-t-sm border-b border-gray-400 border-opacity-50 last:border-b-0"
      onClick={() => handleSearchClick(message._id)}
    >
      <div className="flex flex-col items-start">
        <span className="text-black text-opacity-70 text-sm">
          {getShortFormatDate(message.createdAt)}
        </span>
        <span>{highlightedMessage}</span>
      </div>
    </button>
  );
};

export default MessagesListItem;
