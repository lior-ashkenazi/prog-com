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
exports.fetchMessages = exports.sendMessage = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const messageModel_1 = __importDefault(require("../models/messageModel"));
const chatModel_1 = __importDefault(require("../models/chatModel"));
const sendMessage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    const { content, mode, language } = req.body;
    const chat = yield chatModel_1.default.findById(chatId);
    if (!chat) {
        res.status(404);
        throw new Error("Resource not found");
    }
    if (!chat.participants.includes(req.user._id)) {
        res.status(403);
        throw new Error("Unauthorized request");
    }
    const messageData = Object.assign({ chatId, sender: req.user._id, content,
        mode }, (language && { language }));
    let newMessage = yield messageModel_1.default.create(messageData);
    newMessage = yield newMessage.populate("sender", "userName avatar email");
    newMessage = yield newMessage.populate("chatId");
    newMessage = yield newMessage.populate({
        path: "chatId.participants",
        select: "username avatar email",
    });
    chat.lastMessageId = newMessage._id;
    yield chat.save();
    res.json({ message: newMessage });
}));
exports.sendMessage = sendMessage;
const fetchMessages = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    const chat = yield chatModel_1.default.findById(chatId);
    if (!chat) {
        res.status(404);
        throw new Error("Resource not found");
    }
    if (!chat.participants.includes(req.user._id)) {
        res.status(403);
        throw new Error("Unauthorized request");
    }
    const fetchedMessages = yield messageModel_1.default.find({ chatId })
        .populate("sender", "userName avatar email")
        .populate("chatId")
        .sort("createdAt");
    res.json({ messages: fetchedMessages });
}));
exports.fetchMessages = fetchMessages;
