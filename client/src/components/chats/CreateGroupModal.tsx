import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";

import { RootState } from "../../store";

import { User } from "../../types/userTypes";

import CreateGroupHeader from "./CreateGroupHeader";
import CreateGroupNameInput from "./CreateGroupNameInput";
import CreateGroupSearchBar from "./CreateGroupSearchBar";
import CreateGroupSearchList from "./CreateGroupSearchList";
import CreateGroupParticipants from "./CreateGroupParticipants";

interface CreateGroupModalProps {
  showCreateGroupModal: boolean;
  setShowCreateGroupModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGroupModal = ({
  showCreateGroupModal,
  setShowCreateGroupModal,
}: CreateGroupModalProps) => {
  const user: User | null = useSelector((state) => (state as RootState).app.user);

  const [chatName, setChatName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [participants, setParticipants] = useState<User[]>([]);

  useEffect(() => {
    user && handleAddParticipant(user);
  }, [user]);

  const handleAddParticipant = (newParticipant: User) =>
    setParticipants((prevParticipants) => [...prevParticipants, newParticipant]);

  const handleRemoveParticipant = (removedParticipant: User) =>
    setParticipants((prevParticipants) =>
      prevParticipants.filter((user) => user !== removedParticipant)
    );

  const customStyles = {
    content: {
      width: "24rem",
      height: "max-content",
      margin: "0 auto",
      padding: 0,
      borderWidth: "0px",
      borderRadius: "0.375rem",
    },
    overlay: {
      backgroundColor: "transparent",
    },
  };

  return (
    <Modal
      isOpen={showCreateGroupModal}
      onRequestClose={() => setShowCreateGroupModal(false)}
      style={customStyles}
    >
      <div className="bg-gray-100">
        <CreateGroupHeader setShowCreateGroupModal={setShowCreateGroupModal} />
        <CreateGroupNameInput chatName={chatName} setChatName={setChatName} />
        <CreateGroupSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CreateGroupParticipants
          participants={participants}
          handleRemoveParticipant={handleRemoveParticipant}
        />
        <CreateGroupSearchList
          searchQuery={searchQuery}
          participants={participants}
          handleAddParticipant={handleAddParticipant}
        />
        <div className="bg-green-600 h-16">Button</div>
      </div>
    </Modal>
  );
};

export default CreateGroupModal;
