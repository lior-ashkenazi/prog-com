import { Schema } from "mongoose";
import { sign } from "jsonwebtoken";

export interface ITokenPayload {
  user: { _id: Schema.Types.ObjectId };
}

export function generateToken(payload: ITokenPayload) {
  return sign(payload, process.env.JWT_SECRET!);
}
