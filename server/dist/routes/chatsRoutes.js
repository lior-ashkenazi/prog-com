"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const errorMiddleware_1 = require("../middleware/errorMiddleware");
const chatsController_1 = require("../controllers/chatsController");
const router = express_1.default.Router();
// @desc		    Access/Initiate a chat between two users
// @route		    POST /api/chats
// @access      Private
router.post("/", (0, express_validator_1.check)("userId")
    .notEmpty()
    .withMessage("Please add required fields")
    .isMongoId()
    .withMessage("Received invalid fields"), authMiddleware_1.default, errorMiddleware_1.validationErrorHandler, chatsController_1.accessChat);
// @desc		    Get all the chats of a given user
// @route		    GET /api/chats
// @access      Private
router.get("/", authMiddleware_1.default, chatsController_1.fetchChats);
// @desc		    Create a new group chat
// @route		    POST /api/chats/groups
// @access      Private
router.post("/groups", [
    (0, express_validator_1.check)("participants")
        .notEmpty()
        .withMessage("Please add required fields")
        .isArray()
        .withMessage("Received invalid fields")
        .custom((value) => {
        value.forEach((user, i) => {
            if (!(0, express_validator_1.check)(user).isMongoId()) {
                throw new Error(`Received invalid fields`);
            }
        });
        return true;
    }),
    (0, express_validator_1.check)("chatName", "Please add required fields").notEmpty(),
], authMiddleware_1.default, errorMiddleware_1.validationErrorHandler, chatsController_1.createGroupChat);
// @desc		    Update a group chat
// @route		    PUT /api/chats/groups
// @access      Private
router.put("/groups", [
    (0, express_validator_1.check)("chatId")
        .notEmpty()
        .withMessage("Please add required fields")
        .isMongoId()
        .withMessage("Received invalid fields"),
    (0, express_validator_1.oneOf)([
        (0, express_validator_1.check)("participants")
            .isArray({ min: 1 })
            .withMessage("Received invalid fields")
            .custom((value) => {
            value.forEach((user, i) => {
                if (!(0, express_validator_1.check)(user).isMongoId()) {
                    throw new Error(`Received invalid fields`);
                }
            });
            return true;
        }),
        (0, express_validator_1.check)("chatName", "Please add required fields").notEmpty(),
        (0, express_validator_1.check)("avatar")
            .notEmpty()
            .withMessage("Please add required fields")
            .isURL()
            .withMessage("Received invalid fields"),
    ], { message: "Please add required fields" }),
], authMiddleware_1.default, errorMiddleware_1.validationErrorHandler, chatsController_1.updateGroupChat);
exports.default = router;
