import { useState, useEffect, useRef, useContext } from "react";

import { GiExitDoor } from "react-icons/gi";
import { BsX, BsCheck2 } from "react-icons/bs";

import { useAccessChatMutation } from "../../store";

import { LoadingContext } from "../../context/LoadingContext";

import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";

interface ChatGroupModalParticipantsItemProps {
  user: User;
  chat: Chat;
  participant: User;
  handleRemoveParticipant: (removedParticipant: User) => void;
  isAdmin: boolean | undefined;
  setShowChatGroupModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatGroupModalParticipantsItem = ({
  user,
  chat,
  participant,
  handleRemoveParticipant,
  isAdmin,
  setShowChatGroupModal,
}: ChatGroupModalParticipantsItemProps) => {
  const [accessChat] = useAccessChatMutation();
  const { setChatBoxIsLoading } = useContext(LoadingContext);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false);

  const [removeButtonClicked, setRemoveButtonClicked] = useState<boolean>(false);
  const removeButtonRef = useRef<HTMLButtonElement>(null);
  const [isRemoveButtonHovered, setIsRemoveButtonHovered] = useState<boolean>(false);

  const cancelRemoveButtonRef = useRef<HTMLButtonElement>(null);
  const [isCancelRemoveButtonHovered, setIsCancelRemoveButtonHovered] = useState<boolean>(false);

  const validateRemoveButtonRef = useRef<HTMLButtonElement>(null);
  const [isValidateRemoveButtonHovered, setIsValidateRemoveButtonHovered] =
    useState<boolean>(false);

  useEffect(() => {
    if (!removeButtonClicked) {
      setIsRemoveButtonHovered(false);
      setIsCancelRemoveButtonHovered(false);
      setIsValidateRemoveButtonHovered(false);
    }
  }, [removeButtonClicked]);

  const handleClick = async () => {
    if (participant._id === user._id) return;
    setChatBoxIsLoading(true);

    await accessChat(participant._id).unwrap();

    setShowChatGroupModal(false);
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={() => setIsButtonHovered(true)}
      onMouseLeave={() => setIsButtonHovered(false)}
      className="w-full inline-block px-6 py-2 h-14 flex items-center justify-between hover:bg-gray-200 active:bg-gray-300 transition-colors rounded-t-sm border-b last:border-b-0"
      onClick={() => handleClick()}
      disabled={
        participant._id === user._id ||
        isRemoveButtonHovered ||
        isCancelRemoveButtonHovered ||
        isValidateRemoveButtonHovered
      }
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-center gap-x-4">
          <img src={participant.avatar} alt="Chat Avatar" className="w-11 h-11 rounded-full" />
          <span
            className={`font-medium text-lg text-left ${isAdmin && "text-emerald-600 font-bold"}`}
          >
            {participant.userName}
          </span>
        </div>
        {chat.groupAdmin &&
          chat.groupAdmin._id === user._id &&
          !isAdmin &&
          (!removeButtonClicked ? (
            <button
              ref={removeButtonRef}
              onMouseEnter={() => setIsRemoveButtonHovered(true)}
              onMouseLeave={() => setIsRemoveButtonHovered(false)}
              className="rounded-sm hover:bg-gray-300 transition-colors"
              onClick={() => setRemoveButtonClicked(true)}
              disabled={!isButtonHovered}
            >
              <GiExitDoor
                style={{
                  color: isButtonHovered ? "#dc2626" : "#f3f4f6",
                  height: "1.2rem",
                  width: "1.2rem",
                  transitionProperty:
                    "color, background-color, border-color, text-decoration-color, fill, stroke",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  transitionDuration: "150ms",
                }}
              />
            </button>
          ) : (
            <div className="relative">
              <span className="text-xs text-red-600">Are you sure?</span>
              <span className="flex items-center justify-center">
                <button
                  ref={cancelRemoveButtonRef}
                  onMouseEnter={() => setIsCancelRemoveButtonHovered(true)}
                  onMouseLeave={() => setIsCancelRemoveButtonHovered(false)}
                  className="rounded-sm hover:bg-gray-300 transition-colors"
                  onClick={() => setRemoveButtonClicked(false)}
                >
                  <BsX style={{ color: "#9ca3af", height: "1.2rem", width: "1.2rem" }} />
                </button>
                <button
                  ref={validateRemoveButtonRef}
                  onMouseEnter={() => setIsValidateRemoveButtonHovered(true)}
                  onMouseLeave={() => setIsValidateRemoveButtonHovered(false)}
                  className="rounded-sm hover:bg-gray-300 transition-colors"
                  onClick={() => handleRemoveParticipant(participant)}
                >
                  <BsCheck2 style={{ color: "#9ca3af", height: "1.2rem", width: "1.2rem" }} />
                </button>
              </span>
            </div>
          ))}
      </div>
    </button>
  );
};

export default ChatGroupModalParticipantsItem;
