import { useEffect, useState } from "react";
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

interface ChatBoxFooterProps {
  user: User;
  chat: Chat;
  handleSendMessage: (message: SendMessageType) => Promise<void>;
  sendMessageIsLoading: boolean;
  sendMessageIsError: boolean;
  handleUserTyping: (isUserTyping: boolean) => void;
}

const ChatBoxFooter = ({
  user,
  chat,
  handleSendMessage,
  sendMessageIsLoading,
  sendMessageIsError,
  handleUserTyping,
}: ChatBoxFooterProps) => {
  const [mode, setMode] = useState<MessageModes>("text");
  const [text, setText] = useState<string>("");
  const [math, setMath] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKeys>("cpp");
  const [messageSent, setMessageSent] = useState<boolean>(false);
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);

  useEffect(() => {
    setText("");
    setMath("");
    setCode("");
  }, [chat._id]);

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
    setMessageSent(true);
  };

  useEffect(() => {
    if (messageSent) {
      setText("");
      setMath("");
      setCode("");
      setMessageSent(false);
    }
  }, [messageSent]);

  const renderInput = () => {
    switch (mode) {
      case "text":
        return <TextArea text={text} setText={setText} handleUserTyping={handleUserTyping} />;
      case "math":
        return (
          <MathArea
            readOnly={false}
            math={math}
            setMath={setMath}
            handleUserTyping={handleUserTyping}
          />
        );
      case "code":
        return (
          <CodeArea
            readOnly={false}
            code={code}
            setCode={setCode}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            handleUserTyping={handleUserTyping}
          />
        );
    }
  };

  return (
    <form
      id="messageForm"
      className="pt-7 pb-5 px-8 flex flex-col relative justify-center"
      onSubmit={handleSubmit}
    >
      <TextEmojiPicker openEmoji={openEmoji} text={text} setText={setText} />
      {sendMessageIsError && (
        <div className="m-0.5 text-opacity-70 text-black text-right bg-red-600 absolute -top-1/2 -left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-sm">
          Error with fetching messages.
        </div>
      )}
      <div className="absolute top-0 left-0">
        <ModeButtons mode={mode} setMode={setMode} />
      </div>
      <div className="relative ml-10 w-[55rem]">
        <button
          type="button"
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
          className={`absolute -right-8 bottom-0 cursor-pointer`}
          onClick={() => setOpenEmoji(false)}
          disabled={
            (mode === "text" && text === "") ||
            (mode === "math" && math === "") ||
            (mode === "code" && code === "") ||
            sendMessageIsLoading ||
            sendMessageIsError
          }
        >
          <IoSend
            style={{
              color: sendMessageIsLoading || sendMessageIsError ? "#a5b4fc" : "#1e1b4b",
            }}
          />
        </button>
      </div>
    </form>
  );
};

export default ChatBoxFooter;
