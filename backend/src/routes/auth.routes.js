import express from "express";
import {
  getmeController,
  loginController,
  logoutController,
  signupController,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);

router.get("/me", protectRoute, getmeController);

export default router;
