import { Request, Response } from "express";
import { validationResult } from "express-validator";
import normalize from "normalize-url";
import { createAvatar } from "@dicebear/core";
import { bottts } from "@dicebear/collection";

import User, { IUser } from "../models/user";
import { generateToken } from "../utils/generateToken";
import { IAuthenticatedRequest } from "../middleware/authMiddleware";

export async function registerUser(req: Request, res: Response): Promise<Response | void> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userName, email, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (user) {
      const invalidField: string = user.userName === userName ? "Username" : "Email";
      return res.status(400).json({ errors: [{ msg: `${invalidField} already exists` }] });
    }

    const avatar = createAvatar(bottts, {});
    const dataUri: string = await avatar.toDataUri();
    const normalizedDataUri: string = normalize(dataUri);

    const newUser: IUser = new User({
      userName,
      email,
      avatar: normalizedDataUri,
      password,
    });

    await newUser.save();

    const payload = {
      user: {
        _id: newUser._id,
      },
    };

    const token: string = generateToken(payload);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function loginUser(req: Request, res: Response): Promise<Response | void> {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const isMatchedPassword = await user.matchPassword(password);

    if (!isMatchedPassword) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const payload = {
      user: {
        _id: user._id,
      },
    };

    const token: string = generateToken(payload);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function fetchUsers(req: Request, res: Response): Promise<Response | void> {
  try {
    const keyword = req.query.search
      ? {
          userName: { $regex: req.query.search, $options: "i" },
        }
      : {};

    // we reach this code after authentication
    // thus req.user._id is well defined
    const fetchedUsersData = await User.find(keyword).find({
      _id: { $ne: (req as IAuthenticatedRequest).user._id },
    });
    res.status(200).json({ users: fetchedUsersData });
  } catch (err) {
    res.status(500).send("Server error");
  }
}
