import { User } from "./userTypes";
import { Chat } from "./chatTypes";

export type Message = {
  _id: string;
  chatId: Chat;
  sender: User;
  content: string;
  mode: MessageModes;
  language?: MessageCodeLanguage;
  createdAt: Date;
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

export const languagesLowercaseToUppercaseMap = {
  cpp: "C++",
  java: "Java",
  python: "Python",
  c: "C",
  csharp: "C#",
  javascript: "JavaScript",
  ruby: "Ruby",
  swift: "Swift",
  go: "Go",
  scala: "Scala",
  kotlin: "Kotlin",
  rust: "Rust",
  typescript: "TypeScript",
};

export type SendMessageType =
  | { mode: string; content: string; chatId: string; sender: string }
  | { mode: string; content: string; language: string; chatId: string; sender: string };
