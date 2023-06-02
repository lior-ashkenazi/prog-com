import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

import { LoadingContext } from "../../context/LoadingContext";
import {
  RootState,
  useFetchMessagesQuery,
  useSendMessageMutation,
  isServerError,
} from "../../store";

import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";

import { SendMessageType } from "./ChatFooter";

const ENDPOINT = import.meta.env.VITE_ENDPOINT as string;

const ChatBox = () => {
  const user: User | null = useSelector((state) => (state as RootState).app.user);
  const chat: Chat | null = useSelector((state) => (state as RootState).app.chat);

  const {
    data: messages,
    refetch: refetchMessages,
    error: fetchMessagesError,
  } = useFetchMessagesQuery(chat ? chat._id : "");
  const [sendMessage, { error: sendError }] = useSendMessageMutation();
  // TODO

  const [isTyping, setIsTyping] = useState<boolean>(false);
  const { chatBoxIsLoading, setChatBoxIsLoading } = useContext(LoadingContext);
  const [sendMessageError, setSendMessageError] = useState<string>("");

  useEffect(() => {
    setChatBoxIsLoading(!!chat);
  }, [chat, setChatBoxIsLoading]);

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

  return chat && user ? (
    <>
      <>
        <ChatHeader user={user} chat={chat} />
        <div className="col-span-2 grid grid grid-rows-[1fr_auto]">
          <ChatBody />
          <ChatFooter user={user} chat={chat} handleSendMessage={handleSendMessage} />
        </div>
      </>
    </>
  ) : (
    <>
      {chatBoxIsLoading ? (
        <div className="col-span-2 row-span-full bg-blue-900"></div>
      ) : (
        <div className="col-span-2 row-span-full flex items-center justify-center">
          <span className="font-medium">Select a chat to start messaging</span>
        </div>
      )}
    </>
  );
};

export default ChatBox;
