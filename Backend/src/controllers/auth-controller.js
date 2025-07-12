import { cookieOptions } from "../config/config.js";
import { loginUser, registerUser } from "../services/auth-service.js";
import wrapAsync from "../utils/tryCatchWrafer.js";

const registerConroller = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const token = await registerUser(name, email, password);
  res.cookie("accesstoken", token, cookieOptions);

  res.status(200).json({
    message: " user registered  successfully",
  });
});
const loginController = wrapAsync(async (req, res) => {
  const { name, password } = req.body;
  const token = await loginUser(name, password);
  res.cookie("accesstoken", token, cookieOptions);

  res.status(200).json({
    message: " user logined  successfully",
  });
});
export { registerConroller, loginController };
