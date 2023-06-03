import { useEffect, useState } from "react";
import io from "socket.io-client";

import { useFetchMessagesQuery, useSendMessageMutation, isServerError } from "../../store";

import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";

import { SendMessageType } from "./ChatFooter";

const ENDPOINT = import.meta.env.VITE_ENDPOINT as string;

interface ChatBoxProps {
  user: User;
  chat: Chat;
}

const ChatBox = ({ user, chat }: ChatBoxProps) => {
  const {
    data: messages,
    refetch: refetchMessages,
    error: fetchMessagesError,
  } = useFetchMessagesQuery(chat._id);
  const [sendMessage, { error: sendError }] = useSendMessageMutation();

  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [sendMessageError, setSendMessageError] = useState<string>("");

  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on("message received", () => {
      refetchMessages();
    });

    socket.on("start typing", () => {
      setIsTyping(true);
    });

    socket.on("stop typing", () => {
      setIsTyping(false);
    });

    return () => {
      socket.off("message received");
      socket.off("start typing");
      socket.off("stop typing");
    };
  }, [refetchMessages]);

  const handleSendMessage = async (message: SendMessageType) => {
    if (message.mode === "text" && message.content.trim() === "") {
      return;
    }

    try {
      await sendMessage(message).unwrap();
      setSendMessageError("");
    } catch (error) {
      if (error && typeof error === "object" && isServerError(error)) {
        setSendMessageError(error.data.message);
      }
    }
  };

  return (
    <>
      <ChatHeader user={user} chat={chat} />
      <div className="col-span-2 grid grid grid-rows-[1fr_auto]">
        <ChatBody />
        <ChatFooter user={user} chat={chat} handleSendMessage={handleSendMessage} />
      </div>
    </>
  );
};

export default ChatBox;
