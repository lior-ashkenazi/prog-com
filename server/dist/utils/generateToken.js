"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function generateToken(payload) {
    const signInOptions = {
        // RS256 uses a public/private key pair. The API provides the private key
        // to generate the JWT. The client gets a public key to validate the
        // signature
        algorithm: "RS256",
    };
    // generate JWT
    return (0, jsonwebtoken_1.sign)(payload, process.env.PRIVATE_KEY, signInOptions);
}
exports.generateToken = generateToken;
