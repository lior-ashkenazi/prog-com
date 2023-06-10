import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";

import { RootState, useFetchChatsQuery } from "../../store";

import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";

import ChatsListItem from "./ChatsListItem";
import ListSkeleton from "./ListSkeleton";
import { SocketContext } from "../../context/SocketContext";

const ChatsList = () => {
  const user: User | null = useSelector((state) => (state as RootState).app.user);
  const {
    data,
    isLoading: chatsIsLoading,
    isFetching: chatsIsFetching,
    isError: chatsIsError,
    refetch: refetchChats,
  } = useFetchChatsQuery();
  const { chats, setChats, shouldRefetchChats, setShouldRefetchChats } = useContext(SocketContext);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleClickedColor = (id: string) => setSelectedItem(id);

  useEffect(() => {
    if (shouldRefetchChats) {
      refetchChats();
      setShouldRefetchChats(false);
    }
  }, [refetchChats, shouldRefetchChats, setShouldRefetchChats]);

  useEffect(() => {
    if (data?.chats) setChats(data?.chats);
  }, [data, setChats]);

  const renderList = () =>
    chats.map(
      (chat: Chat, index: number) =>
        user && (
          <ChatsListItem
            key={index}
            user={user}
            chat={chat}
            isClicked={selectedItem === chat._id}
            handleClickedColor={handleClickedColor}
            isSearch={false}
          />
        )
    );

  return (
    <div className="flex flex-col">
      {user && !chatsIsLoading && !chatsIsFetching ? (
        renderList()
      ) : chatsIsError ? (
        <div className="inline-block px-6 py-1 h-20 flex items-center justify-between transition-colors rounded-t-sm text-red-600">
          Error with fetching chats.
        </div>
      ) : (
        <ListSkeleton />
      )}
    </div>
  );
};

export default ChatsList;
