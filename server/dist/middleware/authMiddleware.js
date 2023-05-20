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
        (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: "Token is not valid" });
            }
            else {
                req.user = decoded.user;
                next();
            }
        });
    }
    catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
}
exports.default = default_1;
