import express, { Router } from "express";
import { check } from "express-validator";

import auth from "../middleware/authMiddleware";
import { validationErrorHandler } from "../middleware/errorMiddleware";

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
  validationErrorHandler,
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
  validationErrorHandler,
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
  validationErrorHandler,
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
  validationErrorHandler,
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
  validationErrorHandler,
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
  validationErrorHandler,
  removeUserFromGroupChat
);

export default router;
