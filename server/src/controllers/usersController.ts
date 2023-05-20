import { Request, Response } from "express";
import axios from "axios";

import User, { IUser } from "../models/user";
import { generateToken } from "../utils/generateToken";

export async function registerUser(req: Request, res: Response): Promise<Response | void> {
  const { userName, email, password } = req.body;
  console.log(userName, email, password);

  try {
    const user: IUser | null = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (user) {
      const invalidField: string = user.userName === userName ? "Username" : "Email";
      return res.status(400).json({ errors: [{ msg: `${invalidField} already exists` }] });
    }

    const response = await axios.get(`https://api.dicebear.com/6.x/bottts/svg`);
    const avatar: string = response.data;

    const newUser: IUser = new User({
      userName,
      email,
      avatar,
      password,
    });

    // await newUser.save();

    const payload = {
      user: {
        _id: newUser._id,
      },
    };

    console.log(payload);

    const token: string = generateToken(payload);
    res.json({ token });
  } catch (err) {
    console.log(err);

    res.status(500).send("Server error");
  }
}

export async function loginUser(req: Request, res: Response): Promise<Response | void> {
  const { email, password } = req.body;

  try {
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
  const keyword: { userName: string } | {} = req.query.search
    ? {
        userName: { $regex: req.query.search, $options: "i" },
      }
    : {};

  try {
    const fetchedUsersData: IUser[] = await User.find(keyword);

    res.json({ users: fetchedUsersData });
  } catch (err) {
    res.status(500).send("Server error");
  }
}
