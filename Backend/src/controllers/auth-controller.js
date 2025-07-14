import { cookieOptions } from "../config/config.js";
import { loginUser, registerUser } from "../services/auth-service.js";
import wrapAsync from "../utils/tryCatchWrafer.js";

const registerController = wrapAsync(async (req, res) => {
  console.log("hi hello");
  const { name, email, password } = req.body;
  const token = await registerUser(name, email, password);
  res.cookie("accesstoken", token, cookieOptions);

  res.status(200).json({
    message: " user registered  successfully",
  });
});
const loginController = wrapAsync(async (req, res) => {
  const { name, password } = req.body;
  const { token, user } = await loginUser(name, password);
  res.cookie("accesstoken", token, cookieOptions);

  res.status(200).json({
    message: " user logined  successfully",
    user: user,
  });
});
export { registerController, loginController };
