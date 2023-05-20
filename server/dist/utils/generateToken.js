"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function generateToken(payload) {
    return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET);
}
exports.generateToken = generateToken;
