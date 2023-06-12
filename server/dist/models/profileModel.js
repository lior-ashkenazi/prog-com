"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const profileSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    occupation: {
        type: String,
        required: false,
    },
    workplace: {
        type: String,
        required: false,
    },
    education: {
        type: String,
        required: false,
    },
    github: {
        type: String,
        required: false,
    },
    linkedin: {
        type: String,
        required: false,
    },
}, { timestamps: true });
const Profile = (0, mongoose_1.model)("Profile", profileSchema);
exports.default = Profile;
