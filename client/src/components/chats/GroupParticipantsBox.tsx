import { User } from "../../types/userTypes";

import CreateGroupParticipantsItem from "./CreateGroupParticipantsItem";

interface GroupParticipantsBoxProps {
  participants: User[];
  handleRemoveParticipant: (removedParticipant: User) => void;
  isLong?: boolean;
}

const GroupParticipantsBox = ({
  participants,
  handleRemoveParticipant,
  isLong,
}: GroupParticipantsBoxProps) => {
  const renderList = () =>
    participants.map((participant) => (
      <CreateGroupParticipantsItem
        participant={participant}
        handleRemoveParticipant={handleRemoveParticipant}
      />
    ));

  return (
    <div
      className={`bg-gray-100 flex flex-wrap gap-2 ${
        isLong ? "h-40" : "h-32"
      } p-4 border-b overflow-y-auto`}
    >
      {renderList()}
    </div>
  );
};

export default GroupParticipantsBox;
