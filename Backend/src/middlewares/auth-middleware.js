import { findUserById } from "../dao/user_doa.js";
import { verifyToken } from "../utils/helper.js";

const authMiddleware = async (req, resizeBy, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return resizeBy.status(400).json({
      message: "token is not found ",
    });
  }
  try {
    const decoded = verifyToken(token);
    const user = await findUserById(decoded.id);
    if (!user) {
      return resizeBy.status(401).json({
        message: "Unauthorized",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error at authmiddleware", error);
    return resizeBy.status(400).json({
      message: "unauthorized",
    });
  }
};

export { authMiddleware };
