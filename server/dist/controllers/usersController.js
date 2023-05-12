"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const normalize_url_1 = __importDefault(require("normalize-url"));
const core_1 = require("@dicebear/core");
const collection_1 = require("@dicebear/collection");
const user_1 = __importDefault(require("../models/user"));
const generateToken_1 = require("../utils/generateToken");
const router = express_1.default.Router();
// @route    POST api/users
// @desc     Register user
// @access   Public
router.post("/", [
    (0, express_validator_1.check)("username", "Include a valid username").notEmpty(),
    (0, express_validator_1.check)("email", "Include a valid email").isEmail(),
    (0, express_validator_1.check)("password", "Include a valid password with 6 or more characters").isLength({ min: 6 }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json();
    }
    const { username, email, password } = req.body;
    try {
        let user = yield user_1.default.findOne({
            $or: [{ username }, { email }],
        });
        if (user) {
            const invalidField = user.username === username ? "Username" : "Email";
            return res.status(400).json({ errors: [{ msg: `${invalidField} already exists` }] });
        }
        const avatar = (0, core_1.createAvatar)(collection_1.bottts, {});
        const dataUri = yield avatar.toDataUri();
        const normalizedDataUri = (0, normalize_url_1.default)(dataUri);
        const newUser = new user_1.default({
            username,
            email,
            avatar: normalizedDataUri,
            password,
        });
        yield newUser.save();
        const payload = {
            user: {
                _id: newUser._id,
            },
        };
        const token = (0, generateToken_1.generateToken)(payload);
        res.json({ token });
    }
    catch (err) {
        res.status(500).send("Server error");
    }
}));
