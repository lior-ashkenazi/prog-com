import { useState } from "react";
import { useFetchUsersQuery } from "../../store";

interface SearchBarProps {
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar = ({ setIsSearch }: SearchBarProps) => {
  const [input, setInput] = useState<string>("");

  const { refetch } = useFetchUsersQuery(input, { skip: input.length === 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value.length > 0) {
      setIsSearch(true);
      refetch();
    } else if (e.target.value.length === 0) {
      setIsSearch(false);
    }
  };

  return (
    <div className="p-3 flex items-center justify-center">
      <input
        className="p-2 w-full rounded border-2 bg-gray-200 focus:bg-gray-50 focus:outline-none focus:shadow-outline focus:border-indigo-300 transition-colors"
        value={input}
        onChange={handleChange}
        placeholder="Search by username"
        type="text"
      ></input>
    </div>
  );
};

export default SearchBar;
