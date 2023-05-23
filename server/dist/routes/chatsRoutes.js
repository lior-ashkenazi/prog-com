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
// @route		    /api/chats
// @access      Private
router.post("/", (0, express_validator_1.check)("userId")
    .notEmpty()
    .withMessage("Please add required fields")
    .isMongoId()
    .withMessage("Received invalid fields"), authMiddleware_1.default, errorMiddleware_1.validationErrorHandler, chatsController_1.accessUserChat);
// @desc		    Get all the chats of a given user
// @route		    /api/chats
// @access      Private
router.get("/", authMiddleware_1.default, chatsController_1.fetchUserChats);
// @desc		    Create a new group chat
// @route		    /api/chats/groups
// @access      Private
router.post("/groups", [
    (0, express_validator_1.check)("users")
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
// @desc		    Rename a group chat
// @route		    /api/chats/groups
// @access      Private
router.put("/groups", [
    (0, express_validator_1.check)("chatId")
        .notEmpty()
        .withMessage("Please add required fields")
        .isMongoId()
        .withMessage("Received invalid fields"),
    (0, express_validator_1.check)("chatName", "Please add required fields").notEmpty(),
], authMiddleware_1.default, errorMiddleware_1.validationErrorHandler, chatsController_1.renameGroupChat);
// @desc		    Delete a group chat
// @route		    /api/chats/groups
// @access      Private
router.delete("/groups", [
    (0, express_validator_1.check)("chatId")
        .notEmpty()
        .withMessage("Please add required fields")
        .isMongoId()
        .withMessage("Received invalid fields"),
], authMiddleware_1.default, errorMiddleware_1.validationErrorHandler, chatsController_1.deleteGroupChat);
// @desc		    Add a user to group chat
// @route		    /api/chats/groups/users
// @access      Private
router.post("/groups/users", [
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
], authMiddleware_1.default, errorMiddleware_1.validationErrorHandler, chatsController_1.addUserToGroupChat);
// @desc		    Remove a user from group chat
// @route		    /api/chats/groups/users
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
], authMiddleware_1.default, errorMiddleware_1.validationErrorHandler, chatsController_1.removeUserFromGroupChat);
exports.default = router;
