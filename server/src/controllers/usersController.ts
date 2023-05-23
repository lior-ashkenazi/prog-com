import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import axios from "axios";

import User, { IUser } from "../models/userModel";
import { generateToken } from "../utils/generateToken";
import { IAuthenticatedRequest } from "../middleware/authMiddleware";

// const authUser

const registerUser = asyncHandler(async <T>(req: Request, res: Response): Promise<void> => {
  const { userName, email, password } = req.body;

  const user: IUser | null = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (user) {
    const invalidField: string = user.userName === userName ? "Username" : "Email";
    throw new Error(`${invalidField} is already exists`);
  }

  const response = await axios.get(`https://api.dicebear.com/6.x/bottts/svg`);
  const avatar: string = response.data;

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
      message: "User registered successfully",
      token,
    });
  } else {
    res.status(500);
    throw new Error("Server error");
  }
});

const loginUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { userName, email, password } = req.body;

  const user: IUser | null = await User.findOne(
    {
      $or: [{ userName }, { email }],
    },
    "-password"
  );

  if (user && (await user.matchPassword(password))) {
    const payload = {
      user: {
        _id: user._id,
      },
    };

    const token = generateToken(payload);

    res.status(200).json({
      user,
      message: "User successfully logged in",
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid username, email or password");
  }
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

export { registerUser, loginUser, fetchUsers };
