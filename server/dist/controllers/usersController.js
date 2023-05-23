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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const axios_1 = __importDefault(require("axios"));
const userModel_1 = __importDefault(require("../models/userModel"));
const generateToken_1 = require("../utils/generateToken");
// const authUser
const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password } = req.body;
    const user = yield userModel_1.default.findOne({
        $or: [{ userName }, { email }],
    });
    if (user) {
        const invalidField = user.userName === userName ? "Username" : "Email";
        throw new Error(`${invalidField} is already exists`);
    }
    const response = yield axios_1.default.get(`https://api.dicebear.com/6.x/bottts/svg`);
    const avatar = response.data;
    const newUser = yield userModel_1.default.create({
        userName,
        email,
        avatar,
        password,
    });
    if (newUser) {
        const payload = {
            user: {
                _id: newUser._id,
            },
        };
        const token = (0, generateToken_1.generateToken)(payload);
        res.status(201).json({
            user: {
                _id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                avatar: newUser.avatar,
            },
            message: "User registered successfully",
            token,
        });
    }
    else {
        res.status(500);
        throw new Error("Server error");
    }
}));
exports.registerUser = registerUser;
const loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password } = req.body;
    const user = yield userModel_1.default.findOne({
        $or: [{ userName }, { email }],
    }, "-password");
    if (user && (yield user.matchPassword(password))) {
        const payload = {
            user: {
                _id: user._id,
            },
        };
        const token = (0, generateToken_1.generateToken)(payload);
        res.status(200).json({
            user,
            message: "User successfully logged in",
            token,
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid username, email or password");
    }
}));
exports.loginUser = loginUser;
const fetchUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.search
        ? {
            userName: { $regex: req.query.search, $options: "i" },
        }
        : {};
    const fetchedUsersData = yield userModel_1.default.find(keyword, "-password").find({
        _id: { $ne: req.user._id },
    });
    res.status(200).json({ users: fetchedUsersData });
}));
exports.fetchUsers = fetchUsers;
