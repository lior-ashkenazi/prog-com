import { Chat } from "../../types/chatTypes";

export type AccessUserChatRequest = string;

export type AccessUserChatResponse = {
  chat: Chat;
  type: "new" | "exists";
};

export type FetchUserChatsRequest = void;

export type FetchUserChatsResponse = {
  chats: Chat[];
};

export type CreateGroupChatRequest = { chatName: string; users: string[] };

export type CreateGroupChatResponse = {
  chat: Chat;
};

export type UpdateGroupChatRequest = {
  chatId: string;
} & ({ chatName?: string; users: string[] } | { chatName: string; users?: string[] });

export type UpdateGroupChatResponse = {
  chat: Chat;
};
