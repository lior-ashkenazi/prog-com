import { User } from "../../types/userTypes";

interface ChatGroupModalParticipantItemProps {
  participant: User;
  handleRemoveParticipant: (removedParticipant: User) => void;
  isAdmin: boolean;
}

const ChatGroupModalParticipantItem = ({ participant, handleRemoveParticipant, isAdmin }) => {
  return (
    
  );
};

export default ChatGroupModalParticipantItem;
