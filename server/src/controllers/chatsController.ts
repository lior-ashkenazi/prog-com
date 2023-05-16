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
    const { userId: otherUserId } = req.body;

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

    let chatData;
    // we check isChat.length > 0
    // because of a race condition where mistakenly
    // two copies of the chat is created in our DB
    if (isChat.length > 0) {
      return res.json(isChat[0]);
    } else {
      chatData = {
        chatName: `${(req as IAuthenticatedRequest).user._id}-${otherUserId}`,
        isGroupChat: false,
        users: [(req as IAuthenticatedRequest).user._id, otherUserId],
      };
    }

    let newChat: IChat | null = await Chat.create(chatData);
    newChat = await Chat.findOne({ _id: newChat._id }).populate(
      "users",
      "-password"
    );
    res.json({ newChat });
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function fetchChats(req: Request, res: Response) {
  try {
    const allUserChats = await Chat.find({
      users: { $elemMatch: { $eq: (req as IAuthenticatedRequest).user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 });

    res.json({ allUserChats });
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function createGroupChat(req: Request, res: Response) {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let users: object[] = req.body.users;

  users.push((req as IAuthenticatedRequest).user);

  try {
    let newGroupChat: IChat | null = await Chat.create({
      chatName: req.body.name,
      users,
      isGroupChat: true,
      groupAdmin: (req as IAuthenticatedRequest).user,
    });
    newGroupChat = await Chat.findOne({ _id: newGroupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.json(newGroupChat);
  } catch (error) {
    res.status(500).send("Server error");
  }
}

export async function renameGroupChat(req: Request, res: Response) {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { chatId, chatName } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return res.status(400).json({ message: "Bad request" });
    }

    res.json(updatedChat);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function removeGroupChat(req: Request, res: Response) {
  const { chatId } = req.body;

  const removedChat = await Chat.findByIdAndRemove(chatId);

  if (!removedChat) {
    return res.status(400).json({ message: "Bad request" });
  }

  res.json(removedChat);
}

export async function addUserToGroupChat(req: Request, res: Response) {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { chatId, userId } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
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

    res.json(updatedChat);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function removeUserFromGroupChat(req: Request, res: Response) {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { chatId, userId } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
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

    res.json(updatedChat);
  } catch (err) {
    res.status(500).send("Server error");
  }
}
