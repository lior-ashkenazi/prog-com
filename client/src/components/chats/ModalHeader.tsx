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
            width: "1.2rem",
            height: "1.2rem",
          }}
        />
      </button>
      <h2 className="grow text-3xl text-center text-white font-medium ">{headerTitle}</h2>
    </div>
  );
};

export default ModalHeader;
