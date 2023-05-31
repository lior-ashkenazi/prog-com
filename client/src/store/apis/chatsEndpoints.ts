import { apiSlice } from "./apiSlice";
import {
  AccessChatRequest,
  AccessChatResponse,
  FetchChatsRequest as FetchChatsRequest,
  FetchChatsResponse as FetchChatsResponse,
  CreateGroupChatRequest,
  CreateGroupChatResponse,
  UpdateGroupChatRequest,
  UpdateGroupChatResponse,
} from "./types/chatsEndpointsTypes";

export const chatsEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    accessChat: builder.mutation<AccessChatResponse, AccessChatRequest>({
      query: (otherUserId) => ({
        url: "chats",
        method: "POST",
        body: { userId: otherUserId },
      }),
      invalidatesTags: (result) => {
        if (result?.type === "new") {
          return [{ type: "Chats" }];
        }
        return [];
      },
    }),
    fetchChats: builder.query<FetchChatsResponse, FetchChatsRequest>({
      query: () => "chats",
      providesTags: [{ type: "Chats" }],
    }),
    createGroupChat: builder.mutation<CreateGroupChatResponse, CreateGroupChatRequest>({
      query: (newChatDetails) => ({
        url: "chats/groups",
        method: "POST",
        body: newChatDetails,
      }),
      invalidatesTags: [{ type: "Chats" }],
    }),
    updateGroupChat: builder.mutation<UpdateGroupChatResponse, UpdateGroupChatRequest>({
      query: (chatDetails) => ({
        url: "chats/groups",
        method: "PUT",
        body: chatDetails,
      }),
      invalidatesTags: (_result, _error, chatDetails) => {
        if (chatDetails.chatName) {
          return [{ type: "Chats" }];
        }
        return [];
      },
    }),
  }),
});
