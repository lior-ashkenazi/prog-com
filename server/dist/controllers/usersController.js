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
exports.fetchUsers = exports.loginUser = exports.registerUser = void 0;
const axios_1 = __importDefault(require("axios"));
const user_1 = __importDefault(require("../models/user"));
const generateToken_1 = require("../utils/generateToken");
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userName, email, password } = req.body;
        try {
            const user = yield user_1.default.findOne({
                $or: [{ userName }, { email }],
            });
            if (user) {
                const invalidField = user.userName === userName ? "Username" : "Email";
                return res.status(400).json({ errors: [{ msg: `${invalidField} already exists` }] });
            }
            const response = yield axios_1.default.get(`https://api.dicebear.com/6.x/bottts/svg`);
            const avatar = response.data;
            const newUser = new user_1.default({
                userName,
                email,
                avatar,
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
    });
}
exports.registerUser = registerUser;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield user_1.default.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
            }
            const isMatchedPassword = yield user.matchPassword(password);
            if (!isMatchedPassword) {
                return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
            }
            const payload = {
                user: {
                    _id: user._id,
                },
            };
            const token = (0, generateToken_1.generateToken)(payload);
            res.json({ token });
        }
        catch (err) {
            res.status(500).send("Server error");
        }
    });
}
exports.loginUser = loginUser;
function fetchUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const keyword = req.query.search
            ? {
                userName: { $regex: req.query.search, $options: "i" },
            }
            : {};
        try {
            const fetchedUsersData = yield user_1.default.find(keyword);
            res.json({ users: fetchedUsersData });
        }
        catch (err) {
            res.status(500).send("Server error");
        }
    });
}
exports.fetchUsers = fetchUsers;
