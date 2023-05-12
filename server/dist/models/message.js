"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    mode: {
        type: String,
        required: true,
        enum: ["text", "math", "code"],
    },
    content: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: false,
        enum: [
            "cpp",
            "java",
            "python",
            "c",
            "csharp",
            "javascript",
            "ruby",
            "swift",
            "go",
            "scala",
            "kotlin",
            "rust",
            "php",
            "typescript",
        ],
    },
    chatId: {
        type: mongoose_1.Types.ObjectId,
        ref: "Chat",
    },
}, { timestamps: true });
const Message = (0, mongoose_1.model)("Message", messageSchema);
exports.default = Message;
