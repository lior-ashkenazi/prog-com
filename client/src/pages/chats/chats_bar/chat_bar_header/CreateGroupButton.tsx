interface CreateGroupButtonProps {
  buttonCollapse: boolean;
  setShowCreateGroupButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGroupButton = ({
  buttonCollapse,
  setShowCreateGroupButton,
}: CreateGroupButtonProps) => {
  return (
    <button
      className={`shrink transition-transform origin-right ${
        !buttonCollapse ? "scale-x-100 p-1 opacity-100 w-28" : "scale-x-0 opacity-0 w-0"
      } bg-indigo-600 rounded-md text-white`}
      onClick={() => setShowCreateGroupButton(true)}
    >
      {!buttonCollapse ? "Create Group" : ""}
    </button>
  );
};

export default CreateGroupButton;
