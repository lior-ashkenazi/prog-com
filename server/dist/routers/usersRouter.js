"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const usersController_1 = require("../controllers/usersController");
const router = express_1.default.Router();
// @desc		Register new user
// @route		/api/users
// @access		Public
router.post("/", [
    (0, express_validator_1.check)("username", "Include a valid username").notEmpty(),
    (0, express_validator_1.check)("email", "Include a valid email").isEmail(),
    (0, express_validator_1.check)("password", "Include a valid password with 6 or more characters").isLength({ min: 6 }),
], usersController_1.registerUser);
