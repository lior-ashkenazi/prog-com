import { Document, Schema, Types, model, Model } from "mongoose";

export interface IMessage extends Document {
  sender: Schema.Types.ObjectId;
  mode: string;
  content: string;
  language?: string;
  chatId: Schema.Types.ObjectId;
}

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

const Message: Model<IMessage> = model<IMessage>("Message", messageSchema);
export default Message;
