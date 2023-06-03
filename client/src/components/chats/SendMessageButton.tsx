import { useEffect, useState } from "react";

import { IoSend } from "react-icons/io5";

import { MessageModes } from "../../types/messageTypes";

interface SendMessageProps {
  mode: MessageModes;
  text: string;
  math: string;
  code: string;
  setOpenEmoji: React.Dispatch<React.SetStateAction<boolean>>;
}

const SendMessageButton = ({ mode, text, math, code, setOpenEmoji }: SendMessageProps) => {
  const [displayClass, setDisplayClass] = useState<"bottom-1" | "bottom-0">("bottom-1");

  useEffect(
    () => (mode === "text" ? setDisplayClass("bottom-1") : setDisplayClass("bottom-0")),
    [mode]
  );

  return (
    <>
      <button
        type="submit"
        className={`absolute -right-8 ${displayClass}`}
        onClick={() => setOpenEmoji(false)}
        disabled={
          (mode === "text" && text === "") ||
          (mode === "math" && math === "") ||
          (mode === "code" && code === "")
        }
      >
        <IoSend style={{ color: "#1e1b4b" }} />
      </button>
    </>
  );
};

export default SendMessageButton;
