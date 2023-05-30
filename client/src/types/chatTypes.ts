import { User } from "./userTypes";

export type Chat = {
  _id: string;
  chatName: string;
  users: User[];
  updatedAt?: Date;
} & ({ isGroupChat: false } | { isGroupChat: true; groupAdmin: string });
