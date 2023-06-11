import express, { Router } from "express";
import { check, oneOf } from "express-validator";

import auth from "../middleware/authMiddleware";
import { validationErrorHandler } from "../middleware/errorMiddleware";

import {
  accessChat,
  fetchChats,
  createGroupChat,
  updateGroupChat,
} from "../controllers/chatsController";

const router: Router = express.Router();

// @desc		    Access/Initiate a chat between two users
// @route		    POST /api/chats
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
  accessChat
);

// @desc		    Get all the chats of a given user
// @route		    GET /api/chats
// @access      Private
router.get("/", auth, fetchChats);

// @desc		    Create a new group chat
// @route		    POST /api/chats/groups
// @access      Private
router.post(
  "/groups",
  [
    check("participants")
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

// @desc		    Update a group chat
// @route		    PUT /api/chats/groups
// @access      Private
router.put(
  "/groups",
  [
    check("chatId")
      .notEmpty()
      .withMessage("Please add required fields")
      .isMongoId()
      .withMessage("Received invalid fields"),
    oneOf(
      [
        check("participants")
          .isArray({ min: 1 })
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
        check("avatar")
          .notEmpty()
          .withMessage("Please add required fields")
          .isURL()
          .withMessage("Received invalid fields"),
      ],
      { message: "Please add required fields" }
    ),
  ],
  auth,
  validationErrorHandler,
  updateGroupChat
);

export default router;
