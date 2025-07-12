import { createUser, findUserByEmail } from "../dao/user_doa.js";
import { regiserUser } from "../services/auth-service.js";
import { ConflictError } from "../utils/errorhandler.js";
import wrapAsync from "../utils/tryCatchWrafer.js";
import jwt from "jsonwebtoken";

const registerConroller = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const { token, user } = regiserUser(name, email, password);
  req.user = user;
});
const loginController = wrapAsync(async (req, res) => {});
export { registerConroller, loginController };
