import { BsXLg } from "react-icons/bs";

interface CreateGroupSearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const CreateGroupSearchBar = ({ searchQuery, setSearchQuery }: CreateGroupSearchBarProps) => {
  return (
    <div className="grow flex justify-center relative bg-gray-100 px-3 pb-1 border-b">
      <input
        id="CreateGroupSearchInput"
        autoComplete="off"
        className="p-2 pl-9 w-full rounded border-2 bg-gray-200 focus:bg-gray-50 focus:outline-none focus:shadow-outline focus:border-indigo-400 transition-colors"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={"Search by username"}
        type="text"
      ></input>
      <button className="absolute left-6 top-4" onClick={() => setSearchQuery("")}>
        <BsXLg
          style={{
            color: "#312e81",
          }}
        />
      </button>
    </div>
  );
};

export default CreateGroupSearchBar;
