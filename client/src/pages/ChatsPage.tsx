import PageHeader from "../components/chats/PageHeader";
import ChatsBar from "../components/chats/ChatsBar";

const ChatsPage = () => {
  return (
    <div
      className="grid grid-rows-[auto_1fr] bg-gray-100 w-full mx-4 rounded-md"
      style={{ height: "calc(100vh - 2rem)" }}
    >
      <PageHeader />
      <div className="grid grid-cols-3 grid-rows-[auto_1fr] grid-flow-col overflow-y-hidden">
        <ChatsBar />
        <div className="bg-green-900 col-span-2">3</div>
        <div className="bg-orange-900 col-span-2">4</div>
      </div>
    </div>
  );
};

export default ChatsPage;
