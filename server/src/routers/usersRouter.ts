import express, { Router } from "express";
import { check } from "express-validator";

import auth from "../middleware/authMiddleware";
import error from "../middleware/errorMiddleware";

import {
  loginUser,
  registerUser,
  fetchUsers,
} from "../controllers/usersController";

const router: Router = express.Router();

// UI should note users the format of a password!

// @desc		  Register new user
// @route		  /api/users
// @access		Public
router.post(
  "/",
  [
    check("userName", "Please add required fields").notEmpty(),
    check("email", "Recieved invalid fields").isEmail(),
    check("password", "Recieved invalid fields").isLength({ min: 6 }),
  ],
  error,
  registerUser
);

// @desc		  Login user
// @route		  /api/users/login
// @access    Public
router.post(
  "/login",
  check("email")
    .notEmpty()
    .withMessage("Please add required fields")
    .isEmail()
    .withMessage("Recieved invalid fields"),
  check("password", "Please add required fields").notEmpty(),
  error,
  loginUser
);

// @desc		  Fetch users
// @route		  /api/users?search=
// @access		Private
router.get("/", auth, fetchUsers);
