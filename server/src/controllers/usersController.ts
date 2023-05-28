import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import User, { IUser } from "../models/userModel";
import { generateToken } from "../utils/generateToken";
import { IAuthenticatedRequest } from "../middleware/authMiddleware";

const registerUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { userName, email, password } = req.body;

  const user: IUser | null = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (user) {
    const invalidField: string = user.userName === userName ? "Username" : "Email";
    res.status(400);
    throw new Error(`${invalidField} already exists`);
  }

  let seed =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const avatar: string = `https://robohash.org/${seed}`;

  const newUser: IUser = await User.create({
    userName,
    email,
    avatar,
    password,
  });

  if (newUser) {
    const payload = {
      user: {
        _id: newUser._id,
      },
    };

    const token = generateToken(payload);

    res.status(201).json({
      user: {
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        avatar: newUser.avatar,
      },
      token,
    });
  } else {
    res.status(500);
    throw new Error("Server error");
  }
});

const loginUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { usernameOrEmail, password } = req.body;

  const user: IUser | null = await User.findOne({
    $or: [{ userName: usernameOrEmail }, { email: usernameOrEmail }],
  });

  if (!user) {
    res.status(404);
    throw new Error("Username or email not found");
  }

  if (!(await user.matchPassword(password))) {
    res.status(400);
    throw new Error("Password is not correct");
  }

  const payload = {
    user: {
      _id: user._id,
    },
  };

  const token = generateToken(payload);

  res.status(200).json({
    user,
    token,
  });
});

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

const logoutUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  res.status(200);
});

const fetchUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const keyword: { userName: string } | {} = req.query.search
    ? {
        userName: { $regex: req.query.search, $options: "i" },
      }
    : {};

  const fetchedUsersData: IUser[] = await User.find(keyword, "-password").find({
    _id: { $ne: (req as IAuthenticatedRequest).user._id },
  });

  res.status(200).json({ users: fetchedUsersData });
});

export { registerUser, loginUser, authUser, logoutUser, fetchUsers };
