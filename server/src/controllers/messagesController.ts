import { Request, Response } from "express";

import Message, { IMessage } from "../models/messageModel";

import { IAuthenticatedRequest } from "../middleware/authMiddleware";

export async function sendMessage(req: Request, res: Response) {
  const { chatId, content, mode, language } = req.body;

  const messageData = {
    chatId,
    sender: (req as IAuthenticatedRequest).user._id,
    content,
    mode,
    language,
  };

  try {
    let newMessage: IMessage = await Message.create(messageData);
    newMessage = await newMessage.populate("sender", "userName avatar email");
    newMessage = await newMessage.populate("chatId");
    newMessage = await newMessage.populate({
      path: "chatId.users",
      select: "username avatar email",
    });
    res.json({ message: newMessage });
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function fetchMessages(req: Request, res: Response) {
  const { chatId } = req.params;

  try {
    const fetchedMessages: IMessage[] = await Message.find({ chatId })
      .populate("sender", "userName avatar email")
      .populate("chatId")
      .sort("createdAt");
    res.json({ messages: fetchedMessages });
  } catch (err) {
    res.status(500).send("Server Error");
  }
}
