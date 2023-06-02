import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import Message, { IMessage } from "../models/messageModel";
import Chat, { IChat } from "../models/chatModel";

import { IAuthenticatedRequest } from "../middleware/authMiddleware";

const sendMessage = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { chatId } = req.params;
  const { content, mode, language } = req.body;

  const chat: IChat | null = await Chat.findById(chatId);

  if (!chat) {
    res.status(404);
    throw new Error("Resource not found");
  }

  if (!chat.participants.includes((req as IAuthenticatedRequest).user._id)) {
    res.status(403);
    throw new Error("Unauthorized request");
  }

  const messageData = {
    chatId,
    sender: (req as IAuthenticatedRequest).user._id,
    content,
    mode,
    ...(language && { language }),
  };

  let newMessage: IMessage = await Message.create(messageData);
  newMessage = await newMessage.populate("sender", "userName avatar email");
  newMessage = await newMessage.populate("chatId");
  newMessage = await newMessage.populate({
    path: "chatId.participants",
    select: "username avatar email",
  });
  // TODO Latest message feature
  res.json({ message: newMessage });
});

const fetchMessages = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { chatId } = req.params;

  const chat: IChat | null = await Chat.findById(chatId);

  if (!chat) {
    res.status(404);
    throw new Error("Resource not found");
  }

  if (!chat.participants.includes((req as IAuthenticatedRequest).user._id)) {
    res.status(403);
    throw new Error("Unauthorized request");
  }

  const fetchedMessages: IMessage[] = await Message.find({ chatId })
    .populate("sender", "userName avatar email")
    .populate("chatId")
    .sort("createdAt");
  res.json({ messages: fetchedMessages });
});

export { sendMessage, fetchMessages };
