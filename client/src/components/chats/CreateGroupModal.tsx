import { useState, useContext } from "react";
import { useSelector } from "react-redux";

import { BsArrowRightCircleFill } from "react-icons/bs";

import { RootState, useCreateGroupChatMutation } from "../../store";

import { LoadingContext } from "../../context/LoadingContext";

import { User } from "../../types/userTypes";

import CreateGroupNameInput from "./CreateGroupNameInput";
import GroupParticipantsSearchBar from "./GroupParticipantsSearchBar";
import GroupParticipantsSearchList from "./GroupParticipantsSearchList";
import GroupParticipantsBox from "./GroupParticipantsBox";
import ModalWrapper from "./ModalWrapper";

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

  const { setChatBoxIsLoading } = useContext(LoadingContext);

  const [chatName, setChatName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [participants, setParticipants] = useState<User[]>([]);

  const handleAfterClose = () => {
    setChatName("");
    setSearchQuery("");
    setParticipants([]);
  };

  const handleAddParticipant = (newParticipant: User) =>
    setParticipants((prevParticipants) => [...prevParticipants, newParticipant]);

  const handleRemoveParticipant = (removedParticipant: User) =>
    setParticipants((prevParticipants) =>
      prevParticipants.filter((user) => user !== removedParticipant)
    );

  const handleCreateGroupChat = async () => {
    if (!user) return;

    setChatBoxIsLoading(true);

    setShowCreateGroupModal(false);

    await createGroupChat({
      participants: participants.map((participant) => participant._id),
      chatName,
    }).unwrap();
  };

  const children = (
    <>
      <CreateGroupNameInput chatName={chatName} setChatName={setChatName} />
      <GroupParticipantsSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <GroupParticipantsBox
        participants={participants}
        handleRemoveParticipant={handleRemoveParticipant}
      />
      <GroupParticipantsSearchList
        searchQuery={searchQuery}
        participants={participants}
        handleAddParticipant={handleAddParticipant}
      />
      <div className="bg-gray-100 p-4 flex items-center justify-center">
        <button
          className="rounded-full bg-white"
          onClick={() => handleCreateGroupChat()}
          disabled={!chatName}
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
      handleAfterClose={handleAfterClose}
    >
      {children}
    </ModalWrapper>
  );
};

export default CreateGroupModal;
