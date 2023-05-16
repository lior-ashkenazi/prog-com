import { Request, Response } from "express";
import { validationResult, Result, ValidationError } from "express-validator";

import Message, { IMessage } from "../models/message";

import { IAuthenticatedRequest } from "../middleware/authMiddleware";

export async function sendMessage(req: Request, res: Response) {
  const { content, mode, language, chatId } = req.body;

  const messageData = {
    sender: (req as IAuthenticatedRequest).user._id,
    content,
    mode,
    language,
    chatId,
  };

  try {
    let newMessage: IMessage = await Message.create(messageData);
    newMessage = await newMessage.populate("sender", "userName avatar email");
    newMessage = await newMessage.populate("chatId");
    newMessage = await newMessage.populate({
      path: "chatId.users",
      select: "username avatar email",
    });
    res.json({ newMessage });
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function fetchMessages(req: Request, res: Response) {
  const { chatId } = req.params;

  try {
    const fetchedMessages: IMessage[] = await Message.find({ chatId })
      .populate("sender", "userName avatar email")
      .populate("chatId");
    res.json(fetchedMessages);
  } catch (err) {
    res.status(500).send("Server Error");
  }
}
