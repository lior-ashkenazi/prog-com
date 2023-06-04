import { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

import { User } from "../../types/userTypes";
import { MessageModes, SendMessageType } from "../../types/messageTypes";
import { Chat } from "../../types/chatTypes";

import TextArea from "./TextArea";
import MathArea from "./MathArea";
import CodeArea, { LanguageKeys } from "./CodeArea";
import TextEmojiPicker from "./TextEmojiPicker";
import ModeButtons from "./ModeButtons";

interface ChatFooterProps {
  user: User;
  chat: Chat;
  handleSendMessage: (message: SendMessageType) => Promise<void>;
  //   sendMessageLoading: boolean;
}

const ChatFooter = ({ user, chat, handleSendMessage }: ChatFooterProps) => {
  const [mode, setMode] = useState<MessageModes>("text");
  const [text, setText] = useState<string>("");
  const [math, setMath] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKeys>("cpp");
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const identifiers = { chatId: chat._id, sender: user._id };
    let message;
    switch (mode) {
      case "text":
        message = { ...identifiers, mode: "text", content: text };
        break;
      case "math":
        message = { ...identifiers, mode: "math", content: math };
        break;
      case "code":
        message = {
          ...identifiers,
          mode: "code",
          content: code,
          language: selectedLanguage,
        };
        break;
    }

    await handleSendMessage(message);
    setText("");
    setMath("");
    setCode("");
  };

  const renderInput = () => {
    switch (mode) {
      case "text":
        return <TextArea text={text} setText={setText} />;
      case "math":
        return <MathArea readOnly={false} math={math} setMath={setMath} />;
      case "code":
        return (
          <CodeArea
            readOnly={false}
            code={code}
            setCode={setCode}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
        );
    }
  };

  return (
    <form id="messageForm" className="py-6 px-8 flex flex-col relative" onSubmit={handleSubmit}>
      <TextEmojiPicker openEmoji={openEmoji} text={text} setText={setText} />
      <div className="absolute top-0 left-0">
        <ModeButtons mode={mode} setMode={setMode} />
      </div>
      <div className="relative my-4 mx-6">
        <button
          className={`absolute -left-7 top-1 ${mode !== "text" && "opacity-0"}`}
          onClick={() => setOpenEmoji(!openEmoji)}
          disabled={mode !== "text"}
        >
          <BsEmojiSmile
            style={{
              color: openEmoji ? "#a5b4fc" : "#1e1b4b",
              transition: "color",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transitionDuration: "150ms",
            }}
          />
        </button>
        {renderInput()}
        <button
          type="submit"
          className={`absolute -right-8 bottom-0`}
          onClick={() => setOpenEmoji(false)}
          disabled={
            (mode === "text" && text === "") ||
            (mode === "math" && math === "") ||
            (mode === "code" && code === "")
          }
        >
          <IoSend style={{ color: "#1e1b4b" }} />
        </button>
      </div>
    </form>
  );
};

export default ChatFooter;
