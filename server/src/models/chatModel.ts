import { Document, Schema, Types, model, Model } from "mongoose";

export interface IChat extends Document {
  chatName: string;
  participants: Schema.Types.ObjectId[];
  isGroupChat: boolean;
  groupAdmin?: Schema.Types.ObjectId;
  lastMessageId?: Schema.Types.ObjectId;
  avatar: string;
}

const chatSchema: Schema = new Schema<IChat>(
  {
    chatName: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 200,
    },
    participants: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    isGroupChat: {
      type: Boolean,
      default: false,
    },

    groupAdmin: {
      type: Types.ObjectId,
      required: false,
      ref: "User",
    },
    lastMessageId: {
      type: Types.ObjectId,
      required: false,
      ref: "Message",
    },
    avatar: {
      type: String,
      minLength: 1,
      required: false,
    },
  },
  { timestamps: true }
);

const Chat: Model<IChat> = model<IChat>("Chat", chatSchema);
export default Chat;
