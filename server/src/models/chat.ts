import { Document, Schema, Types, model, Model } from "mongoose";

export interface IChat extends Document {
  name: string;
  isGroupChat: boolean;
  users: string[];
  groupAdmin: Schema.Types.ObjectId;
}

const chatSchema: Schema = new Schema<IChat>(
  {
    name: {
      type: String,
      required: true,
      maxLength: 200,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    groupAdmin: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Chat: Model<IChat> = model<IChat>("Chat", chatSchema);
export default Chat;
