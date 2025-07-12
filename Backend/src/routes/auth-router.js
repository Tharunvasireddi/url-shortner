import express from "express";
import {
  loginController,
  registerConroller,
} from "../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerConroller);
authRouter.post("/login", loginController);

export { authRouter };
