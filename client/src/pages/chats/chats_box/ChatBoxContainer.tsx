import { useEffect, useContext } from "react";
import { useSelector } from "react-redux";

import { LoadingContext } from "../../../context/LoadingContext";
import { RootState } from "../../../store";

import { User } from "../../../types/userTypes";
import { Chat } from "../../../types/chatTypes";

import ChatBox from "./ChatBox";
import LoadingChatBox from "./skeletons/LoadingChatBox";

const ChatBoxContainer = () => {
  const user: User | null = useSelector((state) => (state as RootState).app.user);
  const chat: Chat | null = useSelector((state) => (state as RootState).app.chat);

  const { chatBoxIsLoading, setChatBoxIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setChatBoxIsLoading(!!chat);
  }, [chat, setChatBoxIsLoading]);

  return user && chat ? (
    <ChatBox user={user} chat={chat} />
  ) : (
    <>
      {chatBoxIsLoading ? (
        <LoadingChatBox />
      ) : (
        <div className="col-span-2 row-span-full flex items-center justify-center">
          <span className="font-medium">Select a chat to start messaging</span>
        </div>
      )}
    </>
  );
};

export default ChatBoxContainer;
