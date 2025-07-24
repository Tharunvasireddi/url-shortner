import { findUserById } from "../dao/user_doa.js";
import { verifyToken } from "../utils/helper.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access token not found in headers" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Access token not found",
    });
  }

  try {
    const decoded = verifyToken(token);

    // Now tokens consistently have both id and name, prefer finding by ID for better performance
    if (!decoded.playLoad || !decoded.playLoad.id) {
      return res.status(401).json({
        message: "Invalid token structure",
      });
    }

    const user = await findUserById(decoded.playLoad.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;
    console.log(req.user);
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export { authMiddleware };
