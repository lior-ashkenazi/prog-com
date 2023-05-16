import express, { Router } from "express";
import { check } from "express-validator";

import { EMode, ELanguage } from "../models/message";

import { sendMessage, fetchMessages } from "../controllers/messagesController";
import auth from "../middleware/authMiddleware";

const allowedModes = Object.values(EMode);
const allowedLanguages = Object.values(ELanguage);

const router: Router = express.Router();

// @desc		    Send message
// @route		    /api/messages
// @access      Private
router.post(
  "/",
  [
    check("content", "Please add required fields").notEmpty(),
    check("mode")
      .notEmpty()
      .isIn(allowedModes)
      .withMessage("Recieved invalid fields")
      .custom((value, { req }) => {
        if (value === "code" && !req.body.language) {
          throw new Error("Please add required fields");
        }
        if (value !== "code" && req.body.language) {
          throw new Error("Recieved redundant fields");
        }
        return true;
      })
      .custom((value, { req }) => {
        if (
          value === "code" &&
          req.body.language &&
          !allowedLanguages.includes(req.body.language)
        ) {
          throw new Error("Recieved invalid fields");
        }
        return true;
      }),
    check("chatId")
      .notEmpty()
      .withMessage("Please add required fields")
      .isMongoId()
      .withMessage("Recieved invalid fields"),
  ],
  auth,
  sendMessage
);

// @desc		    Fetch all messages
// @route		    /api/messages/:chatId
// @access      Private
router.get(
  "/:chatId",
  check("chatId")
    .notEmpty()
    .withMessage("Please add required fields")
    .isMongoId()
    .withMessage("Recieved invalid fields"),
  auth,
  fetchMessages
);
