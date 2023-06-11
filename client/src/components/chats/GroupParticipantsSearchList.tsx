import { useFetchUsersQuery } from "../../store";
import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";
import GroupParticipantsSearchItem from "./GroupParticipantsSearchItem";
import ListSkeleton from "./ListSkeleton";

interface GroupParticipantsSearchListProps {
  searchQuery: string;
  participants: User[];
  existingParticipants?: User[];
  handleAddParticipant: (newParticipant: User) => void;
  isLong?: boolean;
}

const GroupParticipantsSearchList = ({
  searchQuery,
  participants,
  existingParticipants,
  handleAddParticipant,
  isLong,
}: GroupParticipantsSearchListProps) => {
  const { data, isLoading, isFetching } = useFetchUsersQuery(searchQuery);

  const potentialChat = (user: User, index: number): Chat => {
    return { _id: index.toString(), chatName: "", participants: [user], isGroupChat: false };
  };

  const renderList = () =>
    !searchQuery
      ? ""
      : data?.users.map((user: User, index: number) => (
          <GroupParticipantsSearchItem
            key={index}
            user={user}
            chat={potentialChat(user, index)}
            isHighlighted={
              existingParticipants?.some((participant) => participant._id === user._id) ||
              participants.some((participant) => participant._id === user._id)
            }
            handleAddParticipant={handleAddParticipant}
          />
        ));

  return (
    <div
      className={`flex flex-col ${isLong ? "h-80" : "h-72"} bg-gray-100 overflow-y-auto border-b`}
    >
      {!isLoading && !isFetching ? renderList() : <ListSkeleton />}
    </div>
  );
};

export default GroupParticipantsSearchList;
