export type Chat = {
  _id: string;
  chatName: string;
  users: string[];
} & ({ isGroupChat: false } | { isGroupChat: true; groupAdmin: string });
