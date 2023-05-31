import { useState } from "react";

import SearchBar from "./SearchBar";
import UsersList from "./UsersList";
import SearchList from "./SearchList";

const ChatsBar = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchInput(e.target.value);

  return (
    <>
      <div className="col-span-1">
        <SearchBar input={searchInput} onChange={handleChangeSearchInput} />
      </div>
      <div className="col-span-1 overflow-y-auto">
        {!searchInput ? <UsersList /> : <SearchList input={searchInput} />}
      </div>
    </>
  );
};

export default ChatsBar;
