import { BsX } from "react-icons/bs";

import { User } from "../../../types/userTypes";

interface GroupParticipantsItemProps {
  participant: User;
  handleRemoveParticipant: (removedParticipant: User) => void;
}

const GroupParticipantsItem = ({
  participant,
  handleRemoveParticipant,
}: GroupParticipantsItemProps) => {
  return (
    <div className="p-2 bg-gray-300 flex gap-x-2 items-center justify-between rounded-md h-fit">
      <span>{participant.userName}</span>
      <button
        className="transition-colors hover:bg-gray-500 active:bg-gray-600 rounded-md"
        onClick={() => handleRemoveParticipant(participant)}
      >
        <BsX
          style={{
            color: "#9ca3af",
            height: "1.5rem",
            width: "1.5rem",
          }}
        />
      </button>
    </div>
  );
};

export default GroupParticipantsItem;
