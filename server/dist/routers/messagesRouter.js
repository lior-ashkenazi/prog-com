"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const message_1 = require("../models/message");
const messagesController_1 = require("../controllers/messagesController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const reqMiddleware_1 = __importDefault(require("../middleware/reqMiddleware"));
const allowedModes = Object.values(message_1.EMode);
const allowedLanguages = Object.values(message_1.ELanguage);
const router = express_1.default.Router();
// @desc		    Send message
// @route		    /api/messages
// @access      Private
router.post("/", [
    (0, express_validator_1.check)("content", "Include content").notEmpty(),
    (0, express_validator_1.check)("mode")
        .exists()
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
        if (value === "code" &&
            req.body.language &&
            !allowedLanguages.includes(req.body.language)) {
            throw new Error("Invalid programming language");
        }
        return true;
    }),
    (0, express_validator_1.check)("chatId", "Chat ID is required").exists(),
], authMiddleware_1.default, messagesController_1.sendMessage);
// @desc		    Fetch all messages
// @route		    /api/messages/:chatId
// @access      Private
router.get("/:chatId", authMiddleware_1.default, (0, reqMiddleware_1.default)("chatId"), messagesController_1.fetchMessages);
