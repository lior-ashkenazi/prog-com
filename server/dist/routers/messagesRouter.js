"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const message_1 = require("../models/message");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const errorMiddleware_1 = __importDefault(require("../middleware/errorMiddleware"));
const messagesController_1 = require("../controllers/messagesController");
const allowedModes = Object.values(message_1.EMode);
const allowedLanguages = Object.values(message_1.ELanguage);
const router = express_1.default.Router();
// @desc		    Send message
// @route		    /api/messages
// @access      Private
router.post("/", [
    (0, express_validator_1.check)("content", "Please add required fields").notEmpty(),
    (0, express_validator_1.check)("mode")
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
        if (value === "code" &&
            req.body.language &&
            !allowedLanguages.includes(req.body.language)) {
            throw new Error("Received invalid fields");
        }
        return true;
    }),
    (0, express_validator_1.check)("chatId")
        .notEmpty()
        .withMessage("Please add required fields")
        .isMongoId()
        .withMessage("Received invalid fields"),
], authMiddleware_1.default, errorMiddleware_1.default, messagesController_1.sendMessage);
// @desc		    Fetch all messages
// @route		    /api/messages/:chatId
// @access      Private
router.get("/:chatId", (0, express_validator_1.check)("chatId")
    .notEmpty()
    .withMessage("Please add required fields")
    .isMongoId()
    .withMessage("Received invalid fields"), authMiddleware_1.default, errorMiddleware_1.default, messagesController_1.fetchMessages);
exports.default = router;
