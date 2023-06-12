import { createContext, useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Socket, io } from "socket.io-client";

import { RootState } from "../store";
import { User } from "../types/userTypes";

const ENDPOINT = import.meta.env.VITE_ENDPOINT as string;

interface SocketContextState {
  socket: Socket | null;
  socketConnected: boolean;
}

const defaultSocketContextValue = {
  socket: io(ENDPOINT, { autoConnect: false }),
  socketConnected: false,
};

const SocketContext = createContext<SocketContextState>(defaultSocketContextValue);

interface SocketProviderProps {
  children: React.ReactNode;
}

const SocketProvider = ({ children }: SocketProviderProps) => {
  const socketRef = useRef<Socket | null>(null);
  const user: User | null = useSelector((state: RootState) => state.app.user);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      socketRef.current = io(ENDPOINT);
      socketRef.current.emit("setup", user);
      setSocketConnected(true);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        setSocketConnected(false);
      }
    };
  }, [user]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        socketConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
