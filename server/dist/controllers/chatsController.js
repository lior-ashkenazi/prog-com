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
const chatModel_1 = __importDefault(require("../models/chatModel"));
function accessUserChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
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
                return res.json(isChat[0]);
            }
            let chatData = {
                chatName: `${req.user._id}-${otherUserId}`,
                isGroupChat: false,
                users: [req.user._id, otherUserId],
            };
            let newChat = yield chatModel_1.default.create(chatData);
            newChat = yield chatModel_1.default.findOne({ _id: newChat._id }).populate("users", "-password");
            res.json({ chat: newChat });
        }
        catch (err) {
            res.status(500).send("Server error");
        }
    });
}
exports.accessUserChat = accessUserChat;
function fetchUserChats(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allUserChats = yield chatModel_1.default.find({
                users: { $elemMatch: { $eq: req.user._id } },
            })
                .populate("users", "-password")
                .populate("groupAdmin", "-password")
                .sort({ updatedAt: -1 });
            res.json({ chats: allUserChats });
        }
        catch (err) {
            res.status(500).send("Server error");
        }
    });
}
exports.fetchUserChats = fetchUserChats;
function createGroupChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { users, chatName } = req.body;
        users.unshift(req.user._id);
        try {
            let newGroupChat = yield chatModel_1.default.create({
                chatName,
                users,
                isGroupChat: true,
                groupAdmin: req.user,
            });
            newGroupChat = yield chatModel_1.default.findOne({ _id: newGroupChat._id })
                .populate("users", "-password")
                .populate("groupAdmin", "-password");
            res.json({ chat: newGroupChat });
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
            const updatedChat = yield chatModel_1.default.findByIdAndUpdate(chatId, { chatName }, { new: true })
                .populate("users", "-password")
                .populate("groupAdmin", "-password");
            if (!updatedChat) {
                return res.status(400).json({ msg: "Bad request" });
            }
            res.json({ chat: updatedChat });
        }
        catch (err) {
            res.status(500).send("Server error");
        }
    });
}
exports.renameGroupChat = renameGroupChat;
function deleteGroupChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { chatId } = req.body;
        try {
            const removedChat = yield chatModel_1.default.findByIdAndRemove(chatId)
                .populate("users", "-password")
                .populate("groupAdmin", "-password");
            if (!removedChat) {
                return res.status(400).json({ msg: "Bad request" });
            }
            res.json({ chat: removedChat });
        }
        catch (error) {
            res.status(500).send("Server error");
        }
    });
}
exports.deleteGroupChat = deleteGroupChat;
function addUserToGroupChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { chatId, userId } = req.body;
        try {
            const updatedChat = yield chatModel_1.default.findByIdAndUpdate({
                _id: chatId,
                isGroupChat: true,
            }, {
                $push: { users: userId },
            }, { new: true })
                .populate("users", "-password")
                .populate("groupAdmin", "-password");
            if (!updatedChat) {
                return res.status(400).send("Bad request");
            }
            res.json({ chat: updatedChat });
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Server error");
        }
    });
}
exports.addUserToGroupChat = addUserToGroupChat;
function removeUserFromGroupChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { chatId, userId } = req.body;
        try {
            const updatedChat = yield chatModel_1.default.findByIdAndUpdate({
                _id: chatId,
                isGroupChat: true,
            }, {
                $pull: { users: userId },
            }, { new: true })
                .populate("users", "-password")
                .populate("groupAdmin", "-password");
            if (!updatedChat) {
                return res.status(400).send("Bad request");
            }
            res.json({ chat: updatedChat });
        }
        catch (err) {
            res.status(500).send("Server error");
        }
    });
}
exports.removeUserFromGroupChat = removeUserFromGroupChat;
