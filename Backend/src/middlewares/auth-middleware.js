import { decode } from "jsonwebtoken";
import { findUserById, findUserByName } from "../dao/user_doa.js";
import { verifyToken } from "../utils/helper.js";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.accesstoken;
  console.log(req.cookies);
  if (!token) {
    return res.status(400).json({
      message: "token is not found ",
    });
  }
  try {
    const decoded = verifyToken(token);
    const user = await findUserByName(decoded.name);
    console.log(user);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error at authmiddleware", error);
    return res.status(400).json({
      message: "unauthorized",
    });
  }
};

export { authMiddleware };
