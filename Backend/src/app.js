import express from "express";
import { connectDb } from "./config/mongo.config.js";
import {
  createShortUrlRouter,
  redirectFromShortUrlRouter,
} from "./routes/shorturl-router.js";
import cors from "cors";
import { errorHandler } from "./utils/errorhandler.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connecion
connectDb();

// cors
app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);

// routes
app.use("/api", createShortUrlRouter);
app.use("/api", redirectFromShortUrlRouter);

// error handler
app.use(errorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is running url http://localhost:3000");
});
