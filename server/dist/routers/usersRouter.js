"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const errorMiddleware_1 = __importDefault(require("../middleware/errorMiddleware"));
const usersController_1 = require("../controllers/usersController");
const router = express_1.default.Router();
// UI should note users the format of a password!
// @desc		  Register new user
// @route		  /api/users
// @access		Public
router.post("/", [
    (0, express_validator_1.check)("userName")
        .notEmpty()
        .withMessage("Please add required fields")
        .matches(/^[a-zA-Z0-9_-]*$/)
        .withMessage("Received invalid fields"),
    (0, express_validator_1.check)("email")
        .notEmpty()
        .withMessage("Please add required fields")
        .isEmail()
        .withMessage("Received invalid fields"),
    (0, express_validator_1.check)("password")
        .notEmpty()
        .withMessage("Please add required fields")
        .isLength({ min: 6 })
        .withMessage("Received invalid fields"),
], errorMiddleware_1.default, usersController_1.registerUser);
// @desc		  Login user
// @route		  /api/users/login
// @access    Public
router.post("/login", [
    (0, express_validator_1.oneOf)([
        (0, express_validator_1.check)("userName").notEmpty().withMessage("Please add required fields"),
        (0, express_validator_1.check)("email")
            .notEmpty()
            .withMessage("Please add required fields")
            .isEmail()
            .withMessage("Received invalid fields"),
    ]),
    (0, express_validator_1.check)("password", "Please add required fields").notEmpty(),
], errorMiddleware_1.default, usersController_1.loginUser);
// @desc		  Fetch users
// @route		  /api/users?search=
// @access		Private
router.get("/", authMiddleware_1.default, usersController_1.fetchUsers);
exports.default = router;
