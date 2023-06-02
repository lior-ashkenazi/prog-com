export type Message = {
  _id: string;
  chatId: string;
  sender: string;
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
