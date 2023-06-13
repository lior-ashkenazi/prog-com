import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import User, { IUser } from "../models/userModel";
import { IAuthenticatedRequest } from "../middleware/authMiddleware";
import { generateToken } from "../utils/generateToken";

const authUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user: IUser | null = await User.findById((req as IAuthenticatedRequest).user._id);

  if (!user) {
    res.status(404);
    throw new Error("Resource not found");
  }

  // we don't need token as
  // client has already a token
  res.status(200).json({ user });
});

const authGoogleHandler = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = (req as IAuthenticatedRequest).user;
  const payload = { user: { _id: user._id } };
  const token = generateToken(payload);
  res.json({ user, token });
});

const authGitHubHandler = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = (req as IAuthenticatedRequest).user;
  const payload = { user: { _id: user._id } };
  const token = generateToken(payload);
  res.json({ user, token });
});

export { authUser, authGoogleHandler, authGitHubHandler };
