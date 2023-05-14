import { Request, Response } from "express";
import { validationResult } from "express-validator";

import Message from "../models/message";

import { IAuthenticatedRequest } from "../middleware/authMiddleware";

export async function sendMessage(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { content, mode, language, chatId } = req.body;

  try {
    const newMessage = {
      sender: (req as IAuthenticatedRequest).user._id,
      content,
      chatId,
    };

    let message = await Message.create(newMessage);
    message = await message.populate("sender", "userName avatar email");
    message = await message.populate("chatId");
    message = await message.populate({
      path: "chatId.users",
      select: "username avatar email",
    });
    res.json({ message });
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function fetchMessages(req: Request, res: Response) {
  const { chatId } = req.params;
  try {
    const fetchedMessages = await Message.find({ chatId })
      .populate("sender", "userName avatar email")
      .populate("chatId");
    res.json(fetchMessages);
  } catch (err) {
    res.status(500).send("Server Error");
  }
}
