import { useEffect, useState } from "react";

import SearchBar from "./SearchBar";

interface ChatsBarHeaderProps {
  searchQuery: string;
  handleChangeSearchQuery: React.ChangeEventHandler<HTMLInputElement>;
}

const ChatsBarHeader = ({ searchQuery, handleChangeSearchQuery }: ChatsBarHeaderProps) => {
  const [buttonCollapse, setButtonCollapse] = useState<boolean>(true);

  useEffect(() => {
    searchQuery ? setButtonCollapse(true) : setButtonCollapse(false);
  }, [searchQuery]);

  return (
    <div className={`p-3 col-span-1 border-r border-b flex ${!buttonCollapse && "gap-x-2"} h-min`}>
      <SearchBar searchQuery={searchQuery} onChange={handleChangeSearchQuery} mode="chats" />
      <button
        className={`shrink transition-transform origin-right ${
          !buttonCollapse ? "scale-x-100 p-1 opacity-100 w-28" : "scale-x-0 opacity-0 w-0"
        } bg-indigo-600 rounded-md text-white`}
      >
        {!buttonCollapse ? "Create Group" : ""}
      </button>
    </div>
  );
};

export default ChatsBarHeader;
