import express from "express";
import {
  deleteUrlController,
  getUrlsController,
} from "../controllers/user-conroller.js";

const userRouer = express.Router();

userRouer.get("/urls", getUrlsController);
userRouer.delete("/delete/:id", deleteUrlController);

export { userRouer };
