import { useState } from "react";

import { HiArrowLeft } from "react-icons/hi";

import { Message } from "../../types/messageTypes";

import SearchBar from "./SearchBar";
import SearchMessagesList from "./SearchMessagesList";

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
        <div className="px-4 flex gap-x-2 w-full">
          <button onClick={() => setSearchWindowVisible(false)}>
            <HiArrowLeft
              size={28}
              style={{
                color: "#312e81",
              }}
            />
          </button>
          <div className="grow">
            <SearchBar
              searchQuery={searchQuery}
              onChange={handleChangeSearchQuery}
              mode="messages"
              focus
            />
          </div>
        </div>
      </div>
      <div className="col-span-2 overflow-y-auto">
        {
          <SearchMessagesList
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
