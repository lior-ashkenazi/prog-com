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
exports.removeUserFromGroupChat = exports.addUserToGroupChat = exports.removeGroupChat = exports.renameGroupChat = exports.createGroupChat = exports.fetchChats = exports.accessChat = void 0;
const chat_1 = __importDefault(require("../models/chat"));
function accessChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId: otherUserId } = req.body;
            let isChat = yield chat_1.default.find({
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
            let chatData;
            // we check isChat.length > 0
            // because of a race condition where mistakenly
            // two copies of the chat is created in our DB
            if (isChat.length > 0) {
                return res.json(isChat[0]);
            }
            else {
                chatData = {
                    chatName: `${req.user._id}-${otherUserId}`,
                    isGroupChat: false,
                    users: [req.user._id, otherUserId],
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
            const allUserChats = yield chat_1.default.find({
                users: { $elemMatch: { $eq: req.user._id } },
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
function createGroupChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let users = req.body.users;
        users.push(req.user._id);
        try {
            let newGroupChat = yield chat_1.default.create({
                chatName: req.body.name,
                users,
                isGroupChat: true,
                groupAdmin: req.user,
            });
            newGroupChat = yield chat_1.default.findOne({ _id: newGroupChat._id })
                .populate("users", "-password")
                .populate("groupAdmin", "-password");
            res.json(newGroupChat);
        }
        catch (error) {
            res.status(500).send("Server error");
        }
    });
}
exports.createGroupChat = createGroupChat;
function renameGroupChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { chatId, chatName } = req.body;
        try {
            const updatedChat = yield chat_1.default.findByIdAndUpdate(chatId, { chatName }, { new: true })
                .populate("users", "-password")
                .populate("groupAdmin", "-password");
            if (!updatedChat) {
                return res.status(400).json({ message: "Bad request" });
            }
            res.json(updatedChat);
        }
        catch (err) {
            res.status(500).send("Server error");
        }
    });
}
exports.renameGroupChat = renameGroupChat;
function removeGroupChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { chatId } = req.body;
        try {
            const removedChat = yield chat_1.default.findByIdAndRemove(chatId);
            if (!removedChat) {
                return res.status(400).json({ message: "Bad request" });
            }
            res.json(removedChat);
        }
        catch (error) {
            res.status(500).send("Server error");
        }
    });
}
exports.removeGroupChat = removeGroupChat;
function addUserToGroupChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { chatId, userId } = req.body;
        try {
            const updatedChat = yield chat_1.default.findByIdAndUpdate(chatId, {
                $push: { users: userId },
            }, { new: true })
                .populate("users", "-password")
                .populate("groupAdmin", "-password");
            if (!updatedChat) {
                return res.status(400).send("Bad request");
            }
            res.json(updatedChat);
        }
        catch (err) {
            res.status(500).send("Server error");
        }
    });
}
exports.addUserToGroupChat = addUserToGroupChat;
function removeUserFromGroupChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { chatId, userId } = req.body;
        try {
            const updatedChat = yield chat_1.default.findByIdAndUpdate(chatId, {
                $pull: { users: userId },
            }, { new: true })
                .populate("users", "-password")
                .populate("groupAdmin", "-password");
            if (!updatedChat) {
                return res.status(400).send("Bad request");
            }
            res.json(updatedChat);
        }
        catch (err) {
            res.status(500).send("Server error");
        }
    });
}
exports.removeUserFromGroupChat = removeUserFromGroupChat;
