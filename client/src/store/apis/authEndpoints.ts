import { apiSlice } from "./apiSlice";
import {
  AuthUserRequest,
  AuthUserResponse,
  GitHubAuthRequest,
  GitHubAuthResponse,
  GoogleAuthRequest,
  GoogleAuthResponse,
} from "./types/authEndpointsTypes";

export const authEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    authUser: builder.query<AuthUserResponse, AuthUserRequest>({
      query: () => "auth/user",
    }),
    googleAuth: builder.mutation<GoogleAuthResponse, GoogleAuthRequest>({
      query: (idTokenObject) => ({
        url: "/auth/google",
        method: "POST",
        body: idTokenObject,
      }),
    }),
    githubAuth: builder.mutation<GitHubAuthResponse, GitHubAuthRequest>({
      query: (accessCode) => ({
        url: "/auth/github",
        method: "POST",
        body: accessCode,
      }),
    }),
  }),
});
