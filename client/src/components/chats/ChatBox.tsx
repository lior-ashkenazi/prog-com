import { useSelector } from "react-redux";

import { RootState } from "../../store";
import ChatHeader from "./ChatHeader";

const ChatBox = () => {
  const user = useSelector((state) => (state as RootState).app.user);
  const selectedChat = useSelector((state) => (state as RootState).app.selectedChat);

  return selectedChat && user ? (
    <>
      <>
        <ChatHeader chat={selectedChat} user={user} />
        <div className="bg-orange-900 col-span-2">4</div>
      </>
    </>
  ) : (
    <>
      <div className="col-span-2 row-span-full flex items-center justify-center">
        <span className="font-medium">Select a chat to start messaging</span>
      </div>
    </>
  );
};

export default ChatBox;
