import { User } from "./userTypes";
import { Message } from "./messageTypes";

export type Chat = {
  _id: string;
  chatName: string;
  participants: User[];
  isGroupChat: boolean;
  groupAdmin?: User;
  lastMessageId?: Message;
  avatar?: string;
  updatedAt?: Date;
};
