"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const usersController_1 = require("../controllers/usersController");
const router = express_1.default.Router();
// @desc		  Register new user
// @route		  /api/users
// @access		Public
router.post("/", [
    (0, express_validator_1.check)("username", "Include a valid username").notEmpty(),
    (0, express_validator_1.check)("email", "Include a valid email").isEmail(),
    (0, express_validator_1.check)("password", "Include a valid password with 6 or more characters").isLength({ min: 6 }),
], usersController_1.registerUser);
// @desc		  Login user
// @route		  /api/users/login
// @access    Public
router.post("/login", (0, express_validator_1.check)("email")
    .exists()
    .withMessage("Please add required fields")
    .isEmail()
    .withMessage("Recieved invalid fields"), (0, express_validator_1.check)("password", "Please add required fields").exists(), usersController_1.loginUser);
// @desc		  Fetch users
// @route		  /api/users?search=
// @access		Private
router.get("/", authMiddleware_1.default, usersController_1.fetchUsers);
