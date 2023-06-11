import { useDispatch } from "react-redux";

import { HiPlus } from "react-icons/hi";

import { AppDispatch, setChat, useUpdateGroupChatMutation } from "../../store";

import { Chat } from "../../types/chatTypes";
import { User } from "../../types/userTypes";

import ChatGroupModalParticipantsItem from "./ChatGroupModalParticipantsItem";

interface ChatGroupModalParticipantsProps {
  user: User;
  chat: Chat;
  setShowChatGroupModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenAddParticipantsWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatGroupModalParticipants = ({
  user,
  chat,
  setShowChatGroupModal,
  setOpenAddParticipantsWindow,
}: ChatGroupModalParticipantsProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [updateGroupChat] = useUpdateGroupChatMutation();

  const handleRemoveParticipant = async (removeParticipant: User) => {
    const request = {
      chatId: chat._id,
      participants: chat.participants
        .filter((participant) => participant._id !== removeParticipant._id)
        .map((participant) => participant._id),
    };
    const { chat: updatedGroupChat } = await updateGroupChat(request).unwrap();
    dispatch(setChat(updatedGroupChat));
  };

  const renderList = () =>
    chat.participants.map((participant) => (
      <ChatGroupModalParticipantsItem
        user={user}
        chat={chat}
        participant={participant}
        handleRemoveParticipant={handleRemoveParticipant}
        isAdmin={chat.groupAdmin && chat.groupAdmin._id === participant._id}
        setShowChatGroupModal={setShowChatGroupModal}
      />
    ));

  return (
    <div>
      <div className="border-b-2 pb-1 flex items-center justify-between">
        <h3 className="pt-2 pb-1 px-4 text-xl font-semibold">Participants</h3>
        {chat.groupAdmin && chat.groupAdmin._id === user._id && (
          <button className="mr-3 mt-1.5" onClick={() => setOpenAddParticipantsWindow(true)}>
            <HiPlus
              style={{
                height: "1.4rem",
                width: "1.4rem",
              }}
            />
          </button>
        )}
      </div>
      <div className="flex flex-col h-80 overflow-y-auto">{renderList()}</div>
    </div>
  );
};

export default ChatGroupModalParticipants;
