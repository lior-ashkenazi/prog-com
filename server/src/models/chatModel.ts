import { Document, Schema, Types, model, Model } from "mongoose";

export interface IChat extends Document {
  chatName: string;
  users: Schema.Types.ObjectId[];
  isGroupChat: boolean;
  groupAdmin?: Schema.Types.ObjectId | null;
  // TODO - maybe notification of last message
}

const chatSchema: Schema = new Schema<IChat>(
  {
    chatName: {
      type: String,
      required: true,
      minLength: 1,
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
      validate: [
        {
          validator: function (this: IChat, value: Types.ObjectId) {
            if (!this.isGroupChat) {
              return null;
            }
            return value ? true : false;
          },
          message: "groupAdmin is required for group chats",
        },
      ],
    },
  },
  { timestamps: true }
);

const Chat: Model<IChat> = model<IChat>("Chat", chatSchema);
export default Chat;
