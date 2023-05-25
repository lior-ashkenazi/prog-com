export type Message = {
  _id: string;
  sender: string;
  content: string;
  chatId: string;
} & MessageModes;

export type MessageModes =
  | { mode: "text" | "math" }
  | { mode: "code"; language: MessageCodeLanguage };

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
  | "php"
  | "typescript";
