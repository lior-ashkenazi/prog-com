"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrorHandler = exports.errorHandler = exports.notFound = void 0;
const express_validator_1 = require("express-validator");
const mongoose_1 = require("mongoose");
const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.notFound = notFound;
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    // Mongoose not found error
    if (err instanceof mongoose_1.MongooseError) {
        statusCode = 404;
        message = "Resource not found";
    }
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
exports.errorHandler = errorHandler;
const validationErrorHandler = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validationErrorHandler = validationErrorHandler;
