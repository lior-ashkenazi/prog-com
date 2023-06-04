import { User } from "./userTypes";
import { Chat } from "./chatTypes";

export type Message = {
  _id: string;
  chatId: Chat;
  sender: User;
  content: string;
  mode: MessageModes;
  language?: MessageCodeLanguage;
};

export type MessageModes = "text" | "math" | "code";

export type MessageCodeLanguage =
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
  | "typescript";

export type SendMessageType =
  | { mode: string; content: string; chatId: string; sender: string }
  | { mode: string; content: string; language: string; chatId: string; sender: string };
