import Modal from "react-modal";

import ModalHeader from "./ModalHeader";

interface ModalWrapperProps {
  children: React.ReactNode;
  extendedChildren?: React.ReactNode;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  headerTitle: string;
}

const ModalWrapper = ({
  children,
  extendedChildren,
  showModal,
  setShowModal,
  headerTitle,
}: ModalWrapperProps) => {
  const customStyles = {
    content: {
      width: !extendedChildren ? "24rem" : "48rem",
      height: "max-content",
      margin: "0 auto",
      padding: 0,
      borderWidth: "0.5px",
      borderTopColor: "rgb(79 70 229)",
      borderRadius: "0.375rem",
    },
    overlay: {
      backgroundColor: "transparent",
    },
  };

  return (
    <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} style={customStyles}>
      <ModalHeader setShowModal={setShowModal} headerTitle={headerTitle} />
      <div className="flex">
        <div className="bg-gray-100 w-96">{children}</div>
        {extendedChildren && <div className="transition-transform origin-left w-96">ha</div>}
      </div>
    </Modal>
  );
};

export default ModalWrapper;
