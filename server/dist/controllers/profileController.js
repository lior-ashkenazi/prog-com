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
exports.updateProfile = exports.fetchProfile = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const profileModel_1 = __importDefault(require("../models/profileModel"));
const fetchProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    const profile = yield profileModel_1.default.findOne({ user });
    if (!profile) {
        res.status(404);
        throw new Error("Resource not found");
    }
    res.json({ profile });
}));
exports.fetchProfile = fetchProfile;
const updateProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, occupation, workplace, education, github, linkedin } = req.body;
    const profile = yield profileModel_1.default.findOne({ user });
    if (!profile) {
        res.status(404);
        throw new Error("Resource not found");
    }
    if (profile.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("Unauthorized user");
    }
    profile.occupation = occupation || profile.occupation;
    profile.workplace = workplace || profile.workplace;
    profile.education = education || profile.education;
    profile.github = github || profile.github;
    profile.linkedin = linkedin || profile.linkedin;
    yield profile.save();
    const updatedProfile = yield profileModel_1.default.findById(profile._id)
        .populate("user", "-password")
        .populate("groupAdmin", "-password");
    res.json({ chat: updatedProfile });
}));
exports.updateProfile = updateProfile;
