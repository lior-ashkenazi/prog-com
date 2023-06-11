import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { BsPencilFill, BsX, BsCheck2 } from "react-icons/bs";

import { AppDispatch, setChat, useUpdateGroupChatMutation } from "../../store";

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
  const children = (
    <>
      <ChatGroupModalAvatar user={user} chat={chat} />
      <ChatGroupModalName user={user} chat={chat} />
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
