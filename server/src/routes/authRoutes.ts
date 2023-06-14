import express, { Router } from "express";

import auth, { verifyGoogleToken } from "../middleware/authMiddleware";

import { authUser, authGoogleHandler, authGitHubHandler } from "../controllers/authController";

const router: Router = express.Router();

// @desc		  Auth user
// @route		  GET /auth/users
// @access        Private
router.get("/", auth, authUser);

// @desc		  Auth Google user
// @route		  POST /auth/google
// @access        Public
router.post("/google", verifyGoogleToken, authGoogleHandler);

// @desc		  Auth GitHub user
// @route		  POST /auth/github
// @access        Public
// router.post("/github", passport.authenticate("github", { session: false }), authGoogleHandler);

export default router;
