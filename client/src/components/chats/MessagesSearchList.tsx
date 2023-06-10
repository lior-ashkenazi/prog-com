import { Message } from "../../types/messageTypes";
import MessagesListItem from "./MessagesListItem";

interface MessagesSearchListProps {
  searchQuery: string;
  messages: Message[];
  handleSearchClick: (messageId: string) => void;
}

const MessagesSearchList = ({
  searchQuery,
  messages,
  handleSearchClick,
}: MessagesSearchListProps) => {
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

export default MessagesSearchList;
