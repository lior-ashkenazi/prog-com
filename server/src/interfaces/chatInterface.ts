import { Document, Schema } from "mongoose";

export interface IChat extends Document {
  name: string;
  isGroupChat: boolean;
  users: string[];
  groupAdmin: Schema.Types.ObjectId;
}
