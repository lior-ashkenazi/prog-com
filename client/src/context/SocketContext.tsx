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
  sortSignal: boolean;
  setSortSignal: React.Dispatch<SetStateAction<boolean>>;
}

const defaultSocketContextValue = {
  socket: io(ENDPOINT, { autoConnect: false }),
  chats: [],
  setChats: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  shouldRefetchChats: false,
  setShouldRefetchChats: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  sortSignal: false,
  setSortSignal: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
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
  const [sortSignal, setSortSignal] = useState<boolean>(false);

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

        setSortSignal(true);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [user]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        chats,
        shouldRefetchChats,
        setShouldRefetchChats,
        setChats,
        sortSignal,
        setSortSignal,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
