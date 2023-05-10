"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 200,
    },
    isGroupChat: {
        type: Boolean,
        default: false,
    },
    users: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "User",
        },
    ],
    latestMessage: {
        type: mongoose_1.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
exports.Chat = (0, mongoose_1.model)("Chat", chatSchema);
