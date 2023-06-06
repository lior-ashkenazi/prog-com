import { Message } from "../../types/messageTypes";
import MessagesListItem from "./MessagesListItem";

interface SearchMessagesListProps {
  searchQuery: string;
  messages: Message[];
  handleSearchClick: (messageId: string) => void;
}

const SearchMessagesList = ({
  searchQuery,
  messages,
  handleSearchClick,
}: SearchMessagesListProps) => {
  const filteredMessages = messages.filter((message) =>
    message.mode === "text" ? message.content.includes(searchQuery) : false
  );

  const renderList = () =>
    filteredMessages.map((filteredMessage, index) => (
      <MessagesListItem
        key={index}
        message={filteredMessage}
        handleSearchClick={handleSearchClick}
        searchQuery={searchQuery}
      />
    ));

  return <div className="flex flex-col">{searchQuery === "" ? "" : renderList()}</div>;
};

export default SearchMessagesList;
