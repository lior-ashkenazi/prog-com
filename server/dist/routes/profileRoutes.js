"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const errorMiddleware_1 = require("../middleware/errorMiddleware");
const profileController_1 = require("../controllers/profileController");
const router = express_1.default.Router();
// @desc		    Fetch profile
// @route		    GET /api/profile
// @access      Private
router.get("/:userId", (0, express_validator_1.check)("userId")
    .notEmpty()
    .withMessage("Please add required fields")
    .isMongoId()
    .withMessage("Received invalid fields"), authMiddleware_1.default, errorMiddleware_1.validationErrorHandler, profileController_1.fetchProfile);
// @desc		Update profile
// @route		PUT /api/profile
// @access      Private
router.put("/", [
    (0, express_validator_1.check)("user")
        .notEmpty()
        .withMessage("Please add required fields")
        .isMongoId()
        .withMessage("Received invalid fields"),
    (0, express_validator_1.oneOf)([
        (0, express_validator_1.check)("avatar", "Please add required fields").notEmpty(),
        (0, express_validator_1.check)("occupation", "Please add required fields").notEmpty(),
        (0, express_validator_1.check)("workplace", "Please add required fields").notEmpty(),
        (0, express_validator_1.check)("education", "Please add required fields").notEmpty(),
        (0, express_validator_1.check)("github", "Please add required fields").notEmpty(),
        (0, express_validator_1.check)("linkedin", "Please add required fields").notEmpty(),
    ], { message: "Please add required fields" }),
], authMiddleware_1.default, errorMiddleware_1.validationErrorHandler, profileController_1.updateProfile);
exports.default = router;
