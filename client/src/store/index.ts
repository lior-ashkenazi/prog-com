import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import appReducer from "./slices/appSlice";

import { apiSlice } from "./apis/apiSlice";
import { usersEndpoints } from "./apis/usersEndpoints";
import { messagesEndpoints } from "./apis/messagesEndpoints";
import { chatsEndpoints } from "./apis/chatsEndpoints";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export { setUser, setSelectedChat, setChats } from "./slices/appSlice";

export const { useRegisterUserMutation, useLoginUserMutation, useFetchUsersQuery } = usersEndpoints;
export const { useSendMessageMutation, useFetchMessagesQuery } = messagesEndpoints;
export const {
  useAccessUserChatMutation,
  useFetchUserChatsQuery,
  useCreateGroupChatMutation,
  useUpdateGroupChatMutation,
} = chatsEndpoints;
