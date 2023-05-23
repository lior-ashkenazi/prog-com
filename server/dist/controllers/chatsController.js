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
exports.removeUserFromGroupChat = exports.addUserToGroupChat = exports.deleteGroupChat = exports.renameGroupChat = exports.createGroupChat = exports.fetchUserChats = exports.accessUserChat = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const chatModel_1 = __importDefault(require("../models/chatModel"));
const accessUserChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId: otherUserId } = req.body;
    // in the current version of the app
    // groups are *private*, they can only be accessed
    // when the admin adds you to the group chat
    let isChat = yield chatModel_1.default.find({
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
    // we check isChat.length > 0
    // because of a race condition where mistakenly
    // two copies of the chat is created in our DB
    if (isChat.length > 0) {
        res.status(200).json(isChat[0]);
    }
    else {
        let chatData = {
            chatName: `${req.user._id}-${otherUserId}`,
            isGroupChat: false,
            users: [req.user._id, otherUserId],
        };
        let newChat = yield chatModel_1.default.create(chatData);
        newChat = yield chatModel_1.default.findOne({ _id: newChat._id }).populate("users", "-password");
        res.status(200).json({ chat: newChat });
    }
}));
exports.accessUserChat = accessUserChat;
const fetchUserChats = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUserChats = yield chatModel_1.default.find({
        users: { $elemMatch: { $eq: req.user._id } },
    })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .sort({ updatedAt: -1 });
    res.status(200).json({ chats: allUserChats });
}));
exports.fetchUserChats = fetchUserChats;
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
const renameGroupChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, chatName } = req.body;
    const updatedChat = yield chatModel_1.default.findByIdAndUpdate(chatId, { chatName }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!updatedChat) {
        res.status(400);
        throw new Error("Bad request");
    }
    res.json({ chat: updatedChat });
}));
exports.renameGroupChat = renameGroupChat;
const deleteGroupChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.body;
    const removedChat = yield chatModel_1.default.findByIdAndRemove(chatId)
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!removedChat) {
        res.status(400);
        throw new Error("Bad Request");
    }
    res.status(200).json({ chat: removedChat });
}));
exports.deleteGroupChat = deleteGroupChat;
const addUserToGroupChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, userId } = req.body;
    const updatedChat = yield chatModel_1.default.findByIdAndUpdate({
        _id: chatId,
        isGroupChat: true,
    }, {
        $push: { users: userId },
    }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!updatedChat) {
        res.status(400);
        throw new Error("Bad request");
    }
    res.status(200).json({ chat: updatedChat });
}));
exports.addUserToGroupChat = addUserToGroupChat;
const removeUserFromGroupChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, userId } = req.body;
    const updatedChat = yield chatModel_1.default.findByIdAndUpdate({
        _id: chatId,
        isGroupChat: true,
    }, {
        $pull: { users: userId },
    }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!updatedChat) {
        res.status(400);
        throw new Error("Bad request");
    }
    res.status(200).json({ chat: updatedChat });
}));
exports.removeUserFromGroupChat = removeUserFromGroupChat;
