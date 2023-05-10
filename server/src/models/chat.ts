import { Schema, Types, model, Model } from "mongoose";

import { IChat } from "../interfaces/chatInterface";

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

export const Chat: Model<IChat> = model<IChat>("Chat", chatSchema);
