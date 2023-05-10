import { Schema, model, Model } from "mongoose";
import bcrypt from "bcrypt";

import { IUser } from "../interfaces/userInterface";

const userSchema: Schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
      // TODO generate avatars!!!
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next: (err?: Error) => void) {
  if (!this.isModified) next();

  const SALT = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, SALT);
});

export const User: Model<IUser> = model<IUser>("User", userSchema);
