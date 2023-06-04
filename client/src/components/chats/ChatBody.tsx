import { useEffect, useRef } from "react";

import { User } from "../../types/userTypes";
import { Message } from "../../types/messageTypes";
import { Chat } from "../../types/chatTypes";

import MathArea from "./MathArea";
import CodeArea from "./CodeArea";

interface ChatBodyProps {
  user: User;
  messages: Message[];
  chat: Chat;
}

const ChatBody = ({ user, messages, chat }: ChatBodyProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderMessage = (message: Message) => {
    switch (message.mode) {
      case "text":
        return <span>{message.content}</span>;
      case "math":
        return <MathArea readOnly={true} math={message.content} />;
      case "code":
        return (
          <CodeArea
            readOnly={true}
            code={message.content}
            selectedLanguage={message.language as string}
          />
        );
    }
  };

  return (
    <div className="bg-[url('assets/random-shapes.svg')] bg-indigo-500 bg-[length:3.5rem_3.5rem] overflow-y-auto flex flex-col gap-y-2">
      {messages &&
        messages.map((message) => (
          <div key={message._id}>
            <div
              className={`p-2 rounded-md ${
                user._id === message.sender._id
                  ? "bg-emerald-200 self-end"
                  : "bg-amber-200 self-start"
              }`}
            >
              {renderMessage(message)}
            </div>
          </div>
        ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatBody;
