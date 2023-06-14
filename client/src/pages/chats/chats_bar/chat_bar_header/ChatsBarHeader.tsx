import { useEffect, useState } from "react";

import SearchBar from "../../../../components/chats/search/SearchBar";
import CreateGroupButton from "./CreateGroupButton";
import CreateGroupModal from "../../../../components/chats/modals/create_group_modal/CreateGroupModal";

interface ChatsBarHeaderProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleChangeSearchQuery: React.ChangeEventHandler<HTMLInputElement>;
}

const ChatsBarHeader = ({
  searchQuery,
  setSearchQuery,
  handleChangeSearchQuery,
}: ChatsBarHeaderProps) => {
  const [buttonCollapse, setButtonCollapse] = useState<boolean>(true);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState<boolean>(false);

  useEffect(() => {
    searchQuery ? setButtonCollapse(true) : setButtonCollapse(false);
  }, [searchQuery]);

  return (
    <div className={`p-3 col-span-1 border-r border-b flex ${!buttonCollapse && "gap-x-2"}`}>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onChange={handleChangeSearchQuery}
        mode="chats"
      />
      <CreateGroupButton
        buttonCollapse={buttonCollapse}
        setShowCreateGroupButton={setShowCreateGroupModal}
      />
      <CreateGroupModal
        showCreateGroupModal={showCreateGroupModal}
        setShowCreateGroupModal={setShowCreateGroupModal}
      />
    </div>
  );
};

export default ChatsBarHeader;
