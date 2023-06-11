import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";

import { getChatName } from "../../utils";

import ModalWrapper from "./ModalWrapper";
import ChatGroupModalAvatar from "./ChatGroupModalAvatar";
import ChatGroupModalName from "./ChatGroupModalName";

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
  // const renderList = () => chat.participants.map((participant)=>)

  const children = (
    <>
      <ChatGroupModalAvatar user={user} chat={chat} />
      <ChatGroupModalName user={user} chat={chat} />
      {/* <div>
        <h3>Participants</h3>
        <div className="flex flex-wrap gap-2 h-32 p-4 border-b overflow-y-auto">{renderList()}</div>
      </div> */}
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
