import { useEffect, useState, useContext } from "react";

import { SocketContext } from "../../../../../context/SocketContext";

import { User } from "../../../../../types/userTypes";
import { Chat } from "../../../../../types/chatTypes";

import { getChatName } from "../../../../../utils";

import ModalWrapper from "../../../../../components/chats/modals/ModalWrapper";
import ChatGroupModalAvatar from "./ChatGroupModalAvatar";
import ChatGroupModalName from "./ChatGroupModalName";
import ChatGroupModalParticipants from "./ChatGroupModalParticipants";
import AddParticipantsWindow from "./AddParticipantsWindow";

interface ChatGroupModalProps {
  user: User;
  chat: Chat;
  showChatGroupModal: boolean;
  setShowChatGroupModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatGroupModal = ({
  user,
  chat,
  showChatGroupModal,
  setShowChatGroupModal,
}: ChatGroupModalProps) => {
  const { socket, socketConnected } = useContext(SocketContext);

  const [openAddParticipantsWindow, setOpenAddParticipantsWindow] = useState<boolean>(false);

  useEffect(() => setOpenAddParticipantsWindow(false), [chat]);

  const handleAfterClose = () => setOpenAddParticipantsWindow(false);

  const children = (
    <>
      <ChatGroupModalAvatar
        user={user}
        chat={chat}
        socket={socket}
        socketConnected={socketConnected}
      />
      <ChatGroupModalName
        user={user}
        chat={chat}
        socket={socket}
        socketConnected={socketConnected}
      />
      <ChatGroupModalParticipants
        user={user}
        chat={chat}
        setShowChatGroupModal={setShowChatGroupModal}
        setOpenAddParticipantsWindow={setOpenAddParticipantsWindow}
      />
    </>
  );
  return (
    <ModalWrapper
      showModal={showChatGroupModal}
      setShowModal={setShowChatGroupModal}
      headerTitle={getChatName(user, chat)}
      extendedChildren={
        openAddParticipantsWindow && (
          <AddParticipantsWindow
            chat={chat}
            setOpenAddParticipantsWindow={setOpenAddParticipantsWindow}
            socket={socket}
            socketConnected={socketConnected}
          />
        )
      }
      handleAfterClose={handleAfterClose}
    >
      {children}
    </ModalWrapper>
  );
};

export default ChatGroupModal;
