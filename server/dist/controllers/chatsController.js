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
exports.fetchChats = exports.accessChat = void 0;
const express_validator_1 = require("express-validator");
const chat_1 = __importDefault(require("../models/chat"));
function accessChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { userId } = req.body;
            let isChat = yield chat_1.default.find({
                isGroupChat: false,
                $and: [
                    { users: { $elemMatch: { $eq: req.user._id } } },
                    { users: { $elemMatch: { $eq: userId } } },
                ],
            }).populate("users", "-password");
            let chatData;
            // we check isChat.length > 0
            // because of a race condition where mistakenly
            // two copies of the chat is created in our DB
            if (isChat.length > 0) {
                return res.json(isChat[0]);
            }
            else {
                chatData = {
                    chatName: `${req.user._id}-${userId}`,
                    isGroupChat: false,
                    users: [req.user._id, userId],
                };
            }
            let newChat = yield chat_1.default.create(chatData);
            newChat = yield chat_1.default.findOne({ _id: newChat._id }).populate("users", "-password");
            res.json({ newChat });
        }
        catch (err) {
            res.status(500).send("Server error");
        }
    });
}
exports.accessChat = accessChat;
function fetchChats(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id: userId } = req.user;
            const allUserChats = yield chat_1.default.find({
                users: { $elemMatch: { $eq: userId } },
            })
                .populate("users", "-password")
                .populate("groupAdmin", "-password")
                .sort({ updatedAt: -1 });
            res.json({ allUserChats });
        }
        catch (err) {
            res.status(500).send("Server error");
        }
    });
}
exports.fetchChats = fetchChats;
