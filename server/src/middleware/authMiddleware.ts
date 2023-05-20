import { Schema } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { ITokenPayload } from "../utils/generateToken";

export interface IAuthenticatedRequest extends Request {
  user: { _id: Schema.Types.ObjectId };
}

export default function (req: Request, res: Response, next: NextFunction): Response | void {
  // Get token from header
  const token = req.header("Authorization")!.replace("Bearer ", "");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    verify(token, process.env.JWT_SECRET!, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Token is not valid" });
      } else {
        (req as IAuthenticatedRequest).user = (decoded as ITokenPayload).user;
        next();
      }
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}
