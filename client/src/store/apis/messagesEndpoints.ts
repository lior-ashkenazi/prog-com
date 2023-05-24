import { apiSlice } from "./apiSlice";

apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (messageDetails) => ({
        url: "/messages",
      }),
    }),
    fetchMessages: builder.query({ query: (chatId) => `messages/${chatId}` }),
  }),
});
