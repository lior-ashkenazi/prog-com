import { Request, Response } from "express";
import { validationResult, Result, ValidationError } from "express-validator";

import Chat, { IChat } from "../models/chat";

import { IAuthenticatedRequest } from "../middleware/authMiddleware";

export async function accessChat(req: Request, res: Response) {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userId } = req.body;

    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: (req as IAuthenticatedRequest).user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    }).populate("users", "-password");

    let chatData;
    // we check isChat.length > 0
    // because of a race condition where mistakenly
    // two copies of the chat is created in our DB
    if (isChat.length > 0) {
      return res.json(isChat[0]);
    } else {
      chatData = {
        chatName: `${(req as IAuthenticatedRequest).user._id}-${userId}`,
        isGroupChat: false,
        users: [(req as IAuthenticatedRequest).user._id, userId],
      };
    }

    let newChat: IChat | null = await Chat.create(chatData);
    newChat = await Chat.findOne({ _id: newChat._id }).populate("users", "-password");
    res.json({ newChat });
  } catch (err) {
    res.status(500).send("Server error");
  }
}
