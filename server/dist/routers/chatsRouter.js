"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const chatsController_1 = require("../controllers/chatsController");
const router = express_1.default.Router();
// @desc		Access/Initiate a chat between two users
// @route		/api/chats
// @access      Private
router.post("/", (0, express_validator_1.check)("userId", "Please add required fields").exists(), authMiddleware_1.default, chatsController_1.accessChat);
// @desc		Get all the chats of a given user
// @route		/api/chats
// @access      Private
router.post("/", authMiddleware_1.default, chatsController_1.accessChat);
