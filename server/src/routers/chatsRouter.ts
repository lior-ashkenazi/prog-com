import express, { Router } from "express";
import { check } from "express-validator";

import auth from "../middleware/authMiddleware";
import {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  addUserToGroupChat,
  removeUserFromGroupChat,
} from "../controllers/chatsController";

const router: Router = express.Router();

// @desc		Access/Initiate a chat between two users
// @route		/api/chats
// @access      Private
router.post(
  "/",
  check("userId")
    .notEmpty()
    .withMessage("Please add required fields")
    .isMongoId()
    .withMessage("Recieved invalid fields"),
  auth,
  accessChat
);

// @desc		Get all the chats of a given user
// @route		/api/chats
// @access      Private
router.post("/", auth, fetchChats);

// @desc		Create a new group chat
// @route		/api/chats/groups
// @access      Private
router.post(
  "/groups",
  [
    check("users", "Please add required fields").notEmpty(),
    check("chatName", "Please add required fields").notEmpty(),
  ],
  auth,
  createGroupChat
);

// @desc		Rename a group chat
// @route		/api/chats/groups
// @access      Private
router.put(
  "/groups",
  [
    check("chatId")
      .notEmpty()
      .withMessage("Please add required fields")
      .isMongoId()
      .withMessage("Recieved invalid fields"),
    check("chatName", "Please add required fields").notEmpty(),
  ],
  auth,
  renameGroupChat
);

// @desc		Add a user to group chat
// @route		/api/chats/groups/users
// @access      Private
router.put(
  "/groups/users",
  [
    check("chatId")
      .notEmpty()
      .withMessage("Please add required fields")
      .isMongoId()
      .withMessage("Recieved invalid fields"),
    check("userId")
      .notEmpty()
      .withMessage("Please add required fields")
      .isMongoId()
      .withMessage("Recieved invalid fields"),
  ],
  auth,
  addUserToGroupChat
);

// @desc		Remove a user from group chat
// @route		/api/chats/groups/users
// @access      Private
router.delete(
  "/groups/users",
  [
    check("chatId")
      .notEmpty()
      .withMessage("Please add required fields")
      .isMongoId()
      .withMessage("Recieved invalid fields"),
    check("userId")
      .notEmpty()
      .withMessage("Please add required fields")
      .isMongoId()
      .withMessage("Recieved invalid fields"),
  ],
  auth,
  removeUserFromGroupChat
);
