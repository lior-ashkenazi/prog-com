import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import User, { IUser } from "../models/userModel";
import Profile, { IProfile } from "../models/profileModel";
import { IAuthenticatedRequest, IGoogleAuthenticatedRequest } from "../middleware/authMiddleware";
import { generateToken } from "../utils/generateToken";

const authUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  let user: IUser | null = await User.findById((req as IAuthenticatedRequest).user._id);

  if (!user) {
    res.status(404);
    throw new Error("Resource not found");
  }

  // we don't need token as
  // client has already a token
  res.status(200).json({ user });
});

const authGoogleUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  let user = await User.findOne({ googleId: (req as IGoogleAuthenticatedRequest).user.sub });
  let statusCode = 200;

  if (!user) {
    // Extract the username from the email
    const email = (req as IGoogleAuthenticatedRequest).user.email || "";
    const userName = email.substring(0, email.indexOf("@"));

    // If username already exists, throw an error
    const userWithSameUsername = await User.findOne({ userName });
    if (userWithSameUsername) {
      res.status(409);
      throw new Error("Username already exists");
    }

    user = new User({
      googleId: (req as IGoogleAuthenticatedRequest).user.sub,
      email: (req as IGoogleAuthenticatedRequest).user.email,
      avatar: (req as IGoogleAuthenticatedRequest).user.picture,
      userName,
      // other user fields you want to save in your database
    });

    user = await user.save();

    if (!user) {
      res.status(500);
      throw new Error("Server error");
    }

    const newProfile: IProfile = await Profile.create({
      user: user._id,
    });

    if (!newProfile) {
      res.status(500);
      throw new Error("Server error");
    }

    statusCode = 201;
  }

  const payload = {
    user: {
      _id: user._id,
    },
  };

  const token = generateToken(payload);

  res.status(statusCode).json({
    user,
    token,
  });
});

const authGitHubHandler = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = (req as IAuthenticatedRequest).user;
  const payload = { user: { _id: user._id } };
  const token = generateToken(payload);
  res.json({ user, token });
});

export { authUser, authGoogleUser as authGoogleHandler, authGitHubHandler };
