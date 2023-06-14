import { User } from "../../../types/userTypes";

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

export type AuthUserRequest = void;
export type AuthUserResponse = {
  user: User;
  token: string;
};

export type LogoutUserRequest = void;
export type LogoutUserResponse = { message: string };

export type FetchUsersRequest = string;
export type FetchUsersResponse = { users: User[] };
