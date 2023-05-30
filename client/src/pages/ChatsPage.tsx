import { useState } from "react";

import Header from "../components/chats/Header";
import SearchBar from "../components/chats/SearchBar";
import ChatsUserList from "../components/chats/ChatsUserList";
import ChatsSearchList from "../components/chats/ChatsSearchList";

const ChatsPage = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchInput(e.target.value);

  return (
    <div
      className="grid grid-rows-[auto_auto_1fr] bg-gray-100 h-full w-full mx-4 rounded-md"
      style={{ height: "calc(100vh - 2rem)" }}
    >
      <div className="bg-indigo-800">
        <Header />
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <SearchBar input={searchInput} onChange={handleChangeSearchInput} />
        </div>
        <div className="bg-green-900 col-span-2">3</div>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          {!searchInput ? <ChatsUserList /> : <ChatsSearchList input={searchInput} />}
        </div>
        <div className="bg-orange-900 col-span-2">3</div>
      </div>
    </div>
  );
};

export default ChatsPage;
