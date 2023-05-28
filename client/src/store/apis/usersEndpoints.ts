import { apiSlice } from "./apiSlice";
import {
  RegisterUserRequest,
  RegisterUserResponse,
  LoginUserRequest,
  LoginUserResponse,
  AuthUserRequest,
  AuthUserResponse,
  LogoutUserRequest,
  LogoutUserResponse,
  FetchChatsRequest,
  FetchChatsResponse,
} from "./types/usersEndpointsTypes";
import { chatsEndpoints } from "./chatsEndpoints";

export const usersEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterUserResponse, RegisterUserRequest>({
      query: (userCredentials) => ({
        url: "users",
        method: "POST",
        body: userCredentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(chatsEndpoints.endpoints.fetchUserChats.initiate());
      },
    }),
    loginUser: builder.mutation<LoginUserResponse, LoginUserRequest>({
      query: (userCredentials) => ({
        url: "users/login",
        method: "POST",
        body: userCredentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(chatsEndpoints.endpoints.fetchUserChats.initiate());
      },
    }),
    authUser: builder.query<AuthUserResponse, AuthUserRequest>({
      query: () => "users",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(chatsEndpoints.endpoints.fetchUserChats.initiate());
      },
    }),
    logoutUser: builder.mutation<LogoutUserResponse, LogoutUserRequest>({
      query: () => ({
        url: "users/logout",
        method: "POST",
      }),
    }),
    fetchUsers: builder.query<FetchChatsResponse, FetchChatsRequest>({
      query: (userName) => `users?search=${userName}`,
    }),
  }),
});
