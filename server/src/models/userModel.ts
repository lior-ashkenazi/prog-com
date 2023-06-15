import { Document, Schema, model, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  googleId: string;
  userName: string;
  email: string;
  password: string;
  avatar: string;
  matchPassword(password: string): Promise<boolean>;
}

const saltRounds = 10;

const userSchema: Schema = new Schema<IUser>(
  {
    googleId: {
      type: String,
      minLength: 1,
      required: false,
      unique: true,
      sparse: true,
    },
    userName: {
      type: String,
      minLength: 1,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      minLength: 1,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next: (err?: Error) => void) {
  if (this.isModified("password")) {
    const SALT = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, SALT);
  }
  next();
});

const User: Model<IUser> = model<IUser>("User", userSchema);
export default User;
