"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
function default_1(req, res, next) {
    // Get token from header
    const token = req.header("Authorization").replace("Bearer ", "");
    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    // Verify token
    try {
        const verifyOptions = {
            algorithms: ["RS256"],
        };
        if (!process.env.PUBLIC_KEY) {
            throw new Error("Key not found");
        }
        (0, jsonwebtoken_1.verify)(token, process.env.PUBLIC_KEY, verifyOptions, (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: "Token is not valid" });
            }
            decoded = decoded;
            req.user = decoded.user;
            next();
        });
    }
    catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
}
exports.default = default_1;
