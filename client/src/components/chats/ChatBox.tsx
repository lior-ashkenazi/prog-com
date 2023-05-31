import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";

import { LoadingContext } from "../../context/LoadingContext";
import { RootState } from "../../store";
import ChatHeader from "./ChatHeader";

const ChatBox = () => {
  const user = useSelector((state) => (state as RootState).app.user);
  const selectedChat = useSelector((state) => (state as RootState).app.selectedChat);
  const { chatBoxIsLoading, setChatBoxIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setChatBoxIsLoading(!!selectedChat);
  }, [selectedChat, setChatBoxIsLoading]);

  return selectedChat && user ? (
    <>
      <>
        <ChatHeader chat={selectedChat} user={user} />
        <div className="bg-orange-900 col-span-2">4</div>
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
