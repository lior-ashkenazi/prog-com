import express, { Router } from "express";
import { check } from "express-validator";

import { registerUser } from "../controllers/usersController";

const router: Router = express.Router();

// @desc		Register new user
// @route		/api/users
// @access		Public
router.post(
  "/",
  [
    check("username", "Include a valid username").notEmpty(),
    check("email", "Include a valid email").isEmail(),
    check("password", "Include a valid password with 6 or more characters").isLength({ min: 6 }),
  ],
  registerUser
);
