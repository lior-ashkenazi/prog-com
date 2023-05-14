"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    chatName: {
        type: String,
        required: true,
        maxLength: 200,
    },
    users: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "User",
        },
    ],
    isGroupChat: {
        type: Boolean,
        default: false,
    },
    groupAdmin: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
const Chat = (0, mongoose_1.model)("Chat", chatSchema);
exports.default = Chat;
