type Message = {
  _id: string;
  sender: string;
  content: string;
  chatId: string;
} & MessageModes;

type MessageModes = { mode: "text" | "math" } | { mode: "code"; language: MessageCodeLanguage };

type MessageCodeLanguage =
  | "cpp"
  | "java"
  | "python"
  | "c"
  | "csharp"
  | "javascript"
  | "ruby"
  | "swift"
  | "go"
  | "scala"
  | "kotlin"
  | "rust"
  | "php"
  | "typescript";

export type SendMessageRequest = {
  chatId: string;
  content: string;
} & MessageModes;

export type SendMessageResponse = {
  message: Message;
};

export type FetchMessagesRequest = string;

export type FetchMessagesResponse = { messages: Message[] };
