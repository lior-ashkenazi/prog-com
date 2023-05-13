import express, { Router } from "express";
import { check } from "express-validator";

import auth from "../middleware/authMiddleware";

const router: Router = express.Router();

// @desc		Send message
// @route		/api/messages
// @access      Private
router.post("/", [check("content", "Include content").notEmpty()], auth, sendMessage);
