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
  let isChat = await Chat.find({
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

  // we check isChat.length > 0
  // because of a race condition where mistakenly
  // two copies of the chat is created in our DB
  if (isChat.length > 0) {
    res.status(200).json(isChat[0]);
  } else {
    let chatData = {
      chatName: `${(req as IAuthenticatedRequest).user._id}-${otherUserId}`,
      isGroupChat: false,
      users: [(req as IAuthenticatedRequest).user._id, otherUserId],
    };

    let newChat: IChat | null = await Chat.create(chatData);
    newChat = await Chat.findOne({ _id: newChat._id }).populate("users", "-password");
    res.status(200).json({ chat: newChat });
  }
});

const fetchUserChats = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const allUserChats = await Chat.find({
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

const renameGroupChat = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatName }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(400);
    throw new Error("Bad request");
  }

  res.json({ chat: updatedChat });
});

const deleteGroupChat = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { chatId } = req.body;

  const removedChat = await Chat.findByIdAndRemove(chatId)
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removedChat) {
    res.status(400);
    throw new Error("Bad Request");
  }

  res.status(200).json({ chat: removedChat });
});

const addUserToGroupChat = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { chatId, userId } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    {
      _id: chatId,
      isGroupChat: true,
    },
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(400);
    throw new Error("Bad request");
  }

  res.status(200).json({ chat: updatedChat });
});

const removeUserFromGroupChat = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { chatId, userId } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    {
      _id: chatId,
      isGroupChat: true,
    },
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(400);
    throw new Error("Bad request");
  }

  res.status(200).json({ chat: updatedChat });
});

export {
  accessUserChat,
  fetchUserChats,
  createGroupChat,
  renameGroupChat,
  deleteGroupChat,
  addUserToGroupChat,
  removeUserFromGroupChat,
};
