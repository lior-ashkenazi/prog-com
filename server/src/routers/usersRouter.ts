import express, { Router } from "express";
import { check } from "express-validator";

import { loginUser, registerUser, fetchUsers } from "../controllers/usersController";
import auth from "../middleware/authMiddleware";

const router: Router = express.Router();

// @desc		  Register new user
// @route		  /api/users
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

// @desc		  Login user
// @route		  /api/users/login
// @access		Public
router.post(
  "/login",
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
  loginUser
);

// @desc		  Fetch users
// @route		  /api/users?search=
// @access		Public
router.get("/", auth, fetchUsers);
