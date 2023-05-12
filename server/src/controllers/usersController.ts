import express, { Request, Response, Router } from "express";
import { check, validationResult } from "express-validator";
import normalize from "normalize-url";
import { createAvatar } from "@dicebear/core";
import { bottts } from "@dicebear/collection";

import User, { IUser } from "../models/user";
import { generateToken } from "../utils/generateToken";

export async function registerUser(req: Request, res: Response): Promise<Response | void> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json();
  }

  const { username, email, password } = req.body;

  try {
    let user: IUser | null = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      const invalidField: string = user.username === username ? "Username" : "Email";
      return res.status(400).json({ errors: [{ msg: `${invalidField} already exists` }] });
    }

    const avatar = createAvatar(bottts, {});
    const dataUri: string = await avatar.toDataUri();
    const normalizedDataUri: string = normalize(dataUri);

    const newUser = new User({
      username,
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
