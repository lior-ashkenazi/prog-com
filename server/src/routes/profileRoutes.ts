import express, { Router } from "express";
import { check, oneOf } from "express-validator";

import auth from "../middleware/authMiddleware";
import { validationErrorHandler } from "../middleware/errorMiddleware";

import { fetchProfile, updateProfile } from "../controllers/profileController";

const router: Router = express.Router();

// @desc		Fetch profile
// @route		GET /api/profile
// @access      Private
router.get(
  "/",
  check("user")
    .notEmpty()
    .withMessage("Please add required fields")
    .isMongoId()
    .withMessage("Received invalid fields"),
  auth,
  validationErrorHandler,
  fetchProfile
);

// @desc		Update profile
// @route		PUT /api/profile
// @access      Private
router.put(
  "/",
  [
    check("user")
      .notEmpty()
      .withMessage("Please add required fields")
      .isMongoId()
      .withMessage("Received invalid fields"),
    oneOf(
      [
        check("occupation", "Please add required fields").notEmpty(),
        check("workplace", "Please add required fields").notEmpty(),
        check("education", "Please add required fields").notEmpty(),
        check("github")
          .notEmpty()
          .withMessage("Please add required fields")
          .isURL()
          .withMessage("Received invalid fields"),
        check("linkedin")
          .notEmpty()
          .withMessage("Please add required fields")
          .isURL()
          .withMessage("Received invalid fields"),
      ],
      { message: "Please add required fields" }
    ),
  ],
  auth,
  validationErrorHandler,
  updateProfile
);

export default router;
