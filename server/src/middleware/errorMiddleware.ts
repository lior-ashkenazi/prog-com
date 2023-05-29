import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { validationResult, Result, ValidationError } from "express-validator";
import { MongooseError } from "mongoose";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (res.statusCode === 500) {
    message = "Server error";
  }

  // Mongoose not found error
  if (err.name === "CastError" && err?.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const validationErrorHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      throw new Error("Bad request");
    }

    next();
  }
);

export { notFound, errorHandler, validationErrorHandler };
