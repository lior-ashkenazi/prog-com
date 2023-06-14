import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { Schema } from "mongoose";
import { verify } from "jsonwebtoken";
import { OAuth2Client, TokenPayload as GoogleTokenPayload } from "google-auth-library";

import { ITokenPayload } from "../utils/generateToken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export interface IAuthenticatedRequest extends Request {
  user: { _id: Schema.Types.ObjectId };
}

export interface IGoogleAuthenticatedRequest extends Request {
  user: GoogleTokenPayload;
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

const verifyGoogleToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).send("Unauthorized request");
    }

    (req as IGoogleAuthenticatedRequest).user = payload;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized request");
  }
};

export default auth;
export { verifyGoogleToken };
