import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import Message, { IMessage } from "../models/messageModel";

import { IAuthenticatedRequest } from "../middleware/authMiddleware";

const sendMessage = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { chatId, content, mode, language } = req.body;

  const messageData = {
    chatId,
    sender: (req as IAuthenticatedRequest).user._id,
    content,
    mode,
    language,
  };

  let newMessage: IMessage = await Message.create(messageData);
  newMessage = await newMessage.populate("sender", "userName avatar email");
  newMessage = await newMessage.populate("chatId");
  newMessage = await newMessage.populate({
    path: "chatId.users",
    select: "username avatar email",
  });
  // TODO Latest message feature
  res.json({ message: newMessage });
});

const fetchMessages = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { chatId } = req.body;

  const fetchedMessages: IMessage[] = await Message.find({ chatId })
    .populate("sender", "userName avatar email")
    .populate("chatId")
    .sort("createdAt");
  res.json({ messages: fetchedMessages });
});

export { sendMessage, fetchMessages };
