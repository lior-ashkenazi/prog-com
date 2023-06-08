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
  connectSocket: (user: User) => void;
}

const defaultSocketContextValue = {
  socket: io(ENDPOINT, { autoConnect: false }),
  chats: [],
  setChats: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  connectSocket: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
};

const SocketContext = createContext<SocketContextState>(defaultSocketContextValue);

interface SocketProviderProps {
  children: React.ReactNode;
}

const SocketProvider = ({ children }: SocketProviderProps) => {
  const socketRef = useRef<Socket | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [receivedMessage, setReceivedMessage] = useState<Message | null>(null);

  const connectSocket = (user: User) => {
    socketRef.current = io(ENDPOINT);
    console.log(socketRef.current);

    socketRef.current.emit("setup", user._id);
    socketRef.current.on("message received", (message: Message) => {
      console.log("step 2");

      setChats((prevChats) => {
        return prevChats.map((chat) => {
          // the message object is populated so
          // chatId is now a Chat in fact
          // in database indeed chatId is an id
          if (chat._id === message.chatId._id) {
            return { ...chat, lastMessage: message };
          }
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
          if (!a.lastMessage && !b.lastMessage) {
            return -1; // If both don't have a last message, chat A takes precedence
          } else if (!a.lastMessage) {
            return 1; // If only A doesn't have a last message, B takes precedence
          } else if (!b.lastMessage) {
            return -1; // If only B doesn't have a last message, A takes precedence
          } else {
            // If both have last message, compare by last message date
            return (
              new Date(b.lastMessage.createdAt).getTime() -
              new Date(a.lastMessage.createdAt).getTime()
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
    <SocketContext.Provider value={{ socket: socketRef.current, chats, setChats, connectSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
