"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ELanguage = exports.EMode = void 0;
const mongoose_1 = require("mongoose");
var EMode;
(function (EMode) {
    EMode[EMode["text"] = 0] = "text";
    EMode[EMode["math"] = 1] = "math";
    EMode[EMode["code"] = 2] = "code";
})(EMode = exports.EMode || (exports.EMode = {}));
var ELanguage;
(function (ELanguage) {
    ELanguage[ELanguage["cpp"] = 0] = "cpp";
    ELanguage[ELanguage["java"] = 1] = "java";
    ELanguage[ELanguage["python"] = 2] = "python";
    ELanguage[ELanguage["c"] = 3] = "c";
    ELanguage[ELanguage["csharp"] = 4] = "csharp";
    ELanguage[ELanguage["javascript"] = 5] = "javascript";
    ELanguage[ELanguage["ruby"] = 6] = "ruby";
    ELanguage[ELanguage["swift"] = 7] = "swift";
    ELanguage[ELanguage["go"] = 8] = "go";
    ELanguage[ELanguage["scala"] = 9] = "scala";
    ELanguage[ELanguage["kotlin"] = 10] = "kotlin";
    ELanguage[ELanguage["rust"] = 11] = "rust";
    ELanguage[ELanguage["typescript"] = 12] = "typescript";
})(ELanguage = exports.ELanguage || (exports.ELanguage = {}));
const messageSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
        required: true,
    },
    mode: {
        type: String,
        required: true,
        enum: Object.values(EMode),
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
