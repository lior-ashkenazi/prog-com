import express, { Router } from "express";
import passport from "passport";

import auth from "../middleware/authMiddleware";

import { authUser, authGoogleHandler } from "../controllers/authController";

const router: Router = express.Router();

// @desc		  Auth user
// @route		  GET /auth/users
// @access        Private
router.get("/auth", auth, authUser);

// @desc		  Auth Google user
// @route		  POST /auth/google
// @access        Public
router.post("/auth/google", passport.authenticate("google", { session: false }), authGoogleHandler);

export default router;
