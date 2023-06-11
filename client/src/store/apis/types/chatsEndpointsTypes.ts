import { Chat } from "../../../types/chatTypes";

export type AccessChatRequest = string;
export type AccessChatResponse = {
  chat: Chat;
  type: "new" | "exists";
};

export type FetchChatsRequest = void;
export type FetchChatsResponse = {
  chats: Chat[];
};

export type CreateGroupChatRequest = { chatName: string; participants: string[] };
export type CreateGroupChatResponse = {
  chat: Chat;
};

export type UpdateGroupChatRequest = {
  chatId: string;
  chatName?: string;
  participants?: string[];
  avatar?: string;
};
export type UpdateGroupChatResponse = {
  chat: Chat;
};
