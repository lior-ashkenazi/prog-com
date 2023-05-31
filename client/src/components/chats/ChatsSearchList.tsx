import { useFetchUsersQuery } from "../../store";
import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";
import ChatsListSkeleton from "./ChatsListSkeleton";
import ChatsListItem from "./ChatsListItem";

interface ChatsSearchListProps {
  input: string;
}

const ChatsSearchList = ({ input }: ChatsSearchListProps) => {
  const { data, isLoading } = useFetchUsersQuery(input);

  const potentialChat = (user: User, index: number): Chat => {
    return { _id: index.toString(), chatName: "", participants: [user], isGroupChat: false };
  };

  const renderList = () =>
    data?.users.map((user: User, index: number) => (
      <ChatsListItem chat={potentialChat(user, index)} />
    ));

  return (
    <div className="p-3 flex flex-col">{isLoading ? <ChatsListSkeleton /> : renderList()}</div>
  );
};

export default ChatsSearchList;
