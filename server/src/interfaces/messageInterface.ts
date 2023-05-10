import mongoose from "mongoose";
import { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  sender: Schema.Types.ObjectId;
  mode: string;
  content: string;
  language?: string;
  chatId: Schema.Types.ObjectId;
}
