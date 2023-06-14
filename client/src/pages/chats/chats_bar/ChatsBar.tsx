import { useState } from "react";

import ChatsBarHeader from "./chat_bar_header/ChatsBarHeader";
import ChatsList from "./chat_bar_body/ChatsList";
import ChatsSearchList from "./chat_bar_body/ChatsSearchList";

const ChatsBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  return (
    <>
      <ChatsBarHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleChangeSearchQuery={handleChangeSearchQuery}
      />
      <div className="col-span-1 overflow-y-auto border-r">
        {!searchQuery ? <ChatsList /> : <ChatsSearchList searchQuery={searchQuery} />}
      </div>
    </>
  );
};

export default ChatsBar;
