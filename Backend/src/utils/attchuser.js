import { findUserById } from "../dao/user_doa.js";
import { verifyToken } from "./helper.js";

export const attachUser = async (req, res, next) => {
  const token = req.cookies.accesstoken;
  if (!token) return next();
  try {
    const decoded = verifyToken(token);
    // Use the correct token structure with playLoad wrapper
    const user = await findUserById(decoded.playLoad.id);
    req.user = user;
    next();
  } catch (error) {
    next();
  }
};
