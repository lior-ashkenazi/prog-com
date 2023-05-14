import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

const checkObjectId =
  (idToCheck: string) =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    if (!Types.ObjectId.isValid(req.params[idToCheck]))
      return res.status(400).json({ msg: "Invalid ID" });
    next();
  };

export default checkObjectId;
