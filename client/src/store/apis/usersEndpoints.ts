import { apiSlice } from "./apiSlice";
import {
  RegisterUserRequest,
  RegisterUserResponse,
  LoginUserRequest,
  LoginUserResponse,
  LogoutUserRequest,
  LogoutUserResponse,
  FetchChatsRequest,
  FetchChatsResponse,
} from "./types/usersEndpointsTypes";

export const usersEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterUserResponse, RegisterUserRequest>({
      query: (userCredentials) => ({
        url: "users",
        method: "POST",
        body: userCredentials,
      }),
    }),
    loginUser: builder.mutation<LoginUserResponse, LoginUserRequest>({
      query: (userCredentials) => ({
        url: "users/login",
        method: "POST",
        body: userCredentials,
      }),
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
