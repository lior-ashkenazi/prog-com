import { Request, Response, NextFunction } from "express";
import { validationResult, Result, ValidationError } from "express-validator";

export default function (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}
