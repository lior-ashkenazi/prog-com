import { SocketProvider } from "../../context/SocketContext";
import { LoadingProvider } from "../../context/LoadingContext";
import ChatsPageHeader from "./chats_header/ChatsPageHeader";
import ChatsBar from "./chats_bar/ChatsBar";
import ChatBoxContainer from "./chats_box/ChatBoxContainer";

const ChatsPage = () => {
  return (
    <SocketProvider>
      <LoadingProvider>
        <div className="grid grid-rows-[auto_1fr] bg-gray-100 w-full h-full">
          <ChatsPageHeader />
          <div className="grid grid-cols-3 grid-rows-[auto_1fr] grid-flow-col overflow-y-hidden">
            <ChatsBar />
            <ChatBoxContainer />
          </div>
        </div>
      </LoadingProvider>
    </SocketProvider>
  );
};

export default ChatsPage;
