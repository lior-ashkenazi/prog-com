interface SearchBarProps {
  input: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchBar = ({ input, onChange }: SearchBarProps) => {
  return (
    <div className="p-3 flex items-center justify-center">
      <input
        className="p-2 w-full rounded border-2 bg-gray-200 focus:bg-gray-50 focus:outline-none focus:shadow-outline focus:border-indigo-400 transition-colors"
        value={input}
        onChange={onChange}
        placeholder="Search by username"
        type="text"
      ></input>
    </div>
  );
};

export default SearchBar;
