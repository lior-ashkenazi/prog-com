import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Schema } from "mongoose";

import Chat, { IChat } from "../models/chatModel";

import { IAuthenticatedRequest } from "../middleware/authMiddleware";

const accessChat = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { userId: otherUserId } = req.body;

  // in the current version of the app
  // groups are *private*, they can only be accessed
  // when the admin adds you to the group chat
  let existingChats = await Chat.find({
    isGroupChat: false,
    $and: [
      {
        participants: {
          $elemMatch: { $eq: (req as IAuthenticatedRequest).user._id },
        },
      },
      { participants: { $elemMatch: { $eq: otherUserId } } },
    ],
  }).populate("participants", "-password");

  // we check existingChats.length > 0
  // because of a race condition where mistakenly
  // two copies of the chat is created in our DB
  if (existingChats.length > 0) {
    let existingChat = existingChats[0];
    existingChat.participants = existingChat.participants.filter(
      (userId) => userId.toString() !== (req as IAuthenticatedRequest).user._id.toString()
    );
    res.status(200).json({ chat: existingChat, type: "exists" });
  } else {
    let chatData = {
      chatName: `${(req as IAuthenticatedRequest).user._id}-${otherUserId}`,
      isGroupChat: false,
      participants: [(req as IAuthenticatedRequest).user._id, otherUserId],
    };

    let newChat: IChat | null = await Chat.create(chatData);
    newChat = await Chat.findOne({ _id: newChat._id }).populate("participants", "-password");
    if (!newChat) {
      res.status(500);
      throw new Error("Server error");
    }

    newChat.participants = newChat?.participants.filter(
      (userId) => userId.toString() !== (req as IAuthenticatedRequest).user._id.toString()
    );
    res.status(200).json({ chat: newChat, type: "new" });
  }
});

const fetchChats = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const allUserChats: IChat[] = await Chat.find({
    participants: { $elemMatch: { $eq: (req as IAuthenticatedRequest).user._id } },
  })
    .populate("participants", "-password")
    .populate("groupAdmin", "-password")
    .sort({ updatedAt: -1 });

  res.status(200).json({ chats: allUserChats });
});

const createGroupChat = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { participants, chatName }: { participants: Schema.Types.ObjectId[]; chatName: string } =
    req.body;

  participants.unshift((req as IAuthenticatedRequest).user._id);

  let newGroupChat: IChat | null = await Chat.create({
    chatName,
    participants,
    isGroupChat: true,
    groupAdmin: (req as IAuthenticatedRequest).user,
  });
  newGroupChat = await Chat.findOne({ _id: newGroupChat._id })
    .populate("participants", "-password")
    .populate("groupAdmin", "-password");

  res.status(200).json({ chat: newGroupChat });
});

const updateGroupChat = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { chatId, chatName, participants } = req.body;

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
  chat.participants = participants || chat.participants;

  await chat.save();

  const updatedChat = await Chat.findById(chat._id)
    .populate("participants", "-password")
    .populate("groupAdmin", "-password");

  res.json({ chat: updatedChat });
});

export { accessChat, fetchChats, createGroupChat, updateGroupChat };
