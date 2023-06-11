import { getChatAvatar, getChatName } from "../../utils";

import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";

interface CreateGroupSearchItemProps {
  user: User;
  chat: Chat;
  isHighlighted: boolean;
  handleAddParticipant: (newParticipant: User) => void;
}

const CreateGroupSearchItem = ({
  user,
  chat,
  isHighlighted,
  handleAddParticipant,
}: CreateGroupSearchItemProps) => {
  return (
    <button
      className={`inline-block px-6 h-16 flex items-center justify-between hover:bg-gray-200 active:bg-gray-300 transition-colors rounded-t-sm border-b last:border-b-0 ${
        isHighlighted && "bg-gray-300 hover:bg-gray-300"
      }`}
      disabled={isHighlighted}
      onClick={() => handleAddParticipant(user)}
    >
      <div className="flex items-center justify-center gap-x-6">
        <img src={getChatAvatar(user, chat)} alt="Chat Avatar" className="w-11 h-11 rounded-full" />
        <span className="font-semibold text-lg text-left">{getChatName(user, chat)}</span>
      </div>
    </button>
  );
};

export default CreateGroupSearchItem;
