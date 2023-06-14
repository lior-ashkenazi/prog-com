import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import authReducer from "./slices/authSlice";
import appReducer from "./slices/appSlice";

import { apiSlice } from "./apis/apiSlice";
import { usersEndpoints } from "./apis/usersEndpoints";
import { profileEndpoints } from "./apis/profileEndpoints";
import { messagesEndpoints } from "./apis/messagesEndpoints";
import { chatsEndpoints } from "./apis/chatsEndpoints";
import { authEndpoints } from "./apis/authEndpoints";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

type ServerError = {
  status: number;
  data: {
    message: string;
    stack?: string;
  };
};

export function isServerError(obj: object): obj is ServerError {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "status" in obj &&
    typeof obj.status === "number" &&
    "data" in obj &&
    typeof obj.data === "object" &&
    obj.data !== null &&
    "message" in obj.data &&
    typeof obj.data.message === "string"
  );
}

export default store;

export { setToken, removeToken } from "./slices/authSlice";
export { setUser, setChat } from "./slices/appSlice";

export const { useRegisterUserMutation, useLoginUserMutation, useFetchUsersQuery } = usersEndpoints;
export const { useAuthUserQuery, useGoogleAuthMutation, useGithubAuthMutation } = authEndpoints;
export const { useFetchProfileQuery, useUpdateProfileMutation } = profileEndpoints;
export const { useSendMessageMutation, useFetchMessagesQuery } = messagesEndpoints;
export const {
  useAccessChatMutation,
  useFetchChatsQuery,
  useCreateGroupChatMutation,
  useUpdateGroupChatMutation,
} = chatsEndpoints;
