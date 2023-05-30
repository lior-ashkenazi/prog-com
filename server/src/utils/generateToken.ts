import { Types } from "mongoose";
import { sign } from "jsonwebtoken";

export interface ITokenPayload {
  user: { _id: Types.ObjectId };
}

export function generateToken(payload: ITokenPayload) {
  return sign(payload, process.env.JWT_SECRET!);
}
