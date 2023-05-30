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
exports.updateGroupChat = exports.createGroupChat = exports.fetchChats = exports.accessChat = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const chatModel_1 = __importDefault(require("../models/chatModel"));
const accessChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId: otherUserId } = req.body;
    // in the current version of the app
    // groups are *private*, they can only be accessed
    // when the admin adds you to the group chat
    let existingChats = yield chatModel_1.default.find({
        isGroupChat: false,
        $and: [
            {
                users: {
                    $elemMatch: { $eq: req.user._id },
                },
            },
            { users: { $elemMatch: { $eq: otherUserId } } },
        ],
    }).populate("users", "-password");
    // we check existingChats.length > 0
    // because of a race condition where mistakenly
    // two copies of the chat is created in our DB
    if (existingChats.length > 0) {
        let existingChat = existingChats[0];
        existingChat.users = existingChat.users.filter((userId) => userId.toString() !== req.user._id.toString());
        res.status(200).json({ chat: existingChat, type: "exists" });
    }
    else {
        let chatData = {
            chatName: `${req.user._id}-${otherUserId}`,
            isGroupChat: false,
            users: [req.user._id, otherUserId],
        };
        let newChat = yield chatModel_1.default.create(chatData);
        newChat = yield chatModel_1.default.findOne({ _id: newChat._id }).populate("users", "-password");
        if (!newChat) {
            res.status(500);
            throw new Error("Server error");
        }
        newChat.users = newChat === null || newChat === void 0 ? void 0 : newChat.users.filter((userId) => userId.toString() !== req.user._id.toString());
        res.status(200).json({ chat: newChat, type: "new" });
    }
}));
exports.accessChat = accessChat;
const fetchChats = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUserChats = yield chatModel_1.default.find({
        users: { $elemMatch: { $eq: req.user._id } },
    })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .sort({ updatedAt: -1 });
    res.status(200).json({ chats: allUserChats });
}));
exports.fetchChats = fetchChats;
const createGroupChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { users, chatName } = req.body;
    users.unshift(req.user._id);
    let newGroupChat = yield chatModel_1.default.create({
        chatName,
        users,
        isGroupChat: true,
        groupAdmin: req.user,
    });
    newGroupChat = yield chatModel_1.default.findOne({ _id: newGroupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    res.status(200).json({ chat: newGroupChat });
}));
exports.createGroupChat = createGroupChat;
const updateGroupChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, chatName, users } = req.body;
    const chat = yield chatModel_1.default.findById(chatId);
    if (!chat) {
        res.status(404);
        throw new Error("Resource not found");
    }
    if (!chat.isGroupChat) {
        res.status(400);
        throw new Error("Bad request");
    }
    if (chat.groupAdmin.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("Unauthorized user");
    }
    chat.chatName = chatName || chat.chatName;
    chat.users = users || chat.users;
    yield chat.save();
    const updatedChat = yield chatModel_1.default.findById(chat._id)
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    res.json({ chat: updatedChat });
}));
exports.updateGroupChat = updateGroupChat;
