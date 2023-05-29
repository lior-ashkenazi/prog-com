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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = require("jsonwebtoken");
const auth = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.header("Authorization")) {
        res.status(202);
        throw new Error("No authorization header");
    }
    // Get token from header
    const token = req.header("Authorization").replace("Bearer ", "");
    // Check if not token
    if (!token) {
        res.status(401);
        throw new Error("No token, authorization denied");
    }
    // Verify token
    (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            res.status(401);
            throw new Error("Token is not valid");
        }
        else {
            req.user = decoded.user;
            next();
        }
    });
}));
exports.default = auth;
