import { LoadingProvider } from "../context/LoadingContext";
import PageHeader from "../components/chats/PageHeader";
import ChatsBar from "../components/chats/ChatsBar";
import ChatBoxContainer from "../components/chats/ChatBoxContainer";

const ChatsPage = () => {
  return (
    <LoadingProvider>
      <div
        className="grid grid-rows-[auto_1fr] bg-gray-100 w-full mx-4"
        style={{ height: "calc(100vh - 2rem)" }}
      >
        <PageHeader />
        <div className="grid grid-cols-3 grid-rows-[auto_1fr] grid-flow-col overflow-y-hidden">
          <ChatsBar />
          <ChatBoxContainer />
        </div>
      </div>
    </LoadingProvider>
  );
};

export default ChatsPage;
