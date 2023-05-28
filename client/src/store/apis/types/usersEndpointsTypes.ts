import { User } from "../../types/userTypes";

export type RegisterUserRequest = {
  userName: string;
  email: string;
  password: string;
};

export type RegisterUserResponse = {
  user: User;
  token: string;
};

export type LoginUserRequest = { usernameOrEmail: string; password: string };

export type LoginUserResponse = {
  user: User;
  token: string;
};

export type LogoutUserResponse = void;

export type LogoutUserRequest = void;

export type FetchChatsRequest = string;

export type FetchChatsResponse = { users: User[] };
