import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState, useFetchChatsQuery } from "../../store";

import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";

import ChatsListItem from "./ChatsListItem";
import ChatsListSkeleton from "./ChatsListSkeleton";

const ChatsList = () => {
  const user: User | null = useSelector((state) => (state as RootState).app.user);
  const { data, isLoading: chatsIsLoading, isError: chatsIsError } = useFetchChatsQuery();
  const [selectedItem, setSelectedItem] = useState<number>();

  const handleClickedColor = (index: number) => setSelectedItem(index);

  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    if (data?.chats) setChats(data?.chats);
  }, [data]);

  const renderList = () =>
    chats.map(
      (chat: Chat, index: number) =>
        user && (
          <ChatsListItem
            key={index}
            user={user}
            chat={chat}
            itemIndex={index}
            isClicked={selectedItem === index}
            handleClickedColor={handleClickedColor}
            isSearch={false}
          />
        )
    );

  return (
    <div className="flex flex-col">
      {user && !chatsIsLoading ? (
        renderList()
      ) : chatsIsError ? (
        <div className="inline-block px-6 py-1 h-20 flex items-center justify-between transition-colors rounded-t-sm text-red-600">
          Error with fetching chats.
        </div>
      ) : (
        <ChatsListSkeleton />
      )}
    </div>
  );
};

export default ChatsList;
