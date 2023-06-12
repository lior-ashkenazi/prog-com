import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";

import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { AppDispatch, setChat, useUpdateGroupChatMutation } from "../../store";

import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";

import GroupParticipantsSearchBar from "./GroupParticipantsSearchBar";
import GroupParticipantsBox from "./GroupParticipantsBox";
import GroupParticipantsSearchList from "./GroupParticipantsSearchList";

interface AddParticipantsWindowProps {
  chat: Chat;
  setOpenAddParticipantsWindow: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket | null;
  socketConnected: boolean;
}

const AddParticipantsWindow = ({
  chat,
  setOpenAddParticipantsWindow,
  socket,
  socketConnected,
}: AddParticipantsWindowProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [updateGroupChat] = useUpdateGroupChatMutation();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newParticipants, setNewParticipants] = useState<User[]>([]);

  useEffect(() => {
    setSearchQuery("");
    setNewParticipants([]);
  }, []);

  const handleAddParticipant = (newParticipant: User) =>
    setNewParticipants((prevParticipants) => [...prevParticipants, newParticipant]);

  const handleRemoveParticipant = (removedParticipant: User) =>
    setNewParticipants((prevParticipants) =>
      prevParticipants.filter((user) => user !== removedParticipant)
    );

  const handleConfirmAddParticipants = async () => {
    if (!socketConnected || !socket) return;

    const request = {
      chatId: chat._id,
      participants: [
        ...chat.participants.map((participant) => participant._id),
        ...newParticipants.map((participant) => participant._id),
      ],
    };

    const { chat: updatedGroupChat } = await updateGroupChat(request).unwrap();

    socket.emit("updated group chat", updatedGroupChat);

    dispatch(setChat(updatedGroupChat));
  };

  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center">
        <button className="ml-2" onClick={() => setOpenAddParticipantsWindow(false)}>
          <AiOutlineArrowLeft
            style={{
              color: "#312e81",
              height: "2rem",
              width: "2rem",
              strokeWidth: "20",
            }}
          />
        </button>
        <GroupParticipantsSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <GroupParticipantsBox
        participants={newParticipants}
        handleRemoveParticipant={handleRemoveParticipant}
        isLong
      />
      <GroupParticipantsSearchList
        searchQuery={searchQuery}
        participants={newParticipants}
        existingParticipants={chat.participants}
        handleAddParticipant={handleAddParticipant}
        isLong
      />
      <div className="bg-gray-100 p-4 flex items-center justify-center">
        <button
          className="rounded-full bg-white"
          onClick={() => handleConfirmAddParticipants()}
          disabled={newParticipants.length === 0}
        >
          <BsFillCheckCircleFill
            style={{
              color: newParticipants.length > 0 ? "#312e81" : "#a5b4fc",
              height: "3rem",
              width: "3rem",
            }}
          />
        </button>
      </div>
    </>
  );
};

export default AddParticipantsWindow;
