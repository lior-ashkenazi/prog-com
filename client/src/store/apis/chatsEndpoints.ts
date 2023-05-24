import { apiSlice } from "./apiSlice";

apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    accessUserChat: builder.mutation({
      query: (userId) => ({
        url: "chats",
        method: "POST",
        body: userId, // otherUserId!
      }),
      invalidatesTags: (result, error, userId) => {
        if (result?.type === "new") {
          return [{ type: "Chats" }];
        }
        return [];
      },
    }),
    fetchUserChats: builder.query({
      query: () => "chats",
      providesTags: [{ type: "Chats" }],
    }),
    createGroupChat: builder.mutation({
      query: (newChatDetails) => ({
        url: "chats/groups",
        method: "POST",
        body: newChatDetails,
      }),
      invalidatesTags: [{ type: "Chats" }],
    }),
    updateGroupChat: builder.mutation({
      query: (chatDetails) => ({
        url: "chats/groups",
        method: "PUT",
        body: chatDetails,
      }),
      invalidatesTags: (result, error, chatDetails) => {
        if (chatDetails.chatName) {
          return [{ type: "Chats" }];
        }
        return [];
      },
    }),
    deleteGroupChat: builder.mutation({
      query: (chatId) => ({
        url: `chats/groups/:${chatId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Chats" }],
    }),
  }),
});
