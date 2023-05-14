import express, { Router } from "express";
import { check } from "express-validator";

import auth from "../middleware/authMiddleware";
import { accessChat } from "../controllers/chatsController";

const router: Router = express.Router();

// @desc		Access/Initiate a chat between two users
// @route		/api/chats
// @access      Private
router.post("/", check("userId", "User ID is required").exists(), auth, accessChat);

// @desc		Get all the chats of a given user
// @route		/api/chats
// @access      Private
