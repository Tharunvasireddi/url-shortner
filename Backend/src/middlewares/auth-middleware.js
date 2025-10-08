import { findUserById } from "../dao/user_doa.js";
import { verifyToken } from "../utils/helper.js";

const authMiddleware = async (req, res, next) => {
  console.log("🔐 AUTH MIDDLEWARE STARTED");
  console.log("Request URL:", req.url);
  console.log("Request Method:", req.method);

  const authHeader = req.headers.authorization;
  console.log("Auth Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ Auth header missing or invalid format");
    return res
      .status(401)
      .json({ message: "Access token not found in headers" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token extracted:", token ? "✅ Present" : "❌ Missing");

  if (!token) {
    console.log("❌ Token extraction failed");
    return res.status(401).json({
      message: "Access token not found",
    });
  }

  try {
    console.log("🔍 Attempting to verify token...");
    const decoded = verifyToken(token);
    console.log("✅ Token verification successful");
    console.log("Decoded token structure:", JSON.stringify(decoded, null, 2));

    if (!decoded.payload) {
      console.log("❌ No payload found in decoded token");
      console.log("Available properties:", Object.keys(decoded));
      return res.status(401).json({
        message: "Invalid token structure - no payload",
      });
    }

    if (!decoded.payload.id) {
      console.log("❌ No ID found in payload");
      console.log(
        "Payload contents:",
        JSON.stringify(decoded.payload, null, 2)
      );
      return res.status(401).json({
        message: "Invalid token structure - no user ID",
      });
    }

    console.log("🔍 Looking up user with ID:", decoded.payload.id);
    const user = await findUserById(decoded.payload.id);
    console.log("User lookup result:", user ? "✅ Found" : "❌ Not found");

    if (user) {
      console.log("User details:", { id: user.id, name: user.name });
    }

    if (!user) {
      console.log("❌ User not found in database");
      return res.status(401).json({
        message: "User not found",
      });
    }

    console.log("✅ Authentication successful");
    req.user = user;
    next();
  } catch (error) {
    console.error("❌ Auth middleware error:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Full error:", error);
    return res.status(401).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};

export { authMiddleware };
