import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

import { useFetchMessagesQuery, useSendMessageMutation, isServerError } from "../../store";

import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

import { User } from "../../types/userTypes";
import { Message, SendMessageType } from "../../types/messageTypes";
import { Chat } from "../../types/chatTypes";

const ENDPOINT = import.meta.env.VITE_ENDPOINT as string;

interface ChatBoxProps {
  user: User;
  chat: Chat;
}

const ChatBox = ({ user, chat }: ChatBoxProps) => {
  const socketRef = useRef<Socket | null>(null);

  const {
    data,
    refetch: refetchMessages,
    error: fetchMessagesError,
  } = useFetchMessagesQuery(chat._id);
  const [sendMessage, { error: sendError }] = useSendMessageMutation();

  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState<string>("");
  const [sendMessageError, setSendMessageError] = useState<string>("");

  useEffect(() => {
    if (data?.messages) setMessages(data?.messages);
  }, [data]);

  useEffect(() => {
    socketRef.current = io(ENDPOINT, { forceNew: true });
    console.log(ENDPOINT);

    socketRef.current.emit("setup", user);
    socketRef.current.emit("access chat", chat);

    socketRef.current.on("message received", (message: Message) => {
      console.log("message received");

      setMessages((prev) => [...prev, message]);

      console.log("set messages");
    });

    socketRef.current.on("typing", (user) => {
      setTyping(user.userName);
    });

    socketRef.current.on("stop typing", () => {
      setTyping("");
    });

    return () => {
      socketRef.current!.off("setup"); //eslint-disable-line
      socketRef.current!.disconnect(); //eslint-disable-line
    };
  }, [chat, user]);

  const handleSendMessage = async (message: SendMessageType) => {
    try {
      console.log("step 1");
      console.log(message);

      const { message: populatedMessage } = await sendMessage(message).unwrap();
      setSendMessageError("");
      socketRef.current!.emit("new message", chat, populatedMessage); //eslint-disable-line
      setMessages((prev) => [...prev, populatedMessage]);
    } catch (error) {
      if (error && typeof error === "object" && isServerError(error)) {
        setSendMessageError(error.data.message);
      }
    }
  };

  return (
    messages && (
      <>
        <ChatHeader user={user} chat={chat} />
        <div className="col-span-2 grid grid grid-rows-[385px_auto]">
          <ChatBody user={user} messages={messages} />
          <ChatFooter user={user} chat={chat} handleSendMessage={handleSendMessage} />
        </div>
      </>
    )
  );
};

export default ChatBox;
