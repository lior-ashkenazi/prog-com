"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    chatName: {
        type: String,
        required: true,
        minLength: 1,
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
        validate: [
            {
                validator: function (value) {
                    if (!this.isGroupChat) {
                        return null;
                    }
                    return value ? true : false;
                },
                message: "groupAdmin is required for group chats",
            },
        ],
    },
}, { timestamps: true });
const Chat = (0, mongoose_1.model)("Chat", chatSchema);
exports.default = Chat;
