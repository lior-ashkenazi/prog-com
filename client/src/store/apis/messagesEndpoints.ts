import { apiSlice } from "./apiSlice";
import {
  SendMessageRequest,
  SendMessageResponse,
  FetchMessagesRequest,
  FetchMessagesResponse,
} from "./types/messagesEndpointsTypes";

export const messagesEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<SendMessageResponse, SendMessageRequest>({
      query: ({ chatId, ...messageDetails }) => ({
        url: `/messages/${chatId}`,
        method: "POST",
        body: messageDetails,
      }),
      invalidatesTags: [{ type: "Messages" }],
    }),
    fetchMessages: builder.query<FetchMessagesResponse, FetchMessagesRequest>({
      query: (chatId) => `messages/${chatId}`,
      providesTags: [{ type: "Messages" }],
    }),
  }),
});
