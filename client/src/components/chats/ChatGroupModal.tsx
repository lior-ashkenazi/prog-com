import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";

import { getChatName } from "../../utils";

import ModalWrapper from "./ModalWrapper";
import ChatGroupModalAvatar from "./ChatGroupModalAvatar";
import ChatGroupModalName from "./ChatGroupModalName";
import ChatGroupModalParticipants from "./ChatGroupModalParticipants";

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
  const children = (
    <>
      <ChatGroupModalAvatar user={user} chat={chat} />
      <ChatGroupModalName user={user} chat={chat} />
      <ChatGroupModalParticipants
        user={user}
        chat={chat}
        setShowChatGroupModal={setShowChatGroupModal}
      />
    </>
  );
  return (
    <ModalWrapper
      showModal={showChatGroupModal}
      setShowModal={setShowChatGroupModal}
      headerTitle={getChatName(user, chat)}
    >
      {children}
    </ModalWrapper>
  );
};

export default ChatGroupModal;
