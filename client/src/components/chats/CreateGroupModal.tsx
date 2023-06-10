import { useState } from "react";
import { useSelector } from "react-redux";

import { BsArrowRightCircleFill } from "react-icons/bs";

import { RootState, useCreateGroupChatMutation } from "../../store";

import { User } from "../../types/userTypes";

import CreateGroupNameInput from "./CreateGroupNameInput";
import CreateGroupSearchBar from "./CreateGroupSearchBar";
import CreateGroupSearchList from "./CreateGroupSearchList";
import CreateGroupParticipants from "./CreateGroupParticipants";
import ModalWrapper from "./Modal";

interface CreateGroupModalProps {
  showCreateGroupModal: boolean;
  setShowCreateGroupModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGroupModal = ({
  showCreateGroupModal,
  setShowCreateGroupModal,
}: CreateGroupModalProps) => {
  const user: User | null = useSelector((state) => (state as RootState).app.user);

  const [createGroupChat] = useCreateGroupChatMutation();
  const [chatName, setChatName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [participants, setParticipants] = useState<User[]>([]);

  const handleAddParticipant = (newParticipant: User) =>
    setParticipants((prevParticipants) => [...prevParticipants, newParticipant]);

  const handleRemoveParticipant = (removedParticipant: User) =>
    setParticipants((prevParticipants) =>
      prevParticipants.filter((user) => user !== removedParticipant)
    );

  const handleCreateGroupChat = async () => {
    if (!user) return;

    await createGroupChat({
      participants: participants.map((participant) => participant._id),
      chatName,
    }).unwrap();

    setShowCreateGroupModal(false);
  };

  const children = (
    <>
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
      <div className="bg-gray-100 p-4 flex items-center justify-center">
        <button
          className="rounded-full bg-white"
          onClick={() => handleCreateGroupChat()}
          disabled={!searchQuery}
        >
          <BsArrowRightCircleFill
            style={{
              color: !chatName ? "#a5b4fc" : "#312e81",
              height: "3rem",
              width: "3rem",
            }}
          />
        </button>
      </div>
    </>
  );

  return (
    <ModalWrapper
      showModal={showCreateGroupModal}
      setShowModal={setShowCreateGroupModal}
      headerTitle="Create Group"
    >
      {children}
    </ModalWrapper>
  );
};

export default CreateGroupModal;
