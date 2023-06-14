import { User } from "../../../types/userTypes";

export type AuthUserRequest = void;
export type AuthUserResponse = {
  user: User;
  token: string;
};

export type GoogleAuthRequest = { idToken: string };
export type GoogleAuthResponse = {
  user: User;
  token: string;
};

export type GitHubAuthRequest = string | undefined;
export type GitHubAuthResponse = {
  user: User;
  token: string;
};
