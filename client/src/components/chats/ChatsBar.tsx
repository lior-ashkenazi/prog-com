import { useState } from "react";

import SearchBar from "./SearchBar";
import UsersList from "./UsersList";
import SearchChatsList from "./SearchChatsList";

const ChatsBar = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchInput(e.target.value);

  return (
    <>
      <div className="col-span-1 border-r border-b">
        <SearchBar searchQuery={searchInput} onChange={handleChangeSearchInput} mode="chats" />
      </div>
      <div className="col-span-1 overflow-y-auto border-r">
        {!searchInput ? <UsersList /> : <SearchChatsList searchQuery={searchInput} />}
      </div>
    </>
  );
};

export default ChatsBar;
