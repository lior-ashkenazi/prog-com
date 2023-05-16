import express, { Router } from "express";
import { check } from "express-validator";

import auth from "../middleware/authMiddleware";
import {
  accessChat,
  fetchChats,
  createGroupChat,
} from "../controllers/chatsController";

const router: Router = express.Router();

// @desc		Access/Initiate a chat between two users
// @route		/api/chats
// @access      Private
router.post(
  "/",
  check("userId", "Please add required fields").notEmpty(),
  auth,
  accessChat
);

// @desc		Get all the chats of a given user
// @route		/api/chats
// @access      Private
router.post("/", auth, fetchChats);

// @desc		Create a new group chat room
// @route		/api/chats/group
// @access      Private
router.post(
  "/group",
  [
    check("users", "Please add required fields").notEmpty(),
    check("userName", "Please add required fields").notEmpty(),
  ],
  auth,
  createGroupChat
);
