import { useEffect, useState, useContext, useRef } from "react";

import { useFetchMessagesQuery, useSendMessageMutation } from "../../store";
import { SocketContext } from "../../context/SocketContext";

import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

import { User } from "../../types/userTypes";
import { Message, SendMessageType } from "../../types/messageTypes";
import { Chat } from "../../types/chatTypes";
import ChatSearchWindow from "./ChatSearchWindow";

interface ChatBoxProps {
  user: User;
  chat: Chat;
}

interface ChatBodyHandle {
  scrollToMessage: (index: number) => void;
}

const ChatBox = ({ user, chat }: ChatBoxProps) => {
  const {
    data,
    isLoading: messagesIsLoading,
    isFetching: messagesIsFetching,
    isError: messagesIsError,
    refetch: refetchMessages,
  } = useFetchMessagesQuery(chat._id);
  const [sendMessage, { isLoading: sendMessageIsLoading, isError: sendMessageIsError }] =
    useSendMessageMutation();
  const { socket, connectSocket } = useContext(SocketContext);

  const [messages, setMessages] = useState<Message[]>([]);
  const [typingText, setTypingText] = useState<string>("");

  const [searchWindowVisible, setSearchWindowVisible] = useState<boolean>(false);
  const [messageToScrollTo, setMessageToScrollTo] = useState<number>(-1);
  const chatBodyRef = useRef<ChatBodyHandle | null>(null); // create a ref

  useEffect(() => {
    user && !socket && connectSocket(user);
  }, [user, socket, connectSocket]);

  useEffect(() => {
    refetchMessages();
  }, [refetchMessages, chat._id]);

  useEffect(() => {
    if (data?.messages) {
      setMessages(data?.messages);
    }
  }, [data]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("access chat", chat);

    const messageReceivedHandler = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    const typingHandler = (otherUser: User) => {
      otherUser._id !== user._id && setTypingText(otherUser.userName);
    };

    const stopTypingHandler = () => {
      setTypingText("");
    };

    socket.on("message received", messageReceivedHandler);
    socket.on("typing", typingHandler);
    socket.on("stop typing", stopTypingHandler);

    return () => {
      socket.off("message received", messageReceivedHandler);
      socket.off("typing", typingHandler);
      socket.off("stop typing", stopTypingHandler);
    };
  }, [chat, user, socket, connectSocket]);

  useEffect(() => {
    if (!searchWindowVisible && messageToScrollTo !== -1) {
      chatBodyRef.current?.scrollToMessage(messageToScrollTo);
      setMessageToScrollTo(-1);
    }
  }, [searchWindowVisible, messageToScrollTo]);

  const handleUserTyping = (isUserTyping: boolean) => {
    if (isUserTyping) {
      socket && socket.emit("typing", chat, user); //eslint-disable-line
    } else {
      socket && socket.emit("stop typing", chat, user); //eslint-disable-line
    }
  };

  const handleSendMessage = async (message: SendMessageType) => {
    const { message: populatedMessage } = await sendMessage(message).unwrap();

    socket && socket.emit("new message", chat, populatedMessage); //eslint-disable-line
  };

  const handleSearchClick = (messageId: string) => {
    setSearchWindowVisible(false);

    const index = messages.findIndex((message) => message._id === messageId);
    if (index !== -1) {
      setMessageToScrollTo(index);
    }
  };

  return (
    messages && (
      <>
        {!searchWindowVisible ? (
          <>
            <div className="col-span-2">
              <ChatHeader
                user={user}
                chat={chat}
                setSearchWindowVisible={setSearchWindowVisible}
                typingText={typingText}
              />
            </div>
            <div className="col-span-2 grid grid grid-rows-[400px_auto] overflow-y-auto">
              <ChatBody
                ref={chatBodyRef}
                user={user}
                messages={messages}
                messagesIsLoading={messagesIsLoading}
                messagesIsFetching={messagesIsFetching}
                messagesIsError={messagesIsError}
              />
              <ChatFooter
                user={user}
                chat={chat}
                handleSendMessage={handleSendMessage}
                sendMessageIsLoading={sendMessageIsLoading}
                sendMessageIsError={sendMessageIsError}
                handleUserTyping={handleUserTyping}
              />
            </div>
          </>
        ) : (
          <>
            <ChatSearchWindow
              setSearchWindowVisible={setSearchWindowVisible}
              messages={messages}
              handleSearchClick={handleSearchClick}
            />
          </>
        )}
      </>
    )
  );
};

export default ChatBox;
