import express from "express";
import {
  candidateSignIn,
  candidateSignOut,
} from "../controllers/candidate.controller.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", candidateSignIn);
router.get("/logout", auth, candidateSignOut);

export default router;
