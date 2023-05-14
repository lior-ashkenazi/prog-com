"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// @desc		  Register new user
// @route		  /api/user
// @access		Public
router.post("/", [
    (0, express_validator_1.check)("username", "Include a valid username").notEmpty(),
    (0, express_validator_1.check)("email", "Include a valid email").isEmail(),
    (0, express_validator_1.check)("password", "Include a valid password with 6 or more characters").isLength({ min: 6 }),
], userController_1.registerUser);
// @desc		  Login user
// @route		  /api/user/login
// @access    Public
router.post("/login", (0, express_validator_1.check)("email", "Please include a valid email").isEmail(), (0, express_validator_1.check)("password", "Password is required").exists(), userController_1.loginUser);
// @desc		  Fetch users
// @route		  /api/user?search=
// @access		Private
router.get("/", authMiddleware_1.default, userController_1.fetchUsers);
