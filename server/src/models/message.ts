import { Schema, Types, model, Model } from "mongoose";

import { IMessage } from "../interfaces/messageInterface";

const messageSchema: Schema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    mode: {
      type: String,
      required: true,
      enum: ["text", "math", "code"],
    },
    content: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: false,
      enum: [
        "cpp",
        "java",
        "python",
        "c",
        "csharp",
        "javascript",
        "ruby",
        "swift",
        "go",
        "scala",
        "kotlin",
        "rust",
        "php",
        "typescript",
      ],
    },
    chatId: {
      type: Types.ObjectId,
      ref: "Chat",
    },
  },
  { timestamps: true }
);

export const Message: Model<IMessage> = model<IMessage>("Message", messageSchema);
