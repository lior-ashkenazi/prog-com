import { Message, MessageModes } from "../../types/messageTypes";

export type SendMessageRequest = {
  chatId: string;
  content: string;
} & MessageModes;

export type SendMessageResponse = {
  message: Message;
};

export type FetchMessagesRequest = string;

export type FetchMessagesResponse = { messages: Message[] };
