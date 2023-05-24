import { apiSlice } from "./apiSlice";
import {
  RegisterUserRequest,
  RegisterUserResponse,
  LoginUserRequest,
  LoginUserResponse,
  FetchChatsRequest,
  FetchChatsResponse,
} from "./types/usersEndpointsTypes";

apiSlice.injectEndpoints({
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
    fetchUsers: builder.query<FetchChatsResponse, FetchChatsRequest>({
      query: (userName) => `users?search=${userName}`,
    }),
  }),
});
