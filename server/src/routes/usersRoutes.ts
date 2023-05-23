import express, { Router } from "express";
import { check, oneOf } from "express-validator";

import auth from "../middleware/authMiddleware";
import { validationErrorHandler } from "../middleware/errorMiddleware";

import { loginUser, registerUser, fetchUsers } from "../controllers/usersController";

const router: Router = express.Router();

// UI should note users the format of a password!

// @desc		  Register new user
// @route		  /api/users
// @access		Public
router.post(
  "/",
  [
    check("userName")
      .notEmpty()
      .withMessage("Please add required fields")
      .matches(/^[a-zA-Z0-9_-]*$/)
      .withMessage("Received invalid fields"),
    check("email")
      .notEmpty()
      .withMessage("Please add required fields")
      .isEmail()
      .withMessage("Received invalid fields"),
    check("password")
      .notEmpty()
      .withMessage("Please add required fields")
      .isLength({ min: 6 })
      .withMessage("Received invalid fields"),
  ],
  validationErrorHandler,
  registerUser
);

// @desc		  Login user
// @route		  /api/users/login
// @access    Public
router.post(
  "/login",
  [
    oneOf([
      check("userName").notEmpty().withMessage("Please add required fields"),
      check("email")
        .notEmpty()
        .withMessage("Please add required fields")
        .isEmail()
        .withMessage("Received invalid fields"),
    ]),
    check("password", "Please add required fields").notEmpty(),
  ],
  validationErrorHandler,
  loginUser
);

// @desc		  Fetch users
// @route		  /api/users?search=
// @access		Private
router.get("/", auth, fetchUsers);

export default router;
