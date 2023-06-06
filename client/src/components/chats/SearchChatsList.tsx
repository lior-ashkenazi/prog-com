import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState, useFetchUsersQuery } from "../../store";
import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";
import ChatsListSkeleton from "./ChatsListSkeleton";
import ChatsListItem from "./ChatsListItem";

interface SearchChatsListProps {
  searchQuery: string;
}

const SearchChatsList = ({ searchQuery }: SearchChatsListProps) => {
  const user = useSelector((state) => (state as RootState).app.user);

  const { data, isLoading } = useFetchUsersQuery(searchQuery);
  const [selectedItem, setSelectedItem] = useState<number>();

  const handleClickedColor = (index: number) => setSelectedItem(index);

  const potentialChat = (user: User, index: number): Chat => {
    return { _id: index.toString(), chatName: "", participants: [user], isGroupChat: false };
  };

  const renderList = () =>
    data?.users.map((user: User, index: number) => (
      <ChatsListItem
        key={index}
        user={user}
        chat={potentialChat(user, index)}
        itemIndex={index}
        isClicked={selectedItem === index}
        handleClickedColor={handleClickedColor}
      />
    ));

  return (
    <div className="flex flex-col">{!isLoading && user ? renderList() : <ChatsListSkeleton />}</div>
  );
};

export default SearchChatsList;
