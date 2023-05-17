"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const errorMiddleware_1 = __importDefault(require("../middleware/errorMiddleware"));
const chatsController_1 = require("../controllers/chatsController");
const router = express_1.default.Router();
// @desc		Access/Initiate a chat between two users
// @route		/api/chats
// @access      Private
router.post("/", (0, express_validator_1.check)("userId")
    .notEmpty()
    .withMessage("Please add required fields")
    .isMongoId()
    .withMessage("Recieved invalid fields"), authMiddleware_1.default, errorMiddleware_1.default, chatsController_1.accessChat);
// @desc		Get all the chats of a given user
// @route		/api/chats
// @access      Private
router.post("/", authMiddleware_1.default, chatsController_1.fetchChats);
// @desc		Create a new group chat
// @route		/api/chats/groups
// @access      Private
router.post("/groups", [
    (0, express_validator_1.check)("users", "Please add required fields").notEmpty(),
    (0, express_validator_1.check)("chatName", "Please add required fields").notEmpty(),
], authMiddleware_1.default, errorMiddleware_1.default, chatsController_1.createGroupChat);
// @desc		Rename a group chat
// @route		/api/chats/groups
// @access      Private
router.put("/groups", [
    (0, express_validator_1.check)("chatId")
        .notEmpty()
        .withMessage("Please add required fields")
        .isMongoId()
        .withMessage("Recieved invalid fields"),
    (0, express_validator_1.check)("chatName", "Please add required fields").notEmpty(),
], authMiddleware_1.default, errorMiddleware_1.default, chatsController_1.renameGroupChat);
// @desc		Rename a group chat
// @route		/api/chats/groups
// @access      Private
router.delete("/groups", [
    (0, express_validator_1.check)("chatId")
        .notEmpty()
        .withMessage("Please add required fields")
        .isMongoId()
        .withMessage("Received invalid fields"),
], authMiddleware_1.default, errorMiddleware_1.default, chatsController_1.removeGroupChat);
// @desc		Add a user to group chat
// @route		/api/chats/groups/users
// @access      Private
router.put("/groups/users", [
    (0, express_validator_1.check)("chatId")
        .notEmpty()
        .withMessage("Please add required fields")
        .isMongoId()
        .withMessage("Received invalid fields"),
    (0, express_validator_1.check)("userId")
        .notEmpty()
        .withMessage("Please add required fields")
        .isMongoId()
        .withMessage("Received invalid fields"),
], authMiddleware_1.default, errorMiddleware_1.default, chatsController_1.addUserToGroupChat);
// @desc		Remove a user from group chat
// @route		/api/chats/groups/users
// @access      Private
router.delete("/groups/users", [
    (0, express_validator_1.check)("chatId")
        .notEmpty()
        .withMessage("Please add required fields")
        .isMongoId()
        .withMessage("Received invalid fields"),
    (0, express_validator_1.check)("userId")
        .notEmpty()
        .withMessage("Please add required fields")
        .isMongoId()
        .withMessage("Received invalid fields"),
], authMiddleware_1.default, errorMiddleware_1.default, chatsController_1.removeUserFromGroupChat);
exports.default = router;
