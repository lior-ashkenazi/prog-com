import { useFetchUsersQuery } from "../../store";
import ChatsListSkeleton from "./ChatsListSkeleton";

interface ChatsSearchListProps {
  input: string;
}

const ChatsSearchList = ({ input }: ChatsSearchListProps) => {
  const { data, isLoading } = useFetchUsersQuery(input);

  return (
    <div className="p-3 flex flex-col overscroll-y-auto">
      {isLoading ? <ChatsListSkeleton /> : "hello"}
    </div>
  );
};

export default ChatsSearchList;
