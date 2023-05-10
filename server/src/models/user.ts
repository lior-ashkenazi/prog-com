import { model, Schema } from "mongoose";
import HookNextFunction from "mongoose";
import bcrypt from "bcrypt";

import { IUser } from "../interfaces/userInterface";

const userSchema = new Schema<IUser>(
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

export const User = model<IUser>("User", userSchema);
