import { useEffect, useRef } from "react";

interface SearchBarProps {
  searchQuery: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  mode: "chats" | "messages";
  focus?: boolean;
}

const SearchBar = ({ searchQuery, onChange, mode, focus }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  return (
    <div className="p-3 flex items-center justify-center">
      <input
        ref={inputRef}
        id="searchBar"
        className="p-2 w-full rounded border-2 bg-gray-200 focus:bg-gray-50 focus:outline-none focus:shadow-outline focus:border-indigo-400 transition-colors"
        value={searchQuery}
        onChange={onChange}
        placeholder={mode === "chats" ? "Search by username" : "Search..."}
        type="text"
      ></input>
    </div>
  );
};

export default SearchBar;
