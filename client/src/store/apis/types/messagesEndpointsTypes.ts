import { Message } from "../../../types/messageTypes";

export type SendMessageRequest =
  | { mode: string; content: string; chatId: string; sender: string }
  | { mode: string; content: string; language: string; chatId: string; sender: string };
export type SendMessageResponse = {
  message: Message;
};

export type FetchMessagesRequest = string;

export type FetchMessagesResponse = { messages: Message[] };
