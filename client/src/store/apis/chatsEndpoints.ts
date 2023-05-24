import { apiSlice } from "./apiSlice";
import {
  AccessUserChatRequest,
  AccessUserChatResponse,
  FetchUserChatsRequest,
  FetchUserChatsResponse,
  CreateGroupChatRequest,
  CreateGroupChatResponse,
  UpdateGroupChatRequest,
  UpdateGroupChatResponse,
} from "./types/chatsEndpointsTypes";

apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    accessUserChat: builder.mutation<AccessUserChatResponse, AccessUserChatRequest>({
      query: (userId) => ({
        url: "chats",
        method: "POST",
        body: { userId }, // otherUserId!
      }),
      invalidatesTags: (result) => {
        if (result?.type === "new") {
          return [{ type: "Chats" }];
        }
        return [];
      },
    }),
    fetchUserChats: builder.query<FetchUserChatsResponse, FetchUserChatsRequest>({
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
