import { useState } from "react";
import { useDispatch } from "react-redux";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { BsPencilFill, BsX, BsCheck2 } from "react-icons/bs";

import { AppDispatch, setChat, useUpdateGroupChatMutation } from "../../store";

import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";

import { getChatAvatar, getChatName } from "../../utils";

import ModalWrapper from "./ModalWrapper";
import ChatGroupModalAvatar from "./ChatGroupModalAvatar";

const chatGroupNameValidationSchema = z.object({
  chatName: z.string().min(1, { message: "Group name is required" }),
});

type ChatGroupNameValidationSchema = z.infer<typeof chatGroupNameValidationSchema>;

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
  const dispatch: AppDispatch = useDispatch();

  const [updateGroupChat] = useUpdateGroupChatMutation();

  const [showEditName, setShowEditName] = useState<boolean>(false);

  const children = (
    <>
      <ChatGroupModalAvatar user={user} chat={chat} />
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
