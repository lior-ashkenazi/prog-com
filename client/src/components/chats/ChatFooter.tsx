import { useState } from "react";
import { BsEmojiSmile, BsChatDots, BsCodeSlash } from "react-icons/bs";
import { TbMathFunction } from "react-icons/tb";
import { IoSend } from "react-icons/io5";
import { addStyles, EditableMathField } from "react-mathquill";
import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { cpp, java, c, csharp, scala, kotlin } from "@codemirror/legacy-modes/mode/clike";
import { python } from "@codemirror/legacy-modes/mode/python";
import { javascript, typescript } from "@codemirror/legacy-modes/mode/javascript";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { swift } from "@codemirror/legacy-modes/mode/swift";
import { go } from "@codemirror/legacy-modes/mode/go";
import { rust } from "@codemirror/legacy-modes/mode/rust";
import EmojiPicker from "emoji-picker-react";

import { User } from "../../types/userTypes";
import { MessageModes } from "../../types/messageTypes";
import { Chat } from "../../types/chatTypes";

addStyles();

export type SendMessageType =
  | { mode: string; content: string; chatId: string; sender: string }
  | { mode: string; content: string; language: string; chatId: string; sender: string };

interface ChatFooterProps {
  user: User;
  chat: Chat;
  handleSendMessage: (message: SendMessageType) => Promise<void>;
  //   sendMessageLoading: boolean;
}

const languagesMap = {
  "C++": cpp,
  Java: java,
  Python: python,
  C: c,
  "C#": csharp,
  JavaScript: javascript,
  Ruby: ruby,
  Swift: swift,
  Go: go,
  Scala: scala,
  Kotlin: kotlin,
  Rust: rust,
  TypeScript: typescript,
};

const ChatFooter = ({ user, chat, handleSendMessage }: ChatFooterProps) => {
  const [mode, setMode] = useState<MessageModes>("text");
  const [text, setText] = useState<string>("");
  const [math, setMath] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("C++");
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);

  console.log(mode);

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
        message = { ...identifiers, mode: "code", content: math, language: selectedLanguage };
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
        return (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message."
            className="h-24 py-2 px-3 w-full rounded-md border-0 outline-none resize-none"
          />
        );
      case "math":
        return (
          <EditableMathField
            latex={math}
            onChange={(mathField) => setMath(mathField.latex())}
            config={{ autoCommands: "pi theta sqrt sum", autoOperatorNames: "sin cos lim" }}
            className="h-16 py-5 px-3 w-full rounded-md border-0 outline-none text-justify"
          />
        );
      case "code":
        return (
          <div className="flex relative">
            <CodeMirror
              value={code}
              height="150px"
              theme="dark"
              readOnly={false}
              extensions={[
                StreamLanguage.define(languagesMap[selectedLanguage as keyof typeof languagesMap]),
              ]}
              onChange={(value) => {
                setCode(value);
              }}
              className="w-full rounded-md border-0 outline-none"
            />
            <div className="h-40 absolute right-0 -top-6">
              <select
                className="overflow-auto rounded-sm"
                onChange={(e) => setSelectedLanguage(e.target.value)}
                value={selectedLanguage}
              >
                {Object.keys(languagesMap).map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
    }
  };

  return (
    <form id="messageForm" className="py-4 px-8 flex flex-col relative" onSubmit={handleSubmit}>
      <div
        className={`absolute -top-72 left-0 transition-transform origin-bottom-left scale-y-${
          openEmoji ? "1" : "0"
        }`}
      >
        <EmojiPicker
          width="20rem"
          height="18rem"
          previewConfig={{ showPreview: false }}
          onEmojiClick={(emojiData) => setText(text + emojiData.emoji)}
        />
      </div>

      <div className="flex-grow relative my-1 mx-6">
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
          onClick={() => {
            setOpenEmoji(false);
            setMode("math");
          }}
        >
          <TbMathFunction style={{ color: "#1e1b4b" }} />
        </button>
        <button
          type="button"
          className={`p-1 ${mode === "code" && "bg-gray-300"} rounded transition-colors`}
          onClick={() => {
            setOpenEmoji(false);
            setMode("code");
          }}
        >
          <BsCodeSlash style={{ color: "#1e1b4b" }} />
        </button>
        <button
          className={`absolute -left-6 top-6 ${mode !== "text" && "opacity-0"}`}
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
          className={`absolute -right-8 bottom-${mode === "text" ? "1" : "0"}`}
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
