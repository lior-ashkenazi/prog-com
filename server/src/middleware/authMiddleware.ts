import { Request, Response, NextFunction } from "express";
import { verify, VerifyOptions } from "jsonwebtoken";
import { ITokenPayload } from "../utils/generateToken";

export interface IAuthenticatedRequest extends Request {
  user: { _id: number };
}

export default function (req: Request, res: Response, next: NextFunction): Response | void {
  // Get token from header
  const token = req!.header("Authorization")!.replace("Bearer ", "");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const verifyOptions: VerifyOptions = {
      algorithms: ["RS256"],
    };

    if (!process.env.PUBLIC_KEY) {
      throw new Error("Key not found");
    }

    verify(token, process.env.PUBLIC_KEY, verifyOptions, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Token is not valid" });
      }
      decoded = decoded as ITokenPayload;
      // we can't create new property on a defined interface
      // thus we did here type-casting
      (req as IAuthenticatedRequest).user = decoded.user;
      next();
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}
