import { useState } from "react";

import { useFetchUsersQuery } from "../../store";
import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";
import ListSkeleton from "./ListSkeleton";
import ListItem from "./ListItem";

interface SearchListProps {
  input: string;
}

const SearchList = ({ input }: SearchListProps) => {
  const { data, isLoading } = useFetchUsersQuery(input);
  const [selectedItem, setSelectedItem] = useState<number>();

  const handleClickedColor = (index: number) => setSelectedItem(index);

  const potentialChat = (user: User, index: number): Chat => {
    return { _id: index.toString(), chatName: "", participants: [user], isGroupChat: false };
  };

  const renderList = () =>
    data?.users.map((user: User, index: number) => (
      <ListItem
        chat={potentialChat(user, index)}
        itemIndex={index}
        isClicked={selectedItem === index}
        handleClickedColor={handleClickedColor}
      />
    ));

  return <div className="p-3 flex flex-col">{isLoading ? <ListSkeleton /> : renderList()}</div>;
};

export default SearchList;
