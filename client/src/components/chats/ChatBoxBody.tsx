import { useEffect, useState, useRef, forwardRef, createRef, useImperativeHandle } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { User } from "../../types/userTypes";
import { Message } from "../../types/messageTypes";
import { Chat } from "../../types/chatTypes";

import MathArea from "./MathArea";
import CodeArea, { LanguageKeys } from "./CodeArea";
import { getMessageHour, getShortFormatDate } from "../../utils";

interface ChatBodyProps {
  user: User;
  chat: Chat;
  messages: Message[];
  messagesIsLoading: boolean;
  messagesIsFetching: boolean;
  messagesIsError: boolean;
}

const ChatBody = forwardRef(
  (
    { user, chat, messages, messagesIsLoading, messagesIsFetching, messagesIsError }: ChatBodyProps,
    ref
  ) => {
    const messageRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [scrollToIndex, setScrollToIndex] = useState<number>(-1);
    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      messageRefs.current = messageRefs.current.slice(0, messages.length);

      messages.forEach((_, i) => {
        if (!messageRefs.current[i]) {
          messageRefs.current[i] = createRef<HTMLDivElement>();
        }
      });
    }, [messages]);

    useEffect(() => {
      const chatBody = divRef.current;
      if (chatBody) {
        const observer = new MutationObserver(() => {
          chatBody.scrollTop = chatBody.scrollHeight;
        });

        observer.observe(chatBody, { childList: true });
        return () => observer.disconnect();
      }
    }, []);

    useImperativeHandle(ref, () => ({
      scrollToMessage: (index: number) => {
        setScrollToIndex(index);
      },
    }));

    useEffect(() => {
      if (scrollToIndex !== -1) {
        const target = messageRefs.current[scrollToIndex]?.current;

        if (target) {
          target.scrollIntoView({ behavior: "auto" });
        }
        setScrollToIndex(-1);
      }
    }, [scrollToIndex, messages]);

    const renderMessage = (message: Message) => {
      switch (message.mode) {
        case "text":
          return <span className="whitespace-normal break-words">{message.content}</span>;
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
        ref={divRef}
        className={`bg-[url('assets/random-shapes.svg')] bg-indigo-500 bg-[length:3.5rem_3.5rem] overflow-y-auto flex flex-col gap-y-1 p-4 ${
          messagesIsLoading && "items-end"
        }`}
      >
        {messagesIsLoading || messagesIsFetching ? (
          <div className="flex items-center justify-center">
            <Skeleton
              width={600}
              height={50}
              count={6}
              style={{
                opacity: 0.9,
                marginBottom: "0.5rem",
              }}
            />
          </div>
        ) : messagesIsError ? (
          <div className="w-full flex items-center justify-center m-0.5 text-xs text-opacity-70 text-black text-right bg-red-600">
            There was problem fetching messages.
          </div>
        ) : (
          messages &&
          messages.map((message, index) => {
            const messageDate = getShortFormatDate(message.createdAt);
            const renderDate = lastMessageDate !== messageDate;
            lastMessageDate = messageDate;

            return (
              <div key={message._id} ref={messageRefs.current[index]}>
                {renderDate && (
                  <div className="w-full flex items-center justify-center">
                    <span className="bg-gray-200 m-1 w-fit p-2 rounded-md">{messageDate}</span>
                  </div>
                )}
                <div
                  className={`flex ${
                    user._id === message.sender._id ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-md max-w-xl flex flex-col ${
                      user._id === message.sender._id ? "bg-emerald-200" : "bg-amber-200"
                    }`}
                  >
                    {chat.isGroupChat && message.sender._id !== user._id && (
                      <span className="pb-0.5 text-indigo-800 font-bold text-left truncate">
                        {message.sender.userName}
                      </span>
                    )}
                    {renderMessage(message)}
                    <span className="m-0.5 text-xs text-opacity-70 text-black text-right">
                      {getMessageHour(message.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef}></div>
      </div>
    );
  }
);

export default ChatBody;
