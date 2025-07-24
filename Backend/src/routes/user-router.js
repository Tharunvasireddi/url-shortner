import express from "express";
import {
  deleteUrlController,
  getUrlsController,
} from "../controllers/user-conroller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const userRouer = express.Router();

userRouer.get("/urls", authMiddleware, getUrlsController);
userRouer.delete("/delete/:id", deleteUrlController);

export { userRouer };
