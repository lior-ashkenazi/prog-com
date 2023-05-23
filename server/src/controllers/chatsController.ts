import { Schema } from "mongoose";
import { Request, Response } from "express";

import Chat, { IChat } from "../models/chatModel";

import { IAuthenticatedRequest } from "../middleware/authMiddleware";

export async function accessUserChat(req: Request, res: Response) {
  try {
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
      return res.json(isChat[0]);
    }

    let chatData = {
      chatName: `${(req as IAuthenticatedRequest).user._id}-${otherUserId}`,
      isGroupChat: false,
      users: [(req as IAuthenticatedRequest).user._id, otherUserId],
    };

    let newChat: IChat | null = await Chat.create(chatData);
    newChat = await Chat.findOne({ _id: newChat._id }).populate("users", "-password");
    res.json({ chat: newChat });
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function fetchUserChats(req: Request, res: Response) {
  try {
    const allUserChats = await Chat.find({
      users: { $elemMatch: { $eq: (req as IAuthenticatedRequest).user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 });

    res.json({ chats: allUserChats });
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function createGroupChat(req: Request, res: Response) {
  const { users, chatName }: { users: Schema.Types.ObjectId[]; chatName: string } = req.body;

  users.unshift((req as IAuthenticatedRequest).user._id);

  try {
    let newGroupChat: IChat | null = await Chat.create({
      chatName,
      users,
      isGroupChat: true,
      groupAdmin: (req as IAuthenticatedRequest).user,
    });
    newGroupChat = await Chat.findOne({ _id: newGroupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.json({ chat: newGroupChat });
  } catch (error) {
    res.status(500).send("Server error");
  }
}

export async function renameGroupChat(req: Request, res: Response) {
  const { chatId, chatName } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatName }, { new: true })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return res.status(400).json({ msg: "Bad request" });
    }

    res.json({ chat: updatedChat });
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function deleteGroupChat(req: Request, res: Response) {
  const { chatId } = req.body;

  try {
    const removedChat = await Chat.findByIdAndRemove(chatId)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removedChat) {
      return res.status(400).json({ msg: "Bad request" });
    }

    res.json({ chat: removedChat });
  } catch (error) {
    res.status(500).send("Server error");
  }
}

export async function addUserToGroupChat(req: Request, res: Response) {
  const { chatId, userId } = req.body;

  try {
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
      return res.status(400).send("Bad request");
    }

    res.json({ chat: updatedChat });
  } catch (err) {
    console.log(err);

    res.status(500).send("Server error");
  }
}

export async function removeUserFromGroupChat(req: Request, res: Response) {
  const { chatId, userId } = req.body;

  try {
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
      return res.status(400).send("Bad request");
    }

    res.json({ chat: updatedChat });
  } catch (err) {
    res.status(500).send("Server error");
  }
}
