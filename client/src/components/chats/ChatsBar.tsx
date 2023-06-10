import { useState } from "react";

import ChatsBarHeader from "./ChatsBarHeader";
import ChatsList from "./ChatsList";
import ChatsSearchList from "./ChatsSearchList";

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
