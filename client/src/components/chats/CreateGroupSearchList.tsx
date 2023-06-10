import { useFetchUsersQuery } from "../../store";
import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";
import CreateGroupSearchItem from "./CreateGroupSearchItem";
import ListSkeleton from "./ListSkeleton";

interface CreateGroupSearchListProps {
  searchQuery: string;
  participants: User[];
  handleAddParticipant: (newParticipant: User) => void;
}

const CreateGroupSearchList = ({
  searchQuery,
  participants,
  handleAddParticipant,
}: CreateGroupSearchListProps) => {
  const { data, isLoading, isFetching } = useFetchUsersQuery(searchQuery);

  const potentialChat = (user: User, index: number): Chat => {
    return { _id: index.toString(), chatName: "", participants: [user], isGroupChat: false };
  };

  const renderList = () =>
    !searchQuery
      ? ""
      : data?.users.map((user: User, index: number) => (
          <CreateGroupSearchItem
            key={index}
            user={user}
            chat={potentialChat(user, index)}
            isHighlighted={participants.some((participant) => participant._id === user._id)}
            handleAddParticipant={handleAddParticipant}
          />
        ));

  return (
    <div className="flex flex-col py-1 gap-y-1 h-72 bg-gray-100 overflow-y-auto border-b">
      {!isLoading && !isFetching ? renderList() : <ListSkeleton />}
    </div>
  );
};

export default CreateGroupSearchList;
