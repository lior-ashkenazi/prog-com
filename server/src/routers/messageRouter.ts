import express, { Router } from "express";
import { check } from "express-validator";

import { EMode, ELanguage } from "../models/message";

import { sendMessage, fetchMessages } from "../controllers/messageController";
import auth from "../middleware/authMiddleware";
import checkObjectId from "../middleware/reqMiddleware";

const allowedModes = Object.values(EMode);
const allowedLanguages = Object.values(ELanguage);

const router: Router = express.Router();

// @desc		    Send message
// @route		    /api/message
// @access      Private
router.post(
  "/",
  [
    check("content", "Include content").notEmpty(),
    check("mode")
      .notEmpty()
      .isIn(allowedModes)
      .withMessage("Invalid mode")
      .custom((value, { req }) => {
        if (value === "code" && !req.body.language) {
          throw new Error("Include language when mode is set to code");
        }
        if (value !== "code" && req.body.language) {
          throw new Error("Language should not be provided when mode is not set to code");
        }
        return true;
      })
      .custom((value, { req }) => {
        if (
          value === "code" &&
          req.body.language &&
          !allowedLanguages.includes(req.body.language)
        ) {
          throw new Error("Invalid programming language");
        }
        return true;
      }),
    check("chatId", "Include chatId").notEmpty(),
  ],
  auth,
  sendMessage
);

// @desc		    Fetch all messages
// @route		    /api/messages/:chatId
// @access      Private
router.get("/:chatId", auth, checkObjectId("chatId"), fetchMessages);
