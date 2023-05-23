import express, { Router } from "express";
import { check } from "express-validator";

import auth from "../middleware/authMiddleware";
import error from "../middleware/errorMiddleware";

import {
  accessUserChat,
  fetchUserChats,
  createGroupChat,
  renameGroupChat,
  addUserToGroupChat,
  removeUserFromGroupChat,
  deleteGroupChat,
} from "../controllers/chatsController";

const router: Router = express.Router();

// @desc		    Access/Initiate a chat between two users
// @route		    /api/chats
// @access      Private
router.post(
  "/",
  check("userId")
    .notEmpty()
    .withMessage("Please add required fields")
    .isMongoId()
    .withMessage("Received invalid fields"),
  auth,
  error,
  accessUserChat
);

// @desc		    Get all the chats of a given user
// @route		    /api/chats
// @access      Private
router.get("/", auth, fetchUserChats);

// @desc		    Create a new group chat
// @route		    /api/chats/groups
// @access      Private
router.post(
  "/groups",
  [
    check("users")
      .notEmpty()
      .withMessage("Please add required fields")
      .isArray()
      .withMessage("Received invalid fields")
      .custom((value) => {
        value.forEach((user: string, i: number) => {
          if (!check(user).isMongoId()) {
            throw new Error(`Received invalid fields`);
          }
        });

        return true;
      }),
    check("chatName", "Please add required fields").notEmpty(),
  ],
  auth,
  error,
  createGroupChat
);

// @desc		    Rename a group chat
// @route		    /api/chats/groups
// @access      Private
router.put(
  "/groups",
  [
    check("chatId")
      .notEmpty()
      .withMessage("Please add required fields")
      .isMongoId()
      .withMessage("Received invalid fields"),
    check("chatName", "Please add required fields").notEmpty(),
  ],
  auth,
  error,
  renameGroupChat
);

// @desc		    Delete a group chat
// @route		    /api/chats/groups
// @access      Private
router.delete(
  "/groups",
  [
    check("chatId")
      .notEmpty()
      .withMessage("Please add required fields")
      .isMongoId()
      .withMessage("Received invalid fields"),
  ],
  auth,
  error,
  deleteGroupChat
);

// @desc		    Add a user to group chat
// @route		    /api/chats/groups/users
// @access      Private
router.post(
  "/groups/users",
  [
    check("chatId")
      .notEmpty()
      .withMessage("Please add required fields")
      .isMongoId()
      .withMessage("Received invalid fields"),
    check("userId")
      .notEmpty()
      .withMessage("Please add required fields")
      .isMongoId()
      .withMessage("Received invalid fields"),
  ],
  auth,
  error,
  addUserToGroupChat
);

// @desc		    Remove a user from group chat
// @route		    /api/chats/groups/users
// @access      Private
router.delete(
  "/groups/users",
  [
    check("chatId")
      .notEmpty()
      .withMessage("Please add required fields")
      .isMongoId()
      .withMessage("Received invalid fields"),
    check("userId")
      .notEmpty()
      .withMessage("Please add required fields")
      .isMongoId()
      .withMessage("Received invalid fields"),
  ],
  auth,
  error,
  removeUserFromGroupChat
);

export default router;
