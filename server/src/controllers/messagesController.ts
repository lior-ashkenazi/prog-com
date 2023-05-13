import { Request, Response } from "express";
import { validationResult } from "express-validator";

import Message from "../models/message";
import User from "../models/user";
import Chat from "../models/chat";

export async function sendMessage(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
}
