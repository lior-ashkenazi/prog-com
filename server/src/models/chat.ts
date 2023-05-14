import { Document, Schema, Types, model, Model } from "mongoose";

export interface IChat extends Document {
  chatName: string;
  isGroupChat: boolean;
  users: string[];
  groupAdmin?: Schema.Types.ObjectId;
  // TODO - maybe notification of last message
}

const chatSchema: Schema = new Schema<IChat>(
  {
    chatName: {
      type: String,
      required: true,
      maxLength: 200,
    },
    users: [
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
      ref: "User",
    },
  },
  { timestamps: true }
);

const Chat: Model<IChat> = model<IChat>("Chat", chatSchema);
export default Chat;
