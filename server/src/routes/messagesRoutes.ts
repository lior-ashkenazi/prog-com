import express, { Router } from "express";
import { check } from "express-validator";

import { EMode, ELanguage } from "../models/messageModel";

import auth from "../middleware/authMiddleware";
import { validationErrorHandler } from "../middleware/errorMiddleware";

import { sendMessage, fetchMessages } from "../controllers/messagesController";

const allowedModes = Object.values(EMode);
const allowedLanguages = Object.values(ELanguage);

const router: Router = express.Router();

// @desc		    Send message
// @route		    POST /api/messages
// @access      Private
router.post(
  "/",
  [
    check("content", "Please add required fields").notEmpty(),
    check("mode")
      .notEmpty()
      .withMessage("Please add required fields")
      .isIn(allowedModes)
      .withMessage("Received invalid fields")
      .custom((value, { req }) => {
        if (value === "code" && !req.body.language) {
          throw new Error("Please add required fields");
        }
        if (value !== "code" && req.body.language) {
          throw new Error("Received redundant fields");
        }
        return true;
      })
      .custom((value, { req }) => {
        if (
          value === "code" &&
          req.body.language &&
          !allowedLanguages.includes(req.body.language)
        ) {
          throw new Error("Received invalid fields");
        }
        return true;
      }),
    check("chatId")
      .notEmpty()
      .withMessage("Please add required fields")
      .isMongoId()
      .withMessage("Received invalid fields"),
  ],
  auth,
  validationErrorHandler,
  sendMessage
);

// @desc		    Fetch all messages
// @route		    GET /api/messages
// @access      Private
router.get(
  "/",
  check("chatId")
    .notEmpty()
    .withMessage("Please add required fields")
    .isMongoId()
    .withMessage("Received invalid fields"),
  auth,
  validationErrorHandler,
  fetchMessages
);

export default router;
