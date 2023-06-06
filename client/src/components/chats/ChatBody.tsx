import { useEffect, useRef } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { User } from "../../types/userTypes";
import { Message } from "../../types/messageTypes";

import MathArea from "./MathArea";
import CodeArea, { LanguageKeys } from "./CodeArea";
import { getMessageHour, getShortFormatDate } from "../../utils";

interface ChatBodyProps {
  user: User;
  messages: Message[];
  messagesIsLoading: boolean;
}

const ChatBody = ({ user, messages, messagesIsLoading }: ChatBodyProps) => {
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
            selectedLanguage={message.language as LanguageKeys}
          />
        );
    }
  };

  let lastMessageDate = "";

  return (
    <div
      className={`bg-[url('assets/random-shapes.svg')] bg-indigo-500 bg-[length:3.5rem_3.5rem] overflow-y-auto flex flex-col gap-y-1 p-4 border-r-8 border-r-gray-100 ${
        messagesIsLoading && "items-end"
      }`}
    >
      {messagesIsLoading ? (
        <Skeleton
          width={500}
          height={50}
          count={6}
          style={{
            opacity: 0.9,
            marginBottom: "0.5rem",
          }}
        />
      ) : (
        messages &&
        messages.map((message) => {
          const messageDate = getShortFormatDate(message.createdAt);
          const renderDate = lastMessageDate !== messageDate;
          lastMessageDate = messageDate;

          return (
            <div key={message._id}>
              {renderDate && (
                <div className="w-full flex items-center justify-center">
                  <span className="bg-gray-200 m-1 w-fit p-2 rounded-md">{messageDate}</span>
                </div>
              )}
              <div className="flex justify-end">
                <div
                  className={`p-3 rounded-md max-w-xl ${
                    user._id === message.sender._id
                      ? "bg-emerald-200 self-end"
                      : "bg-amber-200 self-start"
                  }`}
                >
                  {renderMessage(message)}
                  <div className="m-0.5 text-xs text-opacity-70 text-black text-right">
                    {getMessageHour(message.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatBody;
