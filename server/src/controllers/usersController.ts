import { Request, Response } from "express";
import { validationResult, Result, ValidationError } from "express-validator";
import normalize from "normalize-url";
import { createAvatar } from "@dicebear/core";
import { bottts } from "@dicebear/collection";

import User, { IUser } from "../models/user";
import { generateToken } from "../utils/generateToken";

export async function registerUser(req: Request, res: Response): Promise<Response | void> {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userName, email, password } = req.body;

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
    res.json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function loginUser(req: Request, res: Response): Promise<Response | void> {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const isMatchedPassword: boolean = await user.matchPassword(password);

    if (!isMatchedPassword) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const payload = {
      user: {
        _id: user._id,
      },
    };

    const token: string = generateToken(payload);
    res.json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function fetchUsers(req: Request, res: Response): Promise<Response | void> {
  try {
    const keyword: { userName: string } | {} = req.query.search
      ? {
          userName: { $regex: req.query.search, $options: "i" },
        }
      : {};

    const fetchedUsersData: IUser[] = await User.find(keyword);

    res.json({ users: fetchedUsersData });
  } catch (err) {
    res.status(500).send("Server error");
  }
}
