import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./config/mongo.config.js";
import { authRouter } from "./routes/auth-router.js";
import {
  createShortUrlRouter,
  redirectFromShortUrlRouter,
} from "./routes/shorturl-router.js";
import { userRouer } from "./routes/user-router.js";
import { attachUser } from "./utils/attchuser.js";
import { errorHandler } from "./utils/errorhandler.js";

dotenv.config();
const app = express();

// cors
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://url-shortner-three-xi.vercel.app"
        : "http://localhost:5173",
    credentials: true,
  })
);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);

// database connecion
connectDb();

// routes
app.use("/api/auth", authRouter);
app.use("/api/url", createShortUrlRouter);
app.use("/api", redirectFromShortUrlRouter);
app.use("/api/get", userRouer);

// error handler
app.use(errorHandler);

const port = process.env.Port || 3000;

app.listen(port, () => {
  console.log("server is running on the port", port);
});
