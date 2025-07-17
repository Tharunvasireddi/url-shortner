import { findUserById } from "../dao/user_doa.js";
import { verifyToken } from "./helper.js";

export const attachUser = async (req, res, next) => {
  const token = req.cookies.accesstoken;
  if (!token) return next();
  try {
    const decoded = verifyToken(token);
    const user = await findUserById(decoded.id);
    req.user = user;
    next();
  } catch (error) {
    next();
  }
};
