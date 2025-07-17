import express from "express";
import { connectDb } from "./config/mongo.config.js";
import {
  createShortUrlRouter,
  redirectFromShortUrlRouter,
} from "./routes/shorturl-router.js";
import cors from "cors";
import { errorHandler } from "./utils/errorhandler.js";
import { authRouter } from "./routes/auth-router.js";
import cookieParser from "cookie-parser";
import { attachUser } from "./utils/attchuser.js";
import { userRouer } from "./routes/user-router.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// cors
app.use(
  cors({
    origin: "https://url-shortner-three-xi.vercel.app",
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

const port = process.env.PORT || 10000;

app.listen(port, () => {
  console.log("server is running on the port");
});
