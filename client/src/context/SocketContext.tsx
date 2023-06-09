import { createContext, useState, useRef, useEffect, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { Socket, io } from "socket.io-client";

import { RootState } from "../store";
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
}

const defaultSocketContextValue = {
  socket: io(ENDPOINT, { autoConnect: false }),
  chats: [],
  setChats: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  shouldRefetchChats: false,
  setShouldRefetchChats: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
};

const SocketContext = createContext<SocketContextState>(defaultSocketContextValue);

interface SocketProviderProps {
  children: React.ReactNode;
}

const SocketProvider = ({ children }: SocketProviderProps) => {
  const socketRef = useRef<Socket | null>(null);
  const user: User | null = useSelector((state: RootState) => state.app.user);
  const [chats, setChats] = useState<Chat[]>([]);
  const [shouldRefetchChats, setShouldRefetchChats] = useState<boolean>(false);
  const [receivedMessage, setReceivedMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (user) {
      socketRef.current = io(ENDPOINT);
      socketRef.current.emit("setup", user);

      socketRef.current.on("message received", (message: Message) => {
        setChats((prevChats) => {
          const chatExists = prevChats.some((chat) => chat._id === message.chatId._id);

          if (!chatExists) {
            setShouldRefetchChats(true);
          }

          return prevChats.map((chat) => {
            if (chat._id === message.chatId._id) {
              return { ...chat, lastMessageId: message };
            }

            return chat;
          });
        });

        setReceivedMessage(message);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [user]);

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

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        chats,
        shouldRefetchChats,
        setShouldRefetchChats,
        setChats,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
