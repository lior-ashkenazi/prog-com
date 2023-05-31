import { useState } from "react";

import PageHeader from "../components/chats/PageHeader";
import SearchBar from "../components/chats/SearchBar";
import UsersList from "../components/chats/UsersList";
import ChatsSearchList from "../components/chats/SearchList";

const ChatsPage = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchInput(e.target.value);

  return (
    <div
      className="grid grid-rows-[auto_auto_1fr] bg-gray-100 w-full mx-4 rounded-md"
      style={{ height: "calc(100vh - 2rem)" }}
    >
      <div className="bg-indigo-800">
        <PageHeader />
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <SearchBar input={searchInput} onChange={handleChangeSearchInput} />
        </div>
        <div className="bg-green-900 col-span-2">3</div>
      </div>
      <div className="grid grid-cols-3 overflow-y-hidden">
        <div className="col-span-1 overflow-y-auto">
          {!searchInput ? <UsersList /> : <ChatsSearchList input={searchInput} />}
        </div>
        <div className="bg-orange-900 col-span-2">3</div>
      </div>
    </div>
  );
};

export default ChatsPage;
