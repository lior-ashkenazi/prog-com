import { BsXLg } from "react-icons/bs";

interface CreateGroupHeaderProps {
  setShowCreateGroupModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGroupHeader = ({ setShowCreateGroupModal }: CreateGroupHeaderProps) => {
  return (
    <div className="bg-indigo-600 p-2 flex rounded-t-md">
      <button onClick={() => setShowCreateGroupModal(false)}>
        <BsXLg
          className="ml-2"
          style={{
            color: "#fff",
            strokeWidth: "2",
            width: "1.2rem",
            height: "1.2rem",
          }}
        />
      </button>
      <h2 className="grow text-3xl text-center text-white font-medium ">Create Group</h2>
    </div>
  );
};

export default CreateGroupHeader;
