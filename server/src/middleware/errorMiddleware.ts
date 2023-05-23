import { Request, Response, NextFunction } from "express";
import { validationResult, Result, ValidationError } from "express-validator";
import { MongooseError } from "mongoose";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (
  err: Error | MongooseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Mongoose not found error
  if (err instanceof MongooseError) {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const validationErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export { notFound, errorHandler, validationErrorHandler };
