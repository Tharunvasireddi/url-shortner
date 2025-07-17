import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { cookieOptions } from "../config/config.js";
dotenv.config();
const generateNanoId = (length) => {
  return nanoid(length);
};

const signToken = async (playLoad) => {
  return jwt.sign(
    { playLoad },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" },
    cookieOptions
  );
};

const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return decoded;
};

export { generateNanoId, signToken, verifyToken };
