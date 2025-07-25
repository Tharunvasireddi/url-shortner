import express from "express";
import {
  get_current_user,
  loginController,
  logoutController,
  registerController,
} from "../controllers/auth-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/me", authMiddleware, get_current_user);
authRouter.get("/logout", logoutController)
export { authRouter };
