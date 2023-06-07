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
  FetchUsersRequest,
  FetchUsersResponse,
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
    authUser: builder.query<AuthUserResponse, AuthUserRequest>({
      query: () => "users/auth",
    }),
    logoutUser: builder.mutation<LogoutUserResponse, LogoutUserRequest>({
      query: () => ({
        url: "users/logout",
        method: "POST",
      }),
    }),
    fetchUsers: builder.query<FetchUsersResponse, FetchUsersRequest>({
      query: (userName) => `users?search=${userName}`,
    }),
  }),
});
