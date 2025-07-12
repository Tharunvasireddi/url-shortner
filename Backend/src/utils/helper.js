import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { cookieOptions } from "../config/config.js";
dotenv.config();
const generateNanoId = async (length) => {
  return nanoid(length);
};

const signToken = async (playLoad) => {
  return jwt.sign(
    playLoad,
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" },
    cookieOptions
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

export { generateNanoId, signToken, verifyToken };
