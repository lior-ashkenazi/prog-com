import { BsChatDots, BsCodeSlash } from "react-icons/bs";
import { TbMathFunction } from "react-icons/tb";

import { MessageModes } from "../../types/messageTypes";

interface ModeButtonsProps {
  mode: MessageModes;
  setMode: React.Dispatch<React.SetStateAction<MessageModes>>;
}

const ModeButtons = ({ mode, setMode }: ModeButtonsProps) => {
  return (
    <>
      <button
        type="button"
        className={`p-1 ${mode === "text" && "bg-gray-300"} rounded transition-colors`}
        onClick={() => setMode("text")}
      >
        <BsChatDots style={{ color: "#1e1b4b" }} />
      </button>
      <button
        type="button"
        className={`p-1 ${mode === "math" && "bg-gray-300"} rounded transition-colors`}
        onClick={() => setMode("math")}
      >
        <TbMathFunction style={{ color: "#1e1b4b" }} />
      </button>
      <button
        type="button"
        className={`p-1 ${mode === "code" && "bg-gray-300"} rounded transition-colors`}
        onClick={() => setMode("code")}
      >
        <BsCodeSlash style={{ color: "#1e1b4b" }} />
      </button>
    </>
  );
};

export default ModeButtons;
