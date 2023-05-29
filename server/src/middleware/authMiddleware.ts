import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { Schema } from "mongoose";
import { verify } from "jsonwebtoken";

import { ITokenPayload } from "../utils/generateToken";

export interface IAuthenticatedRequest extends Request {
  user: { _id: Schema.Types.ObjectId };
}

const auth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.header("Authorization")) {
      res.status(202);
      throw new Error("No authorization header");
    }

    // Get token from header
    const token = req.header("Authorization")!.replace("Bearer ", "");

    // Check if not token
    if (!token) {
      res.status(401);
      throw new Error("No token, authorization denied");
    }

    // Verify token
    verify(token, process.env.JWT_SECRET!, (error, decoded) => {
      if (error) {
        res.status(401);
        throw new Error("Token is not valid");
      } else {
        (req as IAuthenticatedRequest).user = (decoded as ITokenPayload).user;
        next();
      }
    });
  }
);

export default auth;
