import { findUserById } from "../dao/user_doa.js";
import { verifyToken } from "./helper.js";

export const attachUser = async (req, res, next) => {
  const token = req.cookies.accesstoken;
  console.log("hiii");
  if (!token) return next();
  console.log("hiii");
  try {
    const decoded = verifyToken(token);
    console.log(decoded);
    const user = await findUserById(decoded.id);
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    next();
  }
};
