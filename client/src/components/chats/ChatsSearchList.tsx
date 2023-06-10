import { useSelector } from "react-redux";

import { RootState, useFetchUsersQuery } from "../../store";
import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";
import ListSkeleton from "./ListSkeleton";
import ChatsListItem from "./ChatsListItem";

interface ChatsSearchListProps {
  searchQuery: string;
}

const ChatsSearchList = ({ searchQuery }: ChatsSearchListProps) => {
  const user = useSelector((state) => (state as RootState).app.user);

  const { data, isLoading } = useFetchUsersQuery(searchQuery);

  const potentialChat = (user: User, index: number): Chat => {
    return { _id: index.toString(), chatName: "", participants: [user], isGroupChat: false };
  };

  const renderList = () =>
    data?.users.map((user: User, index: number) => (
      <ChatsListItem key={index} user={user} chat={potentialChat(user, index)} isSearch />
    ));

  return (
    <div className="flex flex-col">{!isLoading && user ? renderList() : <ListSkeleton />}</div>
  );
};

export default ChatsSearchList;
