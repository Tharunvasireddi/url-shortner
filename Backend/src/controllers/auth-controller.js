import { cookieOptions } from "../config/config.js";
import { loginUser, registerUser } from "../services/auth-service.js";
import wrapAsync from "../utils/tryCatchWrafer.js";
import { signToken, verifyToken } from "../utils/helper.js"; // Add this import

const registerController = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  console.log("🔐 REGISTER CONTROLLER: Starting registration");
  console.log("   - Name:", name);
  console.log("   - Email:", email);
  console.log("   - Password provided:", !!password);

  try {
    console.log("🔐 REGISTER CONTROLLER: Calling registerUser service...");
    await registerUser(name, email, password);
    console.log("✅ REGISTER CONTROLLER: Registration successful");

    res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("❌ REGISTER CONTROLLER: Registration failed:");
    console.error("   - Error:", error.message);
    console.error("   - Stack:", error.stack);

    res.status(400).json({
      message: error.message || "Registration failed",
    });
  }
});

const loginController = wrapAsync(async (req, res) => {
  const { name, password } = req.body;
  console.log("🔐 LOGIN CONTROLLER: Attempting login for:", name);

  const { token, user } = await loginUser(name, password);

  console.log("🔐 LOGIN CONTROLLER: Login service completed");
  console.log("   - Token received:", !!token);
  console.log("   - User received:", !!user);
  console.log("   - Token preview:", token?.substring(0, 50) + "...");

  // Test token immediately after creation
  try {
    const testDecode = verifyToken(token);
    console.log("🔐 LOGIN CONTROLLER: Token test decode successful");
    console.log("   - Test decoded:", JSON.stringify(testDecode, null, 2));
  } catch (testError) {
    console.error(
      "🔐 LOGIN CONTROLLER: Token test decode failed:",
      testError.message
    );
  }

  res.status(200).json({
    message: " user logined  successfully",
    user: user,
    token,
  });
});

const get_current_user = wrapAsync(async (req, res) => {
  console.log("🔐 GET_CURRENT_USER: Called");
  console.log("   - req.user:", !!req.user);
  res.status(200).json({
    user: req.user,
  });
});

// Add this debug endpoint
const testToken = wrapAsync(async (req, res) => {
  console.log("🧪 TEST TOKEN ENDPOINT");

  try {
    // Test creating a token
    const testPayload = { id: "test123", name: "testuser" };
    console.log("🧪 Creating test token with payload:", testPayload);

    const testToken = await signToken(testPayload);
    console.log("🧪 Test token created:", testToken.substring(0, 50) + "...");

    // Test verifying the token
    const decoded = verifyToken(testToken);
    console.log("🧪 Test token verified:", JSON.stringify(decoded, null, 2));

    res.json({
      success: true,
      testPayload,
      token: testToken,
      decoded,
    });
  } catch (error) {
    console.error("🧪 Test token failed:", error);
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
});

export { registerController, loginController, get_current_user, testToken };
