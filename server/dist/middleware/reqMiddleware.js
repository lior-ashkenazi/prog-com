"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const checkObjectId = (idToCheck) => (req, res, next) => {
  if (!mongoose_1.Types.ObjectId.isValid(req.params[idToCheck]))
    return res.status(400).json({ message: "Invalid ID" });
  next();
};
exports.default = checkObjectId;
