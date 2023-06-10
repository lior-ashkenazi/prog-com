interface CreateGroupNameInputProps {
  chatName: string;
  setChatName: React.Dispatch<React.SetStateAction<string>>;
}

const CreateGroupNameInput = ({ chatName, setChatName }: CreateGroupNameInputProps) => {
  return (
    <div className="p-3 flex gap-x-2">
      <span className="font-medium text-xl my-auto">Group Name:</span>
      <div className="grow flex justify-center relative">
        <input
          id="createGroupModelName"
          autoComplete="off"
          className="px-2 py-1.5 w-full rounded border-2 bg-gray-200 focus:bg-gray-50 focus:outline-none focus:shadow-outline focus:border-indigo-400 transition-colors"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
          placeholder="Enter group name"
          type="text"
        ></input>
      </div>
    </div>
  );
};

export default CreateGroupNameInput;
