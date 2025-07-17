import { decode } from "jsonwebtoken";
import { findUserById, findUserByName } from "../dao/user_doa.js";
import { verifyToken } from "../utils/helper.js";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.accesstoken;
  if (!token) {
    return res.status(400).json({
      message: "token is not found ",
    });
  }
  try {
    const decoded = verifyToken(token);
    const user = await findUserByName(decoded.playLoad.name);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "unauthorized",
    });
  }
};

export { authMiddleware };
