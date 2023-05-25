import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Schema } from "mongoose";

import Chat, { IChat } from "../models/chatModel";

import { IAuthenticatedRequest } from "../middleware/authMiddleware";

const accessUserChat = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { userId: otherUserId } = req.body;

  // in the current version of the app
  // groups are *private*, they can only be accessed
  // when the admin adds you to the group chat
  let existingChats = await Chat.find({
    isGroupChat: false,
    $and: [
      {
        users: {
          $elemMatch: { $eq: (req as IAuthenticatedRequest).user._id },
        },
      },
      { users: { $elemMatch: { $eq: otherUserId } } },
    ],
  }).populate("users", "-password");

  // we check existingChats.length > 0
  // because of a race condition where mistakenly
  // two copies of the chat is created in our DB
  if (existingChats.length > 0) {
    res.status(200).json({ chat: existingChats[0], type: "exists" });
  } else {
    let chatData = {
      chatName: `${(req as IAuthenticatedRequest).user._id}-${otherUserId}`,
      isGroupChat: false,
      users: [(req as IAuthenticatedRequest).user._id, otherUserId],
    };

    let newChat: IChat | null = await Chat.create(chatData);
    newChat = await Chat.findOne({ _id: newChat._id }).populate("users", "-password");
    res.status(200).json({ chat: newChat, type: "new" });
  }
});

const fetchUserChats = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const allUserChats: IChat[] = await Chat.find({
    users: { $elemMatch: { $eq: (req as IAuthenticatedRequest).user._id } },
  })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .sort({ updatedAt: -1 });

  res.status(200).json({ chats: allUserChats });
});

const createGroupChat = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { users, chatName }: { users: Schema.Types.ObjectId[]; chatName: string } = req.body;

  users.unshift((req as IAuthenticatedRequest).user._id);

  let newGroupChat: IChat | null = await Chat.create({
    chatName,
    users,
    isGroupChat: true,
    groupAdmin: (req as IAuthenticatedRequest).user,
  });
  newGroupChat = await Chat.findOne({ _id: newGroupChat._id })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(200).json({ chat: newGroupChat });
});

const updateGroupChat = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { chatId, chatName, users } = req.body;

  const chat: IChat | null = await Chat.findById(chatId);

  if (!chat) {
    res.status(404);
    throw new Error("Resource not found");
  }

  if (!chat.isGroupChat) {
    res.status(400);
    throw new Error("Bad request");
  }

  if (chat.groupAdmin!.toString() !== (req as IAuthenticatedRequest).user._id.toString()) {
    res.status(403);
    throw new Error("Unauthorized user");
  }

  chat.chatName = chatName || chat.chatName;
  chat.users = users || chat.users;

  await chat.save();

  const updatedChat = await Chat.findById(chat._id)
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.json({ chat: updatedChat });
});

export { accessUserChat, fetchUserChats, createGroupChat, updateGroupChat };
