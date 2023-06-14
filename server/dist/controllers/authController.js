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
exports.authGitHubHandler = exports.authGoogleHandler = exports.authUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const profileModel_1 = __importDefault(require("../models/profileModel"));
const generateToken_1 = require("../utils/generateToken");
const authUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield userModel_1.default.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error("Resource not found");
    }
    // we don't need token as
    // client has already a token
    res.status(200).json({ user });
}));
exports.authUser = authUser;
const authGoogleUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield userModel_1.default.findOne({ googleId: req.user.sub });
    let statusCode = 200;
    if (!user) {
        // Extract the username from the email
        const email = req.user.email || "";
        const userName = email.substring(0, email.indexOf("@"));
        // If username already exists, throw an error
        const userWithSameUsername = yield userModel_1.default.findOne({ userName });
        if (userWithSameUsername) {
            res.status(409);
            throw new Error("Username already exists");
        }
        user = new userModel_1.default({
            googleId: req.user.sub,
            email: req.user.email,
            avatar: req.user.picture,
            userName,
            // other user fields you want to save in your database
        });
        user = yield user.save();
        if (!user) {
            res.status(500);
            throw new Error("Server error");
        }
        const newProfile = yield profileModel_1.default.create({
            user: user._id,
        });
        if (!newProfile) {
            res.status(500);
            throw new Error("Server error");
        }
        statusCode = 201;
    }
    const payload = {
        user: {
            _id: user._id,
        },
    };
    const token = (0, generateToken_1.generateToken)(payload);
    res.status(statusCode).json({
        user,
        token,
    });
}));
exports.authGoogleHandler = authGoogleUser;
const authGitHubHandler = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const payload = { user: { _id: user._id } };
    const token = (0, generateToken_1.generateToken)(payload);
    res.json({ user, token });
}));
exports.authGitHubHandler = authGitHubHandler;
