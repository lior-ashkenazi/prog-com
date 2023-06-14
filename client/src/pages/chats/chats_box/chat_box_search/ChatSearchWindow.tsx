import { useState } from "react";

import { HiArrowLeft } from "react-icons/hi";

import { Message } from "../../../../types/messageTypes";

import SearchBar from "../../../../components/chats/search/SearchBar";
import MessagesSearchList from "./MessagesSearchList";

interface ChatSearchWindowProps {
  setSearchWindowVisible: React.Dispatch<React.SetStateAction<boolean>>;
  messages: Message[];
  handleSearchClick: (messageId: string) => void;
}

const ChatSearchWindow = ({
  setSearchWindowVisible,
  messages,
  handleSearchClick,
}: ChatSearchWindowProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  return (
    <>
      <div className="col-span-2 border-b">
        <div className="p-3 flex gap-x-2 pr-8">
          <button onClick={() => setSearchWindowVisible(false)}>
            <HiArrowLeft
              size={28}
              style={{
                color: "#312e81",
              }}
            />
          </button>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onChange={handleChangeSearchQuery}
            mode="messages"
            focus
          />
        </div>
      </div>
      <div className="col-span-2 overflow-y-auto">
        {
          <MessagesSearchList
            searchQuery={searchQuery}
            messages={messages}
            handleSearchClick={handleSearchClick}
          />
        }
      </div>
    </>
  );
};

export default ChatSearchWindow;
