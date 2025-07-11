import express from "express";
import {
  redirectFromShortUrlController,
  shortUrlController,
} from "../controllers/shortUrl-controller.js";

const createShortUrlRouter = express.Router();
createShortUrlRouter.post("/create", shortUrlController);

const redirectFromShortUrlRouter = express.Router();
redirectFromShortUrlRouter.get("/:id", redirectFromShortUrlController);

export { createShortUrlRouter, redirectFromShortUrlRouter };
