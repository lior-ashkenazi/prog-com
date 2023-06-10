import { User } from "../../types/userTypes";

import CreateGroupParticipantsItem from "./CreateGroupParticipantsItem";

interface CreateGroupParticipantsProps {
  participants: User[];
  handleRemoveParticipant: (removedParticipant: User) => void;
}

const CreateGroupParticipants = ({
  participants,
  handleRemoveParticipant,
}: CreateGroupParticipantsProps) => {
  const renderList = () =>
    participants.map((participant) => (
      <CreateGroupParticipantsItem
        participant={participant}
        handleRemoveParticipant={handleRemoveParticipant}
      />
    ));

  return (
    <div className="flex flex-wrap gap-2 h-32 p-4 border-b overflow-y-auto">{renderList()}</div>
  );
};

export default CreateGroupParticipants;
