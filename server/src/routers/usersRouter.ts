import express, { Router } from "express";
import { check } from "express-validator";

import auth from "../middleware/authMiddleware";
import { loginUser, registerUser, fetchUsers } from "../controllers/usersController";

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
// @access    Public
router.post(
  "/login",
  check("email")
    .exists()
    .withMessage("Please add required fields")
    .isEmail()
    .withMessage("Recieved invalid fields"),
  check("password", "Please add required fields").exists(),
  loginUser
);

// @desc		  Fetch users
// @route		  /api/users?search=
// @access		Private
router.get("/", auth, fetchUsers);
