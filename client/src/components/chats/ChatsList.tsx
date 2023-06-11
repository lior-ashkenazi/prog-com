import { useEffect, useContext, useCallback } from "react";
import { useSelector } from "react-redux";

import { RootState, useFetchChatsQuery } from "../../store";

import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";

import ChatsListItem from "./ChatsListItem";
import ListSkeleton from "./ListSkeleton";
import { SocketContext } from "../../context/SocketContext";

const ChatsList = () => {
  const user: User | null = useSelector((state) => (state as RootState).app.user);
  const selectedChat: Chat | null = useSelector((state) => (state as RootState).app.chat);
  const {
    data,
    isLoading: chatsIsLoading,
    isFetching: chatsIsFetching,
    isError: chatsIsError,
    refetch: refetchChats,
  } = useFetchChatsQuery();
  const { chats, setChats, shouldRefetchChats, setShouldRefetchChats, sortSignal, setSortSignal } =
    useContext(SocketContext);
  useEffect(() => {
    if (shouldRefetchChats) {
      refetchChats();
      setShouldRefetchChats(false);
    }
  }, [refetchChats, shouldRefetchChats, setShouldRefetchChats]);

  const sortChats = useCallback(() => {
    setChats((prevChats) =>
      [...prevChats].sort((a, b) => {
        if (!a.lastMessageId && !b.lastMessageId) {
          return -1; // If both don't have a last message, chat A takes precedence
        } else if (!a.lastMessageId) {
          return 1; // If only A doesn't have a last message, B takes precedence
        } else if (!b.lastMessageId) {
          return -1; // If only B doesn't have a last message, A takes precedence
        } else {
          // If both have last message, compare by last message date
          return (
            new Date(b.lastMessageId.createdAt).getTime() -
            new Date(a.lastMessageId.createdAt).getTime()
          );
        }
      })
    );
  }, [setChats]);

  useEffect(() => {
    if (data?.chats) {
      setChats(data?.chats);
      sortChats();
    }
  }, [data, setChats, sortChats]);

  useEffect(() => {
    if (!sortSignal) return;

    sortChats();

    setSortSignal(false);
  }, [sortSignal, setSortSignal, sortChats]);

  const renderList = () =>
    chats.map(
      (chat: Chat, index: number) =>
        user && (
          <ChatsListItem
            key={index}
            user={user}
            chat={chat}
            isClicked={selectedChat?._id === chat._id}
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
