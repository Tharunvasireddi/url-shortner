import express from "express";
import {
  redirectFromShortUrlController,
  shortUrlController,
} from "../controllers/shortUrl-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const createShortUrlRouter = express.Router();
createShortUrlRouter.post("/create", shortUrlController);
// createShortUrlRouter.post("/create", authMiddleware, shortUrlController);

const redirectFromShortUrlRouter = express.Router();
redirectFromShortUrlRouter.get("/:id", redirectFromShortUrlController);

export { createShortUrlRouter, redirectFromShortUrlRouter };
