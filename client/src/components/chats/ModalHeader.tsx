import { BsXLg } from "react-icons/bs";

interface ModalHeaderProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  headerTitle: string;
}

const ModalHeader = ({ setShowModal, headerTitle }: ModalHeaderProps) => {
  return (
    <div className="bg-indigo-600 p-2 flex rounded-t-md">
      <button onClick={() => setShowModal(false)}>
        <BsXLg
          className="ml-2"
          style={{
            color: "#fff",
            strokeWidth: "2",
            width: "1.25rem",
            height: "1.25rem",
          }}
        />
      </button>
      <h2 className="grow text-4xl text-center text-white font-medium mr-5 truncate">
        {headerTitle}
      </h2>
    </div>
  );
};

export default ModalHeader;
