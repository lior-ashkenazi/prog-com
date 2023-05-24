import { apiSlice } from "./apiSlice";

apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    accessUserChat: builder.mutation({
      query: (userId) => ({
        url: "chats",
        method: "POST",
        body: userId, // otherUserId!
      }),
    }),
    fetchUserChats: builder.query({
      query: () => "chats",
    }),
    createGroupChat: builder.mutation({
      query: (newChatDetails) => ({
        url: "chats/groups",
        method: "POST",
        body: newChatDetails,
      }),
    }),
    updateGroupChat: builder.mutation({
      query: (chatDetails) => ({
        url: "chats/groups",
        method: "PUT",
        body: chatDetails,
      }),
    }),
    deleteGroupChat: builder.mutation({
      query: (chatId) => ({
        url: `chats/groups/:${chatId}`,
      }),
    }),
  }),
});
