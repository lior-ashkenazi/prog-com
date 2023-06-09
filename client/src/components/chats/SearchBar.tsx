import { useEffect, useRef } from "react";

import { BsXLg } from "react-icons/bs";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  mode: "chats" | "messages";
  focus?: boolean;
}

const SearchBar = ({ searchQuery, setSearchQuery, onChange, mode, focus }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  return (
    <div className="grow flex justify-center relative">
      <input
        ref={inputRef}
        id="searchBar"
        autoComplete="off"
        className="p-2 pl-9 w-full rounded border-2 bg-gray-200 focus:bg-gray-50 focus:outline-none focus:shadow-outline focus:border-indigo-400 transition-colors"
        value={searchQuery}
        onChange={onChange}
        placeholder={mode === "chats" ? "Search by username" : "Search..."}
        type="text"
      ></input>
      <button className="absolute left-3 top-4" onClick={() => setSearchQuery("")}>
        {" "}
        <BsXLg
          style={{
            color: "#312e81",
          }}
        />
      </button>
    </div>
  );
};

export default SearchBar;
