import { createContext, useState, useRef, useEffect, SetStateAction } from "react";
import { Socket, io } from "socket.io-client";

import { User } from "../types/userTypes";
import { Message } from "../types/messageTypes";
import { Chat } from "../types/chatTypes";

const ENDPOINT = import.meta.env.VITE_ENDPOINT as string;

interface SocketContextState {
  socket: Socket | null;
  chats: Chat[];
  setChats: React.Dispatch<SetStateAction<Chat[]>>;
  shouldRefetchChats: boolean;
  setShouldRefetchChats: React.Dispatch<SetStateAction<boolean>>;
  connectSocket: (user: User) => void;
}

const defaultSocketContextValue = {
  socket: io(ENDPOINT, { autoConnect: false }),
  chats: [],
  setChats: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  shouldRefetchChats: false,
  setShouldRefetchChats: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  connectSocket: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
};

const SocketContext = createContext<SocketContextState>(defaultSocketContextValue);

interface SocketProviderProps {
  children: React.ReactNode;
}

const SocketProvider = ({ children }: SocketProviderProps) => {
  const socketRef = useRef<Socket | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [shouldRefetchChats, setShouldRefetchChats] = useState<boolean>(false);
  const [receivedMessage, setReceivedMessage] = useState<Message | null>(null);

  const connectSocket = (user: User) => {
    socketRef.current = io(ENDPOINT);

    socketRef.current.emit("setup", user);
    socketRef.current.on("message received", (message: Message) => {
      setChats((prevChats) => {
        return prevChats.map((chat) => {
          const chatExists = prevChats.some((chat) => chat._id === message.chatId._id);

          if (!chatExists) {
            setShouldRefetchChats(true);
          }

          console.log("we reach this code?");

          // the message object is populated so
          // chatId is now a Chat in fact
          // in database indeed chatId is an id
          if (chat._id === message.chatId._id) {
            return { ...chat, lastMessageId: message };
          }

          // if the chat doesn't exist, we will update
          // the chats state correctly after a refetch
          // the must occur
          return chat;
        });
      });
      setReceivedMessage(message);
    });

    return () => {
      socketRef.current!.close(); //eslint-disable-line
    };
  };

  useEffect(() => {
    if (receivedMessage) {
      // Sort chats by last message date
      setChats((prevChats) =>
        [...prevChats].sort((a, b) => {
          if (!a.lastMessageId && !b.lastMessageId) {
            return -1; // If both don't have a last message, chat A takes precedence
          } else if (!a.lastMessageId) {
            return 1; // If only A doesn't have a last message, B takes precedence
          } else if (!b.lastMessageId) {
            return -1; // If only B doesn't have a last message, A takes precedence
          } else {
            // If both have last message, compare by last message date
            return (
              new Date(b.lastMessageId.createdAt).getTime() -
              new Date(a.lastMessageId.createdAt).getTime()
            );
          }
        })
      );
    }
  }, [receivedMessage]);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        chats,
        shouldRefetchChats,
        setShouldRefetchChats,
        setChats,
        connectSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
